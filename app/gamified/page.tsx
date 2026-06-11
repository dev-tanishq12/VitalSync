"use client";

import { useState } from "react";
import Link from "next/link";

import { useAuth } from "@/lib/AuthContext";
import { authFetch } from "@/lib/fetch";
import { useEffect } from "react";

export default function GamifiedPage() {
  const { user } = useAuth();
  const [joinStatus, setJoinStatus] = useState<{ [key: string]: string }>({});
  const [isJoining, setIsJoining] = useState<{ [key: string]: boolean }>({});
  const [myChallenges, setMyChallenges] = useState<any[]>([]);

  // New State
  const [showAllChallenges, setShowAllChallenges] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [customTitle, setCustomTitle] = useState("");
  const [customTarget, setCustomTarget] = useState("");
  const [customUnit, setCustomUnit] = useState("units");
  const [customCreateStatus, setCustomCreateStatus] = useState("Create Challenge");

  useEffect(() => {
    if (user) fetchChallenges();
  }, [user]);

  const fetchChallenges = async () => {
    try {
      const res = await authFetch("/api/challenges");
      if (res.ok) {
        const data = await res.json();
        setMyChallenges(data.challenges || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleJoin = async (challengeId: string, title: string, targetValue: number, unit: string) => {
    setIsJoining({ ...isJoining, [challengeId]: true });
    setJoinStatus({ ...joinStatus, [challengeId]: "Joining..." });
    
    try {
      const res = await authFetch("/api/challenges", {
        method: "POST",
        body: JSON.stringify({
          challengeId,
          title,
          targetValue,
          unit,
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
        })
      });
      if (res.ok) {
        setJoinStatus({ ...joinStatus, [challengeId]: "Joined!" });
        fetchChallenges();
      } else {
        setJoinStatus({ ...joinStatus, [challengeId]: "Error" });
      }
    } catch (e) {
      setJoinStatus({ ...joinStatus, [challengeId]: "Error" });
    } finally {
      setTimeout(() => {
        setIsJoining({ ...isJoining, [challengeId]: false });
      }, 1500);
    }
  };

  const handleCreateCustomChallenge = async () => {
    if (!customTitle || !customTarget) return;
    setCustomCreateStatus("Creating...");
    try {
      const challengeId = `custom_${Date.now()}`;
      const res = await authFetch("/api/challenges", {
        method: "POST",
        body: JSON.stringify({
          challengeId,
          title: customTitle,
          targetValue: Number(customTarget),
          unit: customUnit,
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
        })
      });
      if (res.ok) {
        setCustomCreateStatus("Created!");
        fetchChallenges();
        setTimeout(() => {
          setIsCreateModalOpen(false);
          setCustomTitle("");
          setCustomTarget("");
          setCustomCreateStatus("Create Challenge");
        }, 1000);
      } else {
        setCustomCreateStatus("Error");
        setTimeout(() => setCustomCreateStatus("Create Challenge"), 2000);
      }
    } catch (e) {
      setCustomCreateStatus("Error");
      setTimeout(() => setCustomCreateStatus("Create Challenge"), 2000);
    }
  };

  const handleCompleteChallenge = async (id: string) => {
    if (!confirm("Mark this challenge as completed?")) return;
    try {
      const res = await authFetch("/api/challenges", {
        method: "PUT",
        body: JSON.stringify({ id, status: "completed" })
      });
      if (res.ok) {
        fetchChallenges();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const isJoined = (challengeId: string) => myChallenges.some(c => c.challengeId === challengeId);
  const getChallengeProgress = (challengeId: string) => {
    const c = myChallenges.find(ch => ch.challengeId === challengeId);
    if (!c || !c.targetValue) return 0;
    return Math.min(100, Math.floor((c.currentValue / c.targetValue) * 100));
  };
  const getChallengeData = (challengeId: string) => myChallenges.find(ch => ch.challengeId === challengeId);

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
              {user?.photoURL ? (
                <img alt="User avatar" className="w-full h-full object-cover" src={user.photoURL} referrerPolicy="no-referrer" />
              ) : (
                <div className="w-full h-full bg-[#2d3449] flex items-center justify-center text-[#adc6ff] font-bold">
                  {user?.displayName?.charAt(0) || "U"}
                </div>
              )}
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

          <Link href="/goals" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:bg-white/5 transition-all duration-200">
            <span className="material-symbols-outlined">target</span>
            <span className="font-['Inter'] text-[14px]">Goals</span>
          </Link>
          <Link href="/records" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:bg-white/5 transition-all duration-200">
            <span className="material-symbols-outlined">folder_shared</span>
            <span className="font-['Inter'] text-[14px]">Health Records</span>
          </Link>
          <Link href="/gamified" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#adc6ff]/20 text-[#adc6ff] border-l-4 border-[#adc6ff] transition-all duration-200">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
            <span className="font-['Inter'] text-[14px]">Challenges</span>
          </Link>

          <Link href="/devices" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:bg-white/5 transition-all duration-200">
            <span className="material-symbols-outlined">devices</span>
            <span className="font-['Inter'] text-[14px]">Devices</span>
          </Link>
          <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#c2c6d6]/80 hover:bg-white/5 transition-all duration-200">
            <span className="material-symbols-outlined">person</span>
            <span className="font-['Inter'] text-[14px]">Profile</span>
          </Link>
        </div>
        <div className="px-4 pt-4 border-t border-white/5 space-y-1">


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
              <div className="flex gap-4">
                <button onClick={() => setIsCreateModalOpen(true)} className="text-[#002e6a] bg-[#adc6ff] hover:bg-[#adc6ff]/80 px-4 py-2 rounded-lg font-['Inter'] text-[14px] font-bold flex items-center gap-2 transition-all">
                  <span className="material-symbols-outlined text-sm">add</span> Create Custom
                </button>
                <button onClick={() => setShowAllChallenges(!showAllChallenges)} className="text-[#adc6ff] font-['Inter'] text-[14px] font-semibold flex items-center gap-1 hover:underline transition-all">
                  {showAllChallenges ? "Show Less" : "View All Challenges"} <span className="material-symbols-outlined text-sm">{showAllChallenges ? "expand_less" : "expand_more"}</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Weekly Step Challenge */}
              {getChallengeData("step_70k")?.status !== "completed" && (
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
                      <span className="text-[#4edea3] font-bold font-['Plus_Jakarta_Sans'] text-[24px] font-semibold">{isJoined("step_70k") ? getChallengeProgress("step_70k") : 0}%</span>
                      <p className="font-['Inter'] text-[12px] font-semibold text-[#c2c6d6] uppercase">Progress</p>
                    </div>
                  </div>
                  {/* Progress Tracker */}
                  <div className="space-y-2">
                    <div className="flex justify-between font-['Inter'] text-[12px] font-semibold">
                      <span className="text-[#c2c6d6]">{isJoined("step_70k") ? getChallengeData("step_70k")?.currentValue || 0 : 0} / 70,000 steps</span>
                      <span className="text-[#d0bcff]">7 days left</span>
                    </div>
                    <div className="h-3 bg-[#2d3449] rounded-full overflow-hidden">
                      <div className="h-full bg-[#4edea3] shadow-[0_0_12px_rgba(78,222,163,0.3)] transition-all duration-1000" style={{ width: `${isJoined("step_70k") ? getChallengeProgress("step_70k") : 0}%` }}></div>
                    </div>
                  </div>
                  <div className="mt-auto flex gap-3 pt-4">
                    {(() => {
                      const cData = getChallengeData("step_70k");
                      if (cData?.status === "completed") {
                        return (
                          <button disabled className="flex-1 py-3 bg-[#4edea3]/10 text-[#4edea3] font-bold rounded-lg border border-[#4edea3]/50 shadow-lg flex items-center justify-center gap-2 cursor-default">
                            <span className="material-symbols-outlined text-sm">check_circle</span> Completed
                          </button>
                        );
                      } else if (cData) {
                        return (
                          <button onClick={() => handleCompleteChallenge(cData.id)} className="flex-1 py-3 bg-[#1e293b] hover:bg-[#4edea3]/20 text-[#4edea3] font-bold rounded-lg border border-[#4edea3]/50 transition-all shadow-lg">
                            Mark as Completed
                          </button>
                        );
                      } else {
                        return (
                          <button onClick={() => handleJoin("step_70k", "Weekly Step Challenge", 70000, "steps")} disabled={isJoining["step_70k"]} className="flex-1 py-3 bg-[#adc6ff] text-[#002e6a] font-bold rounded-lg active:scale-95 transition-all shadow-lg shadow-[#adc6ff]/20">
                            {joinStatus["step_70k"] || "Join Challenge"}
                          </button>
                        );
                      }
                    })()}
                      </div>
                    </div>
                  </div>
                )}

              {/* Hydration Sprint */}
              {getChallengeData("hydration_3l")?.status !== "completed" && (
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
                      <span className="text-[#d0bcff] font-bold font-['Plus_Jakarta_Sans'] text-[24px] font-semibold">{isJoined("hydration_3l") ? getChallengeProgress("hydration_3l") : 0}%</span>
                      <p className="font-['Inter'] text-[12px] font-semibold text-[#c2c6d6] uppercase">{isJoined("hydration_3l") ? "Progress" : "Not Started"}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between font-['Inter'] text-[12px] font-semibold">
                      <span className="text-[#c2c6d6]">{isJoined("hydration_3l") ? getChallengeData("hydration_3l")?.currentValue || 0 : 0} / 3 L</span>
                      <span className="text-[#d0bcff]">7 days left</span>
                    </div>
                    <div className="h-3 bg-[#2d3449] rounded-full overflow-hidden">
                      <div className="h-full bg-[#d0bcff] shadow-[0_0_12px_rgba(160,120,255,0.3)] transition-all duration-1000" style={{ width: `${isJoined("hydration_3l") ? getChallengeProgress("hydration_3l") : 0}%` }}></div>
                    </div>
                  </div>
                  <div className="mt-auto flex gap-3 pt-4">
                    {(() => {
                      const cData = getChallengeData("hydration_3l");
                      if (cData?.status === "completed") {
                        return (
                          <button disabled className="flex-1 py-3 bg-[#d0bcff]/10 text-[#d0bcff] font-bold rounded-lg border border-[#d0bcff]/50 shadow-lg flex items-center justify-center gap-2 cursor-default">
                            <span className="material-symbols-outlined text-sm">check_circle</span> Completed
                          </button>
                        );
                      } else if (cData) {
                        return (
                          <button onClick={() => handleCompleteChallenge(cData.id)} className="flex-1 py-3 bg-[#1e293b] hover:bg-[#d0bcff]/20 text-[#d0bcff] font-bold rounded-lg border border-[#d0bcff]/50 transition-all shadow-lg">
                            Mark as Completed
                          </button>
                        );
                      } else {
                        return (
                          <button onClick={() => handleJoin("hydration_3l", "Hydration Sprint", 3, "L")} disabled={isJoining["hydration_3l"]} className="flex-1 py-3 bg-[#d0bcff] text-[#171f33] font-bold rounded-lg active:scale-95 transition-all shadow-lg shadow-[#d0bcff]/20">
                            {joinStatus["hydration_3l"] || "Join Sprint"}
                          </button>
                        );
                      }
                    })()}
                      </div>
                    </div>
                  </div>
                )}

              {/* Dynamic Custom Challenges */}
              {myChallenges.filter(c => c.challengeId?.startsWith("custom_") && c.status !== "completed").map(c => (
                <div key={c.challengeId} className="glass-panel rounded-xl overflow-hidden group hover:border-[#4edea3]/40 transition-all duration-300 flex flex-col h-full border border-white/5 relative">
                  {c.status === "completed" && (
                    <div className="absolute top-4 right-4 z-10 bg-[#4edea3] text-[#00285d] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-lg shadow-[#4edea3]/20">
                      <span className="material-symbols-outlined text-sm">check_circle</span> Completed
                    </div>
                  )}
                  <div className={`p-8 flex flex-col flex-1 gap-4 ${c.status === "completed" ? "opacity-70 grayscale" : ""}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="material-symbols-outlined text-[#4edea3]">star</span>
                          <span className="text-[#4edea3] text-[12px] font-bold uppercase tracking-wider">Custom Challenge</span>
                        </div>
                        <h4 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold text-[#dae2fd]">{c.title}</h4>
                        <p className="text-[#c2c6d6] font-['Inter'] text-[14px]">Reach {c.targetValue} {c.unit}.</p>
                      </div>
                    </div>
                    
                    {c.status !== "completed" && (
                      <div className="mt-auto flex gap-3 pt-4">
                        <button onClick={() => handleCompleteChallenge(c.id)} className="flex-1 py-3 bg-[#1e293b] hover:bg-[#4edea3]/20 text-[#4edea3] font-bold rounded-lg border border-[#4edea3]/50 transition-all shadow-lg">
                          Mark as Completed
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* View More Challenges Conditionally Rendered */}
              {showAllChallenges && (
                <>
                  {getChallengeData("calorie_3000")?.status !== "completed" && (
                    <div className="glass-panel rounded-xl overflow-hidden group hover:border-[#ffb4ab]/40 transition-all duration-300 flex flex-col h-full">
                    <div className="p-8 flex flex-col flex-1 gap-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold text-[#dae2fd]">Calorie Crusher</h4>
                          <p className="text-[#c2c6d6] font-['Inter'] text-[14px]">Burn 3000 calories this week.</p>
                        </div>
                      </div>
                      <div className="mt-auto flex gap-3 pt-4">
                        {(() => {
                          const cData = getChallengeData("calorie_3000");
                          if (cData?.status === "completed") {
                            return (
                              <button disabled className="flex-1 py-3 bg-[#ffb4ab]/10 text-[#ffb4ab] font-bold rounded-lg border border-[#ffb4ab]/50 shadow-lg flex items-center justify-center gap-2 cursor-default">
                                <span className="material-symbols-outlined text-sm">check_circle</span> Completed
                              </button>
                            );
                          } else if (cData) {
                            return (
                              <button onClick={() => handleCompleteChallenge(cData.id)} className="flex-1 py-3 bg-[#1e293b] hover:bg-[#ffb4ab]/20 text-[#ffb4ab] font-bold rounded-lg border border-[#ffb4ab]/50 transition-all shadow-lg">
                                Mark as Completed
                              </button>
                            );
                          } else {
                            return (
                              <button onClick={() => handleJoin("calorie_3000", "Calorie Crusher", 3000, "kcal")} disabled={isJoining["calorie_3000"]} className="flex-1 py-3 bg-[#ffb4ab] text-[#171f33] font-bold rounded-lg active:scale-95 transition-all shadow-lg shadow-[#ffb4ab]/20">
                                {joinStatus["calorie_3000"] || "Join Challenge"}
                              </button>
                            );
                          }
                        })()}
                      </div>
                    </div>
                  </div>
                  )}

                  {getChallengeData("sleep_8h")?.status !== "completed" && (
                    <div className="glass-panel rounded-xl overflow-hidden group hover:border-[#a078ff]/40 transition-all duration-300 flex flex-col h-full">
                    <div className="p-8 flex flex-col flex-1 gap-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold text-[#dae2fd]">Sleep Consistency</h4>
                          <p className="text-[#c2c6d6] font-['Inter'] text-[14px]">Log 8 hours of sleep for 5 nights.</p>
                        </div>
                      </div>
                      <div className="mt-auto flex gap-3 pt-4">
                        {(() => {
                          const cData = getChallengeData("sleep_8h");
                          if (cData?.status === "completed") {
                            return (
                              <button disabled className="flex-1 py-3 bg-[#a078ff]/10 text-[#a078ff] font-bold rounded-lg border border-[#a078ff]/50 shadow-lg flex items-center justify-center gap-2 cursor-default">
                                <span className="material-symbols-outlined text-sm">check_circle</span> Completed
                              </button>
                            );
                          } else if (cData) {
                            return (
                              <button onClick={() => handleCompleteChallenge(cData.id)} className="flex-1 py-3 bg-[#1e293b] hover:bg-[#a078ff]/20 text-[#a078ff] font-bold rounded-lg border border-[#a078ff]/50 transition-all shadow-lg">
                                Mark as Completed
                              </button>
                            );
                          } else {
                            return (
                              <button onClick={() => handleJoin("sleep_8h", "Sleep Consistency", 5, "nights")} disabled={isJoining["sleep_8h"]} className="flex-1 py-3 bg-[#a078ff] text-[#171f33] font-bold rounded-lg active:scale-95 transition-all shadow-lg shadow-[#a078ff]/20">
                                {joinStatus["sleep_8h"] || "Join Challenge"}
                              </button>
                            );
                          }
                        })()}
                      </div>
                    </div>
                  </div>
                  )}
                </>
              )}
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

            </div>

            {/* Bento Grid of Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              
              {/* Completed User Challenges Rendered Dynamically */}
              {myChallenges.filter(c => c.status === "completed").map(c => (
                <div key={c.id} className="glass-panel rounded-xl p-8 flex flex-col items-center text-center gap-4 group hover:bg-[#adc6ff]/5 transition-all cursor-pointer">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4edea3] to-[#003824] flex items-center justify-center text-[#0b1326] shadow-xl shadow-[#4edea3]/30 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-[#4edea3] w-6 h-6 rounded-full border-2 border-[#0b1326] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[14px] text-[#003824]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-['Plus_Jakarta_Sans'] text-[18px] font-semibold text-[#dae2fd] text-base">{c.title}</h5>
                    <p className="font-['Inter'] text-[12px] font-semibold text-[#c2c6d6]">Completed {c.targetValue} {c.unit}</p>
                  </div>
                </div>
              ))}

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


          {/* Create Custom Challenge Modal */}
          {isCreateModalOpen && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#0b1326]/80 backdrop-blur-sm">
              <div className="glass-panel w-full max-w-md p-8 rounded-2xl border border-[#adc6ff]/20 shadow-2xl relative animate-in fade-in zoom-in duration-300">
                <button onClick={() => setIsCreateModalOpen(false)} className="absolute top-4 right-4 text-[#c2c6d6] hover:text-[#dae2fd] transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#adc6ff]/20 flex items-center justify-center text-[#adc6ff]">
                    <span className="material-symbols-outlined text-2xl">add_task</span>
                  </div>
                  <h2 className="text-[24px] font-['Plus_Jakarta_Sans'] font-bold text-[#dae2fd]">Create Challenge</h2>
                </div>
                <div className="space-y-5">
                  <div>
                    <label className="block text-[12px] text-[#8c909f] font-semibold mb-2 uppercase tracking-wider">Challenge Name</label>
                    <input type="text" value={customTitle} onChange={(e) => setCustomTitle(e.target.value)} className="w-full bg-[#171f33]/50 border border-[#424754] rounded-xl px-4 py-3 text-[#dae2fd] outline-none focus:border-[#adc6ff] transition-colors" placeholder="e.g. Weekend Warrior Run" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] text-[#8c909f] font-semibold mb-2 uppercase tracking-wider">Target</label>
                      <input type="number" value={customTarget} onChange={(e) => setCustomTarget(e.target.value)} className="w-full bg-[#171f33]/50 border border-[#424754] rounded-xl px-4 py-3 text-[#dae2fd] outline-none focus:border-[#adc6ff] transition-colors" placeholder="e.g. 50" />
                    </div>
                    <div>
                      <label className="block text-[12px] text-[#8c909f] font-semibold mb-2 uppercase tracking-wider">Unit</label>
                      <input type="text" value={customUnit} onChange={(e) => setCustomUnit(e.target.value)} className="w-full bg-[#171f33]/50 border border-[#424754] rounded-xl px-4 py-3 text-[#dae2fd] outline-none focus:border-[#adc6ff] transition-colors" placeholder="e.g. miles" />
                    </div>
                  </div>
                  <button 
                    onClick={handleCreateCustomChallenge}
                    disabled={customCreateStatus !== "Create Challenge" || !customTitle || !customTarget}
                    className="w-full mt-4 bg-[#adc6ff] hover:bg-[#8caeff] text-[#001a42] font-bold py-4 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">{customCreateStatus === "Creating..." ? "sync" : "rocket_launch"}</span>
                    {customCreateStatus}
                  </button>
                </div>
              </div>
            </div>
          )}

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

        <Link href="/profile" className="flex flex-col items-center gap-1 text-[#c2c6d6]">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-bold uppercase">Profile</span>
        </Link>
      </footer>
    </div>
  );
}
