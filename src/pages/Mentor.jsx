import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';

const SUGGESTED = [
  "Can I become an engineer with 60% marks?",
  "Which stream is best after 10th?",
  "What if I fail NEET?",
  "Which careers have highest salary in India?",
  "Can I study abroad from India?",
  "What is the best course after 12th Commerce?",
  "How to become an IAS officer?",
  "Is data science a good career in 2025?",
];

async function askMentor(messages) {
   // ✅ Add this — skip API call if last call was within 3 seconds
  const now = Date.now();
  if (window._lastApiCall && now - window._lastApiCall < 3000) {
    throw new Error('Too fast — wait a moment');
  }
  window._lastApiCall = now;
  
  const systemPrompt = `You are CareerCompass — a friendly, empathetic AI career mentor 
for Indian 10th and 12th standard students. Guide them about careers, stream selection, 
entrance exams (JEE, NEET, UPSC, CA, NIFT), colleges, and salaries in India. 
Be warm, encouraging. Use Indian context (rupees, Indian colleges). 
Remind students marks are not everything Keep responses to 3-5 paragraphs.`;

  // Convert chat history to Gemini format
  const geminiMessages = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  const response = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCEiIgIURL9cwGMREPOuCgXhsnWZRLWejw',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: geminiMessages,
        generationConfig: { maxOutputTokens: 800 }
      })
    }
  );

  if (!response.ok) throw new Error('API error');
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text 
    || "I'm having trouble responding. Please try again.";
}

export default function Mentor() {
  const { user, chatHistory, setChatHistory } = useApp();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, loading]);

  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput('');
    setError('');

    const userMsg = { role: 'user', content: msg };
    const newHistory = [...chatHistory, userMsg];
    setChatHistory(newHistory);
    setLoading(true);

    try {
      const apiMessages = newHistory.map(m => ({ role: m.role, content: m.content }));
      const reply = await askMentor(apiMessages);
      setChatHistory([...newHistory, { role: 'assistant', content: reply }]);
    } catch (e) {
  if (e.message?.includes('429') || e.status === 429) {
    setError('Too many requests. Please wait 1 minute and try again.');
  } else {
    setError('Something went wrong. Please try again.');
  }
  setChatHistory(chatHistory);
} finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <div style={{ paddingTop: 64, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(13,13,26,0.9)', backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #00D4AA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>🤖</div>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 800, fontFamily: 'Syne, sans-serif' }}>AI Career Mentor</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00D4AA', animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: 12, color: '#00D4AA' }}>Online — Ready to help you</span>
          </div>
        </div>
        {user && (
          <div style={{ marginLeft: 'auto', fontSize: 13, color: '#8888AA' }}>
            Hi {user.name}! 👋
          </div>
        )}
      </div>

      {/* Chat area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Welcome */}
        {chatHistory.length === 0 && (
          <div style={{ maxWidth: 560, animation: 'fadeInUp 0.6s ease' }}>
            <div style={{ background: 'var(--surface)', border: '1px solid rgba(124,58,237,0.25)', borderRadius: 20, borderBottomLeftRadius: 4, padding: '20px 24px', marginBottom: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>👋</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: '#F0F0FF' }}>
                Namaste{user?.name ? ` ${user.name}` : ''}! I'm your CareerCompass AI Mentor. 🧭
              </p>
              <p style={{ fontSize: 14, color: '#8888AA', lineHeight: 1.7, marginTop: 8 }}>
                I'm here to help you with career choices, stream selection, entrance exams, college admissions, and anything else on your mind. No question is too small — ask away!
              </p>
            </div>

            {/* Suggested questions */}
            <p style={{ fontSize: 13, color: '#8888AA', marginBottom: 12 }}>Try asking:</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {SUGGESTED.map(q => (
                <button key={q} onClick={() => sendMessage(q)} style={{
                  background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 12, padding: '12px 16px', cursor: 'pointer', textAlign: 'left',
                  color: '#8888AA', fontSize: 13, lineHeight: 1.4, transition: 'all 0.2s', fontFamily: 'DM Sans, sans-serif'
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)'; e.currentTarget.style.color = '#F0F0FF'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#8888AA'; }}>
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {chatHistory.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', animation: 'fadeInUp 0.3s ease' }}>
            {msg.role === 'assistant' && (
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #00D4AA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0, marginRight: 12, marginTop: 4 }}>🤖</div>
            )}
            <div style={{
              maxWidth: '72%', padding: '14px 18px', borderRadius: 18,
              borderBottomLeftRadius: msg.role === 'assistant' ? 4 : 18,
              borderBottomRightRadius: msg.role === 'user' ? 4 : 18,
              background: msg.role === 'user'
                ? 'linear-gradient(135deg, #FF6B35, #e85a22)'
                : 'var(--surface)',
              border: msg.role === 'assistant' ? '1px solid rgba(124,58,237,0.2)' : 'none',
              fontSize: 14, lineHeight: 1.7, color: '#F0F0FF',
              whiteSpace: 'pre-wrap'
            }}>
              {msg.content}
            </div>
          </div>
        ))}

        {/* Loading */}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, animation: 'fadeInUp 0.3s ease' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #00D4AA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🤖</div>
            <div style={{ background: 'var(--surface)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: 18, borderBottomLeftRadius: 4, padding: '14px 20px', display: 'flex', gap: 6 }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: '#7C3AED', animation: `pulse 1.4s ${i * 0.2}s infinite` }} />
              ))}
            </div>
          </div>
        )}

        {error && (
          <div style={{ background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.3)', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#FF6B35' }}>
            ⚠️ {error}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(13,13,26,0.9)', backdropFilter: 'blur(20px)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', gap: 12, alignItems: 'flex-end' }}>
          <textarea  id="mentor-input" name="mentor-input"
            value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
            placeholder="Ask anything about your career, stream, exams, colleges..."
            disabled={loading}
            rows={1}
            style={{ flex: 1, resize: 'none', borderRadius: 16, padding: '14px 18px', fontSize: 14, maxHeight: 120, minHeight: 50, background: 'var(--surface2)', border: '1px solid rgba(255,255,255,0.08)' }}
          />
          <button onClick={() => sendMessage()} disabled={!input.trim() || loading} style={{
            width: 50, height: 50, borderRadius: 14, flexShrink: 0,
            background: input.trim() && !loading ? 'linear-gradient(135deg, #FF6B35, #e85a22)' : 'var(--surface2)',
            border: 'none', cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
            fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s', boxShadow: input.trim() && !loading ? '0 4px 16px rgba(255,107,53,0.4)' : 'none'
          }}>
            {loading ? <div className="spinner" style={{ width: 20, height: 20 }} /> : '↑'}
          </button>
        </div>
        <p style={{ textAlign: 'center', fontSize: 11, color: '#8888AA', marginTop: 10 }}>
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>

      <style>{`
        @keyframes fadeInUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
      `}</style>
    </div>
  );
}
