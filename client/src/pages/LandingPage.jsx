import { useNavigate } from 'react-router-dom';
import Hero from "../components/Hero";
import Features from "../components/Features";
import Steps from "../components/Steps";
import ContactForm from "../components/ContactForm";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      <header className="flex items-center justify-between p-4 border-b">
        <img src="/logo.png" alt="Shuleni Logo" className="w-20 h-20" />
        <h1 className="text-2xl font-bold text-blue-600">Shuleni</h1>
      </header>

      <main>
        <Hero />
        <Features />
        <Steps />
        <ContactForm />
      </main>

      <div className="text-center my-6">
        <p className="mb-2 font-medium">Create an account (For School Owners ONLY!)</p>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-4"
          onClick={() => navigate('/school-owner-registration')}
        >
          Register
        </button>

        <p className="mt-4 mb-2 font-medium">Already have an account?</p>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => navigate('/login')}
        >
          Sign In
        </button>
      </div>

      <footer className="text-center text-sm py-6 bg-gray-100">
        © 2025 Shuleni. All rights reserved.
      </footer>
    </div>
  );
}

export default LandingPage;
