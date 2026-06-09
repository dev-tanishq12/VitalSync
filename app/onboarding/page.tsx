"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function VitalSyncOnboarding() {
  const [step, setStep] = useState(1);
  const [goals, setGoals] = useState<string[]>([]);
  const [stepsVal, setStepsVal] = useState(10000);
  const [sleepVal, setSleepVal] = useState(8);
  const [waterVal, setWaterVal] = useState(3);

  const toggleGoal = (goal: string) => {
    setGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 20;
      const y = (e.clientY / window.innerHeight) * 20;
      const glass = document.getElementById("glass-panel");
      if (glass) {
        glass.style.transform = `perspective(1000px) rotateX(${(y - 10) / 5}deg) rotateY(${(x - 10) / 5}deg)`;
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-[64px]">
      <div className="w-full max-w-4xl">
        <div className="mb-[32px] flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[var(--color-primary)] text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              sync_saved_locally
            </span>
            <span className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold tracking-tighter text-[var(--color-primary)]">
              VitalSync
            </span>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6].map((dot) => (
              <div
                key={dot}
                className={`h-2 rounded-full transition-all duration-500 ${
                  dot === step
                    ? "w-8 purple-gradient-bg"
                    : dot < step
                    ? "w-2 purple-gradient-bg"
                    : "w-2 bg-[#2d3449]"
                }`}
              />
            ))}
          </div>
        </div>

        <div
          id="glass-panel"
          className="glass-panel rounded-[64px] p-[32px] md:p-[48px] min-h-[500px] flex flex-col transition-transform duration-200"
        >
          {/* Step 1 */}
          <section
            className={`step-transition h-full ${
              step === 1 ? "active-step" : "hidden-step"
            }`}
          >
            <div className="grid md:grid-cols-2 gap-[32px] items-center h-full">
              <div className="space-y-[16px]">
                <h1 className="font-['Plus_Jakarta_Sans'] text-[48px] font-bold leading-tight">
                  Welcome to <span className="purple-gradient-text">VitalSync</span>
                </h1>
                <p className="font-['Inter'] text-[18px] text-[#c2c6d6] max-w-md">
                  The elite health optimizer designed for bio-hackers and
                  professionals who demand data-driven performance.
                </p>
                <button
                  className="purple-gradient-bg text-[#00285d] px-[32px] py-[16px] rounded-xl font-['Plus_Jakarta_Sans'] text-[24px] font-semibold hover:scale-[1.02] transition-transform active:scale-95 flex items-center gap-2"
                  onClick={() => setStep(2)}
                >
                  Begin Optimization <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
              <div className="relative rounded-[64px] overflow-hidden aspect-square md:aspect-auto h-full">
                <img
                  className="w-full h-full object-cover grayscale opacity-60"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYg6PGcy7T8qfYODpSaOW15UTb_lAm-37tL6mZ0w8YLIU342wdwXBYkkBrInCE6koSFi6SOOUoUQQWbZW412VCAJ9FKADJs0bxptGLDHGH0u6jIKka14UDzPQNtRndV2cIN9ZhDZEj7Pdb1kqfmsQGwvn07JNIGSsmQJ4iP3odVSdXzoKOIAs3pgV3Irq5buK-7YIwmAqkuHIAKz5WXh4WXdTCn14RKKDifAUBcK3-0f_zdjjifX6lZFyhdxJ8h6T8hT6t9f5oA9tn"
                  alt="Medical lab"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] to-transparent"></div>
              </div>
            </div>
          </section>

          {/* Step 2 */}
          <section
            className={`step-transition ${
              step === 2 ? "active-step" : "hidden-step"
            }`}
          >
            <div className="space-y-[8px] mb-[32px]">
              <h2 className="font-['Plus_Jakarta_Sans'] text-[32px] font-semibold">
                Define Your Focus
              </h2>
              <p className="text-[#c2c6d6]">
                Select the metrics you want to optimize first.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-[16px]">
              {[
                { id: "muscle", icon: "fitness_center", color: "text-[#adc6ff]", title: "Muscle Gain", desc: "Hypertrophy tracking" },
                { id: "sleep", icon: "bedtime", color: "text-[#4edea3]", title: "Sleep Quality", desc: "Circadian optimization" },
                { id: "weight", icon: "monitoring", color: "text-[#d0bcff]", title: "Weight Loss", desc: "Metabolic efficiency" },
                { id: "focus", icon: "psychology", color: "text-[#adc6ff]", title: "Focus", desc: "Cognitive endurance" },
                { id: "longevity", icon: "favorite", color: "text-[#4edea3]", title: "Longevity", desc: "Biological age reduction" },
                { id: "hydration", icon: "water_drop", color: "text-[#d0bcff]", title: "Hydration", desc: "Electrolyte balance" },
              ].map((item) => (
                <div
                  key={item.id}
                  className={`glass-panel p-[24px] rounded-xl cursor-pointer hover:bg-white/5 transition-all group ${
                    goals.includes(item.id) ? "goal-card-active" : "border-transparent"
                  }`}
                  onClick={() => toggleGoal(item.id)}
                >
                  <span
                    className={`material-symbols-outlined ${item.color} text-4xl mb-[8px] group-hover:scale-110 transition-transform`}
                    style={{ fontVariationSettings: goals.includes(item.id) ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {item.icon}
                  </span>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-[18px] font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-[12px] text-[#c2c6d6] font-semibold tracking-wider">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-auto pt-[32px] flex justify-end">
              <button
                className="bg-[#31394d] text-[#dae2fd] px-[32px] py-[16px] rounded-xl font-['Plus_Jakarta_Sans'] text-[24px] font-semibold hover:bg-[#2d3449] transition-colors"
                onClick={() => setStep(3)}
              >
                Continue
              </button>
            </div>
          </section>

          {/* Step 3 */}
          <section
            className={`step-transition ${
              step === 3 ? "active-step" : "hidden-step"
            }`}
          >
            <div className="space-y-[8px] mb-[32px]">
              <h2 className="font-['Plus_Jakarta_Sans'] text-[32px] font-semibold">
                Set Baselines
              </h2>
              <p className="text-[#c2c6d6]">
                Establish your daily performance targets.
              </p>
            </div>
            <div className="space-y-[32px]">
              <div className="space-y-[16px]">
                <div className="flex justify-between items-end">
                  <label className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold text-white">Daily Movement</label>
                  <span className="text-[#adc6ff] font-bold font-['Plus_Jakarta_Sans'] text-[24px]">
                    {stepsVal.toLocaleString()} steps
                  </span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="25000"
                  step="500"
                  value={stepsVal}
                  onChange={(e) => setStepsVal(parseInt(e.target.value))}
                  className="w-full h-2 bg-[#2d3449] rounded-lg appearance-none cursor-pointer accent-[#adc6ff]"
                />
              </div>
              <div className="space-y-[16px]">
                <div className="flex justify-between items-end">
                  <label className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold text-white">Optimal Sleep</label>
                  <span className="text-[#4edea3] font-bold font-['Plus_Jakarta_Sans'] text-[24px]">
                    {sleepVal} hours
                  </span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="12"
                  step="0.5"
                  value={sleepVal}
                  onChange={(e) => setSleepVal(parseFloat(e.target.value))}
                  className="w-full h-2 bg-[#2d3449] rounded-lg appearance-none cursor-pointer accent-[#4edea3]"
                />
              </div>
              <div className="space-y-[16px]">
                <div className="flex justify-between items-end">
                  <label className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold text-white">Fluid Intake</label>
                  <span className="text-[#d0bcff] font-bold font-['Plus_Jakarta_Sans'] text-[24px]">
                    {waterVal.toFixed(1)} liters
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  step="0.1"
                  value={waterVal}
                  onChange={(e) => setWaterVal(parseFloat(e.target.value))}
                  className="w-full h-2 bg-[#2d3449] rounded-lg appearance-none cursor-pointer accent-[#d0bcff]"
                />
              </div>
            </div>
            <div className="mt-auto pt-[32px] flex justify-between">
              <button
                className="text-[#c2c6d6] hover:text-[#dae2fd] transition-colors flex items-center gap-2"
                onClick={() => setStep(2)}
              >
                <span className="material-symbols-outlined">arrow_back</span> Back
              </button>
              <button
                className="bg-[#31394d] text-[#dae2fd] px-[32px] py-[16px] rounded-xl font-['Plus_Jakarta_Sans'] text-[24px] font-semibold hover:bg-[#2d3449] transition-colors"
                onClick={() => setStep(4)}
              >
                Continue
              </button>
            </div>
          </section>

          {/* Step 4 */}
          <section
            className={`step-transition ${
              step === 4 ? "active-step" : "hidden-step"
            }`}
          >
            <div className="space-y-[8px] mb-[32px] text-center">
              <h2 className="font-['Plus_Jakarta_Sans'] text-[32px] font-semibold">
                Sync Your Ecosystem
              </h2>
              <p className="text-[#c2c6d6]">
                Connect your hardware for seamless data harvesting.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[16px]">
              {[
                { icon: "watch", color: "text-[#ffb4ab]", label: "Apple Health" },
                { icon: "pause", color: "text-[#adc6ff]", label: "Google Fit" },
                { icon: "ring_volume", color: "text-[#4edea3]", label: "Oura Ring" },
                { icon: "cycle", color: "text-[#d0bcff]", label: "Whoop" },
                { icon: "speed", color: "text-[#c2c6d6]", label: "Garmin Connect" },
                { icon: "fitness_center", color: "text-[#4d8eff]", label: "Strava" },
                { icon: "kitchen", color: "text-[#00a572]", label: "MyFitnessPal" },
                { icon: "add", color: "text-[#8c909f]", label: "Custom API", dashed: true },
              ].map((item, idx) => (
                <button
                  key={idx}
                  className={`glass-panel p-[24px] rounded-2xl flex flex-col items-center gap-[8px] hover:border-[#adc6ff]/50 transition-all active:scale-95 ${
                    item.dashed ? "border-dashed border-[#424754] hover:bg-white/5" : ""
                  }`}
                >
                  <span className={`material-symbols-outlined text-4xl ${item.color}`}>
                    {item.icon}
                  </span>
                  <span className="font-['Inter'] text-[14px] font-medium text-white">{item.label}</span>
                </button>
              ))}
            </div>
            <div className="mt-auto pt-[32px] flex justify-between items-center">
              <p className="font-['Inter'] text-[12px] font-semibold tracking-wider text-[#c2c6d6] italic">
                Encrypted end-to-end
              </p>
              <button
                className="bg-[#31394d] text-[#dae2fd] px-[32px] py-[16px] rounded-xl font-['Plus_Jakarta_Sans'] text-[24px] font-semibold hover:bg-[#2d3449] transition-colors"
                onClick={() => setStep(5)}
              >
                Skip for now
              </button>
            </div>
          </section>

          {/* Step 5 */}
          <section
            className={`step-transition ${
              step === 5 ? "active-step" : "hidden-step"
            }`}
          >
            <div className="flex flex-col items-center justify-center h-full max-w-lg mx-auto space-y-[32px] text-center">
              <div className="w-32 h-32 rounded-full glass-panel flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full purple-gradient-bg opacity-20 animate-ping"></div>
                <span className="material-symbols-outlined text-6xl text-[#adc6ff]">
                  notifications_active
                </span>
              </div>
              <div className="space-y-[8px]">
                <h2 className="font-['Plus_Jakarta_Sans'] text-[32px] font-semibold">
                  Real-time Bio-feedback
                </h2>
                <p className="text-[#c2c6d6]">
                  Stay updated with metabolic alerts, goal progression, and recovery
                  optimization tips based on your real-time data.
                </p>
              </div>
              <div className="w-full space-y-[16px]">
                <button
                  className="w-full purple-gradient-bg text-[#00285d] py-[24px] rounded-xl font-['Plus_Jakarta_Sans'] text-[24px] font-semibold shadow-xl shadow-[#adc6ff]/20 hover:scale-[1.02] transition-transform"
                  onClick={() => setStep(6)}
                >
                  Enable Notifications
                </button>
                <button
                  className="w-full text-[#c2c6d6] hover:text-[#dae2fd] transition-colors"
                  onClick={() => setStep(6)}
                >
                  Notify me via email instead
                </button>
              </div>
            </div>
          </section>

          {/* Step 6 */}
          <section
            className={`step-transition h-full ${
              step === 6 ? "active-step" : "hidden-step"
            }`}
          >
            <div className="flex flex-col items-center justify-center h-full text-center space-y-[32px] min-h-[400px]">
              <div className="space-y-[16px]">
                <div className="inline-flex items-center gap-2 bg-[#4edea3]/20 text-[#4edea3] border border-[#4edea3]/30 px-[16px] py-[4px] rounded-full">
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    military_tech
                  </span>
                  <span className="font-['Inter'] text-[12px] font-semibold uppercase tracking-widest">
                    Achievement Unlocked
                  </span>
                </div>
                <h1 className="font-['Plus_Jakarta_Sans'] text-[48px] font-bold text-white">
                  Optimization Initialized
                </h1>
                <p className="font-['Inter'] text-[18px] text-[#c2c6d6] max-w-md mx-auto">
                  Your biological profile is set. We&apos;ve calibrated our algorithms
                  to your specific targets.
                </p>
              </div>
              <Link
                href="/dashboard"
                className="purple-gradient-bg text-[#00285d] px-[48px] py-[24px] rounded-xl font-['Plus_Jakarta_Sans'] text-[24px] font-semibold hover:scale-[1.05] transition-transform active:scale-95 shadow-2xl shadow-[#adc6ff]/30"
              >
                Enter Dashboard
              </Link>
            </div>
          </section>
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 w-full p-[24px] pointer-events-none z-20 flex justify-between items-center font-['Inter'] text-[12px] font-semibold tracking-wider text-[#c2c6d6]/50">
        <p>© 2024 VITALSYNC ELITE SYSTEM</p>
        <p>ENCRYPTED BIOMETRIC SECURE-LINK ACTIVE</p>
      </footer>
    </div>
  );
}
