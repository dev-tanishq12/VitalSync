"use client";

import { useState } from "react";
import Link from "next/link";

export default function SettingsPage() {
  const [appearance, setAppearance] = useState("dark");
  
  return (
    <div className="bg-[#0b1326] text-[#dae2fd] font-['Inter'] min-h-screen overflow-x-hidden selection:bg-[#adc6ff]/30">
      <style dangerouslySetInnerHTML={{ __html: `
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            vertical-align: middle;
        }
        .glass-card {
            background: rgba(30, 41, 59, 0.6);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .sunken-glass {
            background: rgba(11, 19, 38, 0.4);
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #0b1326; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #2d3449; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #424754; }
      `}} />

      {/* TopNavBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-10 h-20 bg-[#171f33]/60 backdrop-blur-xl border-b border-white/10 shadow-md shadow-[#adc6ff]/10">
        <div className="flex items-center gap-12">
          <h1 className="font-['Plus_Jakarta_Sans'] text-[24px] md:text-[32px] font-bold text-[#adc6ff]">VitalSync</h1>
          <div className="hidden md:flex items-center gap-2">
            <div className="sunken-glass rounded-full px-4 py-2 flex items-center gap-2 w-80">
              <span className="material-symbols-outlined text-[#8c909f]">search</span>
              <input className="bg-transparent border-none focus:ring-0 font-['Inter'] text-[14px] w-full placeholder:text-[#424754] outline-none" placeholder="Global system search..." type="text" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-[#adc6ff] text-[24px] hover:bg-white/5 p-2 rounded-full transition-colors active:scale-95">notifications</button>
          <button className="material-symbols-outlined text-[#adc6ff] text-[24px] hover:bg-white/5 p-2 rounded-full transition-colors active:scale-95">sync</button>
          <button className="material-symbols-outlined text-[#adc6ff] text-[24px] hover:bg-white/5 p-2 rounded-full transition-colors active:scale-95">add_circle</button>
          <div className="w-10 h-10 rounded-full border-2 border-[#adc6ff] overflow-hidden ml-2 shadow-lg shadow-[#adc6ff]/20 hidden md:block">
            <img alt="User Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiX3_DnTHvjaEGQdTPTDxfiJrdyQ4uMgmBUCKFQJ5nETAcrQYaVdk39KIDYCo7NzHaoJdDujtUTf6FFYt_9xmiDfk00vJ3kgwg8u0TuN58wnS251SxQ-NK15g3ztaavAc4OdYf78AETeFxjnqGQVN3CkJdzBn0v0rXm14OkMBFlMdvkQDRa_NF59MvYSvHTiA9QKeUK5VhuboteqLbaEzhPP_czII5jlSqDGSDaz8yyIwEy4DUlVWjXY0QOv8IK8IMo4dWMaOmBbka" />
          </div>
        </div>
      </header>

      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full flex flex-col pt-20 pb-8 w-64 bg-[#131b2e]/60 backdrop-blur-xl border-r border-white/10 shadow-xl shadow-black/20 z-40 hidden lg:flex">
        <div className="px-6 py-6 border-b border-white/5 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#adc6ff] flex items-center justify-center text-[#002e6a]">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>vital_signs</span>
            </div>
            <div>
              <div className="font-['Plus_Jakarta_Sans'] text-[14px] font-extrabold text-[#adc6ff]">VitalSync</div>
              <div className="text-[10px] uppercase tracking-widest text-[#8c909f]">Elite Health Optimizer</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-1 custom-scrollbar overflow-y-auto">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-['Inter'] text-[14px]">Dashboard</span>
          </Link>
          <Link href="/insights" className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5">
            <span className="material-symbols-outlined">insights</span>
            <span className="font-['Inter'] text-[14px]">Analytics</span>
          </Link>
          <Link href="/goals" className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5">
            <span className="material-symbols-outlined">target</span>
            <span className="font-['Inter'] text-[14px]">Goals</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5">
            <span className="material-symbols-outlined">folder_shared</span>
            <span className="font-['Inter'] text-[14px]">Health Records</span>
          </Link>
          <Link href="/gamified" className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5">
            <span className="material-symbols-outlined">emoji_events</span>
            <span className="font-['Inter'] text-[14px]">Challenges</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5">
            <span className="material-symbols-outlined">military_tech</span>
            <span className="font-['Inter'] text-[14px]">Achievements</span>
          </Link>
          <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5">
            <span className="material-symbols-outlined">devices</span>
            <span className="font-['Inter'] text-[14px]">Devices</span>
          </Link>
          <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5">
            <span className="material-symbols-outlined">person</span>
            <span className="font-['Inter'] text-[14px]">Profile</span>
          </Link>
          <Link href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 bg-[#adc6ff]/20 text-[#adc6ff] border-l-4 border-[#adc6ff]">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>settings</span>
            <span className="font-['Inter'] text-[14px]">Settings</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5">
            <span className="material-symbols-outlined">admin_panel_settings</span>
            <span className="font-['Inter'] text-[14px]">Admin</span>
          </Link>
        </nav>
        <div className="px-4 mt-auto space-y-1">
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5">
            <span className="material-symbols-outlined">help</span>
            <span className="font-['Inter'] text-[14px]">Help</span>
          </Link>
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-[#ffb4ab]/80 hover:text-[#ffb4ab] hover:bg-[#ffb4ab]/10">
            <span className="material-symbols-outlined">logout</span>
            <span className="font-['Inter'] text-[14px]">Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Canvas */}
      <main className="lg:ml-64 pt-20 px-4 md:px-10 min-h-screen pb-16">
        <div className="max-w-7xl mx-auto py-10">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="font-['Plus_Jakarta_Sans'] text-[48px] font-bold text-[#adc6ff] mb-2">System Management</h2>
              <p className="text-[#c2c6d6] font-['Inter'] text-[18px] max-w-2xl">Configure your personalized health ecosystem and monitor global platform performance through the integrated VitalSync hub.</p>
            </div>
            <div className="flex gap-4">
              <button className="bg-[#2d3449]/20 hover:bg-[#2d3449]/40 border border-white/10 px-6 py-3 rounded-xl font-['Inter'] text-[14px] font-semibold transition-all active:scale-95">Discard Changes</button>
              <button className="bg-[#adc6ff] text-[#002e6a] shadow-lg shadow-[#adc6ff]/30 px-8 py-3 rounded-xl font-['Inter'] text-[14px] font-bold transition-all hover:brightness-110 active:scale-95">Save System Config</button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Settings Groups */}
            <div className="lg:col-span-4 space-y-6">
              {/* Navigation Shortcuts */}
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold text-[#adc6ff] mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined">tune</span> Configuration
                </h3>
                <div className="space-y-1">
                  <button className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 text-[#adc6ff]">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined">notifications</span>
                      <span className="font-['Inter'] text-[14px] font-semibold">Notifications</span>
                    </div>
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors text-[#c2c6d6]">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined">shield</span>
                      <span className="font-['Inter'] text-[14px] font-semibold">Privacy & Security</span>
                    </div>
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors text-[#c2c6d6]">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined">database</span>
                      <span className="font-['Inter'] text-[14px] font-semibold">Data Management</span>
                    </div>
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors text-[#c2c6d6]">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined">palette</span>
                      <span className="font-['Inter'] text-[14px] font-semibold">Appearance</span>
                    </div>
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                </div>
              </div>

              {/* Appearance Toggles */}
              <div className="glass-card rounded-xl p-6">
                <h4 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#8c909f] mb-4">Appearance</h4>
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={() => setAppearance("dark")}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${appearance === "dark" ? "sunken-glass border border-[#adc6ff]/40 text-[#adc6ff]" : "glass-card hover:bg-white/5 text-[#c2c6d6]"}`}>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: appearance === "dark" ? "'FILL' 1" : "'FILL' 0" }}>dark_mode</span>
                    <span className="text-[12px] font-semibold">Dark</span>
                  </button>
                  <button 
                    onClick={() => setAppearance("light")}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${appearance === "light" ? "sunken-glass border border-[#adc6ff]/40 text-[#adc6ff]" : "glass-card hover:bg-white/5 text-[#c2c6d6]"}`}>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: appearance === "light" ? "'FILL' 1" : "'FILL' 0" }}>light_mode</span>
                    <span className="text-[12px] font-semibold">Light</span>
                  </button>
                  <button 
                    onClick={() => setAppearance("system")}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${appearance === "system" ? "sunken-glass border border-[#adc6ff]/40 text-[#adc6ff]" : "glass-card hover:bg-white/5 text-[#c2c6d6]"}`}>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: appearance === "system" ? "'FILL' 1" : "'FILL' 0" }}>settings_suggest</span>
                    <span className="text-[12px] font-semibold">System</span>
                  </button>
                </div>
              </div>

              {/* Help & Support Banner */}
              <div className="relative overflow-hidden rounded-xl h-48 group">
                <img alt="Medical Lab" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8D3iUq9babRMF3vtCJN0JDD-yIYVGJj3B7Y3-O0CABFMRDwaLnvI_r8vuIN6XwvsFPcR_2t18hkYf8K1B2WMXLMUnOfwNrCGDcjUIg7FGZGWQkJ-jlfP2SIHGWZL1SSwPk5vO8zzkad5YKMVE19859u95Q2ve9YoF5gk4H7UqkKQDuryQHbOg0BFHLKvSyheJYROHu82X8tqZ_3lnGweACfN8WQcBS9v5luHs2kNxXM9lhELUvs2jl5qkVAL30k-tRPRQ1rA8bjvL" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-['Inter'] text-[14px] font-semibold text-white mb-2">Need assistance with your sync?</p>
                  <button className="w-full py-2 bg-[#4edea3] text-[#003824] rounded-lg font-bold text-[12px] hover:brightness-110 transition-all">Contact Expert Staff</button>
                </div>
              </div>
            </div>

            {/* Right Column: Dashboard & Details */}
            <div className="lg:col-span-8 space-y-6">
              {/* Admin Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card rounded-xl p-8 flex items-center justify-between">
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-wider text-[#8c909f] mb-1">Active Users</p>
                    <h3 className="font-['Plus_Jakarta_Sans'] text-[48px] font-bold text-[#adc6ff]">12.4k</h3>
                    <p className="text-[#4edea3] text-[12px] font-semibold flex items-center gap-1 mt-2">
                      <span className="material-symbols-outlined text-[14px]">trending_up</span> +14.2%
                    </p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-[#adc6ff]/10 flex items-center justify-center text-[#adc6ff]">
                    <span className="material-symbols-outlined text-[24px]">group</span>
                  </div>
                </div>
                <div className="glass-card rounded-xl p-8 flex items-center justify-between">
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-wider text-[#8c909f] mb-1">Device Connections</p>
                    <h3 className="font-['Plus_Jakarta_Sans'] text-[48px] font-bold text-[#4edea3]">98.2%</h3>
                    <p className="text-[#4edea3] text-[12px] font-semibold flex items-center gap-1 mt-2">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span> Stable
                    </p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-[#4edea3]/10 flex items-center justify-center text-[#4edea3]">
                    <span className="material-symbols-outlined text-[24px]">watch</span>
                  </div>
                </div>
                <div className="glass-card rounded-xl p-8 flex items-center justify-between">
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-wider text-[#8c909f] mb-1">Sync Latency</p>
                    <h3 className="font-['Plus_Jakarta_Sans'] text-[48px] font-bold text-[#d0bcff]">42ms</h3>
                    <p className="text-[#4edea3] text-[12px] font-semibold flex items-center gap-1 mt-2">
                      <span className="material-symbols-outlined text-[14px]">bolt</span> Optimized
                    </p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-[#d0bcff]/10 flex items-center justify-center text-[#d0bcff]">
                    <span className="material-symbols-outlined text-[24px]">cloud_sync</span>
                  </div>
                </div>
              </div>

              {/* Settings Detail: Notifications */}
              <div className="glass-card rounded-xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold text-[#dae2fd]">Notification Preferences</h3>
                    <p className="font-['Inter'] text-[14px] font-medium text-[#8c909f]">Manage how and when you receive biometric updates.</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-xl sunken-glass">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-[#adc6ff]/10 rounded-lg text-[#adc6ff]">
                        <span className="material-symbols-outlined">smart_toy</span>
                      </div>
                      <div>
                        <p className="font-['Inter'] text-[14px] font-semibold text-[#dae2fd]">AI Health Insights</p>
                        <p className="text-[12px] font-semibold text-[#8c909f]">Push notifications for personalized health patterns.</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input defaultChecked className="sr-only peer" type="checkbox" />
                      <div className="w-11 h-6 bg-[#2d3449] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#adc6ff]"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-[#4edea3]/10 rounded-lg text-[#4edea3]">
                        <span className="material-symbols-outlined">mail</span>
                      </div>
                      <div>
                        <p className="font-['Inter'] text-[14px] font-semibold text-[#dae2fd]">Weekly Performance Reports</p>
                        <p className="text-[12px] font-semibold text-[#8c909f]">Detailed email summary of your weekly progress.</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input defaultChecked className="sr-only peer" type="checkbox" />
                      <div className="w-11 h-6 bg-[#2d3449] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#adc6ff]"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-[#d0bcff]/10 rounded-lg text-[#d0bcff]">
                        <span className="material-symbols-outlined">emergency_home</span>
                      </div>
                      <div>
                        <p className="font-['Inter'] text-[14px] font-semibold text-[#dae2fd]">Critical Vital Alerts</p>
                        <p className="text-[12px] font-semibold text-[#8c909f]">Immediate override for life-critical anomalies.</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input defaultChecked className="sr-only peer" type="checkbox" />
                      <div className="w-11 h-6 bg-[#2d3449] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#adc6ff]"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Admin: User Management Table */}
              <div className="glass-card rounded-xl overflow-hidden">
                <div className="p-8 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold text-[#dae2fd]">Global User Management</h3>
                    <p className="text-[12px] font-semibold text-[#8c909f]">Manage access levels and system status for all nodes.</p>
                  </div>
                  <div className="sunken-glass rounded-lg px-4 py-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#8c909f]">search</span>
                    <input className="bg-transparent border-none focus:ring-0 font-['Inter'] text-[14px] placeholder:text-[#424754] outline-none" placeholder="Search user ID or email..." type="text" />
                  </div>
                </div>
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead className="bg-white/5 text-[12px] font-semibold uppercase tracking-widest text-[#8c909f]">
                      <tr>
                        <th className="px-8 py-4 font-semibold">User Identity</th>
                        <th className="px-8 py-4 font-semibold">Status</th>
                        <th className="px-8 py-4 font-semibold">Tier</th>
                        <th className="px-8 py-4 font-semibold">Last Sync</th>
                        <th className="px-8 py-4 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr className="hover:bg-white/5 transition-colors group">
                        <td className="px-8 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#adc6ff]/20 text-[#adc6ff] flex items-center justify-center font-bold text-xs">EJ</div>
                            <div>
                              <p className="font-['Inter'] text-[14px] font-semibold text-[#dae2fd]">Elena Jensen</p>
                              <p className="text-xs text-[#8c909f]">elena.j@biovital.com</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#4edea3]/10 text-[#4edea3] border border-[#4edea3]/20">Active</span>
                        </td>
                        <td className="px-8 py-4 text-[12px] font-semibold text-[#c2c6d6]">Elite Tier</td>
                        <td className="px-8 py-4 text-[12px] font-semibold text-[#c2c6d6]">2 mins ago</td>
                        <td className="px-8 py-4 text-right">
                          <button className="material-symbols-outlined text-[#8c909f] hover:text-[#adc6ff] transition-colors">more_vert</button>
                        </td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors group">
                        <td className="px-8 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#4edea3]/20 text-[#4edea3] flex items-center justify-center font-bold text-xs">MR</div>
                            <div>
                              <p className="font-['Inter'] text-[14px] font-semibold text-[#dae2fd]">Marcus Reed</p>
                              <p className="text-xs text-[#8c909f]">m.reed@quantified.io</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#4edea3]/10 text-[#4edea3] border border-[#4edea3]/20">Active</span>
                        </td>
                        <td className="px-8 py-4 text-[12px] font-semibold text-[#c2c6d6]">Core Tier</td>
                        <td className="px-8 py-4 text-[12px] font-semibold text-[#c2c6d6]">14 mins ago</td>
                        <td className="px-8 py-4 text-right">
                          <button className="material-symbols-outlined text-[#8c909f] hover:text-[#adc6ff] transition-colors">more_vert</button>
                        </td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors group">
                        <td className="px-8 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#d0bcff]/20 text-[#d0bcff] flex items-center justify-center font-bold text-xs">SL</div>
                            <div>
                              <p className="font-['Inter'] text-[14px] font-semibold text-[#dae2fd]">Sarah Lopez</p>
                              <p className="text-xs text-[#8c909f]">sarah.l@nexus.co</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ffb4ab]/10 text-[#ffb4ab] border border-[#ffb4ab]/20">Inactive</span>
                        </td>
                        <td className="px-8 py-4 text-[12px] font-semibold text-[#c2c6d6]">Elite Tier</td>
                        <td className="px-8 py-4 text-[12px] font-semibold text-[#c2c6d6]">3 days ago</td>
                        <td className="px-8 py-4 text-right">
                          <button className="material-symbols-outlined text-[#8c909f] hover:text-[#adc6ff] transition-colors">more_vert</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="p-4 bg-white/5 flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-[#8c909f]">Showing 1-10 of 12,432 users</span>
                  <div className="flex gap-2">
                    <button className="p-1 rounded bg-[#2d3449]/30 hover:bg-[#2d3449] text-[#dae2fd] disabled:opacity-30">
                      <span className="material-symbols-outlined">navigate_before</span>
                    </button>
                    <button className="p-1 rounded bg-[#2d3449]/30 hover:bg-[#2d3449] text-[#dae2fd]">
                      <span className="material-symbols-outlined">navigate_next</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Privacy & Security */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card rounded-xl p-8">
                  <h4 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold text-[#adc6ff] mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined">security</span> Account Security
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[12px] font-semibold text-[#8c909f] block mb-2">Two-Factor Authentication</label>
                      <div className="flex items-center justify-between">
                        <span className="font-['Inter'] text-[14px] font-medium text-[#4edea3]">Currently Enabled (Auth App)</span>
                        <button className="text-[#adc6ff] text-[12px] font-semibold hover:underline">Change</button>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-white/5">
                      <button className="w-full flex items-center justify-between p-3 rounded-lg sunken-glass hover:brightness-110 transition-all">
                        <span className="font-['Inter'] text-[14px] font-semibold">Update Master Password</span>
                        <span className="material-symbols-outlined">key</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="glass-card rounded-xl p-8">
                  <h4 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold text-[#adc6ff] mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined">description</span> Data Control
                  </h4>
                  <p className="text-[12px] font-semibold text-[#8c909f] mb-6">Download a full archive of your biometric data or manage your platform footprint.</p>
                  <div className="flex gap-4">
                    <button className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[12px] font-semibold transition-all flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">download</span> Export Data
                    </button>
                    <button className="flex-1 py-3 bg-[#ffb4ab]/10 hover:bg-[#ffb4ab]/20 text-[#ffb4ab] rounded-xl text-[12px] font-semibold transition-all flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">delete_forever</span> Erase Node
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-[#131b2e]/80 backdrop-blur-2xl px-6 py-4 flex justify-between items-center z-50 border-t border-white/5">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 text-[#c2c6d6]">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-bold uppercase">Home</span>
        </Link>
        <Link href="/insights" className="flex flex-col items-center gap-1 text-[#c2c6d6]">
          <span className="material-symbols-outlined">insights</span>
          <span className="text-[10px] font-bold uppercase">Stats</span>
        </Link>
        <Link href="/gamified" className="flex flex-col items-center gap-1 text-[#c2c6d6]">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
          <span className="text-[10px] font-bold uppercase">Arena</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center gap-1 text-[#c2c6d6]">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-bold uppercase">Profile</span>
        </Link>
        <Link href="/settings" className="flex flex-col items-center gap-1 text-[#adc6ff]">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] font-bold uppercase">Settings</span>
        </Link>
      </nav>
    </div>
  );
}
