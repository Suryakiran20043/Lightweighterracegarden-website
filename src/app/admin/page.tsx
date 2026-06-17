'use client';

import React, { useState } from 'react';
import { LayoutDashboard, ShoppingCart, Package, Tag, Edit3, Settings, AlertTriangle, ArrowUpRight, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('analytics');

  // Low stock inventory mock data
  const inventoryItems = [
    { id: '1', name: 'Premium Cherry Tomato Seeds', sku: 'SEED-TOM-CHY', stock: 45, limit: 10, status: 'OK' },
    { id: '2', name: 'Organic Sweet Basil Seeds', sku: 'SEED-BSL-SWT', stock: 3, limit: 10, status: 'LOW' },
    { id: '3', name: 'Lightweight Premium Potting Soil (5 kg)', sku: 'SOIL-LT-5KG', stock: 20, limit: 5, status: 'OK' },
    { id: '4', name: 'Vertical Grow Bags (Set of 3)', sku: 'GROW-BAG-V3', stock: 2, limit: 5, status: 'LOW' },
  ];

  // Orders list mock data
  const [orders, setOrders] = useState([
    { id: 'ORD-887766', customer: 'Surya Kumar', total: 849, date: '2026-06-12', status: 'PAID', carrier: 'SHIPROCKET' },
    { id: 'ORD-776655', customer: 'Anil K.', total: 399, date: '2026-06-11', status: 'DELIVERED', carrier: 'BlueDart' },
    { id: 'ORD-665544', customer: 'Rekha M.', total: 1240, date: '2026-06-10', status: 'PENDING', carrier: 'None' },
  ]);

  // Coupons state
  const [coupons, setCoupons] = useState([
    { code: 'GROW10', type: 'PERCENTAGE', value: 10, maxUses: 100, active: true },
    { code: 'ROOFGARDEN50', type: 'FIXED', value: 50, maxUses: 50, active: true },
  ]);

  const [newCoupon, setNewCoupon] = useState({ code: '', type: 'PERCENTAGE', value: 10, maxUses: 100 });

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCoupon.code) return;
    setCoupons((prev) => [...prev, { ...newCoupon, code: newCoupon.code.toUpperCase(), active: true }]);
    setNewCoupon({ code: '', type: 'PERCENTAGE', value: 10, maxUses: 100 });
  };

  const updateOrderStatus = (orderId: string, status: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status, carrier: status === 'SHIPPED' ? 'SHIPROCKET' : o.carrier } : o))
    );
  };

  return (
    <div className="min-h-screen bg-warm-white py-12 px-4 sm:px-6 lg:px-12 z-10 relative font-alt">
      <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Left - Navigation */}
        <div className="bg-white border border-stone/30 rounded-xl p-6 shadow-2xs space-y-6">
          <div className="border-b border-stone/20 pb-4">
            <h3 className="font-serif text-base text-forest font-bold leading-none">Terrace Admin</h3>
            <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider mt-1.5 inline-block">
              Role: System Administrator
            </span>
          </div>

          <nav className="flex flex-col gap-2">
            {[
              { id: 'analytics', name: 'Dashboard Analytics', icon: LayoutDashboard },
              { id: 'orders', name: 'Order Management', icon: ShoppingCart },
              { id: 'inventory', name: 'Inventory & Stock Alerts', icon: Package },
              { id: 'coupons', name: 'Coupons Manager', icon: Tag },
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

        {/* Right - Console Screen */}
        <div className="lg:col-span-3 bg-white border border-stone/30 rounded-xl p-6 sm:p-8 shadow-2xs min-h-[400px]">
          
          {/* Tab 1 - Analytics */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-forest">Live Store Analytics</h2>
              
              {/* Analytics Metric Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-ivory border border-stone/20 p-5 rounded-xl space-y-1.5">
                  <span className="text-xs font-semibold text-stone-500 flex justify-between">Total Sales <TrendingUp className="h-4 w-4 text-forest" /></span>
                  <p className="text-2xl font-bold text-forest">₹1,24,980.00</p>
                  <p className="text-[10px] text-forest font-semibold">+14.2% since yesterday</p>
                </div>
                <div className="bg-ivory border border-stone/20 p-5 rounded-xl space-y-1.5">
                  <span className="text-xs font-semibold text-stone-500 flex justify-between">Total Orders <ArrowUpRight className="h-4 w-4 text-forest" /></span>
                  <p className="text-2xl font-bold text-forest">148 orders</p>
                  <p className="text-[10px] text-forest font-semibold">+8% conversion rate spike</p>
                </div>
                <div className="bg-ivory border border-stone/20 p-5 rounded-xl space-y-1.5">
                  <span className="text-xs font-semibold text-stone-500">Logistics Cost</span>
                  <p className="text-2xl font-bold text-forest">₹8,920.00</p>
                  <p className="text-[10px] text-stone-400">92% delivered via Shiprocket</p>
                </div>
              </div>

              {/* Performance description */}
              <p className="text-xs leading-relaxed text-charcoal/80 bg-stone/10 p-4 rounded-lg border border-stone/20">
                <strong>CRO Insight:</strong> Page load times (LCP) are averaging 1.8 seconds. High conversion rates (8.4%) are strongly correlated with the Lightweight Terrace category.
              </p>
            </div>
          )}

          {/* Tab 2 - Orders Management */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-forest">Order Management</h2>
              <div className="bg-ivory border border-stone/20 rounded-xl overflow-hidden text-xs">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-stone/20 border-b border-stone/30">
                      <th className="p-3 text-left">Order ID</th>
                      <th className="p-3 text-left">Customer</th>
                      <th className="p-3 text-left">Date</th>
                      <th className="p-3 text-left">Carrier</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id} className="border-b border-stone/10 last:border-0 hover:bg-stone/5">
                        <td className="p-3 font-semibold text-forest">{o.id}</td>
                        <td className="p-3 text-charcoal">{o.customer}</td>
                        <td className="p-3 text-stone-500">{o.date}</td>
                        <td className="p-3 text-stone-500">{o.carrier}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px] ${
                            o.status === 'DELIVERED' ? 'bg-forest/10 text-forest' :
                            o.status === 'PAID' ? 'bg-forest/20 text-forest' : 'bg-terracotta/20 text-terracotta'
                          }`}>
                            {o.status}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-1.5">
                          {o.status === 'PAID' && (
                            <button
                              onClick={() => updateOrderStatus(o.id, 'SHIPPED')}
                              className="bg-forest hover:bg-moss text-warm-white px-2 py-1 rounded text-[10px] font-semibold transition-colors"
                            >
                              Ship (Shiprocket AWB)
                            </button>
                          )}
                          {o.status === 'PENDING' && (
                            <button
                              onClick={() => updateOrderStatus(o.id, 'PAID')}
                              className="bg-stone hover:bg-stone/80 text-charcoal px-2 py-1 rounded text-[10px] font-semibold transition-colors"
                            >
                              Mark Paid
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3 - Inventory Alerts */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-forest flex items-center gap-2">
                Inventory & Stock Controls
              </h2>
              <div className="bg-ivory border border-stone/20 rounded-xl overflow-hidden text-xs">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-stone/20 border-b border-stone/30">
                      <th className="p-3 text-left">SKU</th>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-center">Stock</th>
                      <th className="p-3 text-center">Limit</th>
                      <th className="p-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryItems.map((item) => (
                      <tr key={item.id} className="border-b border-stone/10 last:border-0 hover:bg-stone/5">
                        <td className="p-3 font-semibold text-stone-500">{item.sku}</td>
                        <td className="p-3 text-charcoal">{item.name}</td>
                        <td className="p-3 text-center font-bold">{item.stock}</td>
                        <td className="p-3 text-center text-stone-400">{item.limit}</td>
                        <td className="p-3 text-right">
                          {item.status === 'LOW' ? (
                            <span className="inline-flex items-center gap-1 bg-terracotta/15 text-terracotta px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-[9px] animate-pulse">
                              <AlertTriangle className="h-3 w-3" /> Low Stock
                            </span>
                          ) : (
                            <span className="bg-forest/10 text-forest px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-[9px]">
                              In Stock
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 4 - Coupons Manager */}
          {activeTab === 'coupons' && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-forest">Coupons Manager</h2>
              
              {/* Create Coupon form */}
              <form onSubmit={handleCreateCoupon} className="bg-ivory border border-stone/20 p-4 rounded-xl grid grid-cols-1 sm:grid-cols-4 gap-4 items-end text-xs font-semibold">
                <div className="space-y-1">
                  <label className="text-stone-500">Coupon Code</label>
                  <input
                    type="text"
                    placeholder="e.g. BALCONY20"
                    value={newCoupon.code}
                    onChange={(e) => setNewCoupon((prev) => ({ ...prev, code: e.target.value }))}
                    className="w-full bg-white border border-stone/30 rounded-md px-3 py-2 focus:outline-none focus:border-forest"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-stone-500">Discount Type</label>
                  <select
                    value={newCoupon.type}
                    onChange={(e) => setNewCoupon((prev) => ({ ...prev, type: e.target.value }))}
                    className="w-full bg-white border border-stone/30 rounded-md px-3 py-2 focus:outline-none focus:border-forest"
                  >
                    <option value="PERCENTAGE">Percentage (%)</option>
                    <option value="FIXED">Fixed Amount (₹)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-stone-500">Value</label>
                  <input
                    type="number"
                    value={newCoupon.value}
                    onChange={(e) => setNewCoupon((prev) => ({ ...prev, value: parseInt(e.target.value) || 0 }))}
                    className="w-full bg-white border border-stone/30 rounded-md px-3 py-2 focus:outline-none focus:border-forest"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-forest hover:bg-moss text-warm-white py-2 rounded-md font-bold text-xs transition-colors"
                >
                  Create Coupon
                </button>
              </form>

              {/* Coupons List */}
              <div className="space-y-3">
                {coupons.map((c) => (
                  <div key={c.code} className="flex justify-between items-center p-3 border border-stone/30 rounded-lg text-xs bg-white shadow-2xs">
                    <div>
                      <span className="font-bold text-forest">{c.code}</span>
                      <span className="text-stone-400 mx-2">|</span>
                      <span className="text-stone-500">{c.type === 'PERCENTAGE' ? `${c.value}% Off` : `₹${c.value} Off`}</span>
                    </div>
                    <span className="bg-forest/10 text-forest px-2.5 py-0.5 rounded-full font-bold uppercase text-[9px]">
                      Active
                    </span>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
