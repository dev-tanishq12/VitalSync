"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authFetch } from "@/lib/fetch";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [score, setScore] = useState(0);
  const [metrics, setMetrics] = useState<any>(null);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/join");
      return;
    }

    // Fetch dashboard data
    const fetchDashboard = async () => {
      try {
        const res = await authFetch("/api/dashboard");
        if (res.ok) {
          const data = await res.json();
          setMetrics(data.metrics);
          
          // Animate score based on readiness score
          let current = 0;
          const target = data.metrics.readinessScore || 85;
          const interval = setInterval(() => {
            if (current < target) {
              current++;
              setScore(current);
            } else {
              clearInterval(interval);
            }
          }, 20);
          return () => clearInterval(interval);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };
    
    fetchDashboard();
  }, [user, loading, router]);

  return (
    <div className="bg-[#0b1326] text-[#dae2fd] font-['Inter'] overflow-hidden h-screen flex">
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-card {
            background: rgba(30, 41, 59, 0.6);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 1.5rem;
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .glass-card:hover {
            transform: translateY(-4px);
            border-color: rgba(173, 198, 255, 0.3);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        .neo-glow-primary {
            box-shadow: 0 0 15px rgba(173, 198, 255, 0.4);
        }
        .neo-glow-secondary {
            box-shadow: 0 0 15px rgba(78, 222, 163, 0.4);
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(173, 198, 255, 0.2);
            border-radius: 10px;
        }
      `}} />

      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full flex flex-col pt-20 pb-8 bg-[#131b2e]/60 backdrop-blur-xl border-r border-white/10 shadow-xl shadow-black/20 w-64 z-40 hidden md:flex">
        <div className="px-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#adc6ff] flex items-center justify-center">
              <span className="material-symbols-outlined text-[#002e6a]">health_metrics</span>
            </div>
            <div>
              <h2 className="font-['Plus_Jakarta_Sans'] text-[24px] font-extrabold text-[#adc6ff]">VitalSync</h2>
              <p className="font-['Inter'] text-[12px] text-[#c2c6d6] opacity-70">Elite Health Optimizer</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 custom-scrollbar overflow-y-auto">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#adc6ff]/20 text-[#adc6ff] border-l-4 border-[#adc6ff] transition-all duration-200">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-['Inter'] text-[14px]">Dashboard</span>
          </Link>
          <Link href="/insights" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5 transition-all duration-200">
            <span className="material-symbols-outlined">insights</span>
            <span className="font-['Inter'] text-[14px]">Analytics</span>
          </Link>
          <Link href="/goals" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5 transition-all duration-200">
            <span className="material-symbols-outlined">target</span>
            <span className="font-['Inter'] text-[14px]">Goals</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5 transition-all duration-200">
            <span className="material-symbols-outlined">folder_shared</span>
            <span className="font-['Inter'] text-[14px]">Health Records</span>
          </Link>
          <Link href="/gamified" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5 transition-all duration-200">
            <span className="material-symbols-outlined">emoji_events</span>
            <span className="font-['Inter'] text-[14px]">Challenges</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5 transition-all duration-200">
            <span className="material-symbols-outlined">military_tech</span>
            <span className="font-['Inter'] text-[14px]">Achievements</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5 transition-all duration-200">
            <span className="material-symbols-outlined">devices</span>
            <span className="font-['Inter'] text-[14px]">Devices</span>
          </Link>
          <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5 transition-all duration-200">
            <span className="material-symbols-outlined">person</span>
            <span className="font-['Inter'] text-[14px]">Profile</span>
          </Link>
          <Link href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5 transition-all duration-200">
            <span className="material-symbols-outlined">settings</span>
            <span className="font-['Inter'] text-[14px]">Settings</span>
          </Link>
        </nav>
        
        <div className="px-4 mt-auto border-t border-white/5 pt-4">
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5 transition-all duration-200">
            <span className="material-symbols-outlined">help</span>
            <span className="font-['Inter'] text-[14px]">Help</span>
          </Link>
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#ffb4ab] hover:bg-[#ffb4ab]/10 transition-all duration-200">
            <span className="material-symbols-outlined">logout</span>
            <span className="font-['Inter'] text-[14px]">Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Canvas */}
      <main className="flex-1 md:ml-64 h-full relative flex flex-col overflow-hidden">
        {/* TopNavBar */}
        <header className="fixed top-0 left-0 md:left-64 right-0 z-50 h-20 bg-[#171f33]/60 backdrop-blur-xl border-b border-white/10 shadow-md shadow-[#adc6ff]/10 flex justify-between items-center px-8">
          <div className="flex items-center flex-1">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#c2c6d6]/60">search</span>
              <input className="w-full bg-[#060e20]/50 border-none rounded-full pl-12 pr-4 py-2 text-[#dae2fd] focus:ring-2 focus:ring-[#adc6ff]/50 transition-all outline-none" placeholder="Search biometrics or records..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex gap-4 items-center mr-4">
              <Link href="/dashboard" className="font-['Inter'] text-[14px] text-[#adc6ff] font-bold border-b-2 border-[#adc6ff] pb-1">Dashboard</Link>
              <Link href="#" className="font-['Inter'] text-[14px] text-[#c2c6d6] font-medium hover:text-[#dae2fd] transition-colors">Trends</Link>
              <Link href="#" className="font-['Inter'] text-[14px] text-[#c2c6d6] font-medium hover:text-[#dae2fd] transition-colors">Community</Link>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 active:scale-95 transition-all text-[#c2c6d6]" title="Notifications">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 active:scale-95 transition-all text-[#c2c6d6]" title="Sync Devices">
                <span className="material-symbols-outlined">sync</span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#adc6ff]/20 text-[#adc6ff] hover:bg-[#adc6ff]/30 active:scale-95 transition-all" title="Add Metric">
                <span className="material-symbols-outlined">add_circle</span>
              </button>
            </div>
            <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-[#adc6ff]/30 ml-2 flex items-center justify-center bg-[#002e6a]">
              {user?.photoURL ? (
                <img alt="User avatar" className="w-full h-full object-cover" src={user.photoURL} />
              ) : (
                <span className="text-[#adc6ff] font-bold text-lg">{user?.displayName?.charAt(0) || "O"}</span>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="mt-20 flex-1 overflow-y-auto custom-scrollbar p-8">
          
          <section className="mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="font-['Plus_Jakarta_Sans'] text-[48px] font-bold text-[#adc6ff] mb-2 leading-tight">Good morning, {user?.displayName || "Optimizer"}</h1>
                <p className="font-['Inter'] text-[18px] text-[#c2c6d6] max-w-xl">
                  "The only way to improve is to measure. Your recovery is optimal today, perfect for a high-intensity session."
                </p>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-[#4edea3]/10 rounded-full border border-[#4edea3]/20">
                <span className="material-symbols-outlined text-[#4edea3]">bolt</span>
                <span className="font-['Inter'] text-[14px] text-[#4edea3] uppercase tracking-widest font-bold">Peak Condition</span>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-12 gap-6">
            {/* Daily Health Score */}
            <div className="col-span-12 lg:col-span-4 glass-card p-[32px] flex flex-col items-center justify-center relative overflow-hidden h-[400px]">
              <div className="relative z-10 text-center">
                <h3 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold mb-8">Daily Health Score</h3>
                <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle className="text-white/5" cx="50%" cy="50%" fill="transparent" r="90" stroke="currentColor" strokeWidth="8"></circle>
                    <circle className="text-[#adc6ff] neo-glow-primary" cx="50%" cy="50%" fill="transparent" r="90" stroke="currentColor" strokeDasharray="565" strokeDashoffset={565 - (565 * score) / 100} strokeLinecap="round" strokeWidth="12" style={{ transition: 'stroke-dashoffset 0.1s linear' }}></circle>
                  </svg>
                  <div className="text-center">
                    <span className="block font-['Plus_Jakarta_Sans'] text-[64px] leading-none text-white font-bold">{score}</span>
                    <span className="font-['Inter'] text-[12px] text-[#adc6ff] uppercase tracking-widest font-semibold">Excellent</span>
                  </div>
                </div>
                <p className="mt-8 font-['Inter'] text-[16px] text-[#c2c6d6]">Your vitals are 12% better than yesterday's average.</p>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Steps */}
              <div className="glass-card p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-lg bg-[#adc6ff]/10 flex items-center justify-center text-[#adc6ff]">
                    <span className="material-symbols-outlined">directions_walk</span>
                  </div>
                  <span className="text-[#4edea3] font-['Inter'] text-[12px] font-semibold">+5%</span>
                </div>
                <div className="mt-4">
                  <h4 className="font-['Inter'] text-[14px] text-[#c2c6d6]">Steps Today</h4>
                  <div className="flex items-baseline gap-2">
                    <span className="font-['Plus_Jakarta_Sans'] text-[32px] font-semibold">{metrics?.steps?.toLocaleString() || "8,432"}</span>
                    <span className="text-[#c2c6d6]/60 text-sm">/ 10k</span>
                  </div>
                </div>
                <div className="mt-4 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#adc6ff] neo-glow-primary rounded-full" style={{ width: `${Math.min(100, ((metrics?.steps || 8432) / 10000) * 100)}%` }}></div>
                </div>
              </div>

              {/* Heart Rate */}
              <div className="glass-card p-6 flex flex-col justify-between border-l-4 border-l-[#ffb4ab]/40">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-lg bg-[#ffb4ab]/10 flex items-center justify-center text-[#ffb4ab]">
                    <span className="material-symbols-outlined">favorite</span>
                  </div>
                  <span className="text-[#c2c6d6]/60 font-['Inter'] text-[12px] font-semibold">Resting: 62</span>
                </div>
                <div className="mt-4">
                  <h4 className="font-['Inter'] text-[14px] text-[#c2c6d6]">Heart Rate</h4>
                  <div className="flex items-baseline gap-2">
                    <span className="font-['Plus_Jakarta_Sans'] text-[32px] font-semibold">{metrics?.heartRate || "74"}</span>
                    <span className="text-[#c2c6d6]/60 text-sm">BPM</span>
                  </div>
                </div>
                <div className="mt-4 flex gap-1 items-end h-8">
                  <div className="w-full bg-[#ffb4ab]/40 h-3 rounded-sm"></div>
                  <div className="w-full bg-[#ffb4ab]/60 h-5 rounded-sm"></div>
                  <div className="w-full bg-[#ffb4ab] h-8 rounded-sm"></div>
                  <div className="w-full bg-[#ffb4ab]/70 h-4 rounded-sm"></div>
                  <div className="w-full bg-[#ffb4ab]/50 h-6 rounded-sm"></div>
                </div>
              </div>

              {/* Calories */}
              <div className="glass-card p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-lg bg-[#d0bcff]/10 flex items-center justify-center text-[#d0bcff]">
                    <span className="material-symbols-outlined">local_fire_department</span>
                  </div>
                  <span className="text-[#d0bcff] font-['Inter'] text-[12px] font-semibold">620 left</span>
                </div>
                <div className="mt-4">
                  <h4 className="font-['Inter'] text-[14px] text-[#c2c6d6]">Burned</h4>
                  <div className="flex items-baseline gap-2">
                    <span className="font-['Plus_Jakarta_Sans'] text-[32px] font-semibold">{metrics?.calories?.toLocaleString() || "1,840"}</span>
                    <span className="text-[#c2c6d6]/60 text-sm">kcal</span>
                  </div>
                </div>
                <div className="mt-4 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#d0bcff] rounded-full" style={{ width: `${Math.min(100, ((metrics?.calories || 1840) / 2500) * 100)}%` }}></div>
                </div>
              </div>

              {/* Sleep */}
              <div className="glass-card p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-lg bg-[#4d8eff]/10 flex items-center justify-center text-[#4d8eff]">
                    <span className="material-symbols-outlined">bedtime</span>
                  </div>
                  <span className="text-[#4d8eff] font-['Inter'] text-[12px] font-semibold">Deep: 2h 15m</span>
                </div>
                <div className="mt-4">
                  <h4 className="font-['Inter'] text-[14px] text-[#c2c6d6]">Sleep Duration</h4>
                  <div className="flex items-baseline gap-2">
                    <span className="font-['Plus_Jakarta_Sans'] text-[32px] font-semibold">{metrics?.sleep || "7.2"}h</span>
                    <span className="text-[#c2c6d6]/60 text-sm">92% Quality</span>
                  </div>
                </div>
                <div className="mt-4 flex gap-1 h-1.5">
                  <div className="flex-[3] bg-[#adc6ff] rounded-full"></div>
                  <div className="flex-[1] bg-white/10 rounded-full"></div>
                  <div className="flex-[4] bg-[#4d8eff] rounded-full"></div>
                </div>
              </div>

              {/* Water */}
              <div className="glass-card p-6 flex flex-col justify-between border-b-4 border-b-[#adc6ff]/40">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-lg bg-[#adc6ff]/10 flex items-center justify-center text-[#adc6ff]">
                    <span className="material-symbols-outlined">water_drop</span>
                  </div>
                  <button className="text-[#adc6ff] hover:scale-110 active:scale-95 transition-transform">
                    <span className="material-symbols-outlined">add_circle</span>
                  </button>
                </div>
                <div className="mt-4">
                  <h4 className="font-['Inter'] text-[14px] text-[#c2c6d6]">Hydration</h4>
                  <div className="flex items-baseline gap-2">
                    <span className="font-['Plus_Jakarta_Sans'] text-[32px] font-semibold">1.8</span>
                    <span className="text-[#c2c6d6]/60 text-sm">/ 2.5 Liters</span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-8 gap-1">
                  <div className="h-4 bg-[#adc6ff] rounded-sm"></div>
                  <div className="h-4 bg-[#adc6ff] rounded-sm"></div>
                  <div className="h-4 bg-[#adc6ff] rounded-sm"></div>
                  <div className="h-4 bg-[#adc6ff] rounded-sm"></div>
                  <div className="h-4 bg-[#adc6ff] rounded-sm"></div>
                  <div className="h-4 bg-white/10 rounded-sm"></div>
                  <div className="h-4 bg-white/10 rounded-sm"></div>
                  <div className="h-4 bg-white/10 rounded-sm"></div>
                </div>
              </div>

              {/* Active Minutes */}
              <div className="glass-card p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-lg bg-[#4edea3]/10 flex items-center justify-center text-[#4edea3]">
                    <span className="material-symbols-outlined">timer</span>
                  </div>
                  <span className="text-[#4edea3] font-['Inter'] text-[12px] font-semibold">Goal Met</span>
                </div>
                <div className="mt-4">
                  <h4 className="font-['Inter'] text-[14px] text-[#c2c6d6]">Active Minutes</h4>
                  <div className="flex items-baseline gap-2">
                    <span className="font-['Plus_Jakarta_Sans'] text-[32px] font-semibold">48</span>
                    <span className="text-[#c2c6d6]/60 text-sm">/ 30 min</span>
                  </div>
                </div>
                <div className="mt-4 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#4edea3] neo-glow-secondary rounded-full" style={{ width: "100%" }}></div>
                </div>
              </div>
            </div>

            {/* Weekly Activity Overview */}
            <div className="col-span-12 lg:col-span-8 glass-card p-[32px]">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold">Weekly Activity Overview</h3>
                  <p className="font-['Inter'] text-[14px] text-[#c2c6d6]">Average load: 74% increase</p>
                </div>
                <div className="flex bg-[#2d3449] rounded-lg p-1">
                  <button className="px-4 py-1.5 rounded-md bg-[#2d3449] text-[#adc6ff] font-['Inter'] text-[14px] font-semibold">Week</button>
                  <button className="px-4 py-1.5 rounded-md text-[#c2c6d6] hover:text-[#dae2fd] font-['Inter'] text-[14px] font-semibold">Month</button>
                </div>
              </div>
              <div className="h-64 w-full relative">
                <div className="absolute inset-0 flex items-end justify-between px-2">
                  <div className="w-full h-full flex items-end gap-1">
                    <div className="flex-1 bg-gradient-to-t from-transparent to-[#adc6ff]/40 rounded-t-lg transition-all hover:to-[#adc6ff]/60" style={{ height: "40%" }}></div>
                    <div className="flex-1 bg-gradient-to-t from-transparent to-[#adc6ff]/40 rounded-t-lg transition-all hover:to-[#adc6ff]/60" style={{ height: "65%" }}></div>
                    <div className="flex-1 bg-gradient-to-t from-transparent to-[#adc6ff]/40 rounded-t-lg transition-all hover:to-[#adc6ff]/60" style={{ height: "55%" }}></div>
                    <div className="flex-1 bg-gradient-to-t from-transparent to-[#adc6ff]/40 rounded-t-lg transition-all hover:to-[#adc6ff]/60" style={{ height: "85%" }}></div>
                    <div className="flex-1 bg-gradient-to-t from-transparent to-[#adc6ff]/40 rounded-t-lg transition-all hover:to-[#adc6ff]/60" style={{ height: "70%" }}></div>
                    <div className="flex-1 bg-gradient-to-t from-transparent to-[#adc6ff]/40 rounded-t-lg transition-all hover:to-[#adc6ff]/60" style={{ height: "95%" }}></div>
                    <div className="flex-1 bg-gradient-to-t from-transparent to-[#adc6ff]/40 rounded-t-lg transition-all hover:to-[#adc6ff]/60" style={{ height: "45%" }}></div>
                  </div>
                </div>
                <div className="absolute -bottom-8 left-0 right-0 flex justify-between px-4 text-xs text-[#c2c6d6] font-medium uppercase tracking-wider">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>
            </div>

            {/* Today's Tasks & Achievements */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
              {/* Today's Tasks */}
              <div className="glass-card p-[32px] flex-1">
                <h3 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold mb-6">Today's Focus</h3>
                <div className="space-y-4">
                  <label className="flex items-center gap-4 group cursor-pointer p-3 rounded-xl hover:bg-white/5 transition-all">
                    <div className="relative w-6 h-6">
                      <input defaultChecked className="peer sr-only" type="checkbox" />
                      <div className="w-full h-full border-2 border-[#adc6ff] rounded-md flex items-center justify-center peer-checked:bg-[#adc6ff] transition-all">
                        <span className="material-symbols-outlined text-[#002e6a] text-[16px] hidden peer-checked:block">check</span>
                      </div>
                    </div>
                    <span className="font-['Inter'] text-[16px] text-[#dae2fd] flex-1 group-hover:translate-x-1 transition-transform line-through opacity-50">Morning Hydration</span>
                  </label>
                  
                  <label className="flex items-center gap-4 group cursor-pointer p-3 rounded-xl hover:bg-white/5 transition-all">
                    <div className="relative w-6 h-6">
                      <input defaultChecked className="peer sr-only" type="checkbox" />
                      <div className="w-full h-full border-2 border-[#adc6ff] rounded-md flex items-center justify-center peer-checked:bg-[#adc6ff] transition-all">
                        <span className="material-symbols-outlined text-[#002e6a] text-[16px] hidden peer-checked:block">check</span>
                      </div>
                    </div>
                    <span className="font-['Inter'] text-[16px] text-[#dae2fd] flex-1 group-hover:translate-x-1 transition-transform line-through opacity-50">Log Breakfast</span>
                  </label>

                  <label className="flex items-center gap-4 group cursor-pointer p-3 rounded-xl hover:bg-white/5 transition-all">
                    <div className="relative w-6 h-6">
                      <input className="peer sr-only" type="checkbox" />
                      <div className="w-full h-full border-2 border-[#8c909f] rounded-md flex items-center justify-center peer-checked:bg-[#adc6ff] peer-checked:border-[#adc6ff] transition-all">
                        <span className="material-symbols-outlined text-[#002e6a] text-[16px] hidden peer-checked:block">check</span>
                      </div>
                    </div>
                    <span className="font-['Inter'] text-[16px] text-[#dae2fd] flex-1 group-hover:translate-x-1 transition-transform">45-min HIIT Session</span>
                    <span className="px-2 py-1 bg-[#4edea3]/10 text-[#4edea3] text-[10px] rounded uppercase font-bold">Important</span>
                  </label>
                  
                  <label className="flex items-center gap-4 group cursor-pointer p-3 rounded-xl hover:bg-white/5 transition-all">
                    <div className="relative w-6 h-6">
                      <input className="peer sr-only" type="checkbox" />
                      <div className="w-full h-full border-2 border-[#8c909f] rounded-md flex items-center justify-center peer-checked:bg-[#adc6ff] peer-checked:border-[#adc6ff] transition-all">
                        <span className="material-symbols-outlined text-[#002e6a] text-[16px] hidden peer-checked:block">check</span>
                      </div>
                    </div>
                    <span className="font-['Inter'] text-[16px] text-[#dae2fd] flex-1 group-hover:translate-x-1 transition-transform">Meditation (10m)</span>
                  </label>
                </div>
              </div>

              {/* Recent Achievements */}
              <div className="glass-card p-[32px]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold">Milestones</h3>
                  <button className="text-[#adc6ff] font-['Inter'] text-[14px] hover:underline">View All</button>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#adc6ff] to-[#4d8eff] flex items-center justify-center shadow-lg shadow-[#adc6ff]/20 group cursor-pointer">
                      <span className="material-symbols-outlined text-[#002e6a] text-3xl group-hover:scale-110 transition-transform">military_tech</span>
                    </div>
                    <span className="font-['Inter'] text-[12px] font-semibold text-center">7-Day Streak</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4edea3] to-[#00a572] flex items-center justify-center shadow-lg shadow-[#4edea3]/20 group cursor-pointer">
                      <span className="material-symbols-outlined text-[#003824] text-3xl group-hover:scale-110 transition-transform">workspace_premium</span>
                    </div>
                    <span className="font-['Inter'] text-[12px] font-semibold text-center">Hydration Pro</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d0bcff] to-[#a078ff] flex items-center justify-center shadow-lg shadow-[#d0bcff]/20 group cursor-pointer">
                      <span className="material-symbols-outlined text-[#3c0091] text-3xl group-hover:scale-110 transition-transform">local_fire_department</span>
                    </div>
                    <span className="font-['Inter'] text-[12px] font-semibold text-center">10k Burned</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Goal Progress */}
            <div className="col-span-12 glass-card p-[32px] mb-[64px]">
              <h3 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold mb-8">Quarterly Goal Progress</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-['Inter'] text-[14px] font-semibold">Weight Target (75kg)</span>
                    <span className="text-[#adc6ff] font-bold">72%</span>
                  </div>
                  <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#adc6ff] rounded-full" style={{ width: "72%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-['Inter'] text-[14px] font-semibold">Sleep Quality (avg 8h)</span>
                    <span className="text-[#4edea3] font-bold">88%</span>
                  </div>
                  <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#4edea3] rounded-full" style={{ width: "88%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-['Inter'] text-[14px] font-semibold">Endurance Boost</span>
                    <span className="text-[#d0bcff] font-bold">45%</span>
                  </div>
                  <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#d0bcff] rounded-full" style={{ width: "45%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-['Inter'] text-[14px] font-semibold">Strength Training</span>
                    <span className="text-[#ffb4ab] font-bold">60%</span>
                  </div>
                  <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#ffb4ab] rounded-full" style={{ width: "60%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button (FAB) */}
      <button className="fixed bottom-8 right-8 w-16 h-16 bg-[#adc6ff] text-[#002e6a] rounded-2xl shadow-2xl shadow-[#adc6ff]/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group">
        <span className="material-symbols-outlined text-3xl group-hover:rotate-90 transition-transform">add</span>
      </button>
    </div>
  );
}
