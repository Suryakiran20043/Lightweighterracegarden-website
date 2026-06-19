import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Dynamic params
    const name = searchParams.get('name') || 'Premium Seeds';
    const imageUrl = searchParams.get('image');

    // Make sure we have an image
    const validImageUrl = imageUrl && imageUrl.startsWith('http') 
      ? imageUrl 
      : 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80'; // fallback tomato

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FCFBF8', // Warm white background simulating paper
            backgroundImage: 'linear-gradient(to bottom, #FCFBF8, #F0EAD6)',
            padding: '40px',
            position: 'relative',
            border: '2px solid #E6E2DA', // Edge of packet
          }}
        >
          {/* Top Seal */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '30px',
              borderBottom: '4px dashed #D1CCC0',
              opacity: 0.6,
            }}
          />

          {/* 100% Natural Badge */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: '40px',
              backgroundColor: '#1B5E20',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '15px 10px',
              borderBottomLeftRadius: '10px',
              borderBottomRightRadius: '10px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
          >
            <span style={{ fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>100%</span>
            <span style={{ fontSize: '14px', fontWeight: 'normal', textTransform: 'uppercase', letterSpacing: '1px' }}>Natural</span>
          </div>

          {/* Branding Logo Area */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '60px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#1B5E20', margin: 0, padding: 0, fontFamily: 'serif' }}>
              Light Weight
            </h1>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2E7D32', margin: '5px 0 0 0', textTransform: 'uppercase', letterSpacing: '6px' }}>
              Terrace Garden
            </p>
          </div>

          {/* Central Product Image Integration */}
          <div
            style={{
              display: 'flex',
              width: '500px',
              height: '400px',
              marginTop: '40px',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 15px 30px rgba(0,0,0,0.15)',
              border: '8px solid white',
              backgroundColor: 'white',
            }}
          >
            <img
              src={validImageUrl}
              alt={name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Product Title Label */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: '20px',
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
              border: '2px solid #E6E2DA',
              padding: '20px 40px',
              marginTop: '-30px',
              zIndex: 10,
              width: '600px',
            }}
          >
            <div
              style={{
                marginTop: '-40px',
                width: '50px',
                height: '50px',
                backgroundColor: 'white',
                borderRadius: '25px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                fontSize: '24px',
              }}
            >
              🌿
            </div>
            <h2 style={{ fontSize: '42px', fontWeight: 'bold', color: '#1A1A1A', margin: '15px 0 0 0', textAlign: 'center', fontFamily: 'serif' }}>
              {name}
            </h2>
            <p style={{ fontSize: '20px', color: '#1B5E20', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '3px', margin: '10px 0 0 0' }}>
              High Germination Rate
            </p>
          </div>

          {/* Green Footer Strip */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              backgroundColor: '#4CAF50',
              padding: '20px',
              marginTop: '50px',
              borderRadius: '10px',
            }}
          >
            <span style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', letterSpacing: '2px' }}>
              WhatsApp: 7386038056
            </span>
          </div>
        </div>
      ),
      {
        width: 800,
        height: 1000,
      }
    );
  } catch (e: any) {
    console.error(e.message);
    return new Response('Failed to generate image', { status: 500 });
  }
}
