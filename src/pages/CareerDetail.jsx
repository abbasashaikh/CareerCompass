import { useParams, Link, useNavigate } from 'react-router-dom';
import { CAREERS } from '../data/careers';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const salaryGrowthData = [
  { year: 'Entry (0-2yr)', salary: 5 },
  { year: 'Mid (3-5yr)', salary: 12 },
  { year: 'Senior (6-9yr)', salary: 22 },
  { year: 'Lead (10yr+)', salary: 35 },
  { year: 'Expert (15yr+)', salary: 50 },
];

const riskColors = { 'Very Low': '#00D4AA', 'Low': '#00b894', 'Medium': '#FFD700', 'High': '#FF6B35', 'Very High': '#e84393' };
const stressColors = { 'Low': '#00D4AA', 'Medium': '#FFD700', 'High': '#FF6B35' };
const remoteColors = { 'Very High': '#00D4AA', 'High': '#00b894', 'Medium': '#FFD700', 'Low': '#FF6B35' };

export default function CareerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const career = CAREERS.find(c => c.id === id);

  if (!career) return (
    <div style={{ paddingTop: 64, textAlign: 'center', padding: '120px 24px' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>😕</div>
      <h2 style={{ fontFamily: 'Syne, sans-serif', marginBottom: 16 }}>Career not found</h2>
      <Link to="/explore" style={{ color: '#FF6B35' }}>← Back to Explore</Link>
    </div>
  );

  const scaledSalary = salaryGrowthData.map(d => ({
    ...d,
    salary: Math.round(d.salary * (career.salaryRange.max / 50))
  }));

  return (
    <div style={{ paddingTop: 64 }}>
      {/* Hero */}
      <div style={{ padding: '60px 24px 40px', background: `linear-gradient(135deg, ${career.color}12 0%, rgba(13,13,26,0) 60%)`, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#8888AA', cursor: 'pointer', fontSize: 14, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
            ← Back
          </button>
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ width: 80, height: 80, borderRadius: 20, background: career.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, border: `1px solid ${career.color}40`, flexShrink: 0 }}>
              {career.emoji}
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ display: 'flex', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12, padding: '4px 12px', borderRadius: 20, background: career.color + '15', color: career.color, fontWeight: 700, fontFamily: 'Syne, sans-serif' }}>{career.domain}</span>
                {career.tags.map(t => <span key={t} className="badge badge-orange" style={{ fontSize: 11 }}>{t}</span>)}
              </div>
              <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, fontFamily: 'Syne, sans-serif', marginBottom: 12 }}>{career.title}</h1>
              <p style={{ color: '#8888AA', fontSize: 16, lineHeight: 1.7, maxWidth: 600 }}>{career.description}</p>
            </div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {[
                { label: 'Demand', value: career.demandScore + '%', color: '#00D4AA' },
                { label: 'Salary', value: `${career.salaryRange.min}–${career.salaryRange.max}L`, color: career.color },
                { label: 'Growth', value: career.growthRate, color: '#FFD700' },
              ].map(s => (
                <div key={s.label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '16px 24px', textAlign: 'center', minWidth: 100 }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: s.color, fontFamily: 'Syne, sans-serif' }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: '#8888AA', marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32 }}>
          {/* Main content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

            {/* Day in life */}
            <div className="card">
              <h3 style={{ fontWeight: 800, marginBottom: 16, fontFamily: 'Syne, sans-serif', display: 'flex', alignItems: 'center', gap: 10 }}>
                ☀️ A Day in the Life
              </h3>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {career.dayInLife.split(' → ').map((step, i, arr) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ background: career.color + '15', border: `1px solid ${career.color}30`, padding: '8px 16px', borderRadius: 50, fontSize: 13, color: '#F0F0FF', fontWeight: 500 }}>{step}</span>
                    {i < arr.length - 1 && <span style={{ color: '#8888AA' }}>→</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Roadmap */}
            <div className="card">
              <h3 style={{ fontWeight: 800, marginBottom: 24, fontFamily: 'Syne, sans-serif', display: 'flex', alignItems: 'center', gap: 10 }}>
                🗺️ Career Roadmap
              </h3>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: 20, top: 0, bottom: 0, width: 2, background: `linear-gradient(180deg, ${career.color}, ${career.color}20)` }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {career.roadmap.map((step, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 24, paddingBottom: i < career.roadmap.length - 1 ? 28 : 0 }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: i === career.roadmap.length - 1 ? career.color : career.color + '20', border: `2px solid ${career.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: i === career.roadmap.length - 1 ? '#fff' : career.color, fontFamily: 'Syne, sans-serif', flexShrink: 0, zIndex: 1 }}>
                        {i + 1}
                      </div>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: 15, fontWeight: i === career.roadmap.length - 1 ? 800 : 500, color: i === career.roadmap.length - 1 ? career.color : '#F0F0FF' }}>{step}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Salary growth chart */}
            <div className="card">
              <h3 style={{ fontWeight: 800, marginBottom: 20, fontFamily: 'Syne, sans-serif' }}>📈 Salary Growth Over Career</h3>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={scaledSalary} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="salGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={career.color} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={career.color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="year" tick={{ fill: '#8888AA', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#8888AA', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v}L`} />
                  <Tooltip formatter={(v) => [`₹${v} LPA`, 'Avg Salary']} contentStyle={{ background: '#1A1A2E', border: `1px solid ${career.color}40`, borderRadius: 10 }} labelStyle={{ color: '#F0F0FF' }} itemStyle={{ color: career.color }} />
                  <Area type="monotone" dataKey="salary" stroke={career.color} strokeWidth={2} fill="url(#salGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Skills */}
            <div className="card">
              <h3 style={{ fontWeight: 800, marginBottom: 16, fontFamily: 'Syne, sans-serif' }}>🛠️ Key Skills Required</h3>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {career.skills.map(s => (
                  <span key={s} style={{ padding: '8px 16px', borderRadius: 50, background: career.color + '12', border: `1px solid ${career.color}25`, color: '#F0F0FF', fontSize: 13, fontWeight: 500 }}>{s}</span>
                ))}
              </div>
            </div>

            {/* Entrance exams & Colleges */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div className="card">
                <h3 style={{ fontWeight: 800, marginBottom: 14, fontFamily: 'Syne, sans-serif', fontSize: 16 }}>📝 Entrance Exams</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {career.exams.map(e => (
                    <div key={e} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
                      <span style={{ color: career.color }}>▸</span> {e}
                    </div>
                  ))}
                </div>
              </div>
              <div className="card">
                <h3 style={{ fontWeight: 800, marginBottom: 14, fontFamily: 'Syne, sans-serif', fontSize: 16 }}>🏛️ Top Colleges</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {career.topColleges.map(c => (
                    <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
                      <span style={{ color: career.color }}>★</span> {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Govt opportunities */}
            <div className="card">
              <h3 style={{ fontWeight: 800, marginBottom: 14, fontFamily: 'Syne, sans-serif' }}>🏛️ Government Opportunities</h3>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {career.govtOpportunities.map(g => (
                  <span key={g} className="badge badge-purple">{g}</span>
                ))}
              </div>
            </div>

            {/* Scholarships */}
            <div className="card" style={{ borderColor: '#FFD70030' }}>
              <h3 style={{ fontWeight: 800, marginBottom: 14, fontFamily: 'Syne, sans-serif' }}>🎓 Scholarships Available</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {career.scholarships.map(s => (
                  <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
                    <span className="badge badge-gold" style={{ fontSize: 11 }}>₹</span> {s}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Quick stats */}
            <div className="card" style={{ borderColor: career.color + '30' }}>
              <h3 style={{ fontWeight: 800, marginBottom: 16, fontFamily: 'Syne, sans-serif', fontSize: 16 }}>Quick Stats</h3>
              {[
                { label: 'Automation Risk', value: career.automationRisk, color: riskColors[career.automationRisk] },
                { label: 'Stress Level', value: career.stressLevel, color: stressColors[career.stressLevel] },
                { label: 'Remote Work', value: career.remoteWork, color: remoteColors[career.remoteWork] },
                { label: 'Duration', value: career.duration, color: '#F0F0FF' },
                { label: 'Avg Fees/Year', value: career.avgFees, color: '#F0F0FF' },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, color: '#8888AA' }}>{s.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.value}</span>
                </div>
              ))}
            </div>

            {/* Courses */}
            <div className="card">
              <h3 style={{ fontWeight: 800, marginBottom: 14, fontFamily: 'Syne, sans-serif', fontSize: 16 }}>📚 Courses to Pursue</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {career.courses.map(c => (
                  <div key={c} style={{ padding: '10px 14px', borderRadius: 10, background: 'var(--surface2)', fontSize: 13, fontWeight: 500 }}>{c}</div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div style={{ background: `linear-gradient(135deg, ${career.color}15, rgba(124,58,237,0.1))`, border: `1px solid ${career.color}25`, borderRadius: 16, padding: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>🤖</div>
              <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 8, fontFamily: 'Syne, sans-serif' }}>Ask AI Mentor</h3>
              <p style={{ color: '#8888AA', fontSize: 13, marginBottom: 16 }}>Have questions about this career? Ask our AI mentor anything!</p>
              <Link to="/mentor" style={{ textDecoration: 'none' }}>
                <button className="btn-primary" style={{ width: '100%', fontSize: 14 }}>Chat Now →</button>
              </Link>
            </div>

            {/* Related careers */}
            <div className="card">
              <h3 style={{ fontWeight: 800, marginBottom: 14, fontFamily: 'Syne, sans-serif', fontSize: 16 }}>🔗 Related Careers</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {CAREERS.filter(c => c.id !== career.id && c.domain === career.domain).slice(0, 3).map(c => (
                  <Link key={c.id} to={`/career/${c.id}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <span style={{ fontSize: 24 }}>{c.emoji}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#F0F0FF' }}>{c.title}</div>
                      <div style={{ fontSize: 11, color: '#8888AA' }}>{c.salaryRange.min}–{c.salaryRange.max} LPA</div>
                    </div>
                  </Link>
                ))}
                {CAREERS.filter(c => c.id !== career.id && c.domain !== career.domain).slice(0, 2).map(c => (
                  <Link key={c.id} to={`/career/${c.id}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <span style={{ fontSize: 24 }}>{c.emoji}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#F0F0FF' }}>{c.title}</div>
                      <div style={{ fontSize: 11, color: '#8888AA' }}>{c.salaryRange.min}–{c.salaryRange.max} LPA</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`@media (max-width: 900px) { .career-detail-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
