"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { authFetch } from "@/lib/fetch";

export default function RecordsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [records, setRecords] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/join");
      return;
    }

    const fetchRecords = async () => {
      try {
        const res = await authFetch("/api/records");
        if (res.ok) {
          const data = await res.json();
          setRecords(data.records || []);
        }
      } catch (err) {
        console.error("Failed to fetch records:", err);
      } finally {
        setIsFetching(false);
      }
    };
    
    fetchRecords();
  }, [user, loading, router]);

  const getMetricIcon = (type: string) => {
    switch(type.toLowerCase()) {
      case "heart rate (bpm)":
      case "heart rate":
        return "favorite";
      case "sleep (hours)":
      case "sleep":
        return "bedtime";
      case "steps":
        return "directions_run";
      case "calories":
        return "local_fire_department";
      case "weight":
      case "weight (kg)":
      case "weight (lbs)":
        return "monitor_weight";
      default:
        return "vital_signs";
    }
  };

  const getMetricColor = (type: string) => {
    switch(type.toLowerCase()) {
      case "heart rate (bpm)":
      case "heart rate":
        return "text-[#ff6b6b] bg-[#ff6b6b]/10";
      case "sleep (hours)":
      case "sleep":
        return "text-[#a084e8] bg-[#a084e8]/10";
      case "steps":
        return "text-[#4edea3] bg-[#4edea3]/10";
      case "calories":
        return "text-[#ffb4ab] bg-[#ffb4ab]/10";
      default:
        return "text-[#adc6ff] bg-[#adc6ff]/10";
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  };

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
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5 transition-all duration-200">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-['Inter'] text-[14px]">Dashboard</span>
          </Link>
          <Link href="/goals" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5 transition-all duration-200">
            <span className="material-symbols-outlined">target</span>
            <span className="font-['Inter'] text-[14px]">Goals</span>
          </Link>
          <Link href="/records" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#adc6ff]/20 text-[#adc6ff] border-l-4 border-[#adc6ff] transition-all duration-200">
            <span className="material-symbols-outlined">folder_shared</span>
            <span className="font-['Inter'] text-[14px]">Health Records</span>
          </Link>
          <Link href="/gamified" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5 transition-all duration-200">
            <span className="material-symbols-outlined">emoji_events</span>
            <span className="font-['Inter'] text-[14px]">Challenges</span>
          </Link>
          <Link href="/devices" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5 transition-all duration-200">
            <span className="material-symbols-outlined">devices</span>
            <span className="font-['Inter'] text-[14px]">Devices</span>
          </Link>
          <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5 transition-all duration-200">
            <span className="material-symbols-outlined">person</span>
            <span className="font-['Inter'] text-[14px]">Profile</span>
          </Link>
        </nav>
        
        <div className="px-4 mt-auto border-t border-white/5 pt-4">
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
              <Link href="/dashboard" className="font-['Inter'] text-[14px] text-[#c2c6d6] font-medium hover:text-[#dae2fd] transition-colors">Dashboard</Link>
              <Link href="/records" className="font-['Inter'] text-[14px] text-[#adc6ff] font-bold border-b-2 border-[#adc6ff] pb-1">Records</Link>
            </div>
            <Link href="/profile" className="h-10 w-10 rounded-full overflow-hidden border-2 border-[#adc6ff]/30 flex items-center justify-center bg-[#002e6a] hover:ring-2 hover:ring-[#adc6ff] transition-all cursor-pointer">
              {user?.photoURL ? (
                <img alt="User avatar" className="w-full h-full object-cover" src={user.photoURL} referrerPolicy="no-referrer" />
              ) : (
                <span className="text-[#adc6ff] font-bold text-lg">{user?.displayName?.charAt(0) || "O"}</span>
              )}
            </Link>
          </div>
        </header>

        {/* Content Area */}
        <div className="mt-20 flex-1 overflow-y-auto custom-scrollbar p-8">
          <section className="mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="font-['Plus_Jakarta_Sans'] text-[48px] font-bold text-[#adc6ff] mb-2 leading-tight">Health Records</h1>
                <p className="font-['Inter'] text-[18px] text-[#c2c6d6] max-w-xl">
                  Your historical health timeline.
                </p>
              </div>
            </div>
          </section>

          <div className="glass-card p-8 min-h-[500px]">
            {isFetching ? (
              <div className="flex justify-center items-center h-64">
                <span className="material-symbols-outlined animate-spin text-[48px] text-[#adc6ff]/50">sync</span>
              </div>
            ) : records.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <span className="material-symbols-outlined text-[64px] text-[#c2c6d6]/30 mb-4">history</span>
                <h3 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold text-[#c2c6d6]">No Records Found</h3>
                <p className="text-[#c2c6d6]/60 mt-2 max-w-md">You haven't logged any health records yet. Head over to the Goals page to add manual entries.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-4 px-6 font-['Inter'] font-semibold text-[#c2c6d6]">Metric</th>
                      <th className="py-4 px-6 font-['Inter'] font-semibold text-[#c2c6d6]">Value</th>
                      <th className="py-4 px-6 font-['Inter'] font-semibold text-[#c2c6d6]">Recorded At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record) => (
                      <tr key={record.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getMetricColor(record.metricType)}`}>
                              <span className="material-symbols-outlined">{getMetricIcon(record.metricType)}</span>
                            </div>
                            <span className="font-semibold text-[#dae2fd]">{record.metricType}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-['Plus_Jakarta_Sans'] text-[20px] font-bold text-white">{record.value}</span>
                          <span className="text-[#c2c6d6] ml-2 text-sm">{record.unit}</span>
                        </td>
                        <td className="py-4 px-6 text-[#c2c6d6]">
                          {formatDate(record.recordedAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Bottom NavBar */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#131b2e]/90 backdrop-blur-xl border-t border-white/10 z-50 flex justify-around items-center px-4">
          <Link href="/dashboard" className="flex flex-col items-center gap-1 text-[#c2c6d6]/60 hover:text-[#adc6ff]">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-[10px] font-bold uppercase">Dash</span>
          </Link>
          <Link href="/goals" className="flex flex-col items-center gap-1 text-[#c2c6d6]/60 hover:text-[#adc6ff]">
            <span className="material-symbols-outlined">target</span>
            <span className="text-[10px] font-bold uppercase">Goals</span>
          </Link>
          <Link href="/records" className="flex flex-col items-center gap-1 text-[#adc6ff]">
            <span className="material-symbols-outlined">folder_shared</span>
            <span className="text-[10px] font-bold uppercase">Records</span>
          </Link>
          <Link href="/gamified" className="flex flex-col items-center gap-1 text-[#c2c6d6]/60 hover:text-[#adc6ff]">
            <span className="material-symbols-outlined">emoji_events</span>
            <span className="text-[10px] font-bold uppercase">Play</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center gap-1 text-[#c2c6d6]/60 hover:text-[#adc6ff]">
            <span className="material-symbols-outlined">person</span>
            <span className="text-[10px] font-bold uppercase">Profile</span>
          </Link>
        </nav>
      </main>
    </div>
  );
}
