import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CAREERS } from '../data/careers';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const salaryComparisons = [
  { career: 'Software Eng', entry: 8, mid: 22, senior: 45 },
  { career: 'Doctor', entry: 7, mid: 20, senior: 60 },
  { career: 'CA', entry: 7, mid: 18, senior: 40 },
  { career: 'Data Scientist', entry: 9, mid: 25, senior: 45 },
  { career: 'IAS Officer', entry: 10, mid: 18, senior: 22 },
];

export default function Parent() {
  const [childName, setChildName] = useState('');
  const [standard, setStandard] = useState('12');
  const [stream, setStream] = useState('');
  const [marks, setMarks] = useState('');
  const [interests, setInterests] = useState([]);
  const [budget, setBudget] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const interestOptions = ['Science & Math', 'Biology & Medicine', 'Business & Finance', 'Arts & Design', 'Sports & Fitness', 'Technology', 'Government & Law', 'Teaching & Social Work'];

  const toggleInterest = (i) => {
    setInterests(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  };

  const getRecommendedCareers = () => {
    let filtered = CAREERS;
    if (interests.includes('Technology') || interests.includes('Science & Math')) {
      filtered = filtered.filter(c => ['Technology', 'Finance'].includes(c.domain));
    } else if (interests.includes('Biology & Medicine')) {
      filtered = filtered.filter(c => c.domain === 'Medical');
    } else if (interests.includes('Arts & Design')) {
      filtered = filtered.filter(c => ['Creative Arts', 'Design & Construction', 'Digital Media'].includes(c.domain));
    }
    return filtered.slice(0, 3);
  };

  if (submitted) {
    const recommended = getRecommendedCareers();
    return (
      <div style={{ paddingTop: 64 }}>
        <div style={{ padding: '60px 24px', maxWidth: 1100, margin: '0 auto' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, fontFamily: 'Syne, sans-serif', marginBottom: 8 }}>
                {childName || "Your Child"}'s <span className="gradient-text">Career Report</span>
              </h1>
              <p style={{ color: '#8888AA' }}>AI-powered analysis for Class {standard} student</p>
            </div>
            <button className="btn-secondary" onClick={() => setSubmitted(false)} style={{ fontSize: 13 }}>← Edit Profile</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 32 }}>
            {[
              { emoji: '📈', label: 'Career Safety Score', value: '87/100', color: '#00D4AA', sub: 'Based on interests & market' },
              { emoji: '💰', label: 'Avg Expected Salary', value: '₹12-35 LPA', color: '#FFD700', sub: 'After 5 years of experience' },
              { emoji: '🎓', label: 'Est. Education Cost', value: budget === 'low' ? '₹2-8 Lakhs' : budget === 'mid' ? '₹8-25 Lakhs' : '₹15-60 Lakhs', color: '#7C3AED', sub: 'Total course fees' },
            ].map(s => (
              <div key={s.label} className="card" style={{ textAlign: 'center', borderColor: s.color + '25' }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>{s.emoji}</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: s.color, fontFamily: 'Syne, sans-serif', marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 12, color: '#8888AA' }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Recommended careers */}
          <div className="card" style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, fontFamily: 'Syne, sans-serif', marginBottom: 20 }}>
              🎯 Best Career Matches for {childName || "Your Child"}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {recommended.map((career, i) => (
                <div key={career.id} style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: i < recommended.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: career.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>{career.emoji}</div>
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <h3 style={{ fontWeight: 700, fontSize: 17, fontFamily: 'Syne, sans-serif', marginBottom: 4 }}>{career.title}</h3>
                    <p style={{ color: '#8888AA', fontSize: 13, lineHeight: 1.5 }}>{career.description}</p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '6px 20px', textAlign: 'center', minWidth: 200 }}>
                    <div><div style={{ fontSize: 11, color: '#8888AA' }}>Salary</div><div style={{ fontWeight: 700, color: career.color, fontSize: 14 }}>{career.salaryRange.min}–{career.salaryRange.max} LPA</div></div>
                    <div><div style={{ fontSize: 11, color: '#8888AA' }}>Demand</div><div style={{ fontWeight: 700, color: '#00D4AA', fontSize: 14 }}>{career.demandScore}%</div></div>
                    <div><div style={{ fontSize: 11, color: '#8888AA' }}>Risk</div><div style={{ fontWeight: 700, fontSize: 13 }}>{career.automationRisk}</div></div>
                    <div><div style={{ fontSize: 11, color: '#8888AA' }}>Growth</div><div style={{ fontWeight: 700, color: '#FFD700', fontSize: 12 }}>{career.growthRate}</div></div>
                  </div>
                  <Link to={`/career/${career.id}`} style={{ textDecoration: 'none' }}>
                    <button className="btn-primary" style={{ fontSize: 12, padding: '8px 16px' }}>View Details</button>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Salary comparison */}
          <div className="card" style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, fontFamily: 'Syne, sans-serif', marginBottom: 20 }}>📊 Salary Comparison Across Top Careers</h2>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={salaryComparisons} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="career" tick={{ fill: '#8888AA', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#8888AA', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v}L`} />
                <Tooltip formatter={(v, name) => [`₹${v} LPA`, name.charAt(0).toUpperCase() + name.slice(1)]} contentStyle={{ background: '#1A1A2E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10 }} labelStyle={{ color: '#F0F0FF' }} />
                <Bar dataKey="entry" fill="#7C3AED" name="entry" radius={[4,4,0,0]} />
                <Bar dataKey="mid" fill="#FF6B35" name="mid" radius={[4,4,0,0]} />
                <Bar dataKey="senior" fill="#00D4AA" name="senior" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 12, flexWrap: 'wrap' }}>
              {[['#7C3AED', 'Entry (0-2yr)'], ['#FF6B35', 'Mid (3-5yr)'], ['#00D4AA', 'Senior (6yr+)']].map(([color, label]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#8888AA' }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: color }} />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Advice for parents */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
            <div className="card" style={{ borderColor: 'rgba(0,212,170,0.2)' }}>
              <h3 style={{ fontWeight: 800, marginBottom: 14, fontFamily: 'Syne, sans-serif', color: '#00D4AA' }}>✅ What to Encourage</h3>
              {['Explore multiple career options before deciding', 'Focus on child\'s natural strengths', 'Support passion alongside marks', 'Research government scholarship schemes', 'Visit college open days together'].map(tip => (
                <div key={tip} style={{ display: 'flex', gap: 10, fontSize: 13, color: '#8888AA', marginBottom: 10, lineHeight: 1.5 }}>
                  <span style={{ color: '#00D4AA', flexShrink: 0 }}>✓</span> {tip}
                </div>
              ))}
            </div>
            <div className="card" style={{ borderColor: 'rgba(255,107,53,0.2)' }}>
              <h3 style={{ fontWeight: 800, marginBottom: 14, fontFamily: 'Syne, sans-serif', color: '#FF6B35' }}>⚠️ Common Mistakes to Avoid</h3>
              {['Forcing career based on relatives\' advice', 'Ignoring child\'s interest for "safe" choice', 'Comparing with neighbor\'s child', 'Making decisions based on marks alone', 'Ignoring mental health during exam stress'].map(tip => (
                <div key={tip} style={{ display: 'flex', gap: 10, fontSize: 13, color: '#8888AA', marginBottom: 10, lineHeight: 1.5 }}>
                  <span style={{ color: '#FF6B35', flexShrink: 0 }}>✗</span> {tip}
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/mentor">
              <button className="btn-primary" style={{ fontSize: 15, padding: '14px 36px' }}>
                🤖 Ask AI Mentor Specific Questions
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 64 }}>
      <div style={{ padding: '60px 24px', maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>👨‍👩‍👧</div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, fontFamily: 'Syne, sans-serif', marginBottom: 12 }}>
            Parent <span className="gradient-text">Dashboard</span>
          </h1>
          <p style={{ color: '#8888AA', fontSize: 16, lineHeight: 1.7 }}>
            Get AI-powered career insights for your child — including salary projections, education costs, and best career matches based on their interests.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#8888AA', marginBottom: 8, display: 'block' }}>YOUR CHILD'S NAME</label>
            <input placeholder="e.g. Rahul" value={childName} onChange={e => setChildName(e.target.value)} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#8888AA', marginBottom: 8, display: 'block' }}>STANDARD</label>
              <select value={standard} onChange={e => setStandard(e.target.value)}>
                <option value="10">10th Standard</option>
                <option value="12">12th Standard</option>
                <option value="drop">Drop Year</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#8888AA', marginBottom: 8, display: 'block' }}>APPROXIMATE MARKS</label>
              <input type="number" placeholder="e.g. 75%" value={marks} onChange={e => setMarks(e.target.value)} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#8888AA', marginBottom: 12, display: 'block' }}>CHILD'S INTERESTS (select all that apply)</label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {interestOptions.map(i => (
                <button key={i} onClick={() => toggleInterest(i)} style={{
                  padding: '8px 16px', borderRadius: 50, cursor: 'pointer', fontSize: 13, fontFamily: 'Syne, sans-serif', fontWeight: 600, transition: 'all 0.2s',
                  background: interests.includes(i) ? 'rgba(255,107,53,0.15)' : 'var(--surface)',
                  color: interests.includes(i) ? '#FF6B35' : '#8888AA',
                  border: `1px solid ${interests.includes(i) ? 'rgba(255,107,53,0.4)' : 'rgba(255,255,255,0.06)'}`
                }}>{i}</button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#8888AA', marginBottom: 12, display: 'block' }}>EDUCATION BUDGET (Total)</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {[['low', 'Budget-Friendly', 'Under ₹10 Lakhs'], ['mid', 'Moderate', '₹10-30 Lakhs'], ['high', 'Premium', '₹30 Lakhs+']].map(([val, label, sub]) => (
                <button key={val} onClick={() => setBudget(val)} style={{
                  padding: '14px 12px', borderRadius: 12, cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s',
                  background: budget === val ? 'rgba(0,212,170,0.1)' : 'var(--surface)',
                  border: `1px solid ${budget === val ? 'rgba(0,212,170,0.4)' : 'rgba(255,255,255,0.06)'}`,
                  color: budget === val ? '#00D4AA' : '#8888AA'
                }}>
                  <div style={{ fontWeight: 700, fontFamily: 'Syne, sans-serif', fontSize: 14, marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 12 }}>{sub}</div>
                </button>
              ))}
            </div>
          </div>

          <button className="btn-primary" onClick={() => setSubmitted(true)} style={{ fontSize: 16, padding: '16px', marginTop: 8 }}>
            Generate AI Career Report 🚀
          </button>
        </div>
      </div>
    </div>
  );
}
