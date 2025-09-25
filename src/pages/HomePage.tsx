// export default function HomePage() {
//   return (
//     <div>
//       {/* <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//         Welcome to the Home Page
//       </h1> */}
//       <h1 className="text-3xl font-bold text-center">
//         Welcome to the Home Page
//       </h1>
//     </div>
//   );
// }

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Package,
  Shield,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router";

const Homepage = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Get detailed insights into your supply chain performance with comprehensive reports and real-time dashboards.",
    },
    {
      icon: Shield,
      title: "Role-Based Security",
      description:
        "Secure access control with different permission levels for admins, suppliers, and staff members.",
    },
    {
      icon: Zap,
      title: "Automated Processes",
      description:
        "Streamline your workflow with automated commission calculations, inventory updates, and payment tracking.",
    },
    {
      icon: Users,
      title: "Supplier Management",
      description:
        "Efficiently manage relationships with multiple suppliers, track performance, and handle payments seamlessly.",
    },
    {
      icon: Package,
      title: "Inventory Control",
      description:
        "Keep track of your products, monitor stock levels, and manage returns with our comprehensive inventory system.",
    },
    {
      icon: TrendingUp,
      title: "Growth Analytics",
      description:
        "Monitor your business growth with detailed supply trends, payment analytics, and performance metrics.",
    },
  ];

  const benefits = [
    "Reduce manual work by 80% with automated processes",
    "Real-time tracking of all supplier relationships",
    "Comprehensive reporting and analytics dashboard",
    "Secure role-based access for team collaboration",
    "Mobile-responsive design for on-the-go management",
    "Integration ready for future expansion",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted py-20 lg:py-32">
        <div className="absolute inset-0 gradient-hero opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Modern{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                SRM System
              </span>{" "}
              for OptiluxBD
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Streamline your supplier relationships, manage inventory
              efficiently, and grow your e-commerce business with our
              comprehensive management platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Button
                size="lg"
                className="text-lg px-8 py-6"
                variant="hero"
                asChild
              >
                <Link to="/register">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6"
                asChild
              >
                <Link to="/demo">Watch Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Powerful Features for Your Business
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage suppliers, track inventory, and grow
              your business efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="dashboard-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose OptiluxBD SRM?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Built specifically for Bangladeshi e-commerce businesses, our
                platform provides everything you need to manage your supplier
                relationships and inventory efficiently.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8">
                <div className="w-full h-full bg-card rounded-xl shadow-xl p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Dashboard Preview
                    </h3>
                    <p className="text-muted-foreground">
                      Real-time analytics and insights at your fingertips
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join hundreds of businesses already using OptiluxBD to streamline
            their operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="hero"
              className="text-lg px-8 py-6"
              asChild
            >
              <Link to="/register">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6"
              asChild
            >
              <Link to="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
