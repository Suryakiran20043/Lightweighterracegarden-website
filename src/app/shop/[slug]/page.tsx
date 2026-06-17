'use client';

import React, { useState, use, useEffect } from 'react';
import { useCartStore } from '@/lib/store/cart';
import { useWishlistStore } from '@/lib/store/wishlist';
import { calculateShippingRates } from '@/lib/shiprocket';
import { Heart, ShoppingBag, Truck, Calendar, Sparkles, Sprout, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Mock DB products matching the catalog
const dbProducts: Record<string, any> = {
  'cherry-tomato-seeds': {
    id: 'var_seeds_1',
    productId: 'prod_seeds_1',
    name: 'Premium Cherry Tomato Seeds',
    category: 'seeds',
    price: 99,
    rating: 4.8,
    images: [
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1594008988647-797de1de3e15?auto=format&fit=crop&w=800&q=80',
    ],
    sku: 'SEED-TOM-CHY',
    stock: 45,
    desc: 'Grow abundant clusters of sweet, bright red cherry tomatoes right on your terrace. These non-hybrid organic seeds have been selected for high germination rates and urban balcony spacing.',
    specs: 'Germination Rate: 90% | Sowing Temp: 20-30°C | Harvest Time: 65-75 Days',
    ingredients: '100% Organic, non-GMO heirloom cherry tomato seeds. Chemically untreated.',
    grow: 'Sow seeds 0.5 cm deep in lightweight potting soil. Keep moist. Transplant into vertical grow bags once seedlings have 4 true leaves. Place in full sun.',
    reviews: [
      { id: '1', author: 'Anil K.', rating: 5, comment: '90% of seeds sprouted within 4 days! Extremely happy with the results on my balcony.', verified: true },
      { id: '2', author: 'Rekha M.', rating: 4, comment: 'Slightly slow growth initially, but the yields have been very sweet and abundant.', verified: true }
    ]
  },
  'lightweight-potting-soil': {
    id: 'var_soil_1',
    productId: 'prod_soil_1',
    name: 'Lightweight Premium Potting Soil (5 kg)',
    category: 'fertilizers',
    price: 399,
    rating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80'
    ],
    sku: 'SOIL-LT-5KG',
    stock: 20,
    desc: 'An expert-grade growing medium designed specifically for terrace gardens. Enriched with organic coco-peat, vermicompost, perlite, and essential mycorrhizae. Reduced weight avoids structural load on rooftops.',
    specs: 'Weight: 5 kg | Composition: Coco Peat (50%), Compost (40%), Perlite & Mycorrhizae (10%) | Density: ultra-light',
    ingredients: 'Premium coco-peat, leaf compost, red soil trace, vermicompost, beneficial soil microbes.',
    grow: 'Ready to use. Simply fill your grow bags or containers, sow seeds or transplant seedlings directly, and water moderately.',
    reviews: [
      { id: '1', author: 'Suresh B.', rating: 5, comment: 'Unlike heavy red mud, this soil stays fluffy and lightweight even when wet. A must-have for roof gardening.', verified: true }
    ]
  }
};

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = dbProducts[slug] || dbProducts['cherry-tomato-seeds']; // fallback to cherry-tomato for display

  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [pincode, setPincode] = useState('');
  const [shippingEstimate, setShippingEstimate] = useState<any>(null);
  const [checkingShipping, setCheckingShipping] = useState(false);

  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const inWish = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      productId: product.productId,
      name: product.name,
      price: product.price,
      sku: product.sku,
      image: product.images[0]
    }, quantity);
  };

  const handleCheckShipping = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length !== 6) return;
    setCheckingShipping(true);
    const est = await calculateShippingRates({ deliveryPincode: pincode, weightInKG: 0.5, subtotal: product.price });
    setShippingEstimate(est);
    setCheckingShipping(false);
  };

  return (
    <div className="min-h-screen bg-warm-white py-16 px-4 sm:px-6 lg:px-12 relative z-10 font-alt">
      <div className="w-full space-y-12">
        
        {/* Breadcrumb */}
        <div className="text-xs text-stone-500 font-semibold space-x-2">
          <Link href="/shop" className="hover:underline hover:text-forest">Shop</Link>
          <span>/</span>
          <span className="text-brown">{product.name}</span>
        </div>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left - Gallery */}
          <div className="space-y-4">
            <div className="h-[400px] sm:h-[500px] border border-stone/30 rounded-xl overflow-hidden bg-white shadow-2xs">
              <img src={activeImage} alt={product.name} className="w-full h-full object-cover transition-all duration-300" />
            </div>
            <div className="flex gap-4">
              {product.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`h-20 w-20 rounded-md border overflow-hidden bg-white ${
                    activeImage === img ? 'border-forest ring-2 ring-forest/20' : 'border-stone/30 hover:border-forest'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Product configuration */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-brown uppercase tracking-wider">{product.category}</span>
              <h1 className="text-3xl sm:text-4xl font-serif text-forest tracking-tight">{product.name}</h1>
              <div className="flex items-center gap-2 text-xs font-semibold text-charcoal/80">
                <span>★ {product.rating}</span>
                <span className="text-stone-400">|</span>
                <span>SKU: {product.sku}</span>
                <span className="text-stone-400">|</span>
                <span className={product.stock > 5 ? 'text-forest' : 'text-terracotta'}>
                  {product.stock > 5 ? 'In Stock' : `Low Stock: ${product.stock} left`}
                </span>
              </div>
            </div>

            <div className="text-2xl font-bold text-forest">₹{product.price.toFixed(2)}</div>
            <p className="text-sm text-charcoal/80 leading-relaxed">{product.desc}</p>

            {/* Actions Panel */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-stone/30">
              <div className="flex items-center border border-stone/30 rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-charcoal hover:bg-stone/10"
                >
                  -
                </button>
                <span className="px-4 font-bold text-sm text-charcoal">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-charcoal hover:bg-stone/10"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 min-w-[200px] flex items-center justify-center gap-2 bg-forest hover:bg-moss text-warm-white py-3.5 rounded-md font-medium text-sm transition-all duration-300 shadow-md hover:translate-y-[-1px]"
              >
                <ShoppingBag className="h-4 w-4" />
                Add to Cart
              </button>

              <button
                onClick={() => toggleItem({ id: product.id, name: product.name, price: product.price, image: product.images[0] })}
                className={`p-3.5 rounded-md border shadow-2xs transition-colors duration-200 ${
                  inWish ? 'bg-terracotta border-terracotta text-white' : 'bg-white border-stone/30 text-stone-400 hover:text-terracotta'
                }`}
                aria-label="Toggle Wishlist"
              >
                <Heart className="h-4 w-4 fill-current" />
              </button>
            </div>

            {/* Logistics Pincode Check */}
            <form onSubmit={handleCheckShipping} className="pt-6 border-t border-stone/30 space-y-3">
              <label className="text-xs font-semibold text-charcoal flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-forest" />
                <span>Estimate Logistics Delivery (Shiprocket)</span>
              </label>
              <div className="flex gap-2 max-w-sm">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit Pincode"
                  className="flex-1 bg-white border border-stone/30 rounded-md px-3 py-2 text-xs font-semibold focus:outline-none focus:border-forest"
                  required
                />
                <button
                  type="submit"
                  disabled={checkingShipping}
                  className="bg-stone hover:bg-stone/80 text-charcoal px-4 py-2 rounded-md text-xs font-semibold transition-colors"
                >
                  Check
                </button>
              </div>
              {shippingEstimate && (
                <div className="text-xs bg-ivory border border-stone/20 p-3 rounded-md flex items-center gap-4 text-charcoal/90">
                  <div className="flex items-center gap-1"><Calendar className="h-4 w-4 text-forest" /> ETA: {shippingEstimate.eta}</div>
                  <div className="text-stone-400">|</div>
                  <div>Carrier: {shippingEstimate.carrier}</div>
                  <div className="text-stone-400">|</div>
                  <div className="font-bold text-forest">
                    {shippingEstimate.rate === 0 ? 'FREE Shipping' : `Rate: ₹${shippingEstimate.rate}`}
                  </div>
                </div>
              )}
            </form>

          </div>

        </div>

        {/* Tabs details */}
        <div className="border-t border-stone/30 pt-10">
          <div className="flex border-b border-stone/20 overflow-x-auto gap-8 pb-3">
            {[
              { id: 'description', name: 'Description' },
              { id: 'specifications', name: 'Specifications' },
              { id: 'how-to-grow', name: 'How to Grow' },
              { id: 'reviews', name: 'Reviews' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-sm font-semibold tracking-wide whitespace-nowrap pb-2 transition-colors ${
                  activeTab === tab.id ? 'border-b-2 border-forest text-forest' : 'text-stone-400 hover:text-forest'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          <div className="py-6 text-sm text-charcoal/80 leading-relaxed font-alt">
            {activeTab === 'description' && (
              <div className="space-y-4">
                <p>{product.desc}</p>
                <p className="font-bold text-forest flex items-center gap-1.5"><Sparkles className="h-4 w-4" /> Eco Benefit: {product.ingredients}</p>
              </div>
            )}
            {activeTab === 'specifications' && (
              <p>{product.specs}</p>
            )}
            {activeTab === 'how-to-grow' && (
              <div className="space-y-3 bg-ivory p-4 rounded-lg border border-stone/20">
                <h4 className="font-serif text-forest font-bold text-base flex items-center gap-1.5"><Sprout className="h-5 w-5" /> Planting Routine</h4>
                <p className="text-xs leading-relaxed">{product.grow}</p>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {product.reviews.map((r: any) => (
                  <div key={r.id} className="border-b border-stone/10 pb-4 space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-charcoal">{r.author}</span>
                      <span className="text-forest">{'★'.repeat(r.rating)}</span>
                    </div>
                    <p className="text-xs text-charcoal/80 italic">"{r.comment}"</p>
                    {r.verified && (
                      <span className="inline-block bg-forest/10 text-forest text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Verified Buyer
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Cross-Sell Recommendations */}
        <div className="border-t border-stone/30 pt-12 space-y-6">
          <h3 className="font-serif text-2xl text-forest">Frequently Bought Together</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { id: 'rec-1', name: 'Premium Coco Peat Block (1 kg)', price: 149, image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=400&q=80', slug: 'cherry-tomato-seeds' },
              { id: 'rec-2', name: 'Neem Cake Powder (1 kg)', price: 120, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80', slug: 'cherry-tomato-seeds' },
              { id: 'rec-3', name: 'Jaggery Sweets Millet Mix', price: 240, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80', slug: 'cherry-tomato-seeds' },
            ].map((rec) => (
              <div key={rec.id} className="flex gap-4 p-4 bg-white border border-stone/30 rounded-lg items-center shadow-2xs hover:shadow-xs transition-shadow">
                <img src={rec.image} alt={rec.name} className="h-16 w-16 object-cover rounded-md border border-stone/10" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-alt text-xs font-bold text-charcoal line-clamp-1">{rec.name}</h4>
                  <p className="text-xs text-forest font-semibold mt-0.5">₹{rec.price}</p>
                  <Link href={`/shop/${rec.slug}`} className="inline-flex items-center gap-0.5 text-[10px] text-brown font-bold hover:underline mt-1.5">
                    View product <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
