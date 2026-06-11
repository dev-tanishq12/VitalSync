"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import { authFetch } from "@/lib/fetch";

export default function TopNavBar() {
  const { user } = useAuth();
  const [isSyncing, setIsSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [recordData, setRecordData] = useState({ steps: 0, sleep: 0, heartRate: 0, calories: 0 });

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      await authFetch("/api/devices/sync", { method: "POST" });
      setToastMessage("Devices synced successfully!");
      setTimeout(() => setToastMessage(""), 3000);
    } catch (err) {
      console.error(err);
    }
    setIsSyncing(false);
  };

  const handleNotification = () => {
    setToastMessage("No new notifications.");
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleAddRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const promises = [];
      if (recordData.steps > 0) {
        promises.push(authFetch("/api/records", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ metricType: "steps", value: recordData.steps, unit: "steps" }) }));
      }
      if (recordData.sleep > 0) {
        promises.push(authFetch("/api/records", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ metricType: "sleep", value: recordData.sleep, unit: "hours" }) }));
      }
      if (recordData.heartRate > 0) {
        promises.push(authFetch("/api/records", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ metricType: "heart_rate", value: recordData.heartRate, unit: "bpm" }) }));
      }
      if (recordData.calories > 0) {
        promises.push(authFetch("/api/records", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ metricType: "calories", value: recordData.calories, unit: "kcal" }) }));
      }
      
      await Promise.all(promises);
      setShowAddModal(false);
      setToastMessage("Health records added!");
      setTimeout(() => setToastMessage(""), 3000);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
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
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleNotification} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 active:scale-95 transition-all text-[#c2c6d6]" title="Notifications">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button onClick={handleSync} className={`w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 active:scale-95 transition-all text-[#c2c6d6] ${isSyncing ? "animate-spin text-[#adc6ff]" : ""}`} title="Sync Devices">
              <span className="material-symbols-outlined">sync</span>
            </button>
            <button onClick={() => setShowAddModal(true)} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#adc6ff]/20 text-[#adc6ff] hover:bg-[#adc6ff]/30 active:scale-95 transition-all" title="Add Metric">
              <span className="material-symbols-outlined">add_circle</span>
            </button>
          </div>
          <Link href="/profile" className="h-10 w-10 rounded-full overflow-hidden border-2 border-[#adc6ff]/30 ml-2 flex items-center justify-center bg-[#002e6a] hover:ring-2 hover:ring-[#adc6ff] transition-all cursor-pointer">
            {user?.photoURL ? (
              <img alt="User avatar" className="w-full h-full object-cover" src={user.photoURL} referrerPolicy="no-referrer" />
            ) : (
              <span className="text-[#adc6ff] font-bold text-lg">{user?.displayName?.charAt(0) || "O"}</span>
            )}
          </Link>
        </div>
      </header>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-8 bg-[#4edea3]/20 border border-[#4edea3] text-[#4edea3] px-6 py-3 rounded-lg shadow-lg z-[100] animate-in fade-in slide-in-from-top-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined">check_circle</span>
            <span className="font-['Inter'] font-medium">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Add Metric Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#060e20]/80 backdrop-blur-sm z-[110] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#131b2e] border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button onClick={() => setShowAddModal(false)} className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-[#c2c6d6] hover:text-white transition-all">
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="w-12 h-12 bg-[#adc6ff]/10 text-[#adc6ff] rounded-xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-2xl">post_add</span>
            </div>
            <h2 className="font-['Plus_Jakarta_Sans'] text-[24px] font-bold text-[#adc6ff] mb-2">Log Health Record</h2>
            <p className="text-[#c2c6d6] text-sm mb-6">Manually input your latest metrics to keep your dashboard up to date.</p>
            
            <form onSubmit={handleAddRecord} className="space-y-5">
              <div>
                <label className="block text-[13px] font-semibold text-[#c2c6d6] mb-2 uppercase tracking-wider">Steps</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#adc6ff]">directions_walk</span>
                  <input type="number" required value={recordData.steps || ""} onChange={e => setRecordData({...recordData, steps: Number(e.target.value)})} className="w-full bg-[#060e20] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white focus:border-[#adc6ff] focus:ring-1 focus:ring-[#adc6ff] outline-none transition-all placeholder:text-white/20" placeholder="e.g. 8500" />
                </div>
              </div>
              
              <div>
                <label className="block text-[13px] font-semibold text-[#c2c6d6] mb-2 uppercase tracking-wider">Sleep Duration (Hours)</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#4d8eff]">bedtime</span>
                  <input type="number" step="0.1" required value={recordData.sleep || ""} onChange={e => setRecordData({...recordData, sleep: Number(e.target.value)})} className="w-full bg-[#060e20] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white focus:border-[#adc6ff] focus:ring-1 focus:ring-[#adc6ff] outline-none transition-all placeholder:text-white/20" placeholder="e.g. 7.5" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-[#c2c6d6] mb-2 uppercase tracking-wider">Heart Rate</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#ffb4ab]">favorite</span>
                    <input type="number" required value={recordData.heartRate || ""} onChange={e => setRecordData({...recordData, heartRate: Number(e.target.value)})} className="w-full bg-[#060e20] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white focus:border-[#adc6ff] focus:ring-1 focus:ring-[#adc6ff] outline-none transition-all placeholder:text-white/20" placeholder="BPM" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-[13px] font-semibold text-[#c2c6d6] mb-2 uppercase tracking-wider">Calories</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#d0bcff]">local_fire_department</span>
                    <input type="number" required value={recordData.calories || ""} onChange={e => setRecordData({...recordData, calories: Number(e.target.value)})} className="w-full bg-[#060e20] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white focus:border-[#adc6ff] focus:ring-1 focus:ring-[#adc6ff] outline-none transition-all placeholder:text-white/20" placeholder="kcal" />
                  </div>
                </div>
              </div>
              
              <button type="submit" className="w-full bg-[#adc6ff] text-[#002e6a] font-bold py-4 rounded-xl hover:bg-[#dae2fd] hover:shadow-lg hover:shadow-[#adc6ff]/20 active:scale-[0.98] transition-all mt-4 text-[15px]">
                Save Health Record
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
