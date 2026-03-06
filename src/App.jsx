import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiCheckCircle, FiArrowRight, FiPlay, FiUsers, FiZap, FiBarChart, FiMenu, FiX } from 'react-icons/fi';
import { supabase } from './lib/supabase';

// ── Navbar ─────────────────────────────────────────────
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
          </div>
          <span className="text-white font-bold text-xl tracking-tight">SalesPaddi</span>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#benefits" className="hover:text-white transition-colors">Benefits</a>
          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/10 transition-all text-sm">
            Join Waitlist
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button 
          className="md:hidden text-white p-2 -mr-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden border-b border-white/5 bg-black/90 backdrop-blur-md"
          >
            <div className="px-4 py-6 flex flex-col gap-5 text-center text-lg">
              <a href="#features" onClick={() => setMobileOpen(false)} className="hover:text-brand transition-colors">Features</a>
              <a href="#benefits" onClick={() => setMobileOpen(false)} className="hover:text-brand transition-colors">Benefits</a>
              <button 
                onClick={() => setMobileOpen(false)}
                className="mt-3 px-6 py-3 bg-brand hover:bg-brand-light text-white rounded-xl font-medium transition-all"
              >
                Join Waitlist
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// ── Waitlist Form ─────────────────────────────────────────────
const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      const { error } = await supabase.from("waitlist").insert([{ email }]);
      if (error) throw error;
      setStatus("success");
      setEmail("");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-brand to-brand-light rounded-2xl blur opacity-30 group-focus-within:opacity-60 transition duration-500" />
        <div className="relative flex flex-col sm:flex-row gap-3 p-2 bg-[#0a0a0a] border border-white/10 rounded-2xl">
          <div className="flex-1 flex items-center px-4 py-3 sm:py-2">
            <FiMail className="text-gray-500 mr-3 flex-shrink-0" />
            <input
              type="email"
              placeholder="Enter your work email"
              className="bg-transparent border-none outline-none text-white placeholder:text-gray-600 w-full text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-brand hover:bg-brand-light text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-60 text-base whitespace-nowrap"
          >
            {status === "loading" ? "Joining..." : "Join Waitlist"}
            <FiArrowRight />
          </button>
        </div>
      </form>

      <AnimatePresence mode="wait">
        {status === "success" && (
          <motion.p
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="text-brand-light mt-5 flex items-center justify-center gap-2 text-base sm:text-lg"
          >
            <FiCheckCircle /> You're on the list! Get ready for exclusive perks.
          </motion.p>
        )}

        {status === "error" && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="text-red-400 mt-4 text-sm text-center"
          >
            Something went wrong. Please try again.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Feature Card ─────────────────────────────────────────────
const FeatureCard = ({ icon: Icon, title, desc }) => (
  <motion.div
    whileHover={{ y: -6, scale: 1.02 }}
    className="p-6 sm:p-7 md:p-8 bg-white/[0.03] border border-white/5 rounded-2xl sm:rounded-3xl hover:bg-white/[0.06] transition-all group"
  >
    <div className="w-12 h-12 bg-brand/20 rounded-xl flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 transition-transform">
      <Icon className="text-brand-light text-2xl" />
    </div>
    <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">{title}</h3>
    <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{desc}</p>
  </motion.div>
);

// ── Main Component ─────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 selection:bg-brand selection:text-white font-sans">
      {/* Background glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-brand/10 blur-[100px] sm:blur-[140px] rounded-full animate-pulse-slow opacity-70" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-brand/5 blur-[100px] sm:blur-[140px] rounded-full opacity-60" />
      </div>

      <Navbar />

      <main className="relative">
        {/* Hero Section */}
        <section className="pt-28 sm:pt-32 md:pt-40 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm mb-6 sm:mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
              </span>
              Early access: Limited spots available
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-5 sm:mb-6 tracking-tight leading-tight"
            >
              AI Powered Webinars, <br className="sm:hidden" />
              <span className="bg-clip-text  bg-gradient-to-r from-brand-light to-emerald-200">
                Boost Sales & Automate Marketing
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-xl text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-10 px-2 sm:px-0"
            >
              Join our waitlist to get early access, insider tips, AI-driven webinar automation, 
              personalized lead follow-ups, and exclusive tools to grow your sales faster.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <WaitlistForm />
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
            <FeatureCard icon={FiPlay} title="AI Webinar Automation" desc="Set up once — AI handles engagement & delivery 24/7." />
            <FeatureCard icon={FiZap} title="Smart Lead Capture" desc="Forms adapt to behavior — maximize conversions." />
            <FeatureCard icon={FiUsers} title="Automated Follow-ups" desc="AI-driven emails & SMS sequences to nurture leads & close deals." />
            <FeatureCard icon={FiBarChart} title="Real-Time Dashboard" desc="Monitor sales, engagement & ROI instantly in one view." />
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-white/[0.02] border-y border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-10 sm:mb-16">
              Why Join the Waitlist?
            </h2>
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 text-left">
              {[
                { q: "Early Access", a: "Be the first to test AI-driven webinars and automation tools." },
                { q: "Lifetime Early Pricing", a: "Secure special pricing only available to waitlisters." },
                { q: "Exclusive Insights", a: "Get tips, tutorials, and insider strategies to boost sales." },
                { q: "Personalized Support", a: "Receive direct guidance to help your campaigns succeed." }
              ].map((item, i) => (
                <div key={i} className="flex gap-3 sm:gap-4">
                  <div className="text-brand-light font-bold text-lg sm:text-xl flex-shrink-0">0{i + 1}.</div>
                  <div>
                    <h4 className="text-white font-semibold mb-1.5 sm:mb-2 text-base sm:text-lg">{item.q}</h4>
                    <p className="text-gray-400 text-sm sm:text-base">{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 sm:py-28 md:py-32 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto rounded-3xl sm:rounded-[3rem] bg-gradient-to-b from-brand/15 to-transparent border border-brand/20 p-8 sm:p-12 md:p-16 lg:p-20 text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 sm:mb-6">
              Secure Your Spot on the Waitlist
            </h2>
            <p className="text-gray-400 mb-8 sm:mb-10 text-base sm:text-lg max-w-md mx-auto">
              Get early access, lifetime early adopter pricing, exclusive insights, and AI tools to grow faster.
            </p>
            <WaitlistForm />
          </motion.div>
        </section>
      </main>

      <footer className="py-10 sm:py-12 px-4 sm:px-6 text-center text-sm text-gray-600 border-t border-white/5">
        <p>© 2026 SalesPaddi Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}