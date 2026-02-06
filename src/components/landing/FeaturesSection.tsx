import { motion } from "framer-motion";
import { 
  Users, 
  Calendar, 
  Shield, 
  ClipboardCheck, 
  Bell, 
  BarChart3,
  Smartphone,
  Clock,
  FileCheck
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Users,
      title: "Employee Management",
      description: "Complete employee dashboard with searchable lists, license tracking, and color-coded status indicators for certifications.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Calendar,
      title: "Drag-and-Drop Scheduling",
      description: "Visual workbench for assigning employees to posts. Drag employee cards directly to assignment slots with real-time validation.",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      icon: Shield,
      title: "Compliance Validation",
      description: "Hard blocks prevent unqualified assignments. System validates certifications before allowing any employee deployment.",
      color: "from-amber-500 to-amber-600",
    },
    {
      icon: ClipboardCheck,
      title: "License Tracking",
      description: "Track all employee licenses with expiration dates. Green/yellow/red status coding at a glance.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Bell,
      title: "Automated Notifications",
      description: "Email and SMS alerts at 60, 30, and 14 days before license expiration. Never miss a renewal deadline.",
      color: "from-rose-500 to-rose-600",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Track bookings, revenue, employee utilization, fill rates, and client satisfaction scores in real-time.",
      color: "from-cyan-500 to-cyan-600",
    },
    {
      icon: Smartphone,
      title: "Mobile Access",
      description: "Full mobile app for managers and employees. Clock in/out, view schedules, and manage shifts from anywhere.",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      icon: Clock,
      title: "Time Tracking",
      description: "GPS-verified clock in/out, overtime calculations, and automatic timesheet exports for payroll integration.",
      color: "from-teal-500 to-teal-600",
    },
    {
      icon: FileCheck,
      title: "Document Storage",
      description: "Store license PDFs, upload renewal documents, and maintain complete compliance audit trails.",
      color: "from-orange-500 to-orange-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="features" className="py-24 section-pattern">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Core Features
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Everything You Need to{" "}
            <span className="text-gradient bg-gradient-to-r from-accent to-purple-500">
              Manage Your Workforce
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From solo entrepreneurs to enterprise teams, our platform scales with your business. 
            Powerful features designed for real-world workforce challenges.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group card-elevated rounded-2xl p-6 hover:shadow-glow cursor-pointer"
            >
              <div className={`feature-icon mb-4 bg-gradient-to-br ${feature.color} bg-opacity-10`}>
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
