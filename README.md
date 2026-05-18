# CareerCompass AI — Career Guidance App for Indian Students

India's AI-powered career guidance platform for 10th & 12th standard students

## Features
- Gamified 6-question Career Quiz with personality analysis
- Career Explorer with 8+ detailed profiles, demand scores, salary data
- Visual Roadmaps (JEE/NEET/CA/UPSC/Design)
- AI Mentor Chat powered by Anthropic Claude
- Parent Dashboard with salary projections and career safety scores
- Interactive salary growth charts (Recharts)

## Tech Stack
- React 18 + Vite
- React Router DOM v6
- Recharts (data visualization)
- Anthropic Claude API (AI mentor)
- Pure CSS variables (no frameworks)
- Google Fonts: Syne + DM Sans

## Setup

  npm install
  npm run dev

Open http://localhost:5173

## Build for Production

  npm run build

Deploy the /dist folder to Vercel, Netlify, or any static host.

## AI Mentor Setup
The AI Mentor uses Anthropic Claude API. For standalone deployment outside Claude.ai,
add your API key in src/pages/Mentor.jsx:

  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'YOUR_ANTHROPIC_API_KEY',
    'anthropic-version': '2023-06-01'
  }

Get your key at: https://console.anthropic.com

## Project Structure
  src/
  ├── App.jsx              # Root router
  ├── context/AppContext   # Global state
  ├── components/Navbar    # Responsive nav
  ├── data/careers.js      # All career data
  └── pages/
      ├── Home.jsx         # Landing page
      ├── Quiz.jsx         # Gamified quiz
      ├── Explore.jsx      # Career browser
      ├── CareerDetail.jsx # Career profile
      ├── Roadmap.jsx      # Visual roadmaps
      ├── Mentor.jsx       # AI chat
      └── Parent.jsx       # Parent dashboard

## Adding More Careers
Edit src/data/careers.js and add to the CAREERS array:
  {
    id, title, emoji, domain, stream, tags,
    salaryRange: { min, max, currency },
    demandScore, automationRisk, growthRate,
    description, dayInLife, skills, exams,
    topColleges, avgFees, duration, roadmap,
    scholarships, govtOpportunities, color
  }

## Design Tokens (CSS Variables)
  --primary: #FF6B35    (Orange - CTAs)
  --accent:  #00D4AA    (Teal - success)
  --accent2: #FFD700    (Gold - salary)
  --accent3: #7C3AED    (Purple - AI)
  --bg:      #0D0D1A    (Dark background)

Built with love for India's future leaders.
