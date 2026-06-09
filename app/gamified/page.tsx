"use client";

import { useState } from "react";
import Link from "next/link";

export default function GamifiedPage() {
  const [joinStatus, setJoinStatus] = useState("Join Sprint");
  const [isJoining, setIsJoining] = useState(false);

  const handleJoin = () => {
    if (joinStatus.includes("Join")) {
      setIsJoining(true);
      setJoinStatus("Joining...");
      setTimeout(() => {
        setJoinStatus("Joined!");
        setIsJoining(false);
      }, 1500);
    }
  };

  return (
    <div className="bg-[#0b1326] text-[#dae2fd] font-['Inter'] min-h-screen overflow-x-hidden selection:bg-[#adc6ff]/30">
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-panel {
            background: rgba(30, 41, 59, 0.6);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .purple-gradient {
            background: linear-gradient(135deg, #a078ff 0%, #5516be 100%);
        }
        .text-gradient-purple {
            background: linear-gradient(135deg, #d0bcff 0%, #a078ff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .shimmer {
            position: relative;
            overflow: hidden;
        }
        .shimmer::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
                45deg,
                transparent 45%,
                rgba(255, 255, 255, 0.1) 50%,
                transparent 55%
            );
            animation: shimmer 3s infinite;
        }
        @keyframes shimmer {
            0% { transform: translate(-30%, -30%); }
            100% { transform: translate(30%, 30%); }
        }
        .radial-glow {
            background: radial-gradient(circle at center, rgba(173, 198, 255, 0.15) 0%, transparent 70%);
        }
      `}} />

      {/* Top NavBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-10 h-20 bg-[#171f33]/60 backdrop-blur-xl border-b border-white/10 shadow-md shadow-[#adc6ff]/10">
        <div className="flex items-center gap-4">
          <h1 className="font-['Plus_Jakarta_Sans'] text-[32px] md:text-[48px] font-bold text-[#adc6ff] md:hidden">VitalSync</h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative hidden md:block">
            <input className="bg-[#060e20]/50 border border-[#8c909f]/20 rounded-full py-2 px-10 focus:ring-2 focus:ring-[#adc6ff]/40 focus:outline-none w-64 text-[14px]" placeholder="Search challenges..." type="text" />
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#8c909f]">search</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="material-symbols-outlined text-[#c2c6d6] hover:text-[#adc6ff] transition-colors">notifications</button>
            <button className="material-symbols-outlined text-[#c2c6d6] hover:text-[#adc6ff] transition-colors">sync</button>
            <button className="material-symbols-outlined text-[#adc6ff] hover:scale-110 transition-transform">add_circle</button>
            <div className="w-10 h-10 rounded-full border-2 border-[#adc6ff]/20 overflow-hidden hidden md:block">
              <img alt="User avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwJv5DYXCZCz35_84iu2x5bk6TQBpiVfGTCX9uwy-jKs6AK9FGYz8LPDzTQJtj3uRf-HBlZ1Zz_FxCoA8N6htmD9D9tbG-UBmEFqzudh7OJSOmJ2xxL5yP8yqtJaBdx85RBxnRg16Gki5ygRVhF7RUXz2c5VF5ji7-qZIdKF9rV1KojraBpk6H9SYnUZDoaySTdFk2mSravaYBCjPNLMwr8OsaK6ZTTXPVHRqBaY36Sf6s34gSvx-6zOdsLysJQ9x_sdNWqi8bgeWK" />
            </div>
          </div>
        </div>
      </header>

      {/* Side NavBar */}
      <nav className="fixed left-0 top-0 h-full w-64 flex flex-col pt-20 pb-8 bg-[#131b2e]/60 backdrop-blur-xl border-r border-white/10 shadow-xl shadow-black/20 z-40 hidden md:flex">
        <div className="px-6 py-6 border-b border-white/5 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 purple-gradient rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#5516be]/40">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            </div>
            <div>
              <p className="font-['Plus_Jakarta_Sans'] text-[24px] font-extrabold text-[#adc6ff] leading-tight">VitalSync</p>
              <p className="font-['Inter'] text-[12px] text-[#c2c6d6]/60 uppercase tracking-widest">Elite Health Optimizer</p>
            </div>
          </div>
        </div>
        <div className="flex-1 px-4 space-y-1 overflow-y-auto">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:bg-white/5 transition-all duration-200">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-['Inter'] text-[14px]">Dashboard</span>
          </Link>
          <Link href="/insights" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:bg-white/5 transition-all duration-200">
            <span className="material-symbols-outlined">insights</span>
            <span className="font-['Inter'] text-[14px]">Analytics</span>
          </Link>
          <Link href="/goals" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:bg-white/5 transition-all duration-200">
            <span className="material-symbols-outlined">target</span>
            <span className="font-['Inter'] text-[14px]">Goals</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:bg-white/5 transition-all duration-200">
            <span className="material-symbols-outlined">folder_shared</span>
            <span className="font-['Inter'] text-[14px]">Health Records</span>
          </Link>
          <Link href="/gamified" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#adc6ff]/20 text-[#adc6ff] border-l-4 border-[#adc6ff] transition-all duration-200">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
            <span className="font-['Inter'] text-[14px]">Challenges</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:bg-white/5 transition-all duration-200">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
            <span className="font-['Inter'] text-[14px]">Achievements</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:bg-white/5 transition-all duration-200">
            <span className="material-symbols-outlined">devices</span>
            <span className="font-['Inter'] text-[14px]">Devices</span>
          </Link>
          <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:bg-white/5 transition-all duration-200">
            <span className="material-symbols-outlined">person</span>
            <span className="font-['Inter'] text-[14px]">Profile</span>
          </Link>
        </div>
        <div className="px-4 pt-4 border-t border-white/5 space-y-1">
          <Link href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:bg-white/5 transition-all duration-200">
            <span className="material-symbols-outlined">settings</span>
            <span className="font-['Inter'] text-[14px]">Settings</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:bg-white/5 transition-all duration-200">
            <span className="material-symbols-outlined">help</span>
            <span className="font-['Inter'] text-[14px]">Help</span>
          </Link>
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#ffb4ab] hover:bg-[#ffb4ab]/10 transition-all duration-200">
            <span className="material-symbols-outlined">logout</span>
            <span className="font-['Inter'] text-[14px]">Logout</span>
          </Link>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="pt-24 md:pl-64 min-h-screen pb-24 md:pb-0">
        <div className="px-4 md:px-10 py-6 max-w-7xl mx-auto space-y-16">
          {/* Page Header */}
          <header className="relative flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[#a078ff] font-['Inter'] text-[12px] font-semibold uppercase tracking-[0.2em]">Arena of Progress</span>
              <h2 className="font-['Plus_Jakarta_Sans'] text-[36px] md:text-[48px] font-bold text-[#dae2fd]">Challenges & Achievements</h2>
              <p className="text-[#c2c6d6] font-['Inter'] text-[18px] max-w-xl">Push your limits, unlock elite badges, and optimize your vitality through global community competitions.</p>
            </div>
            {/* 7-Day Streak Tracker Visual */}
            <div className="glass-panel p-8 rounded-xl flex items-center gap-6 border-[#adc6ff]/20 shadow-lg shadow-[#adc6ff]/5">
              <div className="flex flex-col items-center">
                <span className="text-[#d0bcff] font-['Plus_Jakarta_Sans'] text-[24px] font-semibold leading-none">7</span>
                <span className="font-['Inter'] text-[12px] font-semibold uppercase tracking-tighter text-[#c2c6d6]/60">Days</span>
              </div>
              <div className="flex gap-2">
                <div className="w-2 h-10 rounded-full bg-[#4edea3] shadow-[0_0_12px_rgba(78,222,163,0.4)]"></div>
                <div className="w-2 h-10 rounded-full bg-[#4edea3] shadow-[0_0_12px_rgba(78,222,163,0.4)]"></div>
                <div className="w-2 h-10 rounded-full bg-[#4edea3] shadow-[0_0_12px_rgba(78,222,163,0.4)]"></div>
                <div className="w-2 h-10 rounded-full bg-[#4edea3] shadow-[0_0_12px_rgba(78,222,163,0.4)]"></div>
                <div className="w-2 h-10 rounded-full bg-[#4edea3] shadow-[0_0_12px_rgba(78,222,163,0.4)]"></div>
                <div className="w-2 h-10 rounded-full bg-[#4edea3] shadow-[0_0_12px_rgba(78,222,163,0.4)]"></div>
                <div className="w-2 h-10 rounded-full purple-gradient animate-pulse shadow-[0_0_15px_rgba(160,120,255,0.6)]"></div>
              </div>
              <div className="flex flex-col">
                <p className="font-['Inter'] text-[14px] text-[#adc6ff] font-bold">Elite Streak!</p>
                <p className="font-['Inter'] text-[12px] font-semibold text-[#c2c6d6]">Don't break the chain.</p>
              </div>
            </div>
          </header>

          {/* Challenges Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#adc6ff] text-3xl">exercise</span>
                <h3 className="font-['Plus_Jakarta_Sans'] text-[32px] font-semibold text-[#dae2fd]">Active Challenges</h3>
              </div>
              <button className="text-[#adc6ff] font-['Inter'] text-[14px] font-semibold flex items-center gap-1 hover:underline transition-all">
                View All Challenges <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Weekly Step Challenge */}
              <div className="glass-panel rounded-xl overflow-hidden group hover:border-[#adc6ff]/40 transition-all duration-300 flex flex-col h-full">
                <div className="relative h-48 overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Runner" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAf-SEmQXa821a2hV4zp2kyvbBEdsCNNA48vVm2saGdL7FnYCydgLS-ExV4JzRwAS5BQecsxtuAAsOjMuEgdRBL3cXMPu6LsOfuDWmILShLvmVLpp49Pnd7AOE_tQHVrm1lHzNKKVk_SyW6GyMmflVBJrQvZ9_FeSl_ZYfL-_i1mLw7EDTA-miDLlRMO6QfuLTJkaA9Tk4Pwet7ant-6CpbgwxxI1-xEjXei7jmKYYYax3mk3MnOPcYcefy4YEa0hsY8GGpVx3rbjVA" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171f33] via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-[#adc6ff]/20 backdrop-blur-md px-3 py-1 rounded-full border border-[#adc6ff]/30">
                    <span className="font-['Inter'] text-[12px] font-semibold text-[#adc6ff] font-bold">5.4k Participants</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1 gap-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold text-[#dae2fd]">Weekly Step Challenge</h4>
                      <p className="text-[#c2c6d6] font-['Inter'] text-[14px]">Reach 70,000 steps by Sunday night.</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[#4edea3] font-bold font-['Plus_Jakarta_Sans'] text-[24px] font-semibold">72%</span>
                      <p className="font-['Inter'] text-[12px] font-semibold text-[#c2c6d6] uppercase">Progress</p>
                    </div>
                  </div>
                  {/* Progress Tracker */}
                  <div className="space-y-2">
                    <div className="flex justify-between font-['Inter'] text-[12px] font-semibold">
                      <span className="text-[#c2c6d6]">50,400 / 70,000 steps</span>
                      <span className="text-[#d0bcff]">3 days left</span>
                    </div>
                    <div className="h-3 bg-[#2d3449] rounded-full overflow-hidden">
                      <div className="h-full bg-[#4edea3] shadow-[0_0_12px_rgba(78,222,163,0.3)] transition-all duration-1000" style={{ width: "72%" }}></div>
                    </div>
                  </div>
                  <div className="mt-auto flex gap-3 pt-4">
                    <button className="flex-1 py-3 bg-[#adc6ff] text-[#002e6a] font-bold rounded-lg active:scale-95 transition-all shadow-lg shadow-[#adc6ff]/20">Keep Pushing</button>
                    <button className="p-3 glass-panel rounded-lg hover:bg-white/5 transition-all">
                      <span className="material-symbols-outlined">share</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Hydration Sprint */}
              <div className="glass-panel rounded-xl overflow-hidden group hover:border-[#d0bcff]/40 transition-all duration-300 flex flex-col h-full">
                <div className="relative h-48 overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Water Splash" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAk8qKvT0pd0lnOP0u7pUjem0zFDF7iiN2e1eb5W67UUbvNXW88RS2ZC-bnag5G1kE5tctN2zfd6d9D02Jfr24RukVH2JTtxImkC264-OWN2AeR3_sj3AQ5t3T7V8kGskqoCaQ9yWPYGMLwYS4_fFgqLEBNKl8LpUU0dVlDBEDYo5KrrAt5ad2WjI_wj5LHG2uLhPfcsPjDR-Rm0Q2Knk4SZf4iiXBXnWcmrS8zNfvjUArV3jp6L8GQB2yCcreMK83Xj1g2iNNg18yw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171f33] via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-[#d0bcff]/20 backdrop-blur-md px-3 py-1 rounded-full border border-[#d0bcff]/30">
                    <span className="font-['Inter'] text-[12px] font-semibold text-[#d0bcff] font-bold">NEW</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1 gap-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold text-[#dae2fd]">Hydration Sprint</h4>
                      <p className="text-[#c2c6d6] font-['Inter'] text-[14px]">Drink 3L of water daily for 5 days.</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[#d0bcff] font-bold font-['Plus_Jakarta_Sans'] text-[24px] font-semibold">0%</span>
                      <p className="font-['Inter'] text-[12px] font-semibold text-[#c2c6d6] uppercase">Not Started</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between font-['Inter'] text-[12px] font-semibold">
                      <span className="text-[#c2c6d6]">0 / 15 Liters</span>
                      <span className="text-[#d0bcff]">Starts in 12h</span>
                    </div>
                    <div className="h-3 bg-[#2d3449] rounded-full overflow-hidden">
                      <div className="h-full bg-[#d0bcff]/20 w-0"></div>
                    </div>
                  </div>
                  <div className="mt-auto flex gap-3 pt-4">
                    <button 
                      onClick={handleJoin}
                      disabled={isJoining || joinStatus === "Joined!"}
                      className={`flex-1 py-3 font-bold rounded-lg active:scale-95 transition-all shadow-lg shadow-[#5516be]/30 flex items-center justify-center gap-2
                      ${joinStatus === "Joined!" ? "bg-[#4edea3] text-[#003824]" : "purple-gradient text-white"}
                      ${isJoining ? "opacity-80" : ""}`}>
                      {isJoining && <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>}
                      {joinStatus === "Joined!" && <span className="material-symbols-outlined text-[20px]">check_circle</span>}
                      {joinStatus === "Join Sprint" ? "Join Sprint" : joinStatus === "Joining..." ? "Joining..." : "Joined!"}
                    </button>
                    <button className="p-3 glass-panel rounded-lg hover:bg-white/5 transition-all">
                      <span className="material-symbols-outlined">info</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Achievements Section */}
          <section className="space-y-6 relative">
            <div className="absolute -top-32 -right-32 w-96 h-96 radial-glow pointer-events-none"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#d0bcff] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
                <h3 className="font-['Plus_Jakarta_Sans'] text-[32px] font-semibold text-[#dae2fd]">Badge Gallery</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <img className="w-8 h-8 rounded-full border-2 border-[#0b1326] shadow-md" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6nivn0uyBcVqlLI1bXlAWNJtBj8WkvUnnmiNWKLa0z1RwVIt2uf4Kr8uv8Apj5PaozpvKx04fIG3bphcaeT0HhWWltJeYDjRBxv-qBt3Komr7l1CE7PZ680-bi2zz7N2XzU1Q_PlzSlWgT9TNCrtEhJTt6iBM9nN7XrJeILgdMOp-gPYVn5ZyzvXam6v-N-L-kGprYeR5C37ZoNkTc4e0cymVT2MeCzcdgnUwjV1LTFQwIVx71iRkz5xd2RKUg-MdWS4g7brJABsD" />
                  <img className="w-8 h-8 rounded-full border-2 border-[#0b1326] shadow-md" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBw_boYVghPcfYFpCUEyUWwCHhq9HayLYkp_FfUwPPCHWIF6AbtkhdvhVKpPYAoR7UGZlAVuH0KJdJp2A5cE4DoJ5S7x-b-SSA-Vhv1FWoHRzXd8Z0EvPOH1GWLMMQEbTaHqfZPzYLTIm6Mt0s-w9RujSIjGVMuAjaxwIb0aXay13GDg3Ving61qwS6iGl4GRte-_FbBLzomI68xGmIO9ow0MJUXdiop4Ghux2mvwddqginqZFBRl4Oki8tGF2HJGZf1YyRUwcpx94w" />
                  <div className="w-8 h-8 rounded-full border-2 border-[#0b1326] bg-[#222a3d] flex items-center justify-center text-[10px] font-bold">+14</div>
                </div>
                <span className="font-['Inter'] text-[12px] font-semibold text-[#c2c6d6]">Friends Active</span>
              </div>
            </div>

            {/* Bento Grid of Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {/* Achievement: Hydration Master (Unlocked) */}
              <div className="glass-panel rounded-xl p-8 flex flex-col items-center text-center gap-4 group hover:bg-[#adc6ff]/5 transition-all cursor-pointer shimmer">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full purple-gradient flex items-center justify-center text-white shadow-xl shadow-[#5516be]/40 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>water_drop</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-[#4edea3] w-6 h-6 rounded-full border-2 border-[#0b1326] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[14px] text-[#003824]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                  </div>
                </div>
                <div>
                  <h5 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold text-[#dae2fd] text-base">Hydration Master</h5>
                  <p className="font-['Inter'] text-[12px] font-semibold text-[#c2c6d6]">Drank 3L for 30 days</p>
                </div>
              </div>

              {/* Achievement: Step Champion (Unlocked) */}
              <div className="glass-panel rounded-xl p-8 flex flex-col items-center text-center gap-4 group hover:bg-[#adc6ff]/5 transition-all cursor-pointer">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#adc6ff] to-[#adc6ff] flex items-center justify-center text-[#00285d] shadow-xl shadow-[#adc6ff]/30 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>footprint</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-[#4edea3] w-6 h-6 rounded-full border-2 border-[#0b1326] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[14px] text-[#003824]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                  </div>
                </div>
                <div>
                  <h5 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold text-[#dae2fd] text-base">Step Champion</h5>
                  <p className="font-['Inter'] text-[12px] font-semibold text-[#c2c6d6]">1 Million Total Steps</p>
                </div>
              </div>

              {/* Achievement: Early Riser (Locked) */}
              <div className="glass-panel rounded-xl p-8 flex flex-col items-center text-center gap-4 group opacity-60 hover:opacity-100 transition-all cursor-pointer">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-[#2d3449] flex items-center justify-center text-[#424754] grayscale group-hover:grayscale-0 transition-all">
                    <span className="material-symbols-outlined text-4xl">wb_sunny</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-[#424754] w-6 h-6 rounded-full border-2 border-[#0b1326] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[14px] text-white">lock</span>
                  </div>
                </div>
                <div>
                  <h5 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold text-[#dae2fd] text-base">Early Riser</h5>
                  <p className="font-['Inter'] text-[12px] font-semibold text-[#c2c6d6]">Wake up at 5AM for 7 days</p>
                </div>
                <div className="w-full h-1 bg-[#171f33] rounded-full overflow-hidden">
                  <div className="h-full bg-[#adc6ff] w-[40%]"></div>
                </div>
              </div>

              {/* Achievement: Heart Hero (Locked) */}
              <div className="glass-panel rounded-xl p-8 flex flex-col items-center text-center gap-4 group opacity-60 hover:opacity-100 transition-all cursor-pointer">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-[#2d3449] flex items-center justify-center text-[#424754] grayscale group-hover:grayscale-0 transition-all">
                    <span className="material-symbols-outlined text-4xl">favorite</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-[#424754] w-6 h-6 rounded-full border-2 border-[#0b1326] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[14px] text-white">lock</span>
                  </div>
                </div>
                <div>
                  <h5 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold text-[#dae2fd] text-base">Heart Hero</h5>
                  <p className="font-['Inter'] text-[12px] font-semibold text-[#c2c6d6]">Maintain optimal Zone 2 HR</p>
                </div>
                <div className="w-full h-1 bg-[#171f33] rounded-full overflow-hidden">
                  <div className="h-full bg-[#adc6ff] w-[15%]"></div>
                </div>
              </div>

              {/* Achievement: Sleep Sage (Unlocked) */}
              <div className="glass-panel rounded-xl p-8 flex flex-col items-center text-center gap-4 group hover:bg-[#adc6ff]/5 transition-all cursor-pointer">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#a078ff] to-[#3c0091] flex items-center justify-center text-white shadow-xl shadow-[#d0bcff]/30 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>bedtime</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-[#4edea3] w-6 h-6 rounded-full border-2 border-[#0b1326] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[14px] text-[#003824]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                  </div>
                </div>
                <div>
                  <h5 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold text-[#dae2fd] text-base">Sleep Sage</h5>
                  <p className="font-['Inter'] text-[12px] font-semibold text-[#c2c6d6]">8h Sleep for 14 nights</p>
                </div>
              </div>
            </div>
          </section>

          {/* Rewards Banner */}
          <section className="purple-gradient rounded-[48px] p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl shadow-[#5516be]/20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2)_0%,transparent_60%)] pointer-events-none"></div>
            <div className="z-10 text-center md:text-left space-y-4 max-w-xl">
              <h3 className="font-['Plus_Jakarta_Sans'] text-[36px] md:text-[48px] font-bold text-white leading-tight">Unlock Premium Performance Wear</h3>
              <p className="text-white/80 font-['Inter'] text-[18px]">Complete 5 more challenges this month to unlock an exclusive 30% discount on VitalSync Smart Apparel.</p>
              <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
                <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white font-['Inter'] text-[14px] font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">redeem</span> 2/5 Completed
                </div>
                <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white font-['Inter'] text-[14px] font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">schedule</span> 12 Days Left
                </div>
              </div>
            </div>
            <div className="z-10 relative mt-8 md:mt-0">
              <div className="w-64 h-64 bg-white/10 backdrop-blur-3xl rounded-full flex items-center justify-center border border-white/20 animate-pulse">
                <span className="material-symbols-outlined text-[120px] text-white opacity-40">apparel</span>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white text-[#5516be] font-bold px-6 py-3 rounded-xl shadow-xl transform rotate-12">
                -30% OFF
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Bottom Mobile Nav */}
      <footer className="md:hidden fixed bottom-0 left-0 w-full glass-panel border-t border-white/10 z-50 h-20 flex items-center justify-around px-4">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 text-[#c2c6d6]">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-bold uppercase">Home</span>
        </Link>
        <Link href="/gamified" className="flex flex-col items-center gap-1 text-[#adc6ff]">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
          <span className="text-[10px] font-bold uppercase">Arena</span>
        </Link>
        <button className="w-14 h-14 -mt-10 purple-gradient rounded-full shadow-lg shadow-[#5516be]/40 flex items-center justify-center text-white border-4 border-[#0b1326]">
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
        <Link href="/insights" className="flex flex-col items-center gap-1 text-[#c2c6d6]">
          <span className="material-symbols-outlined">insights</span>
          <span className="text-[10px] font-bold uppercase">Stats</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center gap-1 text-[#c2c6d6]">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-bold uppercase">Profile</span>
        </Link>
      </footer>
    </div>
  );
}
