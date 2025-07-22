import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CountUp from "react-countup";
import {
  Search,
  Users,
  Heart,
  Shield,
  ArrowRight,
  Triangle as ExclamationTriangle,
} from "lucide-react";
import statsData from "../data/stats.json";

const Home = () => {
  const [stats, setStats] = useState([]);
  const features = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Easy Search",
      description:
        "Find donors by blood group, location, and availability with powerful filters.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Open Community",
      description:
        "Join thousands of donors in Bangladesh's largest donor network.",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Multiple Types",
      description:
        "Blood donors, organ donors, and charity donors all in one platform.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Free & Secure",
      description:
        "Completely free to use with privacy protection for all users.",
    },
  ];

  useEffect(() => {
    setStats(statsData.stats);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Bangladesh's Largest
              <span className="text-primary-600 block">Donor Community</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              An open and free platform connecting those in need with generous
              donors. Search for blood donors, organ donors, and charity donors
              across all divisions of Bangladesh.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/search"
                className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <Search className="h-5 w-5" />
                <span>Search Donors</span>
              </Link>
              <Link
                to="/emergency"
                className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <ExclamationTriangle className="h-5 w-5" />
                <span>Emergency Request</span>
              </Link>
              <Link
                to="/register"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold border-2 border-primary-600 hover:bg-primary-600 hover:text-white transition-all duration-200 flex items-center space-x-2"
              >
                <Heart className="h-5 w-5" />
                <span>Become a Donor</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-slide-up">
                <div className="text-3xl md:text-4xl font-bold text-gray-50 mb-2">
                  <CountUp
                    end={stat.number}
                    duration={2.5}
                    separator=","
                    suffix={stat.suffix || ""}
                  />
                </div>
                <div className="text-gray-50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose DonorConnect?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built for the people of Bangladesh, by the people of Bangladesh.
              Our platform prioritizes accessibility and community building.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center  hover:shadow-lg transition-shadow duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full text-primary-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of donors who are already making Bangladesh a better
            place. Every registration counts, every donation saves lives.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 space-x-2 shadow-lg hover:shadow-xl"
          >
            <span>Register as Donor Today</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
