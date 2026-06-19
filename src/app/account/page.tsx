'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  User, 
  Package, 
  MapPin, 
  Settings, 
  LogOut, 
  ChevronRight, 
  ShoppingBag,
  Heart
} from 'lucide-react';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans pb-24">
      {/* Premium Breadcrumb */}
      <div className="w-full bg-[#F8F8F8] py-[15px] border-b border-gray-200">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center gap-2 text-sm font-medium text-gray-500">
          <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900">My Account</span>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 pt-12">
        
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-serif text-[#1A1A1A] mb-3">My Account</h1>
          <p className="text-gray-500 text-lg">Manage your orders, addresses, and profile details.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* Left Sidebar Navigation */}
          <aside className="w-full lg:w-72 shrink-0">
            <nav className="flex flex-col space-y-2">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-3 px-5 py-4 rounded-xl text-left transition-all font-semibold ${activeTab === 'dashboard' ? 'bg-[#E8F5E9] text-[#1B5E20]' : 'text-gray-600 hover:bg-white hover:shadow-sm'}`}
              >
                <User className="w-5 h-5" /> Dashboard
              </button>
              <button 
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-3 px-5 py-4 rounded-xl text-left transition-all font-semibold ${activeTab === 'orders' ? 'bg-[#E8F5E9] text-[#1B5E20]' : 'text-gray-600 hover:bg-white hover:shadow-sm'}`}
              >
                <Package className="w-5 h-5" /> Order History
              </button>
              <button 
                onClick={() => setActiveTab('addresses')}
                className={`flex items-center gap-3 px-5 py-4 rounded-xl text-left transition-all font-semibold ${activeTab === 'addresses' ? 'bg-[#E8F5E9] text-[#1B5E20]' : 'text-gray-600 hover:bg-white hover:shadow-sm'}`}
              >
                <MapPin className="w-5 h-5" /> Saved Addresses
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-3 px-5 py-4 rounded-xl text-left transition-all font-semibold ${activeTab === 'settings' ? 'bg-[#E8F5E9] text-[#1B5E20]' : 'text-gray-600 hover:bg-white hover:shadow-sm'}`}
              >
                <Settings className="w-5 h-5" /> Account Settings
              </button>
              <button 
                className="flex items-center gap-3 px-5 py-4 rounded-xl text-left transition-all font-semibold text-red-600 hover:bg-red-50 mt-4"
              >
                <LogOut className="w-5 h-5" /> Log Out
              </button>
            </nav>
          </aside>

          {/* Right Content Area */}
          <main className="flex-1">
            
            {/* 1. Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <h2 className="text-2xl font-serif text-[#1A1A1A] mb-2">Welcome back, Surya!</h2>
                    <p className="text-gray-500">From here you can view your recent orders and update your account info.</p>
                  </div>
                  <div className="w-16 h-16 bg-[#4CAF50] rounded-full flex items-center justify-center text-white text-2xl font-serif shadow-lg shrink-0">
                    S
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('orders')}>
                    <div className="p-4 bg-[#F8FDF9] rounded-xl text-[#2E7D32]">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1A1A1A]">Recent Orders</h3>
                      <p className="text-sm text-gray-500 mt-1">You have 1 order in transit</p>
                    </div>
                  </div>
                  <Link href="/shop" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow">
                    <div className="p-4 bg-orange-50 rounded-xl text-orange-600">
                      <Heart className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1A1A1A]">Continue Shopping</h3>
                      <p className="text-sm text-gray-500 mt-1">Discover new organic arrivals</p>
                    </div>
                  </Link>
                </div>
              </div>
            )}

            {/* 2. Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-2xl font-serif text-[#1A1A1A]">Order History</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#F8F8F8] text-sm text-gray-500 uppercase tracking-wider">
                        <th className="px-6 py-4 font-semibold">Order ID</th>
                        <th className="px-6 py-4 font-semibold">Date</th>
                        <th className="px-6 py-4 font-semibold">Total</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                        <th className="px-6 py-4 font-semibold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-5 font-bold text-[#1A1A1A]">#TGO-8492</td>
                        <td className="px-6 py-5 text-gray-500">June 14, 2026</td>
                        <td className="px-6 py-5 font-bold">₹1,240.00</td>
                        <td className="px-6 py-5">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">In Transit</span>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <button className="text-[#2E7D32] font-semibold hover:underline">Track</button>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-5 font-bold text-[#1A1A1A]">#TGO-8104</td>
                        <td className="px-6 py-5 text-gray-500">May 02, 2026</td>
                        <td className="px-6 py-5 font-bold">₹890.00</td>
                        <td className="px-6 py-5">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">Delivered</span>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <button className="text-[#2E7D32] font-semibold hover:underline">Invoice</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-serif text-[#1A1A1A]">Saved Addresses</h2>
                  <button className="bg-[#2E7D32] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md hover:bg-[#1B5E20] transition-colors">
                    Add New Address
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Address Card */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#4CAF50] relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-[#4CAF50] text-white text-xs font-bold px-3 py-1 rounded-bl-xl">DEFAULT</div>
                    <h3 className="font-bold text-[#1A1A1A] text-lg mb-2">Home</h3>
                    <div className="text-gray-500 space-y-1 mb-6">
                      <p>Surya</p>
                      <p>Venkampet, Rajanna Sircilla</p>
                      <p>Telangana, 505301</p>
                      <p>India</p>
                      <p className="pt-2">Phone: +91 73860 38056</p>
                    </div>
                    <div className="flex gap-4">
                      <button className="text-[#2E7D32] font-semibold hover:underline">Edit</button>
                      <button className="text-red-600 font-semibold hover:underline">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-serif text-[#1A1A1A] mb-8">Account Settings</h2>
                <form className="max-w-xl space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">First Name</label>
                      <input type="text" defaultValue="Surya" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#4CAF50] focus:ring-1 focus:ring-[#4CAF50] transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Last Name</label>
                      <input type="text" defaultValue="" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#4CAF50] focus:ring-1 focus:ring-[#4CAF50] transition-colors" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Email Address</label>
                    <input type="email" defaultValue="surya@example.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#4CAF50] focus:ring-1 focus:ring-[#4CAF50] transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Phone Number</label>
                    <input type="tel" defaultValue="+91 73860 38056" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#4CAF50] focus:ring-1 focus:ring-[#4CAF50] transition-colors" />
                  </div>
                  <div className="pt-4">
                    <button type="submit" className="bg-[#1A1A1A] text-white px-8 py-3.5 rounded-xl font-bold shadow-md hover:bg-[#333] transition-colors">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}
