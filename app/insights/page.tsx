"use client";

import { useState } from "react";
import Link from "next/link";

export default function InsightsPage() {
  const [filter, setFilter] = useState('weekly');

  return (
    <div className="bg-[#0b1326] text-[#dae2fd] font-['Inter'] overflow-hidden h-screen flex">
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-card {
            background: rgba(30, 41, 59, 0.6);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .glass-surface {
            background: rgba(23, 31, 51, 0.4);
            backdrop-filter: blur(8px);
        }
        .neon-glow-primary {
            box-shadow: 0 0 20px rgba(173, 198, 255, 0.15);
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: #0b1326;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #2d3449;
            border-radius: 10px;
        }
      `}} />

      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full w-64 flex flex-col pt-24 pb-8 bg-[#131b2e]/60 backdrop-blur-xl border-r border-white/10 shadow-xl shadow-black/20 z-40 hidden md:flex">
        <div className="px-6 mb-8">
          <div className="flex items-center gap-3 p-3 glass-card rounded-xl">
            <div className="h-10 w-10 bg-[#adc6ff]/20 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-[#adc6ff]">insights</span>
            </div>
            <div>
              <p className="font-['Plus_Jakarta_Sans'] text-sm font-extrabold text-[#adc6ff]">Elite Health</p>
              <p className="text-[10px] text-[#c2c6d6]/80 uppercase tracking-widest">Optimizer v2.4</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 space-y-1 px-4 overflow-y-auto">
          <Link href="/dashboard" className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5 transition-all duration-200">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-['Inter'] text-[14px]">Dashboard</span>
          </Link>
          <Link href="/insights" className="flex items-center gap-4 px-4 py-3 rounded-lg bg-[#adc6ff]/20 text-[#adc6ff] border-l-4 border-[#adc6ff] transition-all duration-200">
            <span className="material-symbols-outlined">insights</span>
            <span className="font-['Inter'] text-[14px]">Analytics</span>
          </Link>
          <Link href="/goals" className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5 transition-all duration-200">
            <span className="material-symbols-outlined">target</span>
            <span className="font-['Inter'] text-[14px]">Goals</span>
          </Link>
          <Link href="#" className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5 transition-all duration-200">
            <span className="material-symbols-outlined">folder_shared</span>
            <span className="font-['Inter'] text-[14px]">Health Records</span>
          </Link>
          <Link href="/gamified" className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5 transition-all duration-200">
            <span className="material-symbols-outlined">emoji_events</span>
            <span className="font-['Inter'] text-[14px]">Challenges</span>
          </Link>
          <Link href="#" className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5 transition-all duration-200">
            <span className="material-symbols-outlined">military_tech</span>
            <span className="font-['Inter'] text-[14px]">Achievements</span>
          </Link>
          <Link href="#" className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5 transition-all duration-200">
            <span className="material-symbols-outlined">devices</span>
            <span className="font-['Inter'] text-[14px]">Devices</span>
          </Link>
          
          <div className="pt-4 mt-4 border-t border-white/5">
            <Link href="/profile" className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5 transition-all duration-200">
              <span className="material-symbols-outlined">person</span>
              <span className="font-['Inter'] text-[14px]">Profile</span>
            </Link>
            <Link href="/settings" className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5 transition-all duration-200">
              <span className="material-symbols-outlined">settings</span>
              <span className="font-['Inter'] text-[14px]">Settings</span>
            </Link>
          </div>
        </nav>
        
        <div className="px-4 mt-auto">
          <div className="flex flex-col gap-1 pt-4 border-t border-white/5">
            <button className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5 transition-all duration-200 w-full text-left">
              <span className="material-symbols-outlined">help</span>
              <span className="font-['Inter'] text-[14px]">Help</span>
            </button>
            <Link href="/" className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#ffb4ab] hover:bg-[#ffb4ab]/10 transition-all duration-200 w-full text-left">
              <span className="material-symbols-outlined">logout</span>
              <span className="font-['Inter'] text-[14px]">Logout</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:pl-64 pt-20 min-h-screen w-full">
        {/* TopNavBar */}
        <nav className="fixed top-0 left-0 md:left-64 right-0 w-full md:w-auto z-50 flex justify-between items-center px-4 md:px-10 h-20 bg-[#171f33]/60 backdrop-blur-xl border-b border-white/10 shadow-md shadow-[#adc6ff]/10">
          <div className="flex items-center gap-12">
            <h1 className="font-['Plus_Jakarta_Sans'] text-[32px] md:text-[48px] font-bold text-[#adc6ff] md:hidden">VitalSync</h1>
            <div className="hidden md:flex items-center bg-[#222a3d] rounded-full px-4 py-2 border border-[#424754]/30">
              <span className="material-symbols-outlined text-[#8c909f]">search</span>
              <input className="bg-transparent border-none focus:ring-0 text-[14px] placeholder-[#424754] w-64 outline-none" placeholder="Search analytics..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full hover:bg-white/5 transition-colors duration-300 active:scale-95">
                <span className="material-symbols-outlined text-[#adc6ff]">notifications</span>
              </button>
              <button className="p-2 rounded-full hover:bg-white/5 transition-colors duration-300 active:scale-95">
                <span className="material-symbols-outlined text-[#adc6ff]">sync</span>
              </button>
              <button className="p-2 rounded-full hover:bg-white/5 transition-colors duration-300 active:scale-95">
                <span className="material-symbols-outlined text-[#adc6ff]">add_circle</span>
              </button>
            </div>
            <div className="h-10 w-10 rounded-full border-2 border-[#adc6ff]/50 overflow-hidden hidden md:block">
              <img alt="User avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxzR6BP0imG9tuzPtZPt6TUUf6odpJyMvpT6I70qzlcWG4X3g-qEXIEyth5ybwXWr4AhTicIjo-sB9DaZuPjw1MkAUd5r9iABA0KffDLoEGUVwcowIKzC56IQS01jTIc1bu-CB2HM6qCTwfvz3_i4M5C6ZK4QOB0HYokf8-2m4I9kJdFXOQ5tSXZu15vGkTBiyU-1AAYi5HEwGtA040ChZedRJkxt4XP934NcqJybn4crHxxPpbGeNb23GxADxstBJS38bO6zZyU3O" />
            </div>
          </div>
        </nav>

        <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-[24px]">
          {/* Header & Filter Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-[64px]">
            <div>
              <h2 className="font-['Plus_Jakarta_Sans'] text-[32px] font-semibold text-[#dae2fd] mb-2">Performance Analytics</h2>
              <p className="text-[#c2c6d6] text-[16px]">Insights driven by your biometric data history.</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex p-1 bg-[#222a3d] rounded-xl border border-white/5">
                <button 
                  onClick={() => setFilter('weekly')}
                  className={`px-6 py-2 rounded-lg text-[14px] font-medium transition-all ${filter === 'weekly' ? 'text-[#adc6ff] bg-[#adc6ff]/10' : 'text-[#c2c6d6] hover:text-[#dae2fd]'}`}>Weekly</button>
                <button 
                  onClick={() => setFilter('monthly')}
                  className={`px-6 py-2 rounded-lg text-[14px] font-medium transition-all ${filter === 'monthly' ? 'text-[#adc6ff] bg-[#adc6ff]/10' : 'text-[#c2c6d6] hover:text-[#dae2fd]'}`}>Monthly</button>
                <button 
                  onClick={() => setFilter('yearly')}
                  className={`px-6 py-2 rounded-lg text-[14px] font-medium transition-all ${filter === 'yearly' ? 'text-[#adc6ff] bg-[#adc6ff]/10' : 'text-[#c2c6d6] hover:text-[#dae2fd]'}`}>Yearly</button>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 glass-card text-[14px] font-semibold hover:bg-white/5 transition-all active:scale-95">
                  <span className="material-symbols-outlined text-sm">picture_as_pdf</span> PDF
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 glass-card text-[14px] font-semibold hover:bg-white/5 transition-all active:scale-95">
                  <span className="material-symbols-outlined text-sm">csv</span> CSV
                </button>
              </div>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* AI Insight Box */}
            <div className="col-span-12 glass-card rounded-[48px] p-[32px] relative overflow-hidden border-[#adc6ff]/20 bg-gradient-to-r from-[#adc6ff]/10 to-transparent">
              <div className="flex items-center gap-6 relative z-10">
                <div className="h-16 w-16 rounded-full bg-[#adc6ff]/20 flex items-center justify-center animate-pulse shrink-0">
                  <span className="material-symbols-outlined text-[#adc6ff] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#adc6ff] mb-1 block">VitalSync Intelligence</span>
                  <p className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold text-[#dae2fd] max-w-2xl leading-relaxed">
                    Better sleep improves your <span className="text-[#adc6ff] font-bold">active minutes by 15%</span>. Your heart rate variability indicates optimal recovery for high-intensity training today.
                  </p>
                </div>
              </div>
            </div>

            {/* Activity Trends */}
            <div className="col-span-12 lg:col-span-8 glass-card rounded-[48px] p-[32px] flex flex-col gap-[24px]">
              <div className="flex justify-between items-center">
                <h3 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold">Activity Trends</h3>
                <div className="flex items-center gap-4 text-[12px] font-semibold">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#adc6ff]"></span> Steps</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#4edea3]"></span> Calories</span>
                </div>
              </div>
              <div className="h-[320px] relative">
                {/* Chart Mockup */}
                <div className="absolute inset-0 flex items-end justify-between px-2 pt-12">
                  <div className="w-8 bg-[#adc6ff]/40 hover:bg-[#adc6ff]/60 transition-colors rounded-t-lg h-[60%] relative group">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 glass-card px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">8.2k steps</div>
                  </div>
                  <div className="w-8 bg-[#adc6ff]/40 hover:bg-[#adc6ff]/60 transition-colors rounded-t-lg h-[45%] relative group"></div>
                  <div className="w-8 bg-[#adc6ff]/40 hover:bg-[#adc6ff]/60 transition-colors rounded-t-lg h-[75%] relative group"></div>
                  <div className="w-8 bg-[#adc6ff]/40 hover:bg-[#adc6ff]/60 transition-colors rounded-t-lg h-[65%] relative group"></div>
                  <div className="w-8 bg-[#adc6ff]/60 rounded-t-lg h-[90%] relative group">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#adc6ff] text-[#002e6a] px-2 py-1 rounded text-xs font-bold whitespace-nowrap z-10">12.4k Peak</div>
                  </div>
                  <div className="w-8 bg-[#adc6ff]/40 hover:bg-[#adc6ff]/60 transition-colors rounded-t-lg h-[55%] relative group"></div>
                  <div className="w-8 bg-[#adc6ff]/40 hover:bg-[#adc6ff]/60 transition-colors rounded-t-lg h-[40%] relative group"></div>
                </div>
                <div className="absolute inset-0 border-b border-l border-white/5 flex flex-col justify-between py-2 text-[10px] text-[#c2c6d6] font-mono">
                  <span className="border-t border-white/5 pt-1">15,000</span>
                  <span className="border-t border-white/5 pt-1">10,000</span>
                  <span className="border-t border-white/5 pt-1">5,000</span>
                  <span className="pt-1">0</span>
                </div>
              </div>
              <div className="grid grid-cols-7 text-center text-[12px] font-semibold text-[#c2c6d6] font-medium">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>

            {/* Heart Health */}
            <div className="col-span-12 lg:col-span-4 glass-card rounded-[48px] p-[32px] flex flex-col gap-[24px]">
              <h3 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ffb4ab]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                Heart Health
              </h3>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-5xl font-extrabold text-[#dae2fd]">62</span>
                <span className="text-[#c2c6d6] text-[14px] mb-2">Resting BPM</span>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-[12px] font-semibold">
                    <span className="text-[#c2c6d6]">Zone 3: Cardio</span>
                    <span className="font-bold">42m</span>
                  </div>
                  <div className="h-2 bg-[#2d3449] rounded-full overflow-hidden">
                    <div className="h-full bg-[#ffb4ab] w-[42%] neon-glow-primary"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[12px] font-semibold">
                    <span className="text-[#c2c6d6]">Zone 2: Fat Burn</span>
                    <span className="font-bold">1h 15m</span>
                  </div>
                  <div className="h-2 bg-[#2d3449] rounded-full overflow-hidden">
                    <div className="h-full bg-[#4edea3] w-[65%]"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[12px] font-semibold">
                    <span className="text-[#c2c6d6]">Zone 1: Peak</span>
                    <span className="font-bold">12m</span>
                  </div>
                  <div className="h-2 bg-[#2d3449] rounded-full overflow-hidden">
                    <div className="h-full bg-[#a078ff] w-[15%]"></div>
                  </div>
                </div>
              </div>
              <div className="mt-auto p-4 bg-[#171f33] rounded-xl border border-white/5">
                <p className="text-[12px] font-semibold leading-snug">Resting heart rate is <span className="text-[#4edea3]">4% lower</span> than last week. Excellent progress.</p>
              </div>
            </div>

            {/* Sleep Analytics */}
            <div className="col-span-12 md:col-span-6 glass-card rounded-[48px] p-[32px] bg-gradient-to-br from-[#340080]/30 to-[#171f33] flex flex-col gap-[24px] min-h-[400px]">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#d0bcff]">nights_stay</span> Sleep Analytics
                  </h3>
                  <p className="text-[#c2c6d6] text-[12px] font-semibold">Average quality: <span className="text-[#d0bcff]">88/100</span></p>
                </div>
                <div className="h-16 w-16 relative">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle className="text-[#2d3449]" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeWidth="4"></circle>
                    <circle className="text-[#d0bcff]" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeDasharray="175.9" strokeDashoffset="21" strokeWidth="4"></circle>
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">88%</span>
                </div>
              </div>
              <div className="flex-1 flex items-end gap-2 px-2 pb-4">
                <div className="flex-1 bg-[#d0bcff]/20 hover:bg-[#d0bcff]/40 transition-colors rounded-t-lg h-[60%]"></div>
                <div className="flex-1 bg-[#d0bcff]/40 hover:bg-[#d0bcff]/60 transition-colors rounded-t-lg h-[85%]"></div>
                <div className="flex-1 bg-[#d0bcff]/20 hover:bg-[#d0bcff]/40 transition-colors rounded-t-lg h-[65%]"></div>
                <div className="flex-1 bg-[#d0bcff]/60 hover:bg-[#d0bcff]/80 transition-colors rounded-t-lg h-[95%]"></div>
                <div className="flex-1 bg-[#d0bcff]/30 hover:bg-[#d0bcff]/50 transition-colors rounded-t-lg h-[70%]"></div>
                <div className="flex-1 bg-[#d0bcff]/20 hover:bg-[#d0bcff]/40 transition-colors rounded-t-lg h-[50%]"></div>
                <div className="flex-1 bg-[#d0bcff]/80 hover:bg-[#d0bcff]/100 transition-colors rounded-t-lg h-[80%]"></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-surface p-3 rounded-xl border border-white/5">
                  <span className="text-[10px] uppercase text-[#c2c6d6] block mb-1">Deep Sleep</span>
                  <p className="text-xl font-bold">2h 14m</p>
                </div>
                <div className="glass-surface p-3 rounded-xl border border-white/5">
                  <span className="text-[10px] uppercase text-[#c2c6d6] block mb-1">REM Sleep</span>
                  <p className="text-xl font-bold">1h 45m</p>
                </div>
              </div>
            </div>

            {/* Hydration & Metrics */}
            <div className="col-span-12 md:col-span-6 flex flex-col gap-6">
              <div className="glass-card rounded-[48px] p-[32px] flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#4d8eff]">water_drop</span> Hydration
                  </h3>
                  <button className="p-2 glass-surface rounded-lg hover:bg-white/5 transition-all">
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
                <div className="flex items-center gap-8 mb-8">
                  <div className="flex-shrink-0 w-24 h-32 bg-[#222a3d] rounded-2xl relative overflow-hidden border border-white/5">
                    <div className="absolute bottom-0 left-0 w-full bg-[#4d8eff]/40 animate-pulse" style={{ height: "72%" }}></div>
                    <div className="absolute inset-0 flex items-center justify-center text-xl font-black">72%</div>
                  </div>
                  <div className="space-y-4 flex-1">
                    <div>
                      <p className="text-3xl font-extrabold">2.4L <span className="text-[#c2c6d6] text-[14px]">/ 3.2L</span></p>
                      <p className="text-[12px] font-semibold text-[#c2c6d6]">Daily target based on weight & activity</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-10 w-10 glass-surface rounded-lg flex items-center justify-center border border-[#4d8eff]/20 cursor-pointer hover:bg-white/5">
                        <span className="text-xs font-bold">250ml</span>
                      </div>
                      <div className="h-10 w-10 glass-surface rounded-lg flex items-center justify-center border border-[#4d8eff]/20 cursor-pointer hover:bg-white/5">
                        <span className="text-xs font-bold">500ml</span>
                      </div>
                      <div className="h-10 w-10 glass-surface rounded-lg flex items-center justify-center border border-[#4d8eff]/20 cursor-pointer hover:bg-white/5">
                        <span className="text-xs font-bold">1L</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="glass-card rounded-[48px] p-[24px]">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-[#4edea3]/20 rounded-lg">
                      <span className="material-symbols-outlined text-[#4edea3]">bolt</span>
                    </div>
                    <span className="text-[#4edea3] text-[12px] font-semibold font-bold">+12%</span>
                  </div>
                  <p className="text-[10px] uppercase text-[#c2c6d6] mb-1">Metabolic Rate</p>
                  <p className="text-2xl font-bold">2,420 <span className="text-xs font-normal">kcal</span></p>
                </div>
                <div className="glass-card rounded-[48px] p-[24px]">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-[#d0bcff]/20 rounded-lg">
                      <span className="material-symbols-outlined text-[#d0bcff]">monitor_weight</span>
                    </div>
                    <span className="text-[#ffb4ab] text-[12px] font-semibold font-bold">-0.4kg</span>
                  </div>
                  <p className="text-[10px] uppercase text-[#c2c6d6] mb-1">Body Mass</p>
                  <p className="text-2xl font-bold">78.2 <span className="text-xs font-normal">kg</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Table Section */}
          <div className="mt-[64px] mb-[64px]">
            <div className="glass-card rounded-[48px] overflow-hidden">
              <div className="p-[32px] border-b border-white/5 flex justify-between items-center">
                <h3 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold">Biometric Log History</h3>
                <button className="text-[#adc6ff] text-[14px] font-bold hover:underline">View All Data</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#2d3449]/30 text-[#c2c6d6] text-[12px] font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="px-[32px] py-4 font-bold">Date</th>
                      <th className="px-[32px] py-4 font-bold">Score</th>
                      <th className="px-[32px] py-4 font-bold">Active Time</th>
                      <th className="px-[32px] py-4 font-bold">Resting HR</th>
                      <th className="px-[32px] py-4 font-bold">Recovery</th>
                      <th className="px-[32px] py-4 font-bold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr className="hover:bg-white/5 transition-colors group cursor-pointer">
                      <td className="px-[32px] py-5 font-medium">May 24, 2024</td>
                      <td className="px-[32px] py-5">
                        <span className="px-3 py-1 bg-[#4edea3]/20 text-[#4edea3] text-xs font-bold rounded-full border border-[#4edea3]/20">94 Optimal</span>
                      </td>
                      <td className="px-[32px] py-5">1h 42m</td>
                      <td className="px-[32px] py-5">60 BPM</td>
                      <td className="px-[32px] py-5">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-[#2d3449] rounded-full">
                            <div className="w-[90%] h-full bg-[#4edea3] rounded-full"></div>
                          </div>
                          <span className="text-xs">90%</span>
                        </div>
                      </td>
                      <td className="px-[32px] py-5 text-right">
                        <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity"><span className="material-symbols-outlined text-[#c2c6d6]">more_vert</span></button>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors group cursor-pointer">
                      <td className="px-[32px] py-5 font-medium">May 23, 2024</td>
                      <td className="px-[32px] py-5">
                        <span className="px-3 py-1 bg-[#adc6ff]/20 text-[#adc6ff] text-xs font-bold rounded-full border border-[#adc6ff]/20">82 Good</span>
                      </td>
                      <td className="px-[32px] py-5">0h 58m</td>
                      <td className="px-[32px] py-5">64 BPM</td>
                      <td className="px-[32px] py-5">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-[#2d3449] rounded-full">
                            <div className="w-[70%] h-full bg-[#adc6ff] rounded-full"></div>
                          </div>
                          <span className="text-xs">70%</span>
                        </div>
                      </td>
                      <td className="px-[32px] py-5 text-right">
                        <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity"><span className="material-symbols-outlined text-[#c2c6d6]">more_vert</span></button>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors group cursor-pointer">
                      <td className="px-[32px] py-5 font-medium">May 22, 2024</td>
                      <td className="px-[32px] py-5">
                        <span className="px-3 py-1 bg-[#d0bcff]/20 text-[#d0bcff] text-xs font-bold rounded-full border border-[#d0bcff]/20">74 Fair</span>
                      </td>
                      <td className="px-[32px] py-5">0h 32m</td>
                      <td className="px-[32px] py-5">68 BPM</td>
                      <td className="px-[32px] py-5">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-[#2d3449] rounded-full">
                            <div className="w-[45%] h-full bg-[#d0bcff] rounded-full"></div>
                          </div>
                          <span className="text-xs">45%</span>
                        </div>
                      </td>
                      <td className="px-[32px] py-5 text-right">
                        <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity"><span className="material-symbols-outlined text-[#c2c6d6]">more_vert</span></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button (FAB) */}
      <div className="fixed bottom-10 right-10 flex flex-col gap-4 z-50">
        <button className="h-16 w-16 bg-[#adc6ff] text-[#002e6a] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all neon-glow-primary group">
          <span className="material-symbols-outlined text-3xl font-bold group-hover:rotate-90 transition-transform">add</span>
        </button>
      </div>
    </div>
  );
}
