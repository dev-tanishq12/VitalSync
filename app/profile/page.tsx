"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const [appleSyncStatus, setAppleSyncStatus] = useState("Sync Now");
  const [isAppleSyncing, setIsAppleSyncing] = useState(false);
  const [fitbitSyncStatus, setFitbitSyncStatus] = useState("Sync Now");
  const [isFitbitSyncing, setIsFitbitSyncing] = useState(false);

  const handleAppleSync = () => {
    setIsAppleSyncing(true);
    setAppleSyncStatus("Syncing...");
    setTimeout(() => {
      setAppleSyncStatus("Success");
      setTimeout(() => {
        setAppleSyncStatus("Sync Now");
        setIsAppleSyncing(false);
      }, 2000);
    }, 1500);
  };

  const handleFitbitSync = () => {
    setIsFitbitSyncing(true);
    setFitbitSyncStatus("Syncing...");
    setTimeout(() => {
      setFitbitSyncStatus("Success");
      setTimeout(() => {
        setFitbitSyncStatus("Sync Now");
        setIsFitbitSyncing(false);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="bg-[#0b1326] text-[#dae2fd] font-['Inter'] min-h-screen overflow-x-hidden selection:bg-[#adc6ff]/30">
      <style dangerouslySetInnerHTML={{ __html: `
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .glass-card {
            background: rgba(30, 41, 59, 0.6);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .glass-card:hover {
            border-color: rgba(173, 198, 255, 0.3);
            box-shadow: 0 10px 30px -10px rgba(173, 198, 255, 0.15);
        }
        .sunken-input {
            background: rgba(11, 19, 38, 0.4);
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .active-glow {
            box-shadow: 0 0 15px rgba(173, 198, 255, 0.3);
        }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #0b1326; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #2d3449; border-radius: 10px; }
      `}} />

      {/* TopNavBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-10 h-20 bg-[#171f33]/60 backdrop-blur-xl border-b border-white/10 shadow-md shadow-[#adc6ff]/10">
        <div className="flex items-center gap-4">
          <span className="font-['Plus_Jakarta_Sans'] text-[32px] md:text-[48px] font-bold text-[#adc6ff] md:hidden">VitalSync</span>
        </div>
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#8c909f]">search</span>
            <input className="w-full sunken-input rounded-full py-2 pl-10 pr-4 text-[#dae2fd] focus:outline-none focus:ring-2 focus:ring-[#adc6ff]/50 transition-all text-[14px] font-['Inter']" placeholder="Search metrics, records, or devices..." type="text" />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <button className="material-symbols-outlined text-[#adc6ff] hover:bg-white/5 p-2 rounded-full transition-colors active:scale-95">notifications</button>
            <button className="material-symbols-outlined text-[#adc6ff] hover:bg-white/5 p-2 rounded-full transition-colors active:scale-95">sync</button>
            <button className="material-symbols-outlined text-[#adc6ff] hover:bg-white/5 p-2 rounded-full transition-colors active:scale-95">add_circle</button>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#adc6ff]/20 hidden md:block">
            <img alt="User avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbsfflm5VZpsv6dedxd0ZRM7qBbW1vF76Tno3He2JQPuQuGkb317TSfPDEmuUqmUPX-Ts333olebt6aVAuA_rGqjTsL-HmPRCT_mMO0MLuauBUgFZspfhGj1kZRATMORUNvSMkMEvQQy7Nx0SwLoPNOs6_o3kbySiBUWjq2aJ9WHZhDzVtEUpA6y4hiWVAdHma6h6vIdEmBQ6sKhLwQFQSwfzLvyCmA4YJEwksMYDQi4GR0IwkVDOxDfWSlg2-EwoF5eIsTb6Mlekl" />
          </div>
        </div>
      </header>

      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-[#131b2e]/60 backdrop-blur-xl border-r border-white/10 shadow-xl shadow-black/20 flex flex-col pt-24 pb-8 z-40 hidden md:flex custom-scrollbar overflow-y-auto">
        <div className="px-6 mb-8 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#adc6ff] rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-[#002e6a] text-xl">pulse_alert</span>
          </div>
          <div>
            <h2 className="font-['Plus_Jakarta_Sans'] text-[18px] font-extrabold text-[#adc6ff] leading-tight">VitalSync</h2>
            <p className="text-[10px] text-[#c2c6d6]/80 uppercase tracking-widest font-bold">Elite Optimizer</p>
          </div>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:bg-white/5 hover:text-[#dae2fd] transition-all duration-200">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-['Inter'] text-[14px]">Dashboard</span>
          </Link>
          <Link href="/insights" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:bg-white/5 hover:text-[#dae2fd] transition-all duration-200">
            <span className="material-symbols-outlined">insights</span>
            <span className="font-['Inter'] text-[14px]">Analytics</span>
          </Link>
          <Link href="/goals" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:bg-white/5 hover:text-[#dae2fd] transition-all duration-200">
            <span className="material-symbols-outlined">target</span>
            <span className="font-['Inter'] text-[14px]">Goals</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:bg-white/5 hover:text-[#dae2fd] transition-all duration-200">
            <span className="material-symbols-outlined">folder_shared</span>
            <span className="font-['Inter'] text-[14px]">Health Records</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:bg-white/5 hover:text-[#dae2fd] transition-all duration-200">
            <span className="material-symbols-outlined">devices</span>
            <span className="font-['Inter'] text-[14px]">Devices</span>
          </Link>
          <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#adc6ff]/20 text-[#adc6ff] border-l-4 border-[#adc6ff] transition-all duration-200 active:translate-x-1">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
            <span className="font-['Inter'] text-[14px]">Profile</span>
          </Link>
          <Link href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:bg-white/5 hover:text-[#dae2fd] transition-all duration-200">
            <span className="material-symbols-outlined">settings</span>
            <span className="font-['Inter'] text-[14px]">Settings</span>
          </Link>
        </nav>
        <div className="px-3 mt-auto space-y-1">
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:bg-white/5 hover:text-[#dae2fd] transition-all duration-200">
            <span className="material-symbols-outlined">help</span>
            <span className="font-['Inter'] text-[14px]">Help</span>
          </Link>
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#ffb4ab] hover:bg-white/5 hover:text-[#ffdad6] transition-all duration-200">
            <span className="material-symbols-outlined">logout</span>
            <span className="font-['Inter'] text-[14px]">Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="md:ml-64 pt-24 pb-24 md:pb-12 px-4 md:px-10 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Profile Overview Section */}
          <section id="profile-section">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4">
              <h1 className="font-['Plus_Jakarta_Sans'] text-[32px] md:text-[48px] font-bold text-[#dae2fd]">Personal Profile</h1>
              <button className="bg-[#adc6ff] text-[#002e6a] px-6 py-2 rounded-full font-['Inter'] text-[14px] font-semibold active:scale-95 transition-transform active-glow">Edit Profile</button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* User Info Card */}
              <div className="lg:col-span-4 glass-card rounded-[32px] p-8 flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-32 h-32 rounded-full border-4 border-[#adc6ff] p-1">
                    <img alt="Profile" className="w-full h-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZwr5kR274U5CsezrWDuiN3D89oqXs4cqDEYQOfrgOBEMys0DBL_bWC-W3NOLusbDqwHD0nBXL9VSIHQhzcGKKIl5vvtHUY-ipY44WbKMgPIVaTY_QPQk7NP-vIaH6AeFlWps-zPgMO7bOgoiO2w-nMq4EfWXwT3eC2aCGU_RXBlpXi8v8lxJiGcd_t8WxNcDWx4ED2JIf7yhgGNbwXgnzjxKCfj6VG94K7fExkfwuEuDoxMbiUq0C_zj7ndYuxd0RRgm4jeUe3llT" />
                  </div>
                  <div className="absolute bottom-1 right-1 bg-[#4edea3] w-8 h-8 rounded-full border-4 border-[#0b1326] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#003824] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  </div>
                </div>
                <h3 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold text-[#dae2fd]">Alex Chen</h3>
                <p className="text-[#c2c6d6] mb-6">Elite Biohacker | San Francisco, CA</p>
                <div className="w-full grid grid-cols-2 gap-4">
                  <div className="sunken-input p-4 rounded-2xl">
                    <span className="text-[#c2c6d6] text-[12px] font-semibold uppercase block mb-1">Weight</span>
                    <span className="text-[#dae2fd] font-bold text-lg">78.5 kg</span>
                  </div>
                  <div className="sunken-input p-4 rounded-2xl">
                    <span className="text-[#c2c6d6] text-[12px] font-semibold uppercase block mb-1">Height</span>
                    <span className="text-[#dae2fd] font-bold text-lg">182 cm</span>
                  </div>
                </div>
              </div>

              {/* Stats & Goals Bento */}
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Lifetime Stats */}
                <div className="glass-card rounded-[32px] p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-6">
                    <h4 className="font-['Plus_Jakarta_Sans'] text-[20px] font-semibold text-[#adc6ff]">Lifetime Stats</h4>
                    <span className="material-symbols-outlined text-[#adc6ff]/40">military_tech</span>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#adc6ff]/10 rounded-lg"><span className="material-symbols-outlined text-[#adc6ff]">fitness_center</span></div>
                        <span className="text-[#dae2fd] font-medium font-['Inter']">Workouts</span>
                      </div>
                      <span className="text-2xl font-bold text-[#adc6ff] font-['Plus_Jakarta_Sans']">1,284</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#4edea3]/10 rounded-lg"><span className="material-symbols-outlined text-[#4edea3]">steps</span></div>
                        <span className="text-[#dae2fd] font-medium font-['Inter']">Steps</span>
                      </div>
                      <span className="text-2xl font-bold text-[#4edea3] font-['Plus_Jakarta_Sans']">14.2M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#d0bcff]/10 rounded-lg"><span className="material-symbols-outlined text-[#d0bcff]">bedtime</span></div>
                        <span className="text-[#dae2fd] font-medium font-['Inter']">Deep Sleep</span>
                      </div>
                      <span className="text-2xl font-bold text-[#d0bcff] font-['Plus_Jakarta_Sans']">3,420h</span>
                    </div>
                  </div>
                </div>

                {/* Daily Targets */}
                <div className="glass-card rounded-[32px] p-8 bg-gradient-to-br from-[#adc6ff]/5 to-transparent">
                  <h4 className="font-['Plus_Jakarta_Sans'] text-[20px] font-semibold text-[#adc6ff] mb-6">Daily Targets</h4>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between font-['Inter'] text-[14px] font-medium mb-2">
                        <span className="text-[#dae2fd]">Steps Goal</span>
                        <span className="text-[#c2c6d6]">8,450 / 12,000</span>
                      </div>
                      <div className="h-2 bg-[#2d3449] rounded-full overflow-hidden">
                        <div className="h-full bg-[#adc6ff] active-glow" style={{ width: "70%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-['Inter'] text-[14px] font-medium mb-2">
                        <span className="text-[#dae2fd]">Sleep Target</span>
                        <span className="text-[#c2c6d6]">7.5h / 8.0h</span>
                      </div>
                      <div className="h-2 bg-[#2d3449] rounded-full overflow-hidden">
                        <div className="h-full bg-[#4edea3] active-glow" style={{ width: "93%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-['Inter'] text-[14px] font-medium mb-2">
                        <span className="text-[#dae2fd]">Water Intake</span>
                        <span className="text-[#c2c6d6]">2.1L / 3.0L</span>
                      </div>
                      <div className="h-2 bg-[#2d3449] rounded-full overflow-hidden">
                        <div className="h-full bg-[#d0bcff] active-glow" style={{ width: "65%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Devices Section */}
          <section id="devices-section">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4">
              <div>
                <h2 className="font-['Plus_Jakarta_Sans'] text-[32px] font-semibold text-[#dae2fd]">Connected Devices</h2>
                <p className="text-[#c2c6d6] font-['Inter']">Manage your ecosystem of health trackers</p>
              </div>
              <button className="bg-[#2d3449] text-[#dae2fd] px-6 py-2 rounded-full font-['Inter'] text-[14px] font-medium flex items-center gap-2 hover:bg-[#31394d] transition-colors active:scale-95">
                <span className="material-symbols-outlined text-[18px]">add</span> Add New Device
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Apple Health Card */}
              <div className="glass-card rounded-[32px] p-8 flex flex-col gap-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-[120px]">watch</span>
                </div>
                <div className="flex justify-between items-start z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center">
                      <span className="material-symbols-outlined text-black text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>apps</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#dae2fd] text-lg leading-none font-['Inter']">Apple Health</h4>
                      <span className="text-[#4edea3] text-xs font-bold uppercase tracking-widest">Active</span>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input defaultChecked className="sr-only peer" type="checkbox" />
                    <div className="w-11 h-6 bg-[#2d3449] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4edea3]"></div>
                  </label>
                </div>
                <div className="space-y-1 z-10">
                  <p className="text-[#c2c6d6] text-sm font-['Inter']">Last Synced</p>
                  <p className="text-[#dae2fd] font-medium font-['Inter']">Today, 10:42 AM</p>
                </div>
                <button 
                  onClick={handleAppleSync}
                  disabled={isAppleSyncing}
                  className={`w-full py-3 rounded-2xl bg-white/5 border border-white/10 font-['Inter'] text-[14px] font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-2 active:scale-[0.98] z-10
                  ${appleSyncStatus === "Success" ? "text-[#4edea3]" : "text-[#dae2fd]"}`}>
                  {isAppleSyncing ? <span className="material-symbols-outlined text-[20px] animate-spin">sync</span> : 
                   appleSyncStatus === "Success" ? <span className="material-symbols-outlined text-[20px]">check_circle</span> : 
                   <span className="material-symbols-outlined text-[20px]">sync</span>}
                  {appleSyncStatus}
                </button>
              </div>

              {/* Fitbit Card */}
              <div className="glass-card rounded-[32px] p-8 flex flex-col gap-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-[120px]">directions_run</span>
                </div>
                <div className="flex justify-between items-start z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#4d8eff] rounded-2xl flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#00285d] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>diamond</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#dae2fd] text-lg leading-none font-['Inter']">Fitbit Sense 2</h4>
                      <span className="text-[#4edea3] text-xs font-bold uppercase tracking-widest">Active</span>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input defaultChecked className="sr-only peer" type="checkbox" />
                    <div className="w-11 h-6 bg-[#2d3449] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4edea3]"></div>
                  </label>
                </div>
                <div className="space-y-1 z-10">
                  <p className="text-[#c2c6d6] text-sm font-['Inter']">Last Synced</p>
                  <p className="text-[#dae2fd] font-medium font-['Inter']">2 hours ago</p>
                </div>
                <button 
                  onClick={handleFitbitSync}
                  disabled={isFitbitSyncing}
                  className={`w-full py-3 rounded-2xl bg-white/5 border border-white/10 font-['Inter'] text-[14px] font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-2 active:scale-[0.98] z-10
                  ${fitbitSyncStatus === "Success" ? "text-[#4edea3]" : "text-[#dae2fd]"}`}>
                  {isFitbitSyncing ? <span className="material-symbols-outlined text-[20px] animate-spin">sync</span> : 
                   fitbitSyncStatus === "Success" ? <span className="material-symbols-outlined text-[20px]">check_circle</span> : 
                   <span className="material-symbols-outlined text-[20px]">sync</span>}
                  {fitbitSyncStatus}
                </button>
              </div>

              {/* Google Fit Card */}
              <div className="glass-card rounded-[32px] p-8 flex flex-col gap-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-[120px]">fitness_center</span>
                </div>
                <div className="flex justify-between items-start z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#2d3449] rounded-2xl flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#adc6ff] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>fitbit</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#dae2fd] text-lg leading-none font-['Inter']">Google Fit</h4>
                      <span className="text-[#c2c6d6] text-xs font-bold uppercase tracking-widest">Disconnected</span>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input className="sr-only peer" type="checkbox" />
                    <div className="w-11 h-6 bg-[#2d3449] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4edea3]"></div>
                  </label>
                </div>
                <div className="space-y-1 z-10">
                  <p className="text-[#c2c6d6] text-sm font-['Inter']">Last Synced</p>
                  <p className="text-[#dae2fd] font-medium opacity-50 font-['Inter']">Not available</p>
                </div>
                <button className="w-full py-3 rounded-2xl bg-[#adc6ff] text-[#002e6a] font-['Inter'] text-[14px] font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2 active:scale-[0.98] z-10">
                  <span className="material-symbols-outlined text-[20px]">link</span> Connect Now
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#131b2e]/80 backdrop-blur-2xl px-6 py-4 flex justify-between items-center z-50 border-t border-white/5">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 text-[#c2c6d6]">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-bold uppercase">Home</span>
        </Link>
        <Link href="/insights" className="flex flex-col items-center gap-1 text-[#c2c6d6]">
          <span className="material-symbols-outlined">insights</span>
          <span className="text-[10px] font-bold uppercase">Stats</span>
        </Link>
        <div className="relative -top-8">
          <button className="w-14 h-14 bg-[#adc6ff] text-[#002e6a] rounded-full shadow-lg shadow-[#adc6ff]/40 flex items-center justify-center active:scale-90 transition-transform">
            <span className="material-symbols-outlined text-3xl">add</span>
          </button>
        </div>
        <Link href="#" className="flex flex-col items-center gap-1 text-[#c2c6d6]">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>devices</span>
          <span className="text-[10px] font-bold uppercase">Devices</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center gap-1 text-[#adc6ff]">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-bold uppercase">Profile</span>
        </Link>
      </nav>
    </div>
  );
}
