import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Explore from './pages/Explore';
import CareerDetail from './pages/CareerDetail';
import Roadmap from './pages/Roadmap';
import Mentor from './pages/Mentor';
import Parent from './pages/Parent';

export default function App() {
  return (
    <AppProvider>
      <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/career/:id" element={<CareerDetail />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/mentor" element={<Mentor />} />
          <Route path="/parent" element={<Parent />} />
          <Route path="*" element={
            <div style={{ paddingTop:64, textAlign:'center', padding:'120px 24px' }}>
              <div style={{ fontSize:64, marginBottom:16 }}>🔭</div>
              <h2 style={{ fontFamily:'Syne, sans-serif', fontSize:32, marginBottom:16 }}>Page not found</h2>
              <a href="/" style={{ color:'#FF6B35', textDecoration:'none', fontSize:16 }}>← Go Home</a>
            </div>
          } />
        </Routes>
      </div>
    </AppProvider>
  );
}
