import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Home', emoji: '🏠' },
  { path: '/quiz', label: 'Quiz', emoji: '🎯' },
  { path: '/explore', label: 'Explore', emoji: '🔭' },
  { path: '/roadmap', label: 'Roadmap', emoji: '🗺️' },
  { path: '/mentor', label: 'AI Mentor', emoji: '🤖' },
  { path: '/parent', label: 'For Parents', emoji: '👨‍👩‍👧' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: 'rgba(13,13,26,0.85)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '0 24px', height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #FF6B35, #FFD700)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18
          }}>🧭</div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 18, color: '#F0F0FF' }}>
            Career<span style={{ color: '#FF6B35' }}>Compass</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="desktop-nav">
          {navItems.map(item => (
            <Link key={item.path} to={item.path} style={{
              textDecoration: 'none',
              padding: '8px 14px', borderRadius: 8,
              fontSize: 13, fontWeight: 500,
              fontFamily: 'DM Sans, sans-serif',
              color: loc.pathname === item.path ? '#FF6B35' : '#8888AA',
              background: loc.pathname === item.path ? 'rgba(255,107,53,0.1)' : 'transparent',
              transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', gap: 6
            }}>
              <span>{item.emoji}</span> {item.label}
            </Link>
          ))}
          <Link to="/quiz" style={{
            textDecoration: 'none', marginLeft: 8,
            background: 'linear-gradient(135deg, #FF6B35, #e85a22)',
            color: 'white', padding: '8px 20px', borderRadius: 50,
            fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13,
            boxShadow: '0 4px 16px rgba(255,107,53,0.3)'
          }}>Start Free →</Link>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} style={{
          background: 'none', border: 'none', cursor: 'pointer', color: '#F0F0FF',
          fontSize: 24, display: 'none'
        }} className="hamburger">☰</button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0, zIndex: 999,
          background: 'rgba(13,13,26,0.98)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 4
        }}>
          {navItems.map(item => (
            <Link key={item.path} to={item.path} onClick={() => setOpen(false)} style={{
              textDecoration: 'none', padding: '12px 16px', borderRadius: 10,
              fontSize: 15, color: loc.pathname === item.path ? '#FF6B35' : '#F0F0FF',
              background: loc.pathname === item.path ? 'rgba(255,107,53,0.1)' : 'transparent',
              display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'DM Sans, sans-serif'
            }}>
              <span style={{ fontSize: 20 }}>{item.emoji}</span> {item.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </>
  );
}
