// VirtualMeetBookings.tsx
import React from 'react';

const VirtualMeetBookings: React.FC = () => {
  const calendlyLink = "https://calendly.com/gokboru647"; // Replace with your Calendly link

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-6 text-[#ff4f2b]">
        Schedule Your Virtual Meeting
      </h1>
      <p className="text-lg md:text-xl text-center mb-8">
        Select a time that works for you using Calendly.
      </p>
      <div className="w-full md:w-3/4 lg:w-1/2">
        <iframe
          src={calendlyLink}
          width="100%"
          height="700px"
          frameBorder="0"
          title="Calendly"
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default VirtualMeetBookings;
