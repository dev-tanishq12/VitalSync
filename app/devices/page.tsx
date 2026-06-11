"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { authFetch } from "@/lib/fetch";

export default function DevicesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isSyncing, setIsSyncing] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState("");

  const handleSync = async (deviceName: string) => {
    setIsSyncing(deviceName);
    try {
      await authFetch("/api/devices/sync", { method: "POST" });
      setToastMessage(`${deviceName} synced successfully!`);
      setTimeout(() => setToastMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setToastMessage(`Failed to sync ${deviceName}.`);
      setTimeout(() => setToastMessage(""), 3000);
    }
    setIsSyncing(null);
  };

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/join");
      return;
    }
  }, [user, loading, router]);

  const connectedDevices = [
    { name: "Apple Watch Ultra", type: "Smartwatch", icon: "watch", color: "text-[#adc6ff] bg-[#adc6ff]/10", lastSync: "10 mins ago", battery: "84%" },
    { name: "Oura Ring Gen 3", type: "Smart Ring", icon: "radio_button_unchecked", color: "text-[#d0bcff] bg-[#d0bcff]/10", lastSync: "2 hours ago", battery: "42%" },
  ];

  const availableDevices = [
    { name: "Garmin Fenix", type: "Smartwatch", icon: "watch", color: "text-[#4edea3] bg-[#4edea3]/10" },
    { name: "Whoop Strap 4.0", type: "Fitness Tracker", icon: "fitness_center", color: "text-[#ff6b6b] bg-[#ff6b6b]/10" },
    { name: "Fitbit Charge", type: "Fitness Tracker", icon: "watch", color: "text-[#00a572] bg-[#00a572]/10" },
    { name: "MyFitnessPal", type: "Health App", icon: "restaurant", color: "text-[#ffb4ab] bg-[#ffb4ab]/10" },
    { name: "Google Fit", type: "Health App", icon: "favorite", color: "text-[#ffb4ab] bg-[#ffb4ab]/10" },
  ];

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

      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] bg-[#4edea3]/20 border border-[#4edea3]/50 text-[#4edea3] px-6 py-3 rounded-full font-bold shadow-lg shadow-[#4edea3]/20 flex items-center gap-2 animate-in slide-in-from-top-4 fade-in duration-300">
          <span className="material-symbols-outlined">check_circle</span>
          {toastMessage}
        </div>
      )}

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
          <Link href="/records" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5 transition-all duration-200">
            <span className="material-symbols-outlined">folder_shared</span>
            <span className="font-['Inter'] text-[14px]">Health Records</span>
          </Link>
          <Link href="/gamified" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5 transition-all duration-200">
            <span className="material-symbols-outlined">emoji_events</span>
            <span className="font-['Inter'] text-[14px]">Challenges</span>
          </Link>
          <Link href="/devices" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#adc6ff]/20 text-[#adc6ff] border-l-4 border-[#adc6ff] transition-all duration-200">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>devices</span>
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
              <Link href="/devices" className="font-['Inter'] text-[14px] text-[#adc6ff] font-bold border-b-2 border-[#adc6ff] pb-1">Devices</Link>
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
                <h1 className="font-['Plus_Jakarta_Sans'] text-[48px] font-bold text-[#adc6ff] mb-2 leading-tight">Devices Hub</h1>
                <p className="font-['Inter'] text-[18px] text-[#c2c6d6] max-w-xl">
                  Manage your connected wearables and integrations.
                </p>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-[#adc6ff]/10 rounded-full border border-[#adc6ff]/20">
                <span className="material-symbols-outlined text-[#adc6ff]">bluetooth</span>
                <span className="font-['Inter'] text-[14px] text-[#adc6ff] uppercase tracking-widest font-bold">Scanning</span>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Connected Devices */}
            <div className="space-y-6">
              <h2 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold">Connected</h2>
              <div className="space-y-4">
                {connectedDevices.map((device, i) => (
                  <div key={i} className="glass-card p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${device.color}`}>
                        <span className="material-symbols-outlined text-[32px]">{device.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-['Inter'] text-[18px] font-bold">{device.name}</h3>
                        <p className="text-[#c2c6d6]/60 text-[14px] flex gap-3 mt-1">
                          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">sync</span>{device.lastSync}</span>
                          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">battery_charging_full</span>{device.battery}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                      <button className="flex-1 md:flex-none px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[#c2c6d6] font-semibold text-[14px] transition-all border border-white/5">Settings</button>
                      <button 
                        onClick={() => handleSync(device.name)}
                        disabled={isSyncing === device.name}
                        className="flex-1 md:flex-none px-4 py-2 bg-[#adc6ff] text-[#002e6a] rounded-xl font-bold text-[14px] hover:shadow-lg hover:shadow-[#adc6ff]/20 transition-all flex items-center justify-center gap-2"
                      >
                        {isSyncing === device.name ? (
                          <><span className="material-symbols-outlined text-[18px] animate-spin">sync</span> Syncing</>
                        ) : (
                          "Sync Now"
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Integrations */}
            <div className="space-y-6">
              <h2 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold">Available Integrations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableDevices.map((device, i) => (
                  <div key={i} className="glass-card p-5 flex flex-col justify-between h-40">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${device.color}`}>
                        <span className="material-symbols-outlined text-[24px]">{device.icon}</span>
                      </div>
                      <span className="text-[#c2c6d6]/40 material-symbols-outlined text-[20px] cursor-pointer hover:text-[#dae2fd]">info</span>
                    </div>
                    <div>
                      <h3 className="font-['Inter'] text-[16px] font-bold mt-2">{device.name}</h3>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[#c2c6d6]/60 text-[12px]">{device.type}</span>
                        <button className="text-[#adc6ff] font-bold text-[12px] uppercase tracking-wide hover:underline">Connect</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
          <Link href="/devices" className="flex flex-col items-center gap-1 text-[#adc6ff]">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>devices</span>
            <span className="text-[10px] font-bold uppercase">Devices</span>
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
