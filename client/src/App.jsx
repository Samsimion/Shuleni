import Hero from './components/Hero';
import Features from './components/Features';
import Steps from './components/Steps';
import Contact from './components/ContactForm';

function App() {
  return (
    <div>
      <header className="flex items-center justify-between p-4 border-b">
        <img src="/logo.png" alt="Shuleni Logo" className="w-10 h-10" />
        <nav className="space-x-4 text-sm font-medium">
          <a href="#">Home</a>
          <a href="#">Services</a>
          <a href="#">Features</a>
          <a href="#">Contact Us</a>
          <a href="#" className="bg-black text-white px-4 py-2 rounded">Get Started</a>
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

export default App;
