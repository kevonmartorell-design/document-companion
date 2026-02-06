import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, Users, Calendar, CheckCircle } from "lucide-react";
import heroDashboard from "@/assets/hero-dashboard.jpg";

const HeroSection = () => {
  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "500+", label: "Companies" },
    { value: "99.9%", label: "Uptime" },
    { value: "4.9★", label: "Rating" },
  ];

  return (
    <section className="relative min-h-screen hero-gradient overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute top-1/4 -right-64 w-[600px] h-[600px] rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl" />

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
            >
              <span className="status-dot status-active" />
              <span className="text-sm font-medium text-primary-foreground/80">
                Now with White Label Support
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Workforce Management{" "}
              <span className="text-gradient bg-gradient-to-r from-accent to-blue-400">
                Reimagined
              </span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/70 mb-8 max-w-xl mx-auto lg:mx-0 text-balance">
              Schedule employees, track certifications, and manage compliance with our all-in-one B2B platform. 
              Perfect for solo operators to enterprise teams.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button variant="hero" size="xl" className="group">
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="heroOutline" size="xl" className="group">
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
              {[
                { icon: Shield, text: "SOC 2 Certified" },
                { icon: CheckCircle, text: "HIPAA Compliant" },
                { icon: Users, text: "24/7 Support" },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-primary-foreground/60">
                  <badge.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{badge.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src={heroDashboard}
                alt="WorkForce Pro Dashboard"
                className="w-full h-auto"
              />
              {/* Floating Elements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -left-4 top-1/4 glass rounded-xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">All Compliant</p>
                    <p className="text-xs text-muted-foreground">12 licenses verified</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -right-4 bottom-1/4 glass rounded-xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">24 Shifts Today</p>
                    <p className="text-xs text-muted-foreground">All positions filled</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
                {stat.value}
              </p>
              <p className="text-sm text-primary-foreground/60 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
