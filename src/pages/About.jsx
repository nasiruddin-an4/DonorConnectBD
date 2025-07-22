import { Heart, Users, Globe, Shield, Target, Award } from "lucide-react";
import { useState, useEffect } from "react";
import CountUp from "react-countup";
import statsData from "../data/stats.json";

const About = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    setStats(statsData.stats);
  }, []);

  const features = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Open Platform",
      description:
        "Completely free and open for everyone. No hidden fees, no premium memberships.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Driven",
      description:
        "Built by the community, for the community. Every feature is designed based on real needs.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Privacy Protected",
      description:
        "Your information is safe and only used to connect donors with those in need.",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Mission Focused",
      description:
        "Our only goal is to save lives by connecting generous donors with people in need.",
    },
  ];

  const team = [
    {
      role: "Mission",
      description:
        "To build Bangladesh's largest and most accessible donor community",
    },
    {
      role: "Vision",
      description: "A Bangladesh where no one suffers due to lack of donors",
    },
    {
      role: "Values",
      description: "Open, Free, Inclusive, Community-driven, Life-saving",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-6">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About DonorConnect
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            We believe in the power of community to save lives. DonorConnect is
            Bangladesh's first completely open and free donor searching
            platform, built with one mission: to connect those in need with
            generous donors.
          </p>
          <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-md">
            <Award className="h-5 w-5 text-primary-600" />
            <span className="text-gray-700 font-medium">
              Proudly serving Bangladesh since 2024
            </span>
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

      {/* Story Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative">
              Our Story
            </h2>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-center mb-12 text-xl text-gray-600 leading-relaxed">
              DonorConnect was born from a simple but powerful observation:
              Bangladesh has millions of generous people willing to donate
              blood, organs, or contribute to charity, but finding them when
              needed most is often impossible.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {team.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold text-primary-600 mb-4">
                    {item.role}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-lg text-gray-600 leading-relaxed">
              We decided to change that by building a platform that puts
              community first. Unlike other platforms that charge fees or hide
              information behind paywalls, DonorConnect is completely free and
              open. Every donor's information is publicly available, making it
              easy for anyone to find help when they need it most.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative">
              What Makes Us Different
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another platform. We're a movement towards making
              healthcare accessible through community support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group flex space-x-6 p-8 bg-gray-50 rounded-xl hover:bg-primary-50 transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="p-4 bg-primary-100 rounded-xl text-primary-600 group-hover:bg-primary-200 transition-colors">
                    {feature.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative">
            <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-primary-400 text-6xl opacity-20">
              Impact
            </span>
            Making a Real Impact
          </h2>
          <p className="text-xl text-primary-100 mb-12 leading-relaxed max-w-3xl mx-auto">
            Every day, our platform helps connect people in critical need with
            generous donors. From emergency blood requirements to organ
            donations and charity support, we're building a network of hope
            across Bangladesh.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl font-bold text-white mb-3">24/7</div>
              <div className="text-primary-100 font-medium">
                Platform Available
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl font-bold text-white mb-3">Free</div>
              <div className="text-primary-100 font-medium">
                Always & Forever
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl font-bold text-white mb-3">Open</div>
              <div className="text-primary-100 font-medium">
                Source Community
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative">
            Get Involved
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Want to contribute to our mission? Whether you're a developer,
            designer, healthcare professional, or just someone who believes in
            our cause, there are many ways to help.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              <div className="mb-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Become a Donor
                </h3>
                <p className="text-gray-600 mb-6">
                  Register as a donor and join thousands of others making a
                  difference in their communities.
                </p>
                <a
                  href="/register"
                  className="inline-flex items-center space-x-2 bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  <Heart className="h-5 w-5" />
                  <span>Register Now</span>
                </a>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              <div className="mb-6">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-secondary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Spread the Word
                </h3>
                <p className="text-gray-600 mb-6">
                  Help us reach more people by sharing DonorConnect with your
                  community and network.
                </p>
                <a
                  href="/"
                  className="inline-flex items-center space-x-2 bg-secondary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-secondary-700 transition-colors"
                >
                  <Users className="h-5 w-5" />
                  <span>Learn More</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
