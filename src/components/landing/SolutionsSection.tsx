import { motion } from "framer-motion";
import { User, Building2, Share2, Building } from "lucide-react";
import { Button } from "@/components/ui/button";

const SolutionsSection = () => {
  const solutions = [
    {
      icon: User,
      tier: "Solo Entrepreneur",
      tagline: "Individual Service Providers",
      description: "Manage your own business and clients with professional tools. Calendar management, invoicing, client database, and booking widgets.",
      features: [
        "Personal calendar & availability",
        "Client management (CRM-lite)",
        "Invoice generation & tracking",
        "Booking widget for clients",
        "Private reviews & analytics",
      ],
      badge: "badge-solo",
      cta: "Start Solo",
    },
    {
      icon: Building2,
      tier: "Broker",
      tagline: "Small & Medium Businesses",
      description: "Manage employees and operations for your own business. Full employee dashboard, scheduling workbench, and compliance tracking.",
      features: [
        "Up to 25+ employee accounts",
        "License/certification tracking",
        "Drag-and-drop scheduling",
        "Assignment validation system",
        "Team communication tools",
      ],
      badge: "badge-broker",
      cta: "Start Business",
      featured: true,
    },
    {
      icon: Share2,
      tier: "Reseller",
      tagline: "White Label Partners",
      description: "Resell the platform under your own brand. Create unlimited white label instances with custom branding for your clients.",
      features: [
        "Unlimited white label clients",
        "Custom branding & domains",
        "Client billing management",
        "Revenue dashboard",
        "Sales & marketing tools",
      ],
      badge: "badge-reseller",
      cta: "Become Partner",
    },
    {
      icon: Building,
      tier: "Enterprise",
      tagline: "Large Organizations",
      description: "Custom solutions for hospitals, corporations, and government with complex compliance needs. Dedicated support and SLA guarantees.",
      features: [
        "Multi-location management",
        "HIPAA/SOC2 compliance",
        "SSO & advanced security",
        "Custom integrations",
        "Dedicated account manager",
      ],
      badge: "badge-enterprise",
      cta: "Contact Sales",
    },
  ];

  return (
    <section id="solutions" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Solutions
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Built for Every{" "}
            <span className="text-gradient bg-gradient-to-r from-accent to-purple-500">
              Business Size
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From solo operators managing their own clients to enterprises with thousands of employees, 
            our platform adapts to your needs.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl p-6 flex flex-col ${
                solution.featured
                  ? "pricing-card-featured lg:scale-105 lg:-my-4"
                  : "bg-card border border-border shadow-card hover:shadow-lg transition-shadow"
              }`}
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  solution.featured
                    ? "bg-white/20"
                    : "bg-accent/10"
                }`}
              >
                <solution.icon
                  className={`w-6 h-6 ${
                    solution.featured ? "text-white" : "text-accent"
                  }`}
                />
              </div>

              {/* Badge */}
              <span className={`badge-tier ${solution.badge} self-start mb-3`}>
                {solution.tier}
              </span>

              {/* Tagline */}
              <p
                className={`text-sm mb-2 ${
                  solution.featured ? "text-white/70" : "text-muted-foreground"
                }`}
              >
                {solution.tagline}
              </p>

              {/* Description */}
              <p
                className={`text-sm mb-6 ${
                  solution.featured ? "text-white/80" : "text-muted-foreground"
                }`}
              >
                {solution.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6 flex-1">
                {solution.features.map((feature, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-2 text-sm ${
                      solution.featured ? "text-white/90" : "text-foreground"
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        solution.featured ? "text-white" : "text-success"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={solution.featured ? "heroOutline" : "accent"}
                className="w-full"
              >
                {solution.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
