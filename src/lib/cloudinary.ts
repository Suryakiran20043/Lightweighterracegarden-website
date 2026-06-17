// Cloudinary image helper utility

const cloudinaryCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'mock_cloud';
const cloudinaryPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'mock_preset';

export function getOptimizedImageUrl(
  publicId: string,
  options: { width?: number; height?: number; crop?: string; quality?: string } = {}
) {
  if (publicId.startsWith('http://') || publicId.startsWith('https://')) {
    return publicId; // Already a full URL
  }

  if (cloudinaryCloudName === 'mock_cloud') {
    // Return standard premium placeholder from Unsplash for organic/gardening
    return `https://images.unsplash.com/photo-${publicId}?auto=format&fit=crop&w=${
      options.width || 800
    }&q=${options.quality || 80}`;
  }

  const { width, height, crop = 'fill', quality = 'auto' } = options;
  const transform = [
    width ? `w_${width}` : '',
    height ? `h_${height}` : '',
    crop ? `c_${crop}` : '',
    quality ? `q_${quality}` : '',
    'f_auto',
  ]
    .filter(Boolean)
    .join(',');

  return `https://res.cloudinary.com/${cloudinaryCloudName}/image/upload/${transform}/${publicId}`;
}

export async function uploadImageToCloudinary(file: File) {
  if (cloudinaryCloudName === 'mock_cloud') {
    return {
      secure_url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80', // mock garden potting soil image
      public_id: '1585320806297-9794b3e4eeae',
    };
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', cloudinaryPreset);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error);
  }

  return null;
}
