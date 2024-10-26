'use client'

import { useEffect, useState } from 'react';
import Hero from "@/components//home/Hero";
import { Navbar } from "@/components/home/Navbar";
import Image from 'next/image';
import Banner from '@/components/home/Banner';
import About from '@/components/home/About';
import Services from '@/components/home/Services';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-10 right-10 p-3 bg-[#fe4f2a] text-white rounded-full transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
      style={{ display: visible ? 'block' : 'none' }}
    >
      <Image src="https://img.icons8.com/?size=100&id=39805&format=png&color=FFFFFF" width={30} height={50} alt="" className='w-6' />
    </button>
  );
};

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Banner/>
      <About/>
      <Services/>
      <BackToTop />
    </>
  );
}
