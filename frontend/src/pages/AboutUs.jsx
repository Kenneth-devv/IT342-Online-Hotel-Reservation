import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Award, Shield, Heart, Globe, Star, 
  CheckCircle, TrendingUp, Building2, MapPin 
} from 'lucide-react';
import Header from '../components/Header';

const AboutUs = () => {
  const navigate = useNavigate();

  const handleExploreHotels = () => {
    navigate('/search-results');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter text-gray-800">
      <Header />

      <main className="container mx-auto px-4 py-8 pt-24 lg:pt-32">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            About <span className="text-blue-600">Bright Hotel</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your trusted partner in finding and booking premium hotels worldwide. 
            We connect travelers with exceptional accommodations that offer both luxury and comfort.
          </p>
        </section>

        {/* Mission & Vision Section */}
        <section className="bg-white rounded-3xl shadow-lg p-8 md:p-12 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To provide travelers with seamless access to the world's finest hotels, 
                ensuring every stay is memorable and every booking is effortless.
              </p>
              <div className="flex items-center space-x-2 text-blue-600">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Quality Assurance</span>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To become the leading platform for hotel discovery and booking, 
                making luxury travel accessible to everyone.
              </p>
              <div className="flex items-center space-x-2 text-blue-600">
                <Globe className="w-5 h-5" />
                <span className="font-semibold">Global Reach</span>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg leading-relaxed mb-6">
                  Founded with a passion for exceptional hospitality, Bright Hotel began as a small 
                  team of travel enthusiasts who believed that finding the perfect hotel should be 
                  effortless and enjoyable.
                </p>
                <p className="text-lg leading-relaxed">
                  Today, we've grown into a trusted platform serving thousands of travelers worldwide, 
                  connecting them with carefully curated hotels that meet the highest standards of quality and service.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 text-center">
                  <Users className="w-16 h-16 mx-auto mb-4" />
                  <div className="text-2xl font-bold">10,000+</div>
                  <div className="text-sm opacity-90">Happy Travelers</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer First</h3>
              <p className="text-gray-600">
                Every decision we make is centered around providing the best experience for our customers.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Trust & Security</h3>
              <p className="text-gray-600">
                Your data and payments are protected with the highest security standards.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Assurance</h3>
              <p className="text-gray-600">
                We carefully vet every hotel to ensure they meet our high standards.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We continuously improve our platform to provide the best booking experience.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white rounded-3xl shadow-lg p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Hotels Worldwide</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">10K+</div>
              <div className="text-gray-600">Happy Guests</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">99%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                JD
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Kenneth Ambos</h3>
              <p className="text-blue-600 mb-3">Project Lead & Backend Developer</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                JS
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aldrin Mangubat</h3>
              <p className="text-green-600 mb-3">Frontend Developer & UI/UX Designer</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                MJ
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Bryle Dinapo</h3>
              <p className="text-purple-600 mb-3">Frontend Developer & UI/UX Designer</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Discover amazing hotels and book your next adventure with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleExploreHotels}
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-colors"
            >
              Explore Hotels
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-blue-600 transition-colors">
              Contact Us
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Bright Hotel. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;