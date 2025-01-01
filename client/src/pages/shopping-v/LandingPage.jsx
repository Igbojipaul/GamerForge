import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GamingKeyboard from "../../assets/GamingKeyboard.jpg";
import GamingHeadset from "../../assets/GamingHeadset.jpg";
import GamingConsole from "../../assets/GamingConsole.jpg";



const LandingPage = () => {
    const navigate = useNavigate();

    const handleShopNow = () => {
        navigate('/auth/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
            {/* Header */}
            <header className="flex justify-between items-center px-6 py-4">
                <h1 className="text-3xl font-bold text-purple-500">GamerForge</h1>
                <div>
                    <Link 
                        to="/auth/login"
                        className="px-4 py-2 border border-purple-500 text-purple-500 rounded hover:bg-purple-500 hover:text-white transition"
                    >
                        Sign Up / Sign In
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="flex flex-col items-center justify-center text-center pt-20 pb-10 px-4"
            >
                <h2 className="text-5xl font-extrabold mb-4">
                    Level Up Your Gaming Setup
                </h2>
                <p className="text-lg text-gray-300 mb-8 max-w-xl">
                    Discover the best gaming accessories to enhance your experience. From keyboards to headsets, we’ve got you covered.
                </p>
                <button
                    onClick={handleShopNow}
                    className="px-6 py-3 bg-purple-500 rounded-lg text-white font-semibold hover:bg-purple-600 transition shadow-lg"
                >
                    Shop Now
                </button>
            </motion.div>

            {/* Animated Images */}
            <div className="flex justify-center gap-8 px-4">
                <motion.img
                    src={GamingKeyboard}
                    alt="Gaming Keyboard"
                    className="w-1/4 rounded-lg shadow-lg"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                />
                <motion.img
                    src={GamingHeadset}
                    alt="Gaming Headset"
                    className="w-1/4 rounded-lg shadow-lg"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                />
                <motion.img
                    src={GamingConsole}
                    alt="Gaming Mouse"
                    className="w-1/4 rounded-lg shadow-lg"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                />
            </div>

            {/* Footer */}
            <footer className="text-center text-gray-400 mt-16 py-6 border-t border-gray-700">
                <p>&copy; 2025 GamerForge. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
