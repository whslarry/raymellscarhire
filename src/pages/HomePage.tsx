import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Shield, Clock, Users, Star, MapPin, Phone, ArrowRight, DollarSign, Key, Heart, UserCheck } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: <Car className="h-12 w-12 text-blue-600" />,
      title: "Premium Fleet",
      description: "Modern, well-maintained vehicles across all categories"
    },
    {
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      title: "Fully Insured",
      description: "Comprehensive insurance coverage for peace of mind"
    },
    {
      icon: <Clock className="h-12 w-12 text-blue-600" />,
      title: "24/7 Support",
      description: "Round-the-clock customer service and roadside assistance"
    },
    {
      icon: <Users className="h-12 w-12 text-blue-600" />,
      title: "Expert Team",
      description: "Professional staff dedicated to exceptional service"
    }
  ];

  const services = [
    {
      icon: <DollarSign className="h-12 w-12 text-green-600" />,
      title: "Affordable Prices",
      description: "Competitive rates with transparent pricing and no hidden fees"
    },
    {
      icon: <Key className="h-12 w-12 text-blue-600" />,
      title: "Self-Driven Car Hire",
      description: "Drive yourself with complete freedom and flexibility"
    },
    {
      icon: <Car className="h-12 w-12 text-purple-600" />,
      title: "Vehicle Leasing",
      description: "Long-term vehicle leasing solutions for businesses and individuals"
    },
    {
      icon: <Heart className="h-12 w-12 text-red-600" />,
      title: "Chauffeur Driven Wedding Cars",
      description: "Elegant wedding car service with professional chauffeurs for your special day"
    }
  ];

  const vehicleClasses = [
    {
      name: "Economy",
      image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=600",
      price: "KSH 2,500/day",
      features: ["Fuel Efficient", "Perfect for City", "Manual/Automatic"]
    },
    {
      name: "SUV",
      image: "https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=600",
      price: "KSH 6,000/day",
      features: ["Spacious", "4WD Available", "Family Friendly"]
    },
    {
      name: "Luxury",
      image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=600",
      price: "KSH 12,000/day",
      features: ["Premium Comfort", "Latest Technology", "Chauffeur Service"]
    }
  ];

  const reviews = [
    {
      name: "Sarah Mwangi",
      rating: 5,
      comment: "Exceptional service! The car was in perfect condition and the staff was very professional.",
      location: "Nairobi"
    },
    {
      name: "John Kamau",
      rating: 5,
      comment: "Great pricing and excellent customer service. Will definitely use again!",
      location: "Mombasa"
    },
    {
      name: "Grace Wanjiku",
      rating: 4,
      comment: "Smooth booking process and reliable vehicles. Highly recommended!",
      location: "Kisumu"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center h-screen flex items-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Premium Car Rental
            <span className="block text-yellow-400">Made Simple</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Experience luxury and convenience with Raymells Carhire. 
            Flexible pricing, reliable vehicles, and exceptional service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/vehicles"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              View Our Fleet <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              Contact Us <Phone className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive car rental solutions tailored to meet all your transportation needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow bg-gray-50 hover:bg-white border border-gray-100">
                <div className="flex justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Raymells Carhire?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide premium car rental services with unmatched quality and customer satisfaction
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow bg-white">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Classes Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Vehicle Classes
            </h2>
            <p className="text-xl text-gray-600">
              Choose from our diverse fleet to match your needs and budget
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vehicleClasses.map((vehicle, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{vehicle.name}</h3>
                  <p className="text-2xl font-bold text-blue-600 mb-4">{vehicle.price}</p>
                  <ul className="space-y-2 mb-6">
                    {vehicle.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/vehicles"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors inline-block text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Real reviews from satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{review.comment}"</p>
                <div className="flex items-center">
                  <div>
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {review.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Hit the Road?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Book your perfect vehicle today and experience premium car rental services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/payment"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              Book Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a
              href="tel:+254794967335"
              className="border-2 border-white hover:bg-white hover:text-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              Call Now <Phone className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;