"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import main from '../images/main.png';
import Image from 'next/image';

const Hero: React.FC = () => {
  const funFacts = [
    "Your heart is about the size of your fist and weighs as much as a softball.",
    "The human body contains around 37.2 trillion cells.",
    "Your brain uses 20% of the total oxygen and blood in your body.",
    "Sweat is odorless; its the bacteria on the skin that causes the smell.",
    "Regular physical activity can improve your mood and reduce feelings of anxiety and depression.",
    "Laughter can increase blood flow by 20%, improving cardiovascular health.",
    "Your body burns calories even while you sleep.",
    "The average adult has 206 bones in their body, but we are born with about 300 bones.",
    "Every day, your heart pumps about 2,000 gallons of blood through your body.",
    "A single human hair can support up to 100 grams in weight."
  ];

  const [randomFact, setRandomFact] = useState<string>("");
  useEffect(() => {
    const getRandomFact = () => {
      const randomIndex = Math.floor(Math.random() * funFacts.length);
      setRandomFact(funFacts[randomIndex]);
    };

    getRandomFact();
  }, []);

  return (
    <div>
      <section className='flex flex-col items-center justify-between px-4 md:px-8 lg:px-12 bg-[#d9d9d9]'>
        <div className='text-center'>
          <h1 className='text-white text-5xl sm:text-7xl lg:text-9xl uppercase tracking-tighter font-semibold mt-10 lg:mt-0 mb-10 lg:mb-0'>
            start smart
          </h1>
        </div>

        <div className='flex flex-col lg:flex-row items-center justify-center gap-2 relative bottom-8 lg:bottom-16 mb-10 lg:mb-20 mt-5'>
          <div className='flex flex-col gap-10 items-center lg:items-start'>
            <p className='text-center lg:text-left text-sm sm:text-base'>
              Your fitness journey made smarter,<br /> simpler and more enjoyable
            </p>
            <div className='bg-[#fe4f2a] rounded-full flex flex-row gap-2 w-28 sm:w-32 p-2 items-center'>
              <img src="https://img.icons8.com/?size=100&id=W9CkRVadJo-2&format=png&color=FFFFFF" alt="" className='w-5 sm:w-7' />
              <Link href="/" className='text-white text-xs sm:text-sm'>Join now</Link>
            </div>

            <div className='hidden bg-white rounded-3xl p-3 sm:p-5 gap-4 lg:flex flex-col h-[150px]'>
              <div className='flex flex-row items-center gap-2'>
                <img src="https://img.icons8.com/?size=100&id=NfcQrhEa0f4c&format=png&color=000000" className='w-5 sm:w-7' alt="" />
                <h1 className='text-sm sm:text-base'>Fun fact:</h1>
              </div>
              <div>
                  <li className='text-[#767272] text-xs sm:text-sm max-w-xs sm:max-w-sm'>{randomFact}</li> 
              </div>
            </div>
          </div>

          <div className='w-full lg:w-auto'>
            <Image className="w-[300px] sm:w-[400px] md:w-[500px] phoenix" src={main} alt="main" />
          </div>

          <div className='flex-col gap-y-5 items-center hidden lg:flex lg:items-start'>
            <h1 className='text-white text-4xl sm:text-5xl tracking-tighter font-semibold'>.io</h1>
            <p className='max-w-xs sm:max-w-sm text-center lg:text-left text-xs sm:text-sm'>
              We prioritize your wellness journey by combining cutting-edge AI technology with a community-driven approach.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
