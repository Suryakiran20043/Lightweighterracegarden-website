'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, Share2, ChevronRight, CheckCircle2, ShieldCheck, Truck, Clock, ThumbsUp, Star, Package } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { useWishlistStore } from '@/lib/store/wishlist';
import { products } from '@/lib/data/products';
import ProductCard from '@/components/shop/ProductCard';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = products.find(p => p.slug === slug) || products[0]; // fallback to first product

  const [activeImage, setActiveImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [zoomStyle, setZoomStyle] = useState({ display: 'none', backgroundPosition: '0% 0%' });

  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  
  const [mounted, setMounted] = useState(false);
  React.useEffect(() => setMounted(true), []);
  
  const inWish = mounted ? isInWishlist(product.id) : false;

  const isSeed = !['pots-planters', 'grocery'].includes(product.category);

  // Gallery array
  const gallery = [product.image];
  if (product.hoverImage) gallery.push(product.hoverImage);
  // Add some fallback gallery images if needed or keep it simple with 2 images
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomStyle({
      display: 'block',
      backgroundPosition: `${x}% ${y}%`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none', backgroundPosition: '0% 0%' });
  };

  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const recentlyViewed = products.slice(5, 9); // mock recently viewed

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="w-full bg-[#F8F8F8] py-[15px] border-b border-gray-200">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center gap-2 text-sm font-medium" style={{ fontFamily: 'var(--font-sans)', color: '#666' }}>
            <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href={`/shop?category=${product.category}`} className="hover:text-gray-900 transition-colors capitalize">
              {product.category.replace('-', ' ')}
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 line-clamp-1">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Left: Product Image Gallery */}
          <div className="w-full lg:w-[40%] flex flex-col-reverse sm:flex-row gap-4 h-auto sm:h-[650px] lg:h-[750px] xl:h-[800px]">
            {/* Vertical Thumbnails */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:w-28 shrink-0 custom-scrollbar pb-2 sm:pb-0">
              {gallery.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(img)}
                  className={`w-24 h-28 sm:w-full sm:h-32 rounded-xl border-2 overflow-hidden bg-white shrink-0 ${activeImage === img ? 'border-[#4CAF50]' : 'border-gray-200 hover:border-gray-300'} transition-colors`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-contain p-2" />
                </button>
              ))}
            </div>

            {/* Large Viewer with Zoom Lens */}
            <div 
              className="flex-1 bg-white border border-gray-200 rounded-2xl overflow-hidden relative cursor-crosshair group"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img src={activeImage} alt={product.name} className="w-full h-full object-contain p-8" />
              
              {/* Badges inside image */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isOrganic && (
                  <span className="bg-[#2E7D32] text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded shadow-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                    100% Organic
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="bg-red-500 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded shadow-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              {/* Zoom Lens Element */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 bg-white"
                style={{
                  ...zoomStyle,
                  backgroundImage: `url(${activeImage})`,
                  backgroundSize: '250%',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            </div>
          </div>

          {/* Right: Product Information */}
          <div className="w-full lg:w-[50%] xl:w-[45%] flex flex-col">
            <h1 className="text-2xl sm:text-3xl font-sans font-bold text-gray-800 mb-2 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-2 mb-6" style={{ fontFamily: 'var(--font-sans)' }}>
              <div className="flex items-center text-[#D4AF37] text-lg">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
              <span className="text-sm text-gray-500 underline cursor-pointer hover:text-gray-900">({product.reviewsCount} customer reviews)</span>
            </div>

            <div className="mb-6 border-b border-gray-100 pb-6" style={{ fontFamily: 'var(--font-sans)' }}>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-[32px] font-bold text-gray-900">₹{product.price}</span>
                {product.discount > 0 && (
                  <>
                    <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                    <span className="text-[13px] font-bold text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded">Save {product.discount}%</span>
                  </>
                )}
              </div>
              <p className="text-[13px] text-gray-500">Inclusive of all taxes</p>
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed text-[15px]" style={{ fontFamily: 'var(--font-sans)' }}>
              {product.desc} {isSeed && 'This premium seed variety has been rigorously tested for high germination rates and robust growth in lightweight terrace setups.'}
            </p>

            <div className="space-y-4 mb-10" style={{ fontFamily: 'var(--font-sans)' }}>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-md h-[46px] w-[120px]">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex-1 h-full flex items-center justify-center text-gray-600 hover:text-gray-900 text-xl font-medium">−</button>
                  <span className="w-10 text-center font-bold text-gray-900">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="flex-1 h-full flex items-center justify-center text-gray-600 hover:text-gray-900 text-xl font-medium">+</button>
                </div>
                <button 
                  onClick={() => toggleItem(product)}
                  className={`w-[46px] h-[46px] rounded-md border flex items-center justify-center transition-colors shrink-0 ${inWish ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white border-gray-300 text-gray-400 hover:text-red-500'}`}
                  title="Add to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWish ? 'fill-current' : ''}`} />
                </button>
              </div>
              
              <div className="flex flex-col gap-3 pt-2">
                <button 
                  onClick={() => addItem(product, quantity)}
                  className="w-full h-[48px] border-2 border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white rounded-md font-bold transition-colors uppercase tracking-wide text-[13px]"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={() => { addItem(product, quantity); window.location.href = '/checkout'; }}
                  className="w-full h-[48px] bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-md font-bold transition-colors uppercase tracking-wide text-[13px] shadow-sm"
                >
                  Buy it Now
                </button>
              </div>
            </div>

            {/* Kalagura Style Trust Icons */}
            <div className="flex items-center justify-between py-6 border-t border-b border-gray-100 mb-8" style={{ fontFamily: 'var(--font-sans)' }}>
              <div className="flex flex-col items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-[#2E7D32]" strokeWidth={1.5} />
                <span className="text-[11px] font-medium text-gray-600 uppercase text-center leading-tight">Quality<br/>Assured</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Truck className="w-6 h-6 text-[#2E7D32]" strokeWidth={1.5} />
                <span className="text-[11px] font-medium text-gray-600 uppercase text-center leading-tight">Fast<br/>Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-[#2E7D32]" strokeWidth={1.5} />
                <span className="text-[11px] font-medium text-gray-600 uppercase text-center leading-tight">Secure<br/>Checkout</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <ThumbsUp className="w-6 h-6 text-[#2E7D32]" strokeWidth={1.5} />
                <span className="text-[11px] font-medium text-gray-600 uppercase text-center leading-tight">High<br/>Germination</span>
              </div>
            </div>

            {/* Accordions */}
            <div className="space-y-3" style={{ fontFamily: 'var(--font-sans)' }}>
              <details className="group border border-gray-200 rounded-md bg-white overflow-hidden" open>
                <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-sm text-gray-800 uppercase tracking-wide list-none [&::-webkit-details-marker]:hidden bg-gray-50">
                  Description
                  <span className="transition group-open:rotate-180">
                    <ChevronRight className="w-4 h-4 rotate-90" />
                  </span>
                </summary>
                <div className="p-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                  <p className="mb-3">{product.desc}</p>
                  <p>Our seeds are organically sourced and specifically selected for home gardeners. They are highly resilient, open-pollinated, and guaranteed to yield a rich, nutritious harvest when provided with the right soil, water, and sunlight.</p>
                </div>
              </details>

              {isSeed && (
                <details className="group border border-gray-200 rounded-md bg-white overflow-hidden">
                  <summary className="flex items-center justify-between cursor-pointer p-4 font-bold text-sm text-gray-800 uppercase tracking-wide list-none [&::-webkit-details-marker]:hidden bg-gray-50">
                    How to Grow
                    <span className="transition group-open:rotate-180">
                      <ChevronRight className="w-4 h-4 rotate-90" />
                    </span>
                  </summary>
                  <div className="p-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Soil:</strong> Use a well-draining potting mix rich in organic compost.</li>
                      <li><strong>Sowing:</strong> Sow seeds 0.5 inches deep. Keep the soil consistently moist until germination.</li>
                      <li><strong>Sunlight:</strong> Requires 6-8 hours of direct sunlight per day.</li>
                      <li><strong>Watering:</strong> Water deeply when the top inch of soil feels dry. Do not overwater.</li>
                    </ul>
                  </div>
                </details>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="bg-[#FAFAFA] py-16 border-t border-gray-200">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-10 text-center">Customer Reviews</h2>
          
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Reviews Summary */}
            <div className="w-full lg:w-[35%]">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                <div className="flex items-center gap-5 mb-8">
                  <span className="text-6xl font-bold text-gray-900 font-sans">{product.rating.toFixed(1)}</span>
                  <div>
                    <div className="flex text-[#D4AF37] text-2xl mb-1">
                      {'★'.repeat(Math.floor(product.rating))}
                      {'☆'.repeat(5 - Math.floor(product.rating))}
                    </div>
                    <span className="text-base text-gray-500 font-sans">Based on {product.reviewsCount} reviews</span>
                  </div>
                </div>
                
                {/* Breakdown */}
                <div className="space-y-4 mb-10" style={{ fontFamily: 'var(--font-sans)' }}>
                  {[5, 4, 3, 2, 1].map(stars => {
                    const percent = stars === 5 ? 75 : stars === 4 ? 15 : stars === 3 ? 5 : 2.5;
                    return (
                      <div key={stars} className="flex items-center gap-4 text-base">
                        <span className="w-14 text-gray-600 flex items-center gap-1.5 font-medium">{stars} <Star className="w-4 h-4 fill-current text-gray-400" /></span>
                        <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#D4AF37] rounded-full" style={{ width: `${percent}%` }}></div>
                        </div>
                        <span className="w-10 text-right text-gray-500 font-medium">{percent}%</span>
                      </div>
                    );
                  })}
                </div>

                <button className="w-full border-2 border-gray-900 text-gray-900 py-4 rounded-xl font-bold text-lg hover:bg-gray-900 hover:text-white transition-colors" style={{ fontFamily: 'var(--font-sans)' }}>
                  Write a Review
                </button>
              </div>
            </div>

            {/* Review List */}
            <div className="w-full lg:w-[65%]">
              <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-5" style={{ fontFamily: 'var(--font-sans)' }}>
                <span className="font-bold text-gray-900 text-lg">{product.reviewsCount} Reviews</span>
                <select className="border-none bg-transparent font-medium text-gray-600 focus:ring-0 cursor-pointer text-base">
                  <option>Most Recent</option>
                  <option>Highest Rating</option>
                  <option>Lowest Rating</option>
                </select>
              </div>

              <div className="space-y-6">
                {[
                  { name: "Anjali S.", rating: 5, date: "October 12, 2025", text: "Excellent germination rate! Planted these on my terrace and they sprouted beautifully within a week. The packaging was also very sturdy and premium.", verified: true },
                  { name: "Rajesh K.", rating: 4, date: "September 28, 2025", text: "Good quality seeds. Took a bit longer to germinate than expected, but the yield was great. Will buy again.", verified: true },
                  { name: "Priya M.", rating: 5, date: "August 05, 2025", text: "100% organic and true to their word. The delivery was fast via Speed Post. Highly recommend Light Weight Terrace Garden!", verified: true }
                ].map((review, i) => (
                  <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1.5">
                          <span className="font-bold text-gray-900 text-lg font-sans">{review.name}</span>
                          {review.verified && (
                            <span className="flex items-center gap-1.5 text-[#2E7D32] text-xs font-bold uppercase tracking-wider bg-[#E8F5E9] px-3 py-1 rounded-full" style={{ fontFamily: 'var(--font-sans)' }}>
                              <CheckCircle2 className="w-3.5 h-3.5" /> Verified Purchase
                            </span>
                          )}
                        </div>
                        <div className="flex text-[#D4AF37] text-base mb-1">
                          {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                        </div>
                      </div>
                      <span className="text-sm text-gray-400 font-medium" style={{ fontFamily: 'var(--font-sans)' }}>{review.date}</span>
                    </div>
                    <p className="text-gray-600 text-base leading-relaxed mb-6" style={{ fontFamily: 'var(--font-sans)' }}>{review.text}</p>
                    <button className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors" style={{ fontFamily: 'var(--font-sans)' }}>
                      <ThumbsUp className="w-5 h-5" /> Helpful (0)
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recently Viewed & Best Selling */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-16 space-y-20 overflow-hidden">
        
        <section>
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-10">Recently Viewed Products</h2>
          <div className="flex overflow-x-auto gap-8 pb-4 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {recentlyViewed.map((item) => (
              <div key={`recent-${item.id}`} className="min-w-[280px] sm:min-w-0 sm:flex-1 snap-start shrink-0">
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-4xl font-serif font-bold text-gray-900">Best Selling Products</h2>
            <Link href="/shop" className="text-[#1B5E20] font-bold text-lg hover:underline" style={{ fontFamily: 'var(--font-sans)' }}>View All</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8">
            {bestSellers.map((item) => (
              <ProductCard key={`best-${item.id}`} product={item} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
