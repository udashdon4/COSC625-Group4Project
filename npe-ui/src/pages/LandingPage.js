import React, { useState, useEffect } from 'react';

// Image paths relative to the 'public' folder
const heroImages = Array.from({ length: 10 }, (_, i) => `/images/hero-${i + 1}.jpg`);

const LandingPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [backgroundStyle, setBackgroundStyle] = useState({});

  // Effect to change the image index every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 7000); // Change image every 7 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Effect to update the background style when the index changes
  useEffect(() => {
    setBackgroundStyle({
      backgroundImage: `url('${heroImages[currentImageIndex]}')`,
    });
  }, [currentImageIndex]);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section
        id="home"
        className="hero-section min-h-screen flex flex-col justify-center items-center text-center text-white relative overflow-hidden bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={backgroundStyle}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        <div className="z-10 max-w-2xl px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">Discover the Wonders of Nature.</h1>
          <a 
            href="#explore" 
            className="inline-block mt-8 px-8 py-3 bg-white text-gray-800 font-semibold rounded-md hover:bg-gray-100 transition-colors duration-300 shadow-lg"
          >
            Explore
          </a>
        </div>
        
        {/* Dots indicators for slideshow */}
        <div className="absolute bottom-12 flex space-x-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full ${index === currentImageIndex % 3 ? 'bg-white' : 'bg-white bg-opacity-50'}`}
            ></div>
          ))}
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-xl md:text-2xl font-semibold text-center mb-12 text-gray-800">Trusted Partners in Conservation</h2>
          <div className="flex flex-wrap justify-center gap-10 md:gap-16 items-center">
            {/* Partner logos - replacing placeholders with better design */}
            <div className="w-32 h-16 bg-gray-100 rounded-md flex items-center justify-center border border-gray-200">
              <span className="text-gray-500 font-medium">Partner 1</span>
            </div>
            <div className="w-32 h-16 bg-gray-100 rounded-md flex items-center justify-center border border-gray-200">
              <span className="text-gray-500 font-medium">Partner 2</span>
            </div>
            <div className="w-32 h-16 bg-gray-100 rounded-md flex items-center justify-center border border-gray-200">
              <span className="text-gray-500 font-medium">Partner 3</span>
            </div>
            <div className="w-32 h-16 bg-gray-100 rounded-md flex items-center justify-center border border-gray-200">
              <span className="text-gray-500 font-medium">Partner 4</span>
            </div>
          </div>
        </div>
      </section>

      {/* National Parks Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">NATIONAL PARKS AROUND US</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">A headline about our national parks & their wonders</h2>
          </div>
          
          {/* Statistics Grid - improved layout matching design */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">327M+</h3>
              <p className="text-sm text-gray-600">Annual visitors to national parks</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">84</h3>
              <p className="text-sm text-gray-600">Total number of national parks</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">3.4M acres</h3>
              <p className="text-sm text-gray-600">Average size of a national park</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">18B</h3>
              <p className="text-sm text-gray-600">Estimated annual revenue from park visitors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image Section - Improved sizing and no cropping */}
      <section className="relative">
        <img 
          src="/images/hero-1.jpg" 
          alt="Beautiful landscape of a national park" 
          className="w-full h-auto md:h-[500px] object-cover object-center"
        />
      </section>

      {/* Call to Action Section - Better layout matching design */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Left side (optional photo) */}
            <div className="md:w-2/5 lg:w-1/2 bg-gray-100 rounded-lg overflow-hidden hidden md:block">
              <img 
                src="/images/hero-5.jpg" 
                alt="National Park scenery" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Right side with text and call to action */}
            <div className="md:w-3/5 lg:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Explore the Great Outdoors Today!</h2>
              <p className="text-gray-700 mb-8 text-lg">
                Discover the beauty and wonder of America's National Parks. Your journey begins with just one click.
              </p>
              
              <div className="mb-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 mt-1 rounded-full bg-green-500 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-gray-800">Observe, Investigate, and Appreciate the Wonders of Nature</p>
                    <p className="text-gray-600 text-sm mt-1">Access detailed park information and extras, making it easier to navigate to specific destinations.</p>
                  </div>
                </div>
              </div>
              
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-md transition duration-300 shadow-md">
                Embark on Your Journey
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section - Improved card design */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-gray-800">Experience the Great Outdoors</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <img 
                src="/images/hero-2.jpg" 
                alt="Activities and sightseeing" 
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-gray-800">Activities / Sightseeing</h3>
                <p className="text-gray-600">
                  Discover the breathtaking landscapes and view the most beautiful sights our parks have to offer.
                </p>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <img 
                src="/images/hero-3.jpg" 
                alt="Exciting activities" 
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-gray-800">Exciting Activities</h3>
                <p className="text-gray-600">
                  From hiking trails to scenic lakes, our national parks offer a wide range of activities for all ages.
                </p>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <img 
                src="/images/hero-4.jpg" 
                alt="Conservation efforts" 
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-gray-800">Conservation Efforts</h3>
                <p className="text-gray-600">
                  Join us in our mission to protect and preserve these natural wonders for future generations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Simple Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center text-sm">
          <p> 2025 National Park Explorer. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <a href="#" className="text-gray-300 hover:text-white">Privacy</a>
            <a href="#" className="text-gray-300 hover:text-white">Terms</a>
            <a href="#" className="text-gray-300 hover:text-white">About</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
