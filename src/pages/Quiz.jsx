import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QUIZ_QUESTIONS, CAREERS } from '../data/careers';
import { useApp } from '../context/AppContext';

function computeResults(answers) {
  const tally = {};
  answers.forEach(a => {
    tally[a.trait] = (tally[a.trait] || 0) + 1;
  });
  const sorted = Object.entries(tally).sort((a, b) => b[1] - a[1]);
  const topTrait = sorted[0]?.[0] || 'analytical';

  const traitCareerMap = {
    technical: ['software-engineer', 'data-scientist', 'architect'],
    analytical: ['data-scientist', 'ca', 'software-engineer'],
    creative: ['fashion-designer', 'architect', 'content-creator'],
    social: ['doctor', 'ias-officer', 'content-creator'],
    entrepreneurial: ['content-creator', 'ca', 'software-engineer'],
  };

  const careerIds = traitCareerMap[topTrait] || traitCareerMap.analytical;
  const recommendations = careerIds.map(id => CAREERS.find(c => c.id === id)).filter(Boolean);

  return { tally, topTrait, recommendations };
}

export default function Quiz() {
  const [step, setStep] = useState('intro'); // intro | profile | quiz | result
  const [profile, setProfile] = useState({ name: '', standard: '12', stream: '', marks: '' });
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState(null);
  const { setUser, setQuizResults } = useApp();
  const navigate = useNavigate();

  const handleProfileNext = () => {
    if (!profile.name.trim()) return;
    setUser(profile);
    setStep('quiz');
  };

  const handleAnswer = (option) => {
    setSelected(option.id);
    setTimeout(() => {
      const newAnswers = [...answers, option];
      setAnswers(newAnswers);
      setSelected(null);
      if (current + 1 < QUIZ_QUESTIONS.length) {
        setCurrent(current + 1);
      } else {
        const r = computeResults(newAnswers);
        setResults(r);
        setQuizResults(r);
        setStep('result');
      }
    }, 500);
  };

  const progress = ((current) / QUIZ_QUESTIONS.length) * 100;

  const traitLabels = {
    analytical: { label: 'The Analyzer', emoji: '🧠', desc: 'You love data, patterns and logical thinking', color: '#FFD700' },
    creative: { label: 'The Creator', emoji: '🎨', desc: 'You thrive on ideas, design and expression', color: '#e84393' },
    social: { label: 'The People Person', emoji: '🤝', desc: 'You love helping, connecting and leading others', color: '#00D4AA' },
    entrepreneurial: { label: 'The Builder', emoji: '🚀', desc: 'You love building things and taking risks', color: '#FF6B35' },
    technical: { label: 'The Engineer', emoji: '⚙️', desc: 'You enjoy solving complex technical challenges', color: '#7C3AED' },
  };

  if (step === 'intro') return (
    <div style={{ paddingTop: 64, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
      <div style={{ maxWidth: 560, width: '100%', textAlign: 'center', animation: 'fadeInUp 0.6s ease' }}>
        <div style={{ fontSize: 80, marginBottom: 24 }}>🎯</div>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, marginBottom: 16, fontFamily: 'Syne, sans-serif' }}>
          Career Discovery <span className="gradient-text">Quiz</span>
        </h1>
        <p style={{ color: '#8888AA', fontSize: 17, lineHeight: 1.7, marginBottom: 40 }}>
          6 fun questions. 2 minutes. Discover your personality type and get AI-powered career recommendations tailored just for you.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 40, flexWrap: 'wrap' }}>
          {['⚡ 2 minutes', '🎮 Fun & Interactive', '🤖 AI Analysis', '🆓 100% Free'].map(tag => (
            <span key={tag} style={{ padding: '6px 14px', borderRadius: 20, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', fontSize: 13, color: '#8888AA' }}>{tag}</span>
          ))}
        </div>
        <button className="btn-primary" onClick={() => setStep('profile')} style={{ fontSize: 17, padding: '16px 44px' }}>
          Let's Begin! 🚀
        </button>
      </div>
      <style>{`@keyframes fadeInUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );

  if (step === 'profile') return (
    <div style={{ paddingTop: 64, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
      <div style={{ maxWidth: 480, width: '100%', animation: 'fadeInUp 0.6s ease' }}>
        <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, fontFamily: 'Syne, sans-serif' }}>Tell us about yourself</h2>
        <p style={{ color: '#8888AA', marginBottom: 36 }}>So we can personalize your results</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#8888AA', marginBottom: 8, display: 'block' }}>YOUR NAME</label>
            <input placeholder="e.g. Priya Sharma" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#8888AA', marginBottom: 8, display: 'block' }}>CURRENT STANDARD</label>
            <select value={profile.standard} onChange={e => setProfile({ ...profile, standard: e.target.value })}>
              <option value="10">10th Standard</option>
              <option value="12">12th Standard</option>
              <option value="drop">Drop Year</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#8888AA', marginBottom: 8, display: 'block' }}>STREAM (if selected)</label>
            <select value={profile.stream} onChange={e => setProfile({ ...profile, stream: e.target.value })}>
              <option value="">Not selected yet</option>
              <option value="science-pcm">Science (PCM)</option>
              <option value="science-pcb">Science (PCB)</option>
              <option value="commerce">Commerce</option>
              <option value="arts">Arts / Humanities</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#8888AA', marginBottom: 8, display: 'block' }}>APPROXIMATE MARKS (in %)</label>
            <input type="number" min="0" max="100" placeholder="e.g. 75" value={profile.marks} onChange={e => setProfile({ ...profile, marks: e.target.value })} />
          </div>
          <button className="btn-primary" onClick={handleProfileNext} style={{ marginTop: 12, fontSize: 16, padding: '14px' }}>
            Continue to Quiz →
          </button>
        </div>
      </div>
      <style>{`@keyframes fadeInUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );

  if (step === 'quiz') {
    const q = QUIZ_QUESTIONS[current];
    return (
      <div style={{ paddingTop: 64, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 24px' }}>
        {/* Progress */}
        <div style={{ width: '100%', maxWidth: 600, marginBottom: 48 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 13, color: '#8888AA' }}>Question {current + 1} of {QUIZ_QUESTIONS.length}</span>
            <span style={{ fontSize: 13, color: '#FF6B35', fontWeight: 700 }}>{Math.round(progress)}% complete</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          {/* Step dots */}
          <div style={{ display: 'flex', gap: 8, marginTop: 12, justifyContent: 'center' }}>
            {QUIZ_QUESTIONS.map((_, i) => (
              <div key={i} style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 4, background: i < current ? '#FF6B35' : i === current ? 'linear-gradient(90deg,#FF6B35,#FFD700)' : 'rgba(255,255,255,0.1)', transition: 'all 0.3s', backgroundImage: i === current ? 'linear-gradient(90deg,#FF6B35,#FFD700)' : 'none' }} />
            ))}
          </div>
        </div>

        {/* Question */}
        <div style={{ maxWidth: 600, width: '100%', textAlign: 'center', animation: 'fadeInUp 0.4s ease' }} key={current}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>{q.emoji}</div>
          <h2 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 800, marginBottom: 40, lineHeight: 1.3, fontFamily: 'Syne, sans-serif' }}>
            {q.question}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {q.options.map(opt => (
              <button key={opt.id} onClick={() => handleAnswer(opt)} style={{
                background: selected === opt.id ? 'linear-gradient(135deg, rgba(255,107,53,0.2), rgba(255,215,0,0.1))' : 'var(--surface)',
                border: `2px solid ${selected === opt.id ? '#FF6B35' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 16, padding: '24px 20px', cursor: 'pointer',
                transition: 'all 0.25s', textAlign: 'left', color: '#F0F0FF',
                transform: selected === opt.id ? 'scale(0.98)' : 'scale(1)',
                boxShadow: selected === opt.id ? '0 0 24px rgba(255,107,53,0.25)' : 'none'
              }}
                onMouseEnter={e => { if (selected !== opt.id) { e.currentTarget.style.borderColor = 'rgba(255,107,53,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
                onMouseLeave={e => { if (selected !== opt.id) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'scale(1)'; } }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{opt.emoji}</div>
                <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.4, fontFamily: 'DM Sans, sans-serif' }}>{opt.label}</div>
              </button>
            ))}
          </div>
        </div>
        <style>{`@keyframes fadeInUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>
      </div>
    );
  }

  if (step === 'result' && results) {
    const personality = traitLabels[results.topTrait] || traitLabels.analytical;
    return (
      <div style={{ paddingTop: 64, minHeight: '100vh', padding: '80px 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', animation: 'fadeInUp 0.6s ease' }}>
          {/* Personality type */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 72, marginBottom: 16 }}>{personality.emoji}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: personality.color, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12 }}>Your Personality Type</div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, marginBottom: 16, color: personality.color, fontFamily: 'Syne, sans-serif' }}>{personality.label}</h1>
            <p style={{ color: '#8888AA', fontSize: 18, maxWidth: 460, margin: '0 auto' }}>{personality.desc}</p>
          </div>

          {/* Trait breakdown */}
          <div className="card" style={{ marginBottom: 40, borderColor: personality.color + '30' }}>
            <h3 style={{ fontWeight: 700, marginBottom: 20, fontFamily: 'Syne, sans-serif' }}>Your Strength Profile</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {Object.entries(results.tally).sort((a, b) => b[1] - a[1]).map(([trait, count]) => {
                const t = traitLabels[trait] || { label: trait, emoji: '⭐', color: '#8888AA' };
                const pct = Math.round((count / QUIZ_QUESTIONS.length) * 100);
                return (
                  <div key={trait}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: 600 }}>{t.emoji} {t.label}</span>
                      <span style={{ fontSize: 13, color: t.color, fontWeight: 700 }}>{pct}%</span>
                    </div>
                    <div className="progress-bar">
                      <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${t.color}, ${t.color}88)`, borderRadius: 10, transition: 'width 1s ease' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommended careers */}
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24, fontFamily: 'Syne, sans-serif' }}>
            🎯 Your Top Career Matches
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
            {results.recommendations.map((career, idx) => (
              <div key={career.id} className="card" style={{ borderColor: career.color + '30', cursor: 'pointer', transition: 'all 0.3s' }}
                onClick={() => navigate(`/career/${career.id}`)}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(6px)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)'; }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: career.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{career.emoji}</div>
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 18, fontWeight: 700, fontFamily: 'Syne, sans-serif' }}>{career.title}</span>
                      {idx === 0 && <span className="badge badge-orange">⭐ Best Match</span>}
                    </div>
                    <p style={{ color: '#8888AA', fontSize: 13, lineHeight: 1.5 }}>{career.description}</p>
                  </div>
                  <div style={{ textAlign: 'right', minWidth: 100 }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: career.color }}>{career.salaryRange.min}–{career.salaryRange.max}</div>
                    <div style={{ fontSize: 12, color: '#8888AA' }}>{career.salaryRange.currency}</div>
                    <div style={{ marginTop: 6 }}>
                      <span className="badge badge-teal" style={{ fontSize: 11 }}>📈 {career.demandScore}% demand</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="btn-primary" onClick={() => navigate('/roadmap')} style={{ fontSize: 15, padding: '14px 32px' }}>
              🗺️ View My Roadmap
            </button>
            <button className="btn-secondary" onClick={() => navigate('/mentor')} style={{ fontSize: 15, padding: '14px 32px' }}>
              🤖 Ask AI Mentor
            </button>
            <button className="btn-secondary" onClick={() => navigate('/explore')} style={{ fontSize: 15, padding: '14px 32px' }}>
              🔭 Explore More Careers
            </button>
          </div>
        </div>
        <style>{`@keyframes fadeInUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }`}</style>
      </div>
    );
  }

  return null;
}
