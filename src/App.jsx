import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero'; 
import Footer from '@/components/Footer'; 
import Roster from '@/components/Roster'; 
import Contact from '@/components/Contact'; 
import Highlights from '@/components/Highlights'; 

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-vortex-black text-vortex-light">
        <Navbar />
        
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/roster" element={<Roster />} />
            <Route path="/highlights" element={<Highlights />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;