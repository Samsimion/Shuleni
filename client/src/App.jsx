// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';

// import other dashboards here

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
