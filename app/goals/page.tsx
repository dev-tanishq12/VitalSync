"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import { authFetch } from "@/lib/fetch";

export default function GoalsPage() {
  const { user } = useAuth();
  const [saveStatus, setSaveStatus] = useState("Save Record");
  const [records, setRecords] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);
  
  // Form state
  const [metricCategory, setMetricCategory] = useState("Heart Rate (BPM)");
  const [metricValue, setMetricValue] = useState("");
  const [metricDate, setMetricDate] = useState("");
  const [metricTime, setMetricTime] = useState("");

  // Create Goal state
  const [isCreateGoalOpen, setIsCreateGoalOpen] = useState(false);
  const [goalTitle, setGoalTitle] = useState("");
  const [goalTarget, setGoalTarget] = useState("");
  const [goalStatus, setGoalStatus] = useState("Create Goal");

  const handleCreateGoal = async () => {
    if (!goalTitle || !goalTarget) return;
    setGoalStatus("Creating...");
    try {
      const res = await authFetch("/api/goals", {
        method: "POST",
        body: JSON.stringify({
          title: goalTitle,
          description: "",
          targetValue: goalTarget,
          unit: "unit",
        })
      });
      if (res.ok) {
        await authFetch("/api/records", {
          method: "POST",
          body: JSON.stringify({
            metricType: `Goal Set: ${goalTitle}`,
            value: Number(goalTarget) || 0,
            unit: "unit",
            recordType: "goal",
            recordedAt: new Date().toISOString()
          })
        });

        setGoalStatus("Success!");
        fetchGoals();
        setTimeout(() => {
          setIsCreateGoalOpen(false);
          setGoalTitle("");
          setGoalTarget("");
          setGoalStatus("Create Goal");
        }, 1000);
      } else {
        setGoalStatus("Error");
        setTimeout(() => setGoalStatus("Create Goal"), 2000);
      }
    } catch (err) {
      setGoalStatus("Error");
      setTimeout(() => setGoalStatus("Create Goal"), 2000);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRecords();
      fetchGoals();
    }
  }, [user]);

  const fetchGoals = async () => {
    try {
      const res = await authFetch("/api/goals");
      if (res.ok) {
        const data = await res.json();
        setGoals(data.goals || []);
      }
    } catch (err) {
      console.error("Failed to fetch goals", err);
    }
  };

  const fetchRecords = async () => {
    try {
      const res = await authFetch("/api/records");
      if (res.ok) {
        const data = await res.json();
        setRecords(data.records || []);
      }
    } catch (err) {
      console.error("Failed to fetch records", err);
    }
  };

  const handleSave = async () => {
    if (!metricValue) return;
    setSaveStatus("Syncing...");
    
    let combinedDate = new Date();
    if (metricDate && metricTime) {
      combinedDate = new Date(`${metricDate}T${metricTime}`);
    }

    try {
      const res = await authFetch("/api/records", {
        method: "POST",
        body: JSON.stringify({
          metricType: metricCategory,
          value: parseFloat(metricValue),
          unit: metricCategory.includes("BPM") ? "bpm" : metricCategory.includes("kg") ? "kg" : "unit",
          recordedAt: combinedDate.toISOString()
        })
      });
      
      if (res.ok) {
        setSaveStatus("Record Saved!");
        fetchRecords();
        setMetricValue("");
        setTimeout(() => setSaveStatus("Save Record"), 2000);
      } else {
        setSaveStatus("Error Saving");
        setTimeout(() => setSaveStatus("Save Record"), 2000);
      }
    } catch (err) {
      setSaveStatus("Error Saving");
      setTimeout(() => setSaveStatus("Save Record"), 2000);
    }
  };

  const getProgress = (goal: any) => {
    if (!goal.targetValue) return 0;
    return Math.min(100, Math.floor((goal.currentValue / goal.targetValue) * 100));
  };

  const handleDeleteGoal = async (id: string) => {
    if (!confirm("Are you sure you want to delete this goal?")) return;
    try {
      const res = await authFetch(`/api/goals?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchGoals();
      }
    } catch (err) {
      console.error("Failed to delete goal", err);
    }
  };

  return (
    <div className="bg-[#0b1326] text-[#dae2fd] font-['Inter'] selection:bg-[#adc6ff]/30 min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-card {
            background: rgba(30, 41, 59, 0.6);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glass-card:hover {
            background: rgba(30, 41, 59, 0.7);
            border-color: rgba(173, 198, 255, 0.3);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(173, 198, 255, 0.1);
        }
        .sunken-glass {
            background: rgba(6, 14, 32, 0.4);
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .neon-glow {
            box-shadow: 0 0 15px rgba(78, 222, 163, 0.3);
        }
        .active-ring {
            background: conic-gradient(from 0deg, #adc6ff, #4edea3, #a078ff, #adc6ff);
        }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(173, 198, 255, 0.2); border-radius: 10px; }
      `}} />

      {/* TopNavBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-10 h-20 bg-[#171f33]/60 backdrop-blur-xl border-b border-white/10 shadow-md shadow-[#adc6ff]/10">
        <div className="flex items-center gap-6">
          <span className="font-['Plus_Jakarta_Sans'] text-[32px] md:text-[48px] font-bold text-[#adc6ff] md:hidden">VitalSync</span>
          <div className="hidden md:flex ml-8 items-center sunken-glass rounded-full px-4 py-2">
            <span className="material-symbols-outlined text-[#8c909f] mr-2">search</span>
            <input className="bg-transparent border-none focus:ring-0 text-[14px] w-64 placeholder:text-[#424754] outline-none" placeholder="Search biometrics..." type="text" />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="material-symbols-outlined text-[#adc6ff] hover:bg-white/5 transition-colors duration-300 p-2 rounded-full">notifications</button>
          <button className="material-symbols-outlined text-[#adc6ff] hover:bg-white/5 transition-colors duration-300 p-2 rounded-full">sync</button>
          <button className="material-symbols-outlined text-[#adc6ff] hover:bg-white/5 transition-colors duration-300 p-2 rounded-full">add_circle</button>
          <div className="h-10 w-10 rounded-full border border-[#adc6ff]/30 overflow-hidden ml-2 hidden md:block">
            {user?.photoURL ? (
              <img alt="User avatar" className="w-full h-full object-cover" src={user.photoURL} referrerPolicy="no-referrer" />
            ) : (
              <div className="w-full h-full bg-[#2d3449] flex items-center justify-center text-[#adc6ff] font-bold">
                {user?.displayName?.charAt(0) || "U"}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full flex flex-col pt-24 pb-8 w-64 bg-[#131b2e]/60 backdrop-blur-xl border-r border-white/10 shadow-xl shadow-black/20 z-40 overflow-y-auto custom-scrollbar hidden md:flex">
        <div className="px-4 mb-16">
          <div className="flex items-center gap-2 px-2 py-4">
            <div className="bg-[#adc6ff]/20 p-2 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-[#adc6ff]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            </div>
            <div>
              <p className="font-['Plus_Jakarta_Sans'] text-[14px] font-extrabold text-[#adc6ff] leading-none">VitalSync</p>
              <p className="text-[10px] text-[#8c909f] uppercase tracking-widest mt-1">Elite Optimizer</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 space-y-1 px-2">
          <Link href="/dashboard" className="flex items-center gap-4 px-4 py-3 text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5 transition-all duration-200 rounded-xl group active:translate-x-1">
            <span className="material-symbols-outlined group-hover:text-[#adc6ff]">dashboard</span>
            <span className="font-['Inter'] text-[14px]">Dashboard</span>
          </Link>

          <Link href="/goals" className="flex items-center gap-4 px-4 py-3 bg-[#adc6ff]/20 text-[#adc6ff] border-l-4 border-[#adc6ff] transition-all duration-200 rounded-r-xl active:translate-x-1">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>target</span>
            <span className="font-['Inter'] text-[14px]">Goals</span>
          </Link>
          <Link href="/records" className="flex items-center gap-4 px-4 py-3 text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5 transition-all duration-200 rounded-xl group active:translate-x-1">
            <span className="material-symbols-outlined group-hover:text-[#adc6ff]">folder_shared</span>
            <span className="font-['Inter'] text-[14px]">Health Records</span>
          </Link>
          <Link href="/gamified" className="flex items-center gap-4 px-4 py-3 text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5 transition-all duration-200 rounded-xl group active:translate-x-1">
            <span className="material-symbols-outlined group-hover:text-[#adc6ff]">emoji_events</span>
            <span className="font-['Inter'] text-[14px]">Challenges</span>
          </Link>

          <Link href="/devices" className="flex items-center gap-4 px-4 py-3 text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5 transition-all duration-200 rounded-xl group active:translate-x-1">
            <span className="material-symbols-outlined group-hover:text-[#adc6ff]">devices</span>
            <span className="font-['Inter'] text-[14px]">Devices</span>
          </Link>
        </nav>
        
        <div className="mt-auto px-2 pt-16 border-t border-white/5 space-y-1">
          <Link href="/profile" className="flex items-center gap-4 px-4 py-3 text-[#c2c6d6]/80 hover:text-[#dae2fd] hover:bg-white/5 transition-all duration-200 rounded-xl">
            <span className="material-symbols-outlined">person</span>
            <span className="font-['Inter'] text-[14px]">Profile</span>
          </Link>


          <Link href="/" className="flex items-center gap-4 px-4 py-3 text-[#ffb4ab] hover:bg-white/5 transition-all duration-200 rounded-xl">
            <span className="material-symbols-outlined text-[#ffb4ab]">logout</span>
            <span className="font-['Inter'] text-[14px] text-[#ffb4ab]">Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 pt-20 p-10 space-y-16 relative w-full">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#adc6ff]/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#4edea3]/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        
        {/* Section: Goals */}
        <section className="space-y-6" id="goals-dashboard">
          <div className="flex flex-col md:flex-row justify-between md:items-end mb-8 gap-4">
            <div>
              <h1 className="font-['Plus_Jakarta_Sans'] text-[32px] font-semibold text-[#dae2fd]">Health Optimization Goals</h1>
              <p className="text-[#c2c6d6] mt-2 text-[14px]">Track your progress toward peak performance.</p>
            </div>
            <button onClick={() => setIsCreateGoalOpen(true)} className="bg-[#adc6ff] hover:bg-[#4d8eff] text-[#00285d] font-['Inter'] text-[14px] font-semibold px-6 py-2 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#adc6ff]/20 active:scale-95 w-full md:w-auto">
              <span className="material-symbols-outlined">add</span>
              Create New Goal
            </button>
          </div>

          {/* Bento Grid Goals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {goals.map((goal, i) => (
              <div key={goal.id || i} className="glass-card rounded-xl p-8 flex flex-col justify-between group h-80">
                <div className="flex justify-between items-start">
                  <div className="bg-[#adc6ff]/20 p-4 rounded-xl">
                    <span className="material-symbols-outlined text-[#adc6ff] text-3xl">target</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="material-symbols-outlined text-[#424754] hover:text-[#adc6ff] transition-colors">edit</button>
                    <button onClick={() => handleDeleteGoal(goal.id)} className="material-symbols-outlined text-[#424754] hover:text-[#ffb4ab] transition-colors">delete</button>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold">{goal.title}</h3>
                  <p className="text-[#c2c6d6] font-['Inter'] text-[14px]">Current: {goal.currentValue} / {goal.targetValue} {goal.unit}</p>
                </div>
                <div className="w-full mt-6">
                  <div className="flex justify-between text-[12px] font-semibold mb-2 text-[#adc6ff]">
                    <span>{getProgress(goal)}% Complete</span>
                    <span>{goal.targetValue - goal.currentValue} left</span>
                  </div>
                  <div className="h-3 w-full sunken-glass rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#adc6ff] to-[#4d8eff] rounded-full transition-all duration-1000 relative" style={{ width: `${getProgress(goal)}%` }}>
                      <div className="absolute top-0 right-0 h-full w-2 bg-white/40 blur-[2px]"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {goals.length === 0 && (
              <div className="col-span-1 md:col-span-3 glass-card rounded-xl p-12 text-center flex flex-col items-center justify-center">
                <span className="material-symbols-outlined text-6xl text-[#adc6ff]/30 mb-4">flag</span>
                <h3 className="text-xl font-bold text-[#dae2fd] mb-2">No Goals Set</h3>
                <p className="text-[#c2c6d6] mb-6">Create a goal to start optimizing your health journey!</p>
                <button onClick={() => setIsCreateGoalOpen(true)} className="bg-[#adc6ff]/20 hover:bg-[#adc6ff]/40 text-[#adc6ff] font-semibold px-6 py-2 rounded-xl transition-all">Create Goal</button>
              </div>
            )}
          </div>

          {/* Milestones */}
          <div className="mt-16">
            <h2 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold mb-6 flex items-center gap-4">
              <span className="material-symbols-outlined text-[#4edea3]">military_tech</span>
              Recent Milestones
            </h2>
            <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar">
              {/* Badge 1 */}
              <div className="min-w-[120px] flex flex-col items-center gap-2 group">
                <div className="w-20 h-20 rounded-full sunken-glass flex items-center justify-center border-2 border-[#4edea3]/40 relative overflow-hidden transition-transform group-hover:scale-110 cursor-pointer">
                  <div className="absolute inset-0 bg-[#4edea3]/10 blur-sm"></div>
                  <span className="material-symbols-outlined text-[#4edea3] text-3xl z-10" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
                </div>
                <span className="text-[12px] font-semibold text-center">Consistency King</span>
              </div>
              
              {/* Badge 2 */}
              <div className="min-w-[120px] flex flex-col items-center gap-2 group">
                <div className="w-20 h-20 rounded-full sunken-glass flex items-center justify-center border-2 border-[#adc6ff]/40 relative overflow-hidden transition-transform group-hover:scale-110 cursor-pointer">
                  <div className="absolute inset-0 bg-[#adc6ff]/10 blur-sm"></div>
                  <span className="material-symbols-outlined text-[#adc6ff] text-3xl z-10" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                </div>
                <span className="text-[12px] font-semibold text-center">Metabolism Peak</span>
              </div>

              {/* Badge 3 */}
              <div className="min-w-[120px] flex flex-col items-center gap-2 group">
                <div className="w-20 h-20 rounded-full sunken-glass flex items-center justify-center border-2 border-[#d0bcff]/40 relative overflow-hidden transition-transform group-hover:scale-110 opacity-40 grayscale cursor-pointer">
                  <span className="material-symbols-outlined text-[#d0bcff] text-3xl z-10">favorite</span>
                </div>
                <span className="text-[12px] font-semibold text-center opacity-50">Heart Hero</span>
              </div>
            </div>
          </div>
        </section>




        {/* Create Goal Modal */}
        {isCreateGoalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#0b1326]/80 backdrop-blur-sm">
            <div className="glass-card w-full max-w-md p-6 rounded-2xl border border-[#424754]/50 shadow-2xl relative">
              <button 
                onClick={() => setIsCreateGoalOpen(false)}
                className="absolute top-4 right-4 text-[#c2c6d6] hover:text-[#dae2fd]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
              <h2 className="text-[20px] font-['Plus_Jakarta_Sans'] font-bold text-[#dae2fd] mb-6">Create New Goal</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-[12px] text-[#8c909f] font-semibold mb-2">Goal Title</label>
                  <input type="text" value={goalTitle} onChange={(e) => setGoalTitle(e.target.value)} className="w-full bg-[#1e293b]/50 border border-[#424754] rounded-xl px-4 py-3 text-[#dae2fd] outline-none focus:border-[#adc6ff] transition-colors" placeholder="e.g. Daily Steps" />
                </div>
                <div>
                  <label className="block text-[12px] text-[#8c909f] font-semibold mb-2">Target Value</label>
                  <input type="number" value={goalTarget} onChange={(e) => setGoalTarget(e.target.value)} className="w-full bg-[#1e293b]/50 border border-[#424754] rounded-xl px-4 py-3 text-[#dae2fd] outline-none focus:border-[#adc6ff] transition-colors" placeholder="e.g. 10000" />
                </div>
                <button 
                  onClick={handleCreateGoal}
                  disabled={goalStatus !== "Create Goal" || !goalTitle || !goalTarget}
                  className="w-full mt-4 bg-gradient-to-r from-[#adc6ff] to-[#3b82f6] hover:from-[#3b82f6] hover:to-[#005ac2] text-[#001a42] font-bold py-3 rounded-xl transition-all disabled:opacity-50"
                >
                  {goalStatus}
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
