import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CAREERS } from '../data/careers';
import { useApp } from '../context/AppContext';

const ROADMAP_TEMPLATES = [
  {
    id: 'jee-engineer',
    title: 'Engineering via JEE',
    emoji: '⚙️',
    color: '#7C3AED',
    path: '10th → PCM → 11th-12th JEE Prep → JEE Main/Advanced → B.Tech (IIT/NIT/BITS) → Internships → Software/Mechanical/Civil Engineer',
    steps: [
      { label: '10th Standard', sub: 'Focus on Math & Science', year: 'Now', icon: '📚', done: false },
      { label: 'Choose PCM in 11th', sub: 'Physics, Chemistry, Math', year: 'Year 1', icon: '🔢', done: false },
      { label: 'JEE Preparation', sub: 'Coaching / Self-study', year: 'Year 1-2', icon: '📖', done: false },
      { label: 'Clear JEE Main', sub: 'Target 150+ score', year: 'Year 2', icon: '✅', done: false },
      { label: 'Clear JEE Advanced', sub: 'For IIT admission', year: 'Year 2', icon: '🏆', done: false },
      { label: 'B.Tech (4 Years)', sub: 'IIT / NIT / BITS / Private', year: 'Year 3-6', icon: '🎓', done: false },
      { label: 'Internships', sub: 'Google, Amazon, Startups', year: 'Year 5-6', icon: '💼', done: false },
      { label: 'Software Engineer', sub: '₹6-50 LPA', year: 'Year 7+', icon: '💻', done: false },
    ]
  },
  {
    id: 'neet-doctor',
    title: 'Medical via NEET',
    emoji: '🩺',
    color: '#e85a22',
    path: '10th → PCB → 11th-12th NEET Prep → NEET UG → MBBS (5.5 yrs) → MD/MS → Doctor',
    steps: [
      { label: '10th Standard', sub: 'Focus on Biology & Science', year: 'Now', icon: '📚' },
      { label: 'Choose PCB in 11th', sub: 'Physics, Chemistry, Biology', year: 'Year 1', icon: '🧬' },
      { label: 'NEET Preparation', sub: 'NCERT mastery essential', year: 'Year 1-2', icon: '📖' },
      { label: 'Clear NEET UG', sub: 'Target 600+ score', year: 'Year 2', icon: '✅' },
      { label: 'MBBS Admission', sub: 'Govt / Private Medical College', year: 'Year 3', icon: '🏥' },
      { label: 'MBBS (5.5 Years)', sub: 'Including 1 yr internship', year: 'Year 3-8', icon: '🎓' },
      { label: 'PG Entrance (NEET-PG)', sub: 'For MD/MS specialization', year: 'Year 9', icon: '📝' },
      { label: 'Doctor / Specialist', sub: '₹8-80 LPA', year: 'Year 10+', icon: '🩺' },
    ]
  },
  {
    id: 'ca-finance',
    title: 'Chartered Accountant',
    emoji: '📊',
    color: '#00D4AA',
    path: '10th → Commerce → CA Foundation → CA Intermediate → Articleship → CA Final → CA',
    steps: [
      { label: '10th Standard', sub: 'Mathematics important', year: 'Now', icon: '📚' },
      { label: 'Commerce in 11th', sub: 'Accounts, Economics, Math', year: 'Year 1', icon: '💰' },
      { label: 'CA Foundation', sub: 'Register with ICAI', year: 'Year 2', icon: '📋' },
      { label: 'Clear CA Foundation', sub: '4 subjects exam', year: 'Year 2', icon: '✅' },
      { label: 'CA Intermediate', sub: '8 subjects in 2 groups', year: 'Year 3-4', icon: '📈' },
      { label: 'Articleship (3 Years)', sub: 'Practical training under CA', year: 'Year 4-6', icon: '💼' },
      { label: 'CA Final', sub: 'Hardest CA exam', year: 'Year 6-7', icon: '🏆' },
      { label: 'Chartered Accountant', sub: '₹7-60 LPA', year: 'Year 8+', icon: '📊' },
    ]
  },
  {
    id: 'upsc-ias',
    title: 'IAS via UPSC',
    emoji: '🏛️',
    color: '#a78bfa',
    path: '10th → Any Stream → Graduation (Any) → UPSC Prep 2-3 yrs → Prelims → Mains → Interview → IAS',
    steps: [
      { label: '10th Standard', sub: 'Any stream works', year: 'Now', icon: '📚' },
      { label: '11th-12th Any Stream', sub: 'Science/Commerce/Arts all ok', year: 'Year 1-2', icon: '📖' },
      { label: 'Graduation (3 Years)', sub: 'Any subject from any college', year: 'Year 3-5', icon: '🎓' },
      { label: 'UPSC Preparation', sub: 'Coaching or self-study', year: 'Year 5-7', icon: '📰' },
      { label: 'UPSC Prelims', sub: '2 papers: GS + CSAT', year: 'Year 6-8', icon: '✅' },
      { label: 'UPSC Mains', sub: '9 papers, essay writing', year: 'Year 6-8', icon: '📝' },
      { label: 'Personality Interview', sub: 'Final selection round', year: 'Year 6-8', icon: '🎯' },
      { label: 'IAS Officer', sub: '₹10-25 LPA + perks + power', year: 'Year 9+', icon: '🏛️' },
    ]
  },
  {
    id: 'design',
    title: 'Design (NIFT/NID)',
    emoji: '🎨',
    color: '#e84393',
    path: '10th → Arts/Any → Portfolio Building → NIFT/NID Entrance → B.Des → Designer',
    steps: [
      { label: '10th Standard', sub: 'Start drawing & sketching', year: 'Now', icon: '✏️' },
      { label: '11th-12th (Any Stream)', sub: 'Art classes recommended', year: 'Year 1-2', icon: '🎨' },
      { label: 'Portfolio Building', sub: 'Collect best artwork', year: 'Year 1-2', icon: '📁' },
      { label: 'NIFT/NID Entrance Prep', sub: 'CAT + GAT + Studio Test', year: 'Year 2', icon: '📖' },
      { label: 'Clear NIFT/NID Exam', sub: 'Creative & Aptitude tests', year: 'Year 2', icon: '✅' },
      { label: 'B.Des (4 Years)', sub: 'Fashion/Product/Textile', year: 'Year 3-6', icon: '🎓' },
      { label: 'Internship at Brand', sub: 'Zara, Fabindia, startups', year: 'Year 6', icon: '💼' },
      { label: 'Fashion/UX Designer', sub: '₹3-30 LPA', year: 'Year 7+', icon: '👗' },
    ]
  }
];

