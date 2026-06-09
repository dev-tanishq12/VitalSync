"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="antialiased bg-[#0b1326] text-[#dae2fd] font-['Inter'] overflow-x-hidden min-h-screen relative">
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-grid {
            background-image: 
                linear-gradient(rgba(173, 198, 255, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(173, 198, 255, 0.05) 1px, transparent 1px);
            background-size: 50px 50px;
            animation: gridMove 20s linear infinite;
        }
        @keyframes gridMove {
            0% { background-position: 0 0; }
            100% { background-position: 50px 50px; }
        }
      `}} />
      {/* Top Navigation Bar */}
      <header className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-10 transition-all ${scrolled ? 'h-16 bg-[#171f33]/90' : 'h-20 bg-[#171f33]/60'} backdrop-blur-xl border-b border-white/10 shadow-md shadow-[#adc6ff]/10`}>
        <div className="flex items-center gap-3">
          <img alt="VitalSync" className="h-10 w-10" src="data:image/png;base64,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" />
          <span className="font-['Plus_Jakarta_Sans'] text-[24px] font-bold text-[#adc6ff]">VitalSync</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link className="text-[#adc6ff] font-bold border-b-2 border-[#adc6ff] text-[16px] py-1" href="/">Home</Link>
          <Link className="text-[#c2c6d6]/80 hover:text-[#dae2fd] transition-colors font-medium text-[16px] py-1" href="#">Features</Link>
          <Link className="text-[#c2c6d6]/80 hover:text-[#dae2fd] transition-colors font-medium text-[16px] py-1" href="#">Analytics</Link>
          <Link className="text-[#c2c6d6]/80 hover:text-[#dae2fd] transition-colors font-medium text-[16px] py-1" href="#">Pricing</Link>
        </nav>
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-[#c2c6d6] hover:text-[#adc6ff] transition-colors p-2 rounded-full hover:bg-white/5">search</button>
          <Link href="/join" className="bg-[#adc6ff]/20 text-[#adc6ff] px-6 py-2 rounded-full font-semibold border border-[#adc6ff]/30 hover:bg-[#adc6ff]/30 transition-all active:scale-95 inline-flex">Log In</Link>
        </div>
      </header>

      <main className="relative pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 md:px-10 overflow-hidden">
          <div className="absolute inset-0 hero-grid z-0 opacity-40"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#adc6ff]/20 rounded-full blur-[120px] z-0"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#a078ff]/10 rounded-full blur-[120px] z-0"></div>
          
          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6 border border-[#adc6ff]/20">
              <span className="material-symbols-outlined text-[#4edea3] text-sm">auto_awesome</span>
              <span className="text-[12px] font-semibold uppercase tracking-widest text-[#adc6ff]">The Future of Human Performance</span>
            </div>
            
            <h1 className="font-['Plus_Jakarta_Sans'] text-[36px] md:text-[48px] font-bold text-[#dae2fd] mb-6 leading-tight">
              Elite Health Optimizer for <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#adc6ff] to-[#4edea3]">High-Performance Living</span>
            </h1>
            
            <p className="text-[18px] text-[#c2c6d6]/80 mb-10 max-w-2xl mx-auto">
              VitalSync harmonizes data from your entire ecosystem of health devices to provide 
              real-time, AI-driven insights. Optimize your sleep, recovery, and peak performance 
              with clinical-grade precision.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <Link href="/join" className="purple-gradient-bg text-white px-10 py-5 rounded-xl font-['Plus_Jakarta_Sans'] text-[24px] font-bold shadow-xl shadow-[#d0bcff]/20 hover:scale-[1.02] transition-transform active:scale-95 group flex items-center">
                Start Your Journey
                <span className="material-symbols-outlined align-middle ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
              <button className="glass-card text-[#dae2fd] px-10 py-5 rounded-xl font-['Plus_Jakarta_Sans'] text-[24px] font-semibold hover:bg-white/5 transition-all">
                View Demo
              </button>
            </div>
            
            <div className="mt-[64px] pt-10 border-t border-white/5">
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#8c909f] mb-8">Seamlessly Integrated With</p>
              <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-3xl">watch</span>
                  <span className="font-bold text-xl">Apple Health</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-3xl">fitbit</span>
                  <span className="font-bold text-xl">Fitbit</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-3xl">cycle</span>
                  <span className="font-bold text-xl">Peloton</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-3xl">directions_run</span>
                  <span className="font-bold text-xl">Garmin</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-3xl">heart_plus</span>
                  <span className="font-bold text-xl">WHOOP</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="py-[64px] px-4 md:px-10 bg-[#060e20]/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="font-['Plus_Jakarta_Sans'] text-[36px] md:text-[32px] font-semibold text-[#dae2fd] mb-4">Master Your Biometrics</h2>
                <p className="text-[18px] text-[#c2c6d6]/80">Experience a sophisticated interface designed for depth, clarity, and actionable intelligence.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card rounded-xl p-[32px] flex flex-col h-full hover:border-[#adc6ff]/40 transition-colors group">
                <div className="w-14 h-14 rounded-lg bg-[#adc6ff]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[#adc6ff] text-3xl">dashboard_customize</span>
                </div>
                <h3 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold text-[#dae2fd] mb-4">Unified Health View</h3>
                <p className="text-[16px] text-[#c2c6d6]/80 mb-8 flex-grow">
                  Your entire health story on a single, high-fidelity canvas. Stop switching apps and start seeing the correlations between your sleep, diet, and activity.
                </p>
                <div className="relative rounded-lg overflow-hidden h-48 bg-[#171f33]">
                  <img className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAETpZtGDdHCd9PG6aFjfOu3JA2hQb9N8rDnNBctAHcVKOt9MG-H9yxS22SSO9rXk7QlFblZeIeBky1EZasGSMBno7ZvgqS8oV7r6wXgU5sBUE3aJHXl25HiFLGNxqJqJFs1nef0MPJCOFpmRKTWQU569rwlOdEkeschYiVmesYn0dI7ZhQPWc5jtFO_HteAOj3-ZXMW-h_dRLjkLdq9Ntq6H5iWKcPP0agyxdoMm7Inz36N-Uz8aN4-F719QuEXFcxgqpTDAUCA-it" alt="Dashboard visualization"/>
                </div>
              </div>

              <div className="glass-card rounded-xl p-[32px] flex flex-col h-full border-t-[#adc6ff]/20 border-t-2 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4">
                  <span className="bg-[#4edea3]/20 text-[#4edea3] text-[12px] font-semibold px-3 py-1 rounded-full">ELITE ENGINE</span>
                </div>
                <div className="w-14 h-14 rounded-lg bg-[#4edea3]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[#4edea3] text-3xl">psychology</span>
                </div>
                <h3 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold text-[#dae2fd] mb-4">AI-Powered Insights</h3>
                <p className="text-[16px] text-[#c2c6d6]/80 mb-8 flex-grow">
                  Our proprietary engine analyzes thousands of data points to predict fatigue, suggest recovery protocols, and identify peak performance windows.
                </p>
                <div className="relative rounded-lg overflow-hidden h-48 bg-[#171f33]">
                  <img className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWdqNufUw9swmH_I68SUIE4wLyqMXfFua1t3JLenR-28SbCY9Lezwp_XdgpvI2p08dSIXqNiF8IRmNfDu3tOnYjWa1JYn1ugDnMqhYRfIYlNvYLUSnxwiSeMpEf07T2SZHcZTVj4OpiXY9b2B46coovLXVlRbxWrixZDoeWrNJ4bllwqKODw3aTt3LHL8JVfVUtTOh0Jf-8oK79GFobpi1dKjD17Fa6r32b02DyRt-HGzhiyvCmLiLMg6X9TtyDWP6lkPdHuaTvHIP" alt="AI Neural Pathways"/>
                </div>
              </div>

              <div className="glass-card rounded-xl p-[32px] flex flex-col h-full hover:border-[#adc6ff]/40 transition-colors group">
                <div className="w-14 h-14 rounded-lg bg-[#a078ff]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[#a078ff] text-3xl">sync_saved_locally</span>
                </div>
                <h3 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold text-[#dae2fd] mb-4">Device Connectivity</h3>
                <p className="text-[16px] text-[#c2c6d6]/80 mb-8 flex-grow">
                  Universal syncing for over 400+ wearables and health devices. Whether it's a smart ring, watch, or clinical-grade sensor, VitalSync pulls it all together.
                </p>
                <div className="relative rounded-lg overflow-hidden h-48 bg-[#171f33]">
                  <img className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAh-nEka8_HGHiFcbnqrrYdyvQ9gfwkDKFzUS-3NFpRm7ykKTdczH6bVmhQtvw32mjOVsBR9bzdazi_110zf3b9Gjxz879wLfY4Avf5KsnSUFmN35qohprwJ2s8dC8uca6a-ykjQXxUbCNz3YGS1qt4BFrcq3ZoJ6vA12U4i_7F9aS0JXxhEQHf1j85ZUnbahfJG4F4uY08Uy2PSBzJXCc6j98L0IAas5Q0B9axkbrOZVvQjCEy8C1h3B74fg5YvA_pDw9N5PwLAlty" alt="Devices"/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#060e20] border-t border-white/5 pt-[64px] pb-[32px] px-4 md:px-10">
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] font-semibold text-[#8c909f]">
          <p>© 2024 VitalSync Technologies Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
