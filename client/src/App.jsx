import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import OwnerDashboard from "./pages/OwnerPage";

// import other dashboards here

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/owner" element={<OwnerDashboard />} />
        
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