export default function Roadmap() {
  const { quizResults } = useApp();
  const [selected, setSelected] = useState(ROADMAP_TEMPLATES[0]);
  const [activeStep, setActiveStep] = useState(null);

  return (
    <div style={{ paddingTop: 64 }}>
      {/* Header */}
      <div style={{ padding: '60px 24px 40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, marginBottom: 16, fontFamily: 'Syne, sans-serif' }}>
          Visual Career <span className="gradient-text">Roadmaps</span>
        </h1>
        <p style={{ color: '#8888AA', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>
          Step-by-step visual journey from where you are to where you want to be. Click any step to learn more.
        </p>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px' }}>
        {/* Template selector */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 48, flexWrap: 'wrap', justifyContent: 'center' }}>
          {ROADMAP_TEMPLATES.map(t => (
            <button key={t.id} onClick={() => { setSelected(t); setActiveStep(null); }} style={{
              padding: '10px 20px', borderRadius: 50, cursor: 'pointer', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14,
              background: selected.id === t.id ? t.color : 'var(--surface)',
              color: selected.id === t.id ? '#0D0D1A' : '#8888AA',
              border: selected.id === t.id ? 'none' : '1px solid rgba(255,255,255,0.06)',
              transition: 'all 0.25s', display: 'flex', alignItems: 'center', gap: 8
            }}>
              <span>{t.emoji}</span> {t.title}
            </button>
          ))}
        </div>

        {/* Roadmap display */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 32 }}>
          <div>
            {/* Path summary */}
            <div style={{ background: selected.color + '10', border: `1px solid ${selected.color}25`, borderRadius: 16, padding: '16px 20px', marginBottom: 32 }}>
              <p style={{ fontSize: 13, color: '#8888AA', lineHeight: 1.8 }}>
                <span style={{ fontWeight: 700, color: selected.color }}>📍 Full Path: </span>{selected.path}
              </p>
            </div>

            {/* Steps - vertical timeline */}
            <div style={{ position: 'relative' }}>
              {/* Vertical line */}
              <div style={{ position: 'absolute', left: 28, top: 28, bottom: 28, width: 2, background: `linear-gradient(180deg, ${selected.color} 0%, ${selected.color}20 100%)` }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {selected.steps.map((step, i) => (
                  <div key={i} onClick={() => setActiveStep(activeStep === i ? null : i)} style={{ display: 'flex', gap: 20, cursor: 'pointer', padding: '12px 0', position: 'relative' }}>
                    {/* Node */}
                    <div style={{
                      width: 56, height: 56, borderRadius: '50%', flexShrink: 0,
                      background: activeStep === i ? selected.color : selected.color + '15',
                      border: `2px solid ${selected.color}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 22, transition: 'all 0.25s', zIndex: 1,
                      boxShadow: activeStep === i ? `0 0 20px ${selected.color}60` : 'none'
                    }}>
                      {step.icon}
                    </div>

                    {/* Content */}
                    <div style={{
                      flex: 1, background: activeStep === i ? selected.color + '10' : 'var(--surface)',
                      border: `1px solid ${activeStep === i ? selected.color + '30' : 'rgba(255,255,255,0.06)'}`,
                      borderRadius: 14, padding: '14px 18px', transition: 'all 0.25s',
                      transform: activeStep === i ? 'translateX(4px)' : 'translateX(0)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4, flexWrap: 'wrap', gap: 8 }}>
                        <span style={{ fontWeight: 700, fontFamily: 'Syne, sans-serif', fontSize: 16, color: activeStep === i ? selected.color : '#F0F0FF' }}>{step.label}</span>
                        <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 20, background: selected.color + '15', color: selected.color, fontWeight: 600, fontFamily: 'Syne, sans-serif' }}>{step.year}</span>
                      </div>
                      <p style={{ color: '#8888AA', fontSize: 13 }}>{step.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Summary card */}
            <div className="card" style={{ borderColor: selected.color + '30' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{selected.emoji}</div>
              <h3 style={{ fontWeight: 800, marginBottom: 8, fontFamily: 'Syne, sans-serif' }}>{selected.title}</h3>
              <p style={{ color: '#8888AA', fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
                Total journey: <strong style={{ color: '#F0F0FF' }}>{selected.steps.length} major steps</strong>
              </p>
              {CAREERS.find(c => {
                const map = { 'jee-engineer': 'software-engineer', 'neet-doctor': 'doctor', 'ca-finance': 'ca', 'upsc-ias': 'ias-officer', 'design': 'fashion-designer' };
                return c.id === map[selected.id];
              }) && (
                <Link to={`/career/${{ 'jee-engineer': 'software-engineer', 'neet-doctor': 'doctor', 'ca-finance': 'ca', 'upsc-ias': 'ias-officer', 'design': 'fashion-designer' }[selected.id]}`} style={{ textDecoration: 'none' }}>
                  <button className="btn-primary" style={{ width: '100%', fontSize: 13, padding: '10px' }}>View Full Career Details →</button>
                </Link>
              )}
            </div>

            {/* Tips card */}
            <div className="card" style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.06), rgba(255,107,53,0.04))', borderColor: 'rgba(255,215,0,0.15)' }}>
              <h3 style={{ fontWeight: 800, marginBottom: 14, fontFamily: 'Syne, sans-serif', fontSize: 16, color: '#FFD700' }}>💡 Pro Tips</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  "Start preparing from 11th itself — don't wait for 12th",
                  "Attempt mock tests regularly from Day 1",
                  "NCERT books are the backbone for most exams",
                  "Join online communities of aspirants for motivation"
                ].map((tip, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, fontSize: 13, color: '#8888AA', lineHeight: 1.5 }}>
                    <span style={{ color: '#FFD700', flexShrink: 0 }}>→</span> {tip}
                  </div>
                ))}
              </div>
            </div>

            {/* Motivation */}
            <div style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(0,212,170,0.08))', border: '1px solid rgba(124,58,237,0.2)', borderRadius: 16, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🚀</div>
              <p style={{ fontSize: 14, color: '#F0F0FF', lineHeight: 1.6, fontStyle: 'italic' }}>
                "Every expert was once a beginner. Every champion was once a student just like you."
              </p>
            </div>

            <Link to="/mentor" style={{ textDecoration: 'none' }}>
              <button className="btn-secondary" style={{ width: '100%', fontSize: 14 }}>
                🤖 Ask AI Mentor About This Path
              </button>
            </Link>
          </div>
        </div>
      </div>

      <style>{`@media (max-width: 900px) { .roadmap-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
