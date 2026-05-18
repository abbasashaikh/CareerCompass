import { Link } from 'react-router-dom';
import { CAREERS, MOTIVATION_QUOTES } from '../data/careers';
import { useState, useEffect } from 'react';

export default function Home() {
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setQuoteIdx(i => (i + 1) % MOTIVATION_QUOTES.length), 4000);
    return () => clearInterval(t);
  }, []);

  const quote = MOTIVATION_QUOTES[quoteIdx];

  return (
    <div style={{ paddingTop: 64 }}>
      {/* Hero */}
      <section style={{
        minHeight: '92vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '60px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        {/* BG orbs */}
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,53,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,170,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', maxWidth: 760, animation: 'fadeInUp 0.8s ease' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 50, background: 'rgba(255,107,53,0.12)', border: '1px solid rgba(255,107,53,0.25)', marginBottom: 28 }}>
            <span>🚀</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#FF6B35', fontFamily: 'Syne, sans-serif' }}>India's AI Career Guide for 10th & 12th Students</span>
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 24, fontFamily: 'Syne, sans-serif' }}>
            Find Your{' '}
            <span style={{ background: 'linear-gradient(135deg, #FF6B35, #FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Dream Career
            </span>
            <br />With AI Guidance
          </h1>

          <p style={{ fontSize: 18, color: '#8888AA', lineHeight: 1.7, marginBottom: 40, maxWidth: 580, margin: '0 auto 40px' }}>
            Confused after 10th or 12th results? Our AI mentor understands your interests, strengths and goals — and creates your personalized career roadmap in minutes.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 60 }}>
            <Link to="/quiz" style={{
              textDecoration: 'none', background: 'linear-gradient(135deg, #FF6B35, #e85a22)',
              color: 'white', padding: '16px 36px', borderRadius: 50,
              fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 16,
              boxShadow: '0 8px 32px rgba(255,107,53,0.4)',
              display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'transform 0.2s'
            }}>
              🎯 Start Career Quiz — Free
            </Link>
            <Link to="/explore" style={{
              textDecoration: 'none', background: 'transparent',
              color: '#F0F0FF', padding: '16px 36px', borderRadius: 50,
              fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: 16,
              border: '1px solid rgba(255,255,255,0.12)',
              display: 'inline-flex', alignItems: 'center', gap: 8
            }}>
              🔭 Explore Careers
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 40, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[['50+', 'Career Paths'], ['100%', 'AI Powered'], ['Free', 'To Start']].map(([num, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'Syne, sans-serif', background: 'linear-gradient(135deg, #FF6B35, #FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{num}</div>
                <div style={{ fontSize: 13, color: '#8888AA', marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Motivation quote ticker */}
      <div style={{ background: 'rgba(255,107,53,0.08)', borderTop: '1px solid rgba(255,107,53,0.15)', borderBottom: '1px solid rgba(255,107,53,0.15)', padding: '20px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: 16, fontStyle: 'italic', color: '#F0F0FF', maxWidth: 700, margin: '0 auto', transition: 'opacity 0.5s' }}>
          💬 "{quote.quote}" <span style={{ color: '#8888AA', fontSize: 13 }}>— {quote.author}</span>
        </p>
      </div>

      {/* Features */}
      <section style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 16 }}>
            Your <span className="gradient-text">Google Maps</span> for Career
          </h2>
          <p style={{ color: '#8888AA', fontSize: 17, maxWidth: 500, margin: '0 auto' }}>
            Not just suggestions — a complete visual journey from where you are to where you want to be.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {[
            { emoji: '🎯', title: 'Smart Career Quiz', desc: 'Fun, gamified assessment that discovers your hidden strengths and personality type in 6 questions.', color: '#FF6B35', link: '/quiz' },
            { emoji: '🗺️', title: 'Visual Roadmaps', desc: 'Step-by-step career maps with exams, colleges, skills and salary milestones laid out clearly.', color: '#00D4AA', link: '/roadmap' },
            { emoji: '🤖', title: 'AI Mentor Chat', desc: 'Ask anything — "Can I become a doctor with 60% marks?" — and get honest, friendly guidance.', color: '#7C3AED', link: '/mentor' },
            { emoji: '👨‍👩‍👧', title: 'Parent Dashboard', desc: 'Help parents understand career scope, salary projections and education costs for their child.', color: '#FFD700', link: '/parent' },
            { emoji: '🔭', title: 'Career Explorer', desc: 'Browse 50+ careers with demand scores, automation risk ratings and real day-in-the-life previews.', color: '#e84393', link: '/explore' },
            { emoji: '🎓', title: 'College Finder', desc: 'Find best colleges by location, fees, placement records and eligibility — all in one place.', color: '#00b894', link: '/explore' },
          ].map(f => (
            <Link key={f.title} to={f.link} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ height: '100%', cursor: 'pointer', transition: 'all 0.3s', borderColor: 'rgba(255,255,255,0.06)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = f.color + '50'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: f.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, marginBottom: 16, border: `1px solid ${f.color}30` }}>
                  {f.emoji}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: '#F0F0FF' }}>{f.title}</h3>
                <p style={{ color: '#8888AA', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Career Cards preview */}
      <section style={{ padding: '0 24px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800 }}>
            Trending <span className="gradient-text">Careers in India</span>
          </h2>
          <Link to="/explore" style={{ textDecoration: 'none', color: '#FF6B35', fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
            View All 50+ Careers →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
          {CAREERS.slice(0, 4).map(career => (
            <Link key={career.id} to={`/career/${career.id}`} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 20,
                transition: 'all 0.3s', cursor: 'pointer', position: 'relative', overflow: 'hidden'
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = career.color + '60'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border)'; }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, borderRadius: '50%', background: career.color + '08', transform: 'translate(40px,-40px)' }} />
                <div style={{ fontSize: 36, marginBottom: 12 }}>{career.emoji}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: '#F0F0FF' }}>{career.title}</h3>
                <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                  <span className="badge badge-teal" style={{ fontSize: 11 }}>📈 {career.growthRate}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, color: '#8888AA' }}>Avg Salary</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: career.color }}>{career.salaryRange.min}–{career.salaryRange.max} {career.salaryRange.currency}</span>
                </div>
                {/* Demand bar */}
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: 11, color: '#8888AA', marginBottom: 4 }}>Demand Score</div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${career.demandScore}%`, background: `linear-gradient(90deg, ${career.color}, ${career.color}88)` }} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(255,107,53,0.08), rgba(124,58,237,0.08))', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 20 }}>
          Still confused about your <span className="gradient-text">future?</span>
        </h2>
        <p style={{ color: '#8888AA', fontSize: 17, marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
          Take the 2-minute AI quiz. No sign-up needed. Get your personalized career roadmap instantly.
        </p>
        <Link to="/quiz" style={{
          textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10,
          background: 'linear-gradient(135deg, #FF6B35, #FFD700)', color: 'white',
          padding: '18px 44px', borderRadius: 50, fontSize: 18,
          fontFamily: 'Syne, sans-serif', fontWeight: 800,
          boxShadow: '0 12px 40px rgba(255,107,53,0.5)'
        }}>
          🚀 Discover Your Path Now
        </Link>
      </section>

      <style>{`@keyframes fadeInUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}
