import React from 'react';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Steps from '../components/landing/Steps';
import Contact from '../components/landing/ContactForm';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate()

    function handleLogin(){
        navigate('/login')
    }

    function handleregistration(){
        navigate("/school-owner-registration")
    } 

  return (
    <div>
      <header className="flex items-center justify-between p-4 border-b">
        <img src="/logo.png" alt="Shuleni Logo" className="w-20 h-20" />

        <nav className="space-x-4 text-sm font-medium">
          <a href="#home" className="hover:text-blue-500">Home</a>
          <a href="#services" className="hover:text-blue-500">Services</a>
          <a href="#features" className="hover:text-blue-500">Features</a>
          <a href="#contact" className="hover:text-blue-500">Contact Us</a>
          <button onClick={handleregistration} className="bg-black text-white px-4 py-2 rounded hover:bg-blue-600">Get Started</button>
          <button onClick={handleLogin} className="bg-black text-white px-4 py-2 rounded hover:bg-blue-600">Login</button>
        </nav>

      </header>

      <main>
        <Hero />
        <Features />
        <Steps />
        <Contact />
      </main>


      <footer className="text-center text-sm py-6 bg-gray-100">
        © 2025 Shuleni. All rights reserved.
      </footer>
    </div>
  );
}

export default LandingPage


