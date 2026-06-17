'use client';

import React, { useState } from 'react';
import { useWishlistStore } from '@/lib/store/wishlist';
import { useCartStore } from '@/lib/store/cart';
import { User, ClipboardList, Heart, Gift, Award, Share2, LogOut, ArrowRight, Trash2, ShoppingBag } from 'lucide-react';

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const { items: wishlistItems, removeItem: removeWishItem } = useWishlistStore();
  const { addItem } = useCartStore();

  const userProfile = {
    name: 'Surya Kumar',
    email: 'surya.kumar@gmail.com',
    role: 'Loyal Grower',
    memberSince: 'June 2026',
    points: 340,
    referralCode: 'SURYA340',
  };

  const pastOrders = [
    {
      id: 'ORD-887766',
      date: '2026-06-12',
      total: 849,
      status: 'Shipped',
      carrier: 'SHIPROCKET (Delhivery)',
      trackingNumber: 'AWB-8822339900',
      items: '1 x Lightweight Potting Soil Mix (5kg), 2 x Organic Sweet Basil Seeds',
    },
    {
      id: 'ORD-776655',
      date: '2026-05-15',
      total: 399,
      status: 'Delivered',
      carrier: 'SHIPROCKET (BlueDart)',
      trackingNumber: 'AWB-7711228800',
      items: '1 x Premium Cherry Tomato Seeds, 1 x Coco Peat Block (1kg)',
    },
  ];

  const pointsHistory = [
    { id: '1', date: '2026-06-12', points: +80, desc: 'Earned 10% points on order #ORD-887766' },
    { id: '2', date: '2026-06-02', points: +100, desc: 'Bonus points for first referral signup' },
    { id: '3', date: '2026-05-15', points: +40, desc: 'Earned 10% points on order #ORD-776655' },
    { id: '4', date: '2026-05-10', points: +120, desc: 'Profile completion bonus' },
  ];

  return (
    <div className="min-h-screen bg-warm-white py-12 px-4 sm:px-6 lg:px-12 z-10 relative font-alt">
      <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Left - Navigation Sidebar */}
        <div className="bg-white border border-stone/30 rounded-xl p-6 shadow-2xs space-y-6">
          <div className="flex items-center gap-3 border-b border-stone/20 pb-4">
            <div className="p-3 bg-forest/15 rounded-full text-forest">
              <User className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-serif text-base text-forest leading-none">{userProfile.name}</h3>
              <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider mt-1.5 inline-block">
                {userProfile.role}
              </span>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            {[
              { id: 'overview', name: 'Overview', icon: Award },
              { id: 'orders', name: 'My Orders', icon: ClipboardList },
              { id: 'wishlist', name: 'Wishlist', icon: Heart },
              { id: 'rewards', name: 'Reward Points', icon: Gift },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    activeTab === tab.id
                      ? 'bg-forest text-warm-white'
                      : 'text-charcoal hover:bg-stone/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right - Tabs Content Display */}
        <div className="lg:col-span-3 bg-white border border-stone/30 rounded-xl p-6 sm:p-8 shadow-2xs min-h-[400px]">
          
          {/* Tab 1 - Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-forest">Grower Dashboard Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Reward Points widget */}
                <div className="bg-ivory border border-stone/20 p-5 rounded-xl flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-semibold text-stone-500">Total Reward Points</h4>
                    <p className="text-3xl font-serif text-forest mt-1.5 font-bold">{userProfile.points} pts</p>
                  </div>
                  <Gift className="h-10 w-10 text-brown opacity-80" />
                </div>

                {/* Referral Code widget */}
                <div className="bg-ivory border border-stone/20 p-5 rounded-xl flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-semibold text-stone-500">Referral Code</h4>
                    <p className="text-xl font-bold text-forest mt-2 uppercase tracking-widest">{userProfile.referralCode}</p>
                  </div>
                  <Share2 className="h-10 w-10 text-brown opacity-80" />
                </div>

              </div>

              {/* Quick stats */}
              <div className="space-y-2 text-xs text-charcoal/80">
                <p><strong>Member Since:</strong> {userProfile.memberSince}</p>
                <p><strong>Tier Status:</strong> Level 2 (Silver Sprout). Grow bags purchases get free vermicompost bonuses.</p>
              </div>
            </div>
          )}

          {/* Tab 2 - Orders */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-forest">My Logistics & Orders</h2>
              <div className="space-y-4">
                {pastOrders.map((order) => (
                  <div key={order.id} className="border border-stone/30 p-4 rounded-xl text-xs space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-forest">#{order.id}</span>
                      <span className="bg-forest/10 text-forest px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">{order.status}</span>
                    </div>
                    <p className="text-stone-500">{order.items}</p>
                    <div className="pt-2 border-t border-stone/10 flex justify-between items-center flex-wrap gap-2 text-stone-500">
                      <span><strong>Date:</strong> {order.date}</span>
                      <span><strong>Carrier:</strong> {order.carrier}</span>
                      <span><strong>Tracking:</strong> {order.trackingNumber}</span>
                      <span className="font-bold text-forest text-sm">₹{order.total}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3 - Wishlist */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-forest">My Wishlist</h2>
              {wishlistItems.length === 0 ? (
                <p className="text-stone-500 text-xs text-center py-12">No items in your wishlist.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-3 border border-stone/20 rounded-lg items-center bg-warm-white">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="h-12 w-12 object-cover rounded-md" />
                      ) : (
                        <div className="h-12 w-12 bg-stone/20 rounded-md flex items-center justify-center text-forest"><ShoppingBag className="h-5 w-5" /></div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-charcoal truncate text-xs">{item.name}</p>
                        <p className="text-forest font-bold text-xs mt-0.5">₹{item.price}</p>
                      </div>
                      <button
                        onClick={() => addItem({ id: item.id, productId: 'prod_1', name: item.name, price: item.price, sku: 'MOCK-SKU', image: item.image })}
                        className="p-1.5 bg-forest hover:bg-moss text-warm-white rounded-md transition-colors"
                        aria-label="Add to Cart"
                      >
                        <ShoppingBag className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => removeWishItem(item.id)}
                        className="text-stone-400 hover:text-terracotta transition-colors"
                        aria-label="Remove"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 4 - Reward Points ledger */}
          {activeTab === 'rewards' && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-forest">Reward Points Ledger</h2>
              <div className="bg-ivory border border-stone/20 rounded-xl overflow-hidden text-xs">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-stone/20 border-b border-stone/30">
                      <th className="p-3 text-left">Date</th>
                      <th className="p-3 text-left">Description</th>
                      <th className="p-3 text-right">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pointsHistory.map((item) => (
                      <tr key={item.id} className="border-b border-stone/10 last:border-0 hover:bg-stone/5">
                        <td className="p-3 text-stone-500 font-semibold">{item.date}</td>
                        <td className="p-3 text-charcoal">{item.desc}</td>
                        <td className="p-3 text-right font-bold text-forest">{item.points > 0 ? `+${item.points}` : item.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
