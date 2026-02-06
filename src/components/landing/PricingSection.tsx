import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  const plans = [
    {
      name: "Starter",
      tier: "Solo",
      monthlyPrice: 29,
      annualPrice: 290,
      description: "For individual service providers managing their own clients",
      features: [
        "1 user account",
        "Unlimited service bookings",
        "Basic calendar management",
        "Client database",
        "Invoice generation",
        "Mobile app access",
        "Email support",
        "License tracking",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Professional",
      tier: "Solo",
      monthlyPrice: 69,
      annualPrice: 690,
      description: "Advanced features for growing solo businesses",
      features: [
        "Everything in Starter",
        "Advanced analytics",
        "Custom booking forms",
        "Custom service packages",
        "Priority support",
        "API access",
        "Remove branding",
        "Automated reminders",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Business",
      tier: "Broker",
      monthlyPrice: 129,
      annualPrice: 1290,
      description: "For small/medium businesses with employees",
      features: [
        "Up to 10 employees",
        "Employee management",
        "License tracking",
        "Drag-and-drop scheduling",
        "Assignment validation",
        "Team communication",
        "Basic analytics",
        "Mobile access for all",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Business Pro",
      tier: "Broker",
      monthlyPrice: 249,
      annualPrice: 2490,
      description: "Advanced features for larger teams",
      features: [
        "Up to 25 employees",
        "Everything in Business",
        "Advanced reporting",
        "Workflow automation",
        "Export capabilities",
        "API access",
        "Integrations",
        "Bulk scheduling",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 section-pattern">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Pricing
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Simple, Transparent{" "}
            <span className="text-gradient bg-gradient-to-r from-accent to-purple-500">
              Pricing
            </span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            No hidden fees. No transaction costs. Start with a 14-day free trial.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 p-1 bg-muted rounded-xl">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                billingCycle === "monthly"
                  ? "bg-card shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                billingCycle === "annual"
                  ? "bg-card shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Annual
              <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-full">
                2 months free
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl p-6 flex flex-col ${
                plan.popular
                  ? "pricing-card-featured"
                  : "bg-card border border-border shadow-card"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <span
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    plan.popular ? "text-white/70" : "text-muted-foreground"
                  }`}
                >
                  {plan.tier}
                </span>
                <h3
                  className={`font-display text-2xl font-bold mt-1 ${
                    plan.popular ? "text-white" : "text-foreground"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm mt-2 ${
                    plan.popular ? "text-white/70" : "text-muted-foreground"
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span
                    className={`font-display text-4xl font-bold ${
                      plan.popular ? "text-white" : "text-foreground"
                    }`}
                  >
                    ${billingCycle === "monthly" ? plan.monthlyPrice : Math.round(plan.annualPrice / 12)}
                  </span>
                  <span
                    className={`text-sm ${
                      plan.popular ? "text-white/70" : "text-muted-foreground"
                    }`}
                  >
                    /month
                  </span>
                </div>
                {billingCycle === "annual" && (
                  <p
                    className={`text-sm mt-1 ${
                      plan.popular ? "text-white/60" : "text-muted-foreground"
                    }`}
                  >
                    Billed ${plan.annualPrice}/year
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6 flex-1">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-2 text-sm ${
                      plan.popular ? "text-white/90" : "text-foreground"
                    }`}
                  >
                    <Check
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        plan.popular ? "text-white" : "text-success"
                      }`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={plan.popular ? "heroOutline" : "default"}
                className="w-full"
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-muted/50 border border-border">
            <div className="text-left">
              <h3 className="font-display text-xl font-bold">Need more?</h3>
              <p className="text-muted-foreground">
                Enterprise plans start at $1,500/month with custom features.
              </p>
            </div>
            <Button variant="accent" size="lg">
              Contact Sales
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
