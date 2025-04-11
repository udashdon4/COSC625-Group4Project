import React from 'react';

const AboutPage = () => {
  // Mock data for Press & Media Coverage
  const mediaArticles = [
    {
      id: 1,
      title: 'Exploring the Outdoors: National Park Explorer\'s New Features',
      category: 'Nature, Conservation',
      date: 'Oct 15, 2023',
      image: '/images/hero-6.jpg',
    },
    {
      id: 2,
      title: 'Top 10 National Parks to Visit This Fall',
      category: 'Travel, Adventure',
      date: 'Sep 20, 2023',
      image: '/images/hero-7.jpg',
    },
    {
      id: 3,
      title: 'An engaging cloud-first website featuring the mission and values of the National Park Explorer',
      category: 'Website, Conservation',
      date: 'Aug 15, 2023',
      image: '/images/hero-8.jpg',
    },
  ];

  // Mock data for User Testimonials
  const testimonials = [
    {
      id: 1,
      name: 'Liam Beck',
      role: 'Outdoor Ranger',
      quote: 'The National Park Explorer app is a must-have for any nature enthusiast!',
      avatar: '/images/avatar-1.jpg', // Placeholder
    },
    {
      id: 2,
      name: 'Aria Willow',
      role: 'Travel Writer',
      quote: 'A fantastic resource for planning my national park adventures.',
      avatar: '/images/avatar-2.jpg', // Placeholder
    },
    {
      id: 3,
      name: 'Noah Pine',
      role: 'Environmental Scientist',
      quote: 'An invaluable tool for understanding the conservation efforts in our parks.',
      avatar: '/images/avatar-3.jpg', // Placeholder
    },
    {
      id: 4,
      name: 'Emma Maple',
      role: 'Hiking Enthusiast',
      quote: 'The detailed guides and maps are simply amazing!',
      avatar: '/images/avatar-4.jpg', // Placeholder
    },
  ];

  // FAQ items
  const faqItems = [
    {
      id: 1,
      question: 'How do I use the National Park Explorer app?',
      answer: 'Download the app from your app store, create an account, and start exploring parks near you or planning your next adventure.'
    },
    {
      id: 2,
      question: 'What parks are included in the app?',
      answer: 'Our app includes all 63 US National Parks, plus many National Monuments, Historic Sites, and Recreation Areas.'
    },
    {
      id: 3,
      question: 'How does the app support conservation efforts?',
      answer: 'A portion of each subscription goes directly to conservation initiatives. We also promote volunteer opportunities and sustainable tourism practices.'
    },
    {
      id: 4,
      question: 'Can I contribute to the app\'s content?',
      answer: 'Yes! Users can submit photos, trail reviews, and wildlife sightings that may be featured in our community section.'
    },
    {
      id: 5,
      question: 'Is the app available offline?',
      answer: 'Yes, you can download park maps and guides for offline use when you\'re in remote areas with limited connectivity.'
    },
  ];

  return (
    <div className="about-page bg-white">
      {/* Hero/Mission Statement Section */}
      <section className="py-16 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            The National Park Explorer is dedicated to enhancing public awareness of 
            national park conservation, empowering visitors with the knowledge and 
            resources they need to prepare for their adventures while promoting sustainable 
            tourism practices.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-16 leading-tight">
            Our team is comprised of passionate environmentalists, developers, and 
            designers committed to bringing the beauty of national parks to your 
            fingertips.
          </h2>
          <div className="w-full h-px bg-gray-300 my-8"></div> {/* Divider */}
        </div>
      </section>

      {/* Press & Media Coverage */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-12">Press & Media Coverage</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mediaArticles.map((article) => (
              <div key={article.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{article.category}</p>
                  <p className="text-xs text-gray-500">{article.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-12 text-center">What Our Users Say</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden mr-4">
                    {/* Placeholder for avatar */}
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      {testimonial.name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">{testimonial.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            {faqItems.map((item) => (
              <div key={item.id} className="py-5">
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                    <span className="text-lg font-semibold">{item.question}</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" width="24" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - reusing the same footer as the landing page */}
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

export default AboutPage;
