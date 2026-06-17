// Mock and Algolia integration helpers for search indexing

const algoliaAppId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '';
const algoliaApiKey = process.env.ALGOLIA_API_KEY || '';
const algoliaIndexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || 'products';

export async function indexProductForSearch(product: {
  id: string;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  category: string;
  image?: string;
}) {
  if (!algoliaAppId || !algoliaApiKey) {
    console.log(`Algolia: Running in MOCK mode. Indexing product: ${product.name}`);
    return;
  }

  try {
    const res = await fetch(
      `https://${algoliaAppId}.algolia.net/1/indexes/${algoliaIndexName}/${product.id}`,
      {
        method: 'PUT',
        headers: {
          'X-Algolia-Application-Id': algoliaAppId,
          'X-Algolia-API-Key': algoliaApiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          objectID: product.id,
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: product.basePrice,
          category: product.category,
          image: product.image,
        }),
      }
    );

    if (!res.ok) {
      console.error('Failed to index product in Algolia:', await res.text());
    }
  } catch (error) {
    console.error('Algolia indexing error:', error);
  }
}

export async function searchProducts(query: string) {
  if (!algoliaAppId || !algoliaApiKey) {
    // Mock local search logic or return empty array to avoid crashes
    return {
      hits: [],
      nbHits: 0,
      mock: true,
    };
  }

  try {
    const res = await fetch(
      `https://${algoliaAppId}-dsn.algolia.net/1/indexes/${algoliaIndexName}/query`,
      {
        method: 'POST',
        headers: {
          'X-Algolia-Application-Id': algoliaAppId,
          'X-Algolia-API-Key': algoliaApiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          hitsPerPage: 12,
        }),
      }
    );

    if (res.ok) {
      const data = await res.json();
      return {
        hits: data.hits,
        nbHits: data.nbHits,
        mock: false,
      };
    }
  } catch (error) {
    console.error('Algolia search error:', error);
  }

  return { hits: [], nbHits: 0 };
}
