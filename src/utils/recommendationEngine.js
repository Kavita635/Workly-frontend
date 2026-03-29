/**
 * AI Career Recommendation Engine (Mock)
 * Analyzes a student's profile (skills, major, experience) and returns career pathways.
 */

// Keyword mappings based on typical tech and business stacks
const PATHWAY_DATA = [
  {
    role: "Frontend Developer",
    keywords: ["react", "vue", "angular", "javascript", "html", "css", "tailwind", "ui", "ux"],
    requiredSkills: ["JavaScript", "React", "CSS/Tailwind"],
    description: "Build interactive, user-facing web applications. High demand for engineers who understand modern component-based UI.",
    growthPath: "Junior Frontend Engineer \u2192 Senior UI Engineer \u2192 Lead Staff Engineer \u2192 VP of Engineering",
    matchReason: "Your profile shows strong frontend framework knowledge.",
    score: 0
  },
  {
    role: "Backend Engineer",
    keywords: ["node", "python", "java", "sql", "mongodb", "api", "docker", "aws", "express", "go"],
    requiredSkills: ["Node.js / Python", "SQL/NoSQL", "REST APIs"],
    description: "Develop robust server-side logic, architect scalable databases, and ensure highly available cloud infrastructure.",
    growthPath: "Backend Intern \u2192 Systems Engineer \u2192 Cloud Architect \u2192 CTO",
    matchReason: "We detected core server-side and database architecture skills.",
    score: 0
  },
  {
    role: "Data Scientist / AI Engineer",
    keywords: ["python", "r", "machine learning", "tensorflow", "pytorch", "data", "pandas", "ai", "math", "statistics", "science", "nlp"],
    requiredSkills: ["Python", "Machine Learning", "Data Analysis (Pandas/SQL)"],
    description: "Train complex algorithmic patterns, process massive datasets, and develop predictive artificial intelligence models.",
    growthPath: "Data Analyst \u2192 Machine Learning Engineer \u2192 Principal AI Scientist",
    matchReason: "Your analytical and Python background makes this a perfect fit.",
    score: 0
  },
  {
    role: "Digital Marketing Strategist",
    keywords: ["seo", "marketing", "content", "social media", "analytics", "campaigns", "ads", "advertising"],
    requiredSkills: ["SEO/SEM", "Content Strategy", "Data Analytics"],
    description: "Drive brand growth, formulate high-conversion ad strategies, and interpret traffic analytic pipelines.",
    growthPath: "Marketing Intern \u2192 Growth Manager \u2192 Director of Marketing",
    matchReason: "You possess key marketing and strategic growth skills.",
    score: 0
  },
  {
    role: "Product Manager",
    keywords: ["product", "management", "agile", "scrum", "jira", "strategy", "roadmap", "leadership", "communication"],
    requiredSkills: ["Agile/Scrum", "User Research", "Strategic Roadmapping"],
    description: "Lead cross-functional engineering and design teams to deliver high-impact software products.",
    growthPath: "Associate PM \u2192 Product Manager \u2192 Group PM \u2192 Chief Product Officer",
    matchReason: "Your combined technical and strategic mindset aligns with a PM track.",
    score: 0
  }
];

export const generateRecommendations = (userProfile) => {
  if (!userProfile) return [];

  const { skills = [], major = '', experience = '' } = userProfile;
  
  // Flatten profile into a single searchable string block
  const profileBlob = `${skills.join(' ')} ${major} ${experience}`.toLowerCase();
  
  // Clone data to avoid mutating global array score state
  const careers = JSON.parse(JSON.stringify(PATHWAY_DATA));

  // O(N*M) heuristic mapping
  careers.forEach(career => {
    career.keywords.forEach(keyword => {
      if (profileBlob.includes(keyword.toLowerCase())) {
        career.score += 10;
      }
    });
  });

  // Sort by highest score
  const matchedCareers = careers
    .filter(c => c.score > 0)
    .sort((a, b) => b.score - a.score);

  // Fallback defaults if no strict matches were made
  if (matchedCareers.length === 0) {
    return [careers[0], careers[1], careers[4]]; 
  }

  return matchedCareers.slice(0, 3); // Return TOP 3 pathways
};
