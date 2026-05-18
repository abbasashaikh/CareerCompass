import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CAREERS } from '../data/careers';

const DOMAINS = ['All', ...new Set(CAREERS.map(c => c.domain))];
const STREAMS = ['All Streams', 'Science', 'Commerce', 'Arts', 'Any'];

export default function Explore() {
  const [search, setSearch] = useState('');
  const [domain, setDomain] = useState('All');
  const [sortBy, setSortBy] = useState('demand');
  const [view, setView] = useState('grid'); // grid | list

  const filtered = CAREERS
    .filter(c => {
      const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.domain.toLowerCase().includes(search.toLowerCase());
      const matchDomain = domain === 'All' || c.domain === domain;
      return matchSearch && matchDomain;
    })
    .sort((a, b) => {
      if (sortBy === 'demand') return b.demandScore - a.demandScore;
      if (sortBy === 'salary') return b.salaryRange.max - a.salaryRange.max;
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <div style={{ paddingTop: 64 }}>
      {/* Header */}
      <div style={{ padding: '60px 24px 40px', textAlign: 'center', background: 'linear-gradient(180deg, rgba(124,58,237,0.08) 0%, transparent 100%)' }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, marginBottom: 16, fontFamily: 'Syne, sans-serif' }}>
          Explore <span className="gradient-text-teal">Career Paths</span>
        </h1>
        <p style={{ color: '#8888AA', fontSize: 17, maxWidth: 500, margin: '0 auto 40px' }}>
          Browse detailed profiles for 50+ careers — with demand scores, salary data and step-by-step roadmaps.
        </p>

        {/* Search */}
        <div style={{ position: 'relative', maxWidth: 480, margin: '0 auto' }}>
          <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 18 }}>🔍</span>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search careers, domains..."
            style={{ paddingLeft: 48, borderRadius: 50, height: 52, fontSize: 15 }}
          />
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px' }}>
        {/* Filters */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {DOMAINS.map(d => (
              <button key={d} onClick={() => setDomain(d)} style={{
                padding: '8px 16px', borderRadius: 50, fontSize: 13, cursor: 'pointer', fontFamily: 'Syne, sans-serif', fontWeight: 600,
                background: domain === d ? 'linear-gradient(135deg, #00D4AA, #00b894)' : 'var(--surface)',
                color: domain === d ? '#0D0D1A' : '#8888AA',
                border: domain === d ? 'none' : '1px solid rgba(255,255,255,0.06)',
                transition: 'all 0.2s'
              }}>{d}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: '#8888AA' }}>Sort by:</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ width: 'auto', padding: '8px 12px', borderRadius: 8 }}>
              <option value="demand">Demand Score</option>
              <option value="salary">Salary</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        <p style={{ color: '#8888AA', fontSize: 13, marginBottom: 24 }}>{filtered.length} careers found</p>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {filtered.map(career => (
            <Link key={career.id} to={`/career/${career.id}`} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20,
                padding: 24, cursor: 'pointer', transition: 'all 0.3s', position: 'relative', overflow: 'hidden', height: '100%'
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = career.color + '50'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 40px ${career.color}15`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>

                {/* BG accent */}
                <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: career.color + '12', pointerEvents: 'none' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{ fontSize: 40 }}>{career.emoji}</div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 12, color: '#8888AA', marginBottom: 4 }}>Demand</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: career.color, fontFamily: 'Syne, sans-serif' }}>{career.demandScore}%</div>
                  </div>
                </div>

                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6, fontFamily: 'Syne, sans-serif', color: '#F0F0FF' }}>{career.title}</h3>
                <span style={{ fontSize: 12, color: '#8888AA', background: 'rgba(255,255,255,0.05)', padding: '3px 10px', borderRadius: 20, marginBottom: 12, display: 'inline-block' }}>{career.domain}</span>
                <p style={{ color: '#8888AA', fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>{career.description}</p>

                {/* Tags */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                  {career.tags.slice(0, 2).map(t => (
                    <span key={t} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: career.color + '15', color: career.color, border: `1px solid ${career.color}30`, fontWeight: 600, fontFamily: 'Syne, sans-serif' }}>{t}</span>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div>
                    <div style={{ fontSize: 11, color: '#8888AA' }}>Salary Range</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#F0F0FF' }}>{career.salaryRange.min}–{career.salaryRange.max} {career.salaryRange.currency}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 11, color: '#8888AA' }}>Growth</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#00D4AA' }}>{career.growthRate}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 24px', color: '#8888AA' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <p style={{ fontSize: 18 }}>No careers found. Try a different search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
