import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import ServiceDetail from "./pages/ServiceDetail";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />

        <Route path="/services" element={<ServiceDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
