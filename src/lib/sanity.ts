// Headless Sanity CMS connection helper

const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const sanityToken = process.env.SANITY_API_TOKEN || '';

export async function fetchCMSData(query: string, variables: Record<string, any> = {}) {
  if (!sanityProjectId) {
    // Return mock campaign/blog data matching the gardening guides & organic stories
    return getMockCMSResponse(query);
  }

  const encodedQuery = encodeURIComponent(query);
  const url = `https://${sanityProjectId}.api.sanity.io/v2023-01-01/data/query/${sanityDataset}?query=${encodedQuery}`;

  try {
    const res = await fetch(url, {
      headers: sanityToken ? { Authorization: `Bearer ${sanityToken}` } : {},
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (res.ok) {
      const { result } = await res.json();
      return result;
    }
  } catch (error) {
    console.error('Sanity CMS query error:', error);
  }

  return getMockCMSResponse(query);
}

function getMockCMSResponse(query: string) {
  if (query.includes('homepage')) {
    return {
      heroTitle: 'Cultivate Abundance on Your Terrace',
      heroSubtitle: 'India’s premium organic destination for lightweight gardening setups and authentic heritage foods.',
      promoBanner: 'Get 10% off your first terrace garden setup. Code: GROW10',
    };
  }

  if (query.includes('gardening-guides') || query.includes('blogs')) {
    return [
      {
        id: 'guide-1',
        title: 'Beginner Guide to Terrace Gardening',
        slug: 'beginner-terrace-gardening',
        summary: 'Learn how to start a high-yield vegetable garden on your roof with lightweight coco-peat potting soil.',
        content: 'To start a terrace garden, weight is the primary structural concern. Standard red soil is heavy when wet, which is why lightweight growing mediums like coco-peat mixed with vermicompost are essential...',
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80',
        author: 'Gardening Guru',
        createdAt: '2026-06-01T00:00:00Z',
      },
      {
        id: 'guide-2',
        title: 'Making Your Own Organic Compost at Home',
        slug: 'home-composting-guide',
        summary: 'Turn kitchen scraps into premium organic fertilizer for your vertical grow bags.',
        content: 'Composting at home reduces waste and provides nutrient-rich feeding for your crops. Keep a balance of greens (nitro-rich scraps) and browns (carbon-rich paper or dry leaves)...',
        image: 'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=600&q=80',
        author: 'Organic Specialist',
        createdAt: '2026-06-10T00:00:00Z',
      },
    ];
  }

  return null;
}
