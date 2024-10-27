"use client";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FaDumbbell, FaUser, FaHeartbeat, FaUtensils, FaComments, FaBook, FaVideo, FaBullhorn, FaChartLine, FaBars, FaTimes } from 'react-icons/fa';
import DashboardContent from '@/components/DashboardContents/Dashboard.Content';
import Profile_content from '@/components/DashboardContents/Profile';
import Workout from '@/components/DashboardContents/Workout';
import Learning from '@/components/DashboardContents/Learning';
import Meals from '@/components/DashboardContents/Meals';
import AI_Assitant from '@/components/DashboardContents/AIAssistant';
import VirtualMeetBookings from '@/components/DashboardContents/VirtualMeetBookings';
import Link from 'next/link';

interface SidebarProps {
  selectedSection: string; // Add selectedSection prop
  setSelectedSection: (section: string) => void;
  isOpen: boolean;
  toggleMenu: () => void;
}

interface UserData {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
  age?: number; 
  gender?: string; 
  dietaryPreferences: string[];
  healthParameters: {
      height?: number;
      weight?: number;
      bloodPressure?: {
          systolic?: number;
          diastolic?: number;
      };
      allergies?: string[];
  };
}

const Sidebar: React.FC<SidebarProps> = ({ selectedSection, setSelectedSection, isOpen, toggleMenu }) => {
  const [data, setData] = useState<UserData | null>(null);
  const router = useRouter();

  const getUserDetails = async () => {
    try {
      const res = await axios.get<{ data: UserData }>('/api/users/me');
      const userData: UserData = {
        ...res.data.data,
        dietaryPreferences: res.data.data.dietaryPreferences || [],
        healthParameters: res.data.data.healthParameters || {},
      };
      setData(userData);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch user details");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success("Logout Successful");
      router.push('/login');
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    }
  };

  return (
    <aside className={`fixed h-screen inset-0 bg-gray-100 p-5 flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-50 md:static md:translate-x-0 md:w-64`}>
      <div className="flex justify-between items-center mb-8">
        <div className="text-[#ff4f2b] text-2xl font-bold">
          <Link href="/">Shakti.io</Link>          
          </div>
        <button onClick={toggleMenu}>
          <FaTimes size={24} className="text-gray-700 md:hidden" />
        </button>
      </div>
      <nav className="flex-grow overflow-y-auto">
        <ul className="space-y-6">
          {[
            { section: 'dashboard', icon: <FaChartLine />, label: 'Dashboard' },
            { section: 'profile', icon: <FaUser />, label: 'Profile' },
            { section: 'workout-plan', icon: <FaDumbbell />, label: 'Workout Plan' },
            { section: 'health-assistant', icon: <FaHeartbeat />, label: 'Health Assistant' },
            { section: 'meal-plans', icon: <FaUtensils />, label: 'Meal Plans' },
            { section: 'community-support', icon: <FaComments />, label: 'Community Support' },
            { section: 'learning-hub', icon: <FaBook />, label: 'Learning Hub' },
            { section: 'virtual-consultations', icon: <FaVideo />, label: 'Virtual Consultations' },
            { section: 'announcement', icon: <FaBullhorn />, label: 'Announcement' },
          ].map(({ section, icon, label }) => (
            <li key={section}>
              <button 
                onClick={() => setSelectedSection(section)} 
                className={`flex items-center space-x-2 ${selectedSection === section ? 'text-[#ff4f2b] font-semibold' : 'text-gray-700 hover:text-[#ff4f2b]'}`}
              >
                {icon} <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-6 space-y-3">
        <button className="bg-[#ff4f2b] text-white py-2 px-4 w-full rounded">Settings</button>
        <button className="bg-[#ff4f2b] text-white py-2 px-4 w-full rounded" onClick={logout}>Log Out</button>
      </div>
    </aside>
  );
};

const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState('profile');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
    if (isMenuOpen) toggleMenu(); // Close the menu if it's open
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'dashboard':
        return <DashboardContent />;
      case 'profile':
        return <Profile_content />;
      case 'workout-plan':
        return <Workout />;
      case 'health-assistant':
        return <AI_Assitant />;
      case 'meal-plans':
        return <Meals />;
      case 'community-support':
        return <div>Community Support Content</div>;
      case 'learning-hub':
        return <Learning />;
      case 'virtual-consultations':
        return <VirtualMeetBookings />;
      case 'announcement':
        return <div>Announcement Content</div>;
      default:
        return <Profile_content />;
    }
  };

  return (
    <div className="relative min-h-screen overflow-y-hidden">
      <button onClick={toggleMenu} className="absolute top-5 right-5 z-50 md:hidden">
        <FaBars size={24} className="text-gray-700" />
      </button>

      {isMenuOpen && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={toggleMenu} />}

      <div className="flex">
        <Sidebar selectedSection={selectedSection} setSelectedSection={handleSectionChange} isOpen={isMenuOpen} toggleMenu={toggleMenu} />
        
        <main className="flex-1 p-6 bg-gray-50 md:ml-34">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
