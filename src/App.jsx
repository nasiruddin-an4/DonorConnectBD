import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import ToastContainer from "./components/UI/ToastContainer";
import BackToTop from "./components/UI/BackToTop";
import { useToast } from "./hooks/useToast";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Register from "./pages/Register";
import DonorList from "./pages/DonorList";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Emergency from "./pages/Emergency";

function App() {
  const { toasts, removeToast } = useToast();

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/register" element={<Register />} />
            <Route path="/donors" element={<DonorList />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer toasts={toasts} onRemove={removeToast} />
        <BackToTop />
      </div>
    </Router>
  );
}

export default App;
