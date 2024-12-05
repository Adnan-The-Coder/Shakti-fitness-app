import React, { useState } from "react";

// Define the FAQ type for type safety
interface FAQ {
  question: string;
  answer: string;
}

const CommunitySupport = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // FAQ data
  const faqs: FAQ[] = [
    { question: "How do I join?", answer: 'Simply click on the "Join Now" button and sign up!' },
    { question: "Are there any fees?", answer: "Basic membership is free, with premium options available." },
    { question: "Can I participate in events online?", answer: "Yes, we offer both online and offline events." },
    { question: "Is there a mobile app?", answer: "Yes, download our app for a seamless experience." },
  ];

  return (
    <div className="bg-gray-100 text-gray-800 font-sans">
      <section className="bg-[#acacac68] text-white text-center py-12 px-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Shakti Community</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Join a vibrant group of fitness enthusiasts who uplift, inspire, and grow together. Empower yourself to
          achieve your health goals!
        </p>
      </section>
      <section className="py-12 px-6">
        <h2 className="text-center text-3xl font-semibold text-orange-600 mb-8">Why Join Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Exclusive Forums", description: "Engage in discussions with fitness pros and enthusiasts.", icon: "💬" },
            { title: "Weekly Challenges", description: "Push your limits with exciting weekly goals.", icon: "🏋️‍♂️" },
            { title: "Live Events", description: "Join webinars and in-person fitness events.", icon: "📅" },
            { title: "Resource Library", description: "Access workout guides, meal plans, and more.", icon: "📚" },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-orange-600 mt-4">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="py-12 bg-white px-6">
        <h2 className="text-center text-3xl font-semibold text-orange-600 mb-8">What Our Members Say</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { name: "Alex J.", feedback: "This community has transformed my fitness journey. Highly recommended!" },
            { name: "Sara K.", feedback: "The challenges keep me motivated every week!" },
            { name: "Tom R.", feedback: "I love the support and knowledge shared here!" },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 shadow-lg rounded-lg p-6 max-w-sm text-center hover:shadow-xl transition-shadow"
            >
              <p className="italic text-gray-600">"{testimonial.feedback}"</p>
              <h4 className="mt-4 text-lg font-semibold text-orange-600">{testimonial.name}</h4>
            </div>
          ))}
        </div>
      </section>
      <section className="py-12 px-6">
        <h2 className="text-center text-3xl font-semibold text-orange-600 mb-8">Frequently Asked Questions</h2>
        <div className="max-w-2xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white shadow-lg rounded-lg p-4 cursor-pointer ${
                activeFaq === index ? "ring-2 ring-orange-600" : ""
              }`}
              onClick={() => toggleFaq(index)}
            >
              <h3 className="text-lg font-semibold text-orange-600">{faq.question}</h3>
              {activeFaq === index && <p className="text-gray-600 mt-2">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </section>
      <section className="text-center py-12 bg-[#d1d1d168] text-white px-4">
        <button className="bg-white text-orange-600 px-6 py-3 text-lg font-semibold rounded-md shadow-md hover:bg-gray-100 transition">
          Join Now and Start Your Journey
        </button>
      </section>
    </div>
  );
};

export default CommunitySupport;
