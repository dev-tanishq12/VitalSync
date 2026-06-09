"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function JoinPage() {
  const [isSignup, setIsSignup] = useState(false);
  const router = useRouter();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/onboarding");
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/onboarding");
  };

  return (
    <div className="antialiased bg-[#0b1326] text-[#dae2fd] font-['Inter'] overflow-x-hidden min-h-screen flex items-center justify-center p-4 md:p-0">
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-panel {
            background: rgba(30, 41, 59, 0.6);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .glass-input {
            background: rgba(6, 14, 32, 0.4);
            border: 1px solid rgba(140, 144, 159, 0.3);
            transition: all 0.3s ease;
        }
        .glass-input:focus {
            border-color: #adc6ff;
            box-shadow: 0 0 0 4px rgba(173, 198, 255, 0.1);
            outline: none;
        }
        .animate-float {
            animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }
        .gradient-text {
            background: linear-gradient(135deg, #adc6ff 0%, #4edea3 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
      `}} />

      <div className="flex flex-col md:flex-row w-full max-w-[1440px] min-h-[90vh] bg-[#060e20] overflow-hidden shadow-2xl rounded-xl">
        {/* Left Side: Auth Forms */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 md:px-24 py-12 relative overflow-hidden">
          {/* Decorative atmospheric glow */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#adc6ff]/10 rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#4edea3]/10 rounded-full blur-[100px]"></div>
          
          <div className="w-full max-w-md z-10">
            {/* Brand Anchor */}
            <div className="mb-[64px]">
              <img alt="VitalSync Logo" className="h-10 w-10 mb-2" src="data:image/png;base64,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" />
              <h1 className="font-['Plus_Jakarta_Sans'] text-[48px] font-bold text-[#adc6ff] tracking-tighter">VitalSync</h1>
            </div>

            {/* Toggle Navigation (Sign In / Sign Up) */}
            <div id="auth-container">
              
              {/* Login Form State */}
              {!isSignup && (
                <div className="space-y-[24px] transition-all duration-500" id="login-form">
                  <div className="space-y-1">
                    <h2 className="font-['Plus_Jakarta_Sans'] text-[32px] font-semibold text-[#dae2fd]">Welcome Back</h2>
                    <p className="font-['Inter'] text-[16px] text-[#c2c6d6]">Resume your elite health optimization journey.</p>
                  </div>
                  
                  <form className="space-y-4 pt-4" onSubmit={handleLoginSubmit}>
                    <div className="space-y-1">
                      <label className="font-['Inter'] text-[12px] font-semibold text-[#8c909f] uppercase tracking-widest px-1">Email Address</label>
                      <input className="w-full h-12 px-4 rounded-md glass-input text-[#dae2fd] font-['Inter'] text-[16px]" placeholder="name@vital.sync" type="email" required />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center px-1">
                        <label className="font-['Inter'] text-[12px] font-semibold text-[#8c909f] uppercase tracking-widest">Password</label>
                        <a className="font-['Inter'] text-[12px] font-semibold text-[#adc6ff] hover:text-[#4d8eff] transition-colors" href="#">Forgot Password?</a>
                      </div>
                      <input className="w-full h-12 px-4 rounded-md glass-input text-[#dae2fd] font-['Inter'] text-[16px]" placeholder="••••••••" type="password" required />
                    </div>
                    <div className="flex items-center gap-2 px-1">
                      <input className="w-4 h-4 rounded border-[#424754] bg-[#2d3449] text-[#adc6ff] focus:ring-[#adc6ff] ring-offset-[#0b1326]" id="remember" type="checkbox" />
                      <label className="font-['Inter'] text-[14px] text-[#c2c6d6] cursor-pointer" htmlFor="remember">Remember this device</label>
                    </div>
                    <button className="w-full h-14 bg-[#adc6ff] text-[#002e6a] font-['Plus_Jakarta_Sans'] text-[24px] font-semibold rounded-md hover:bg-[#4d8eff] active:scale-95 transition-all duration-200 shadow-lg shadow-[#adc6ff]/20 mt-[24px]" type="submit">
                      Access Dashboard
                    </button>
                  </form>
                  
                  <div className="relative py-[16px]">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#424754]/30"></div></div>
                    <div className="relative flex justify-center text-[12px] font-semibold uppercase tracking-tighter"><span className="px-4 bg-[#060e20] text-[#8c909f]">Or continue with</span></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-[24px]">
                    <button className="flex items-center justify-center h-12 rounded-md glass-panel hover:bg-white/5 transition-colors group">
                      <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                      </svg>
                      <span className="font-['Inter'] text-[14px] text-[#dae2fd]">Google</span>
                    </button>
                    <button className="flex items-center justify-center h-12 rounded-md glass-panel hover:bg-white/5 transition-colors group">
                      <span className="material-symbols-outlined text-[#dae2fd] mr-3">apps</span>
                      <span className="font-['Inter'] text-[14px] text-[#dae2fd]">Apple</span>
                    </button>
                  </div>
                  
                  <p className="text-center font-['Inter'] text-[16px] text-[#c2c6d6] pt-[16px]">
                    New to VitalSync? 
                    <button className="text-[#4edea3] font-bold hover:underline ml-1" onClick={() => setIsSignup(true)}>Create an Optimizer account</button>
                  </p>
                </div>
              )}

              {/* Signup Form State */}
              {isSignup && (
                <div className="space-y-[24px] transition-all duration-500" id="signup-form">
                  <div className="space-y-1">
                    <h2 className="font-['Plus_Jakarta_Sans'] text-[32px] font-semibold text-[#dae2fd]">Join the Elite</h2>
                    <p className="font-['Inter'] text-[16px] text-[#c2c6d6]">Start your high-fidelity health journey today.</p>
                  </div>
                  
                  <form className="space-y-4 pt-4" onSubmit={handleSignupSubmit}>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="font-['Inter'] text-[12px] font-semibold text-[#8c909f] uppercase tracking-widest px-1">First Name</label>
                        <input className="w-full h-12 px-4 rounded-md glass-input text-[#dae2fd] font-['Inter'] text-[16px]" placeholder="John" type="text" required />
                      </div>
                      <div className="space-y-1">
                        <label className="font-['Inter'] text-[12px] font-semibold text-[#8c909f] uppercase tracking-widest px-1">Last Name</label>
                        <input className="w-full h-12 px-4 rounded-md glass-input text-[#dae2fd] font-['Inter'] text-[16px]" placeholder="Doe" type="text" required />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="font-['Inter'] text-[12px] font-semibold text-[#8c909f] uppercase tracking-widest px-1">Email Address</label>
                      <input className="w-full h-12 px-4 rounded-md glass-input text-[#dae2fd] font-['Inter'] text-[16px]" placeholder="name@vital.sync" type="email" required />
                    </div>
                    <div className="space-y-1">
                      <label className="font-['Inter'] text-[12px] font-semibold text-[#8c909f] uppercase tracking-widest px-1">Password</label>
                      <input className="w-full h-12 px-4 rounded-md glass-input text-[#dae2fd] font-['Inter'] text-[16px]" placeholder="Create strong password" type="password" required />
                    </div>
                    <div className="flex items-start gap-2 px-1">
                      <input className="mt-1 w-4 h-4 rounded border-[#424754] bg-[#2d3449] text-[#adc6ff] focus:ring-[#adc6ff]" id="terms" type="checkbox" required />
                      <label className="font-['Inter'] text-[14px] text-[#c2c6d6] cursor-pointer" htmlFor="terms">
                        I agree to the <a className="text-[#adc6ff] hover:underline" href="#">Terms of Service</a> and <a className="text-[#adc6ff] hover:underline" href="#">Privacy Policy</a>.
                      </label>
                    </div>
                    <button className="w-full h-14 bg-[#4edea3] text-[#003824] font-['Plus_Jakarta_Sans'] text-[24px] font-semibold rounded-md hover:bg-[#00a572] active:scale-95 transition-all duration-200 shadow-lg shadow-[#4edea3]/20 mt-[24px]" type="submit">
                      Begin Optimization
                    </button>
                  </form>
                  
                  <p className="text-center font-['Inter'] text-[16px] text-[#c2c6d6] pt-[16px]">
                    Already optimized? 
                    <button className="text-[#adc6ff] font-bold hover:underline ml-1" onClick={() => setIsSignup(false)}>Sign In</button>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Visual Brand Experience */}
        <div className="hidden md:flex w-1/2 bg-[#171f33] relative items-center justify-center p-[32px] overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover opacity-30 grayscale-[0.5]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxRAanJrCx3Pe1tMWCCrB6cCmQ2ZElOm5ESCUekZKE1BDxJ4ZYItHgrDHhEN90ueAh321YaJBLj-W44M2NkWD0zdJReMCYTh-y2p0YQsDm3chh4CFYcpWOPv_ND-g_0ohVunKA0YO4v-GBkT-c24FYduFQoKf278kwg9X4KA4t2G_yQMFLUYdFG4NaWnm0wFWtAQru1W3jjof0O73B491mX9u1M4nI0r8jBZwdDrHC1gTW_glDqDBcrZ8Ue0ljZbBt-8sSZoIwyd6l" alt="Background" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0b1326] via-transparent to-[#adc6ff]/20"></div>
          </div>
          
          {/* Floating Data Metrics */}
          <div className="relative z-10 w-full max-w-lg">
            <div className="space-y-[32px]">
              <div className="glass-panel p-[24px] rounded-xl animate-float" style={{ animationDelay: "0s" }}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#4edea3]/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#4edea3]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                  </div>
                  <div>
                    <h4 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold text-[#dae2fd]">Resting Heart Rate</h4>
                    <p className="font-['Inter'] text-[14px] text-[#4edea3]">Optimal • 48 BPM</p>
                  </div>
                </div>
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#4edea3] w-3/4"></div>
                </div>
              </div>
              
              <div className="glass-panel p-[24px] rounded-xl translate-x-12 animate-float" style={{ animationDelay: "1.5s" }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#adc6ff]/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#adc6ff]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                  </div>
                  <div>
                    <h4 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold text-[#dae2fd]">Neural Efficiency</h4>
                    <p className="font-['Inter'] text-[14px] text-[#adc6ff]">Peak Performance</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-panel p-[24px] rounded-xl -translate-x-8 animate-float" style={{ animationDelay: "3s" }}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#d0bcff]/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#d0bcff]" style={{ fontVariationSettings: "'FILL' 1" }}>sleep</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-end mb-1">
                      <h4 className="font-['Plus_Jakarta_Sans'] text-[24px] font-semibold text-[#dae2fd]">Deep Sleep</h4>
                      <span className="font-['Inter'] text-[14px] text-[#d0bcff]">94% Score</span>
                    </div>
                    <div className="flex gap-1 h-8 items-end">
                      <div className="w-full bg-[#d0bcff]/20 h-2 rounded-t-sm"></div>
                      <div className="w-full bg-[#d0bcff]/40 h-4 rounded-t-sm"></div>
                      <div className="w-full bg-[#d0bcff]/60 h-6 rounded-t-sm"></div>
                      <div className="w-full bg-[#d0bcff] h-8 rounded-t-sm"></div>
                      <div className="w-full bg-[#d0bcff]/50 h-5 rounded-t-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-[64px] text-center">
              <h3 className="font-['Plus_Jakarta_Sans'] text-[32px] font-semibold mb-4">Join <span className="gradient-text">50,000+</span> Optimizers</h3>
              <p className="font-['Inter'] text-[18px] text-[#c2c6d6] max-w-sm mx-auto">
                Connect your wearables, synchronize your biology, and unlock the next level of human performance.
              </p>
              
              <div className="flex justify-center -space-x-3 mt-6">
                <img className="w-10 h-10 rounded-full border-2 border-[#171f33] object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdNNvf30bIhy7zCi4Stt51LSRWNP6CMXGAIGpv1V7MAX10ObecnhXE169CgvIfGezQh2j67TRf7BVbsVJa8ykXjee0iYoj_y_EYPh5RBXBwebrUgsmj9WVRuoMxBoxjbBTysxasnhw5YF5aJ69xXhu-EOepaMAPo2mWIXJ2vv4W9r6yk6glm7WVSB82IxWPj5H_dh80mG6_7hDYCsqgJRt9yBxqQkzIPNcoYi0C4nrPLKUrrXH3QVY6OfBgr6IfE6TLwuSnTRCx_L-" alt="User" />
                <img className="w-10 h-10 rounded-full border-2 border-[#171f33] object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4TyvpmbIEkolqdPZulgz25PFr6bAU-CE6PM9lhoMRQEhlDiz_ANmH9pc3-p6gk9HdCCIGHerTjB7f79KOL2oPnw5DGC4RQYtaEN3un3HIX1KAxDMBW4GWVNbto9hPpqqTI5z4dGkiQJ27v8S2xkQwLK0WtYDBwzZwBkT22ATL1QFg69OtTpOm-bT2ugwYq92sR-GHbqLmif5mJnDutl2JM00-W9yGkusUhuxdcCnzPjPnCw7CqqWjIzol879_absnPKZh6ATtRMaf" alt="User" />
                <img className="w-10 h-10 rounded-full border-2 border-[#171f33] object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEv0shJR0mR2QBM3wRXvQnYzxIv87kg0eUvPktCieGf_to94yYwvXR16xSs3YJOOLV7t8ChvqhTa3P0-OjjV-3p9YhQyjs1Gl6MdSBO7rlHnlng2D1apVpVx1YNXnb8-hWWMLHLFKS53J7kv0LyLMQiwrWvzvafe5M_sC4dAcLBR5CNM6P_GBbx1pMueJwDA_sqII0SlfTXMxhRcj86FI-xkgHFBglD434BXKGAYaJ-AzBoSVLyYJ5glsoKnt00K7Gmdn18-bpnW_V" alt="User" />
                <div className="w-10 h-10 rounded-full border-2 border-[#171f33] bg-[#31394d] flex items-center justify-center font-['Inter'] text-[12px] font-semibold text-[#adc6ff]">+47k</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
