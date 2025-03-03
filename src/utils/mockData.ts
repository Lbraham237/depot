import { Candidate, SearchCriteria } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Generate mock candidates
const generateMockCandidates = (): Candidate[] => {
  const skills = [
    'Java', 'REST', 'Web Services', 'SQL', 'Oracle', 
    'Spring Boot', 'Microservices', 'Docker', 'Kubernetes',
    'JavaScript', 'React', 'Angular', 'Node.js', 'TypeScript',
    'Python', 'Django', 'Flask', 'AWS', 'Azure', 'GCP',
    'CI/CD', 'Jenkins', 'Git', 'Agile', 'Scrum'
  ];
  
  const locations = [
    'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Bordeaux',
    'Lille', 'Nantes', 'Strasbourg', 'Montpellier', 'Rennes'
  ];
  
  const jobBoards = ['Monster', 'APEC', 'France Travail', 'LinkedIn', 'Indeed'];
  
  const availabilities = ['Immediate', '1 month notice', '2 months notice', '3 months notice'];
  
  const candidates: Candidate[] = [];
  
  for (let i = 1; i <= 50; i++) {
    // Generate a random set of skills for this candidate
    const candidateSkills = [...skills]
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 8) + 3);
    
    // Ensure Java, REST, and SQL are included for some candidates
    if (i % 3 === 0) {
      if (!candidateSkills.includes('Java')) candidateSkills.push('Java');
      if (!candidateSkills.includes('REST')) candidateSkills.push('REST');
      if (!candidateSkills.includes('SQL')) candidateSkills.push('SQL');
    }
    
    const experience = Math.floor(Math.random() * 15) + 1;
    const location = locations[Math.floor(Math.random() * locations.length)];
    const jobBoard = jobBoards[Math.floor(Math.random() * jobBoards.length)];
    const availability = availabilities[Math.floor(Math.random() * availabilities.length)];
    
    candidates.push({
      id: uuidv4(),
      name: `Candidate ${i}`,
      email: `candidate${i}@example.com`,
      phone: `+33 6 ${Math.floor(Math.random() * 90 + 10)} ${Math.floor(Math.random() * 90 + 10)} ${Math.floor(Math.random() * 90 + 10)} ${Math.floor(Math.random() * 90 + 10)}`,
      location,
      availability,
      experience,
      skills: candidateSkills,
      jobBoard,
      resumeUrl: '#',
      score: Math.floor(Math.random() * 40) + 60 // Score between 60-100
    });
  }
  
  return candidates;
};

const mockCandidates = generateMockCandidates();

// Function to calculate match score based on search criteria
const calculateMatchScore = (candidate: Candidate, criteria: SearchCriteria): number => {
  let score = 0;
  const maxScore = 100;
  
  // Skills match (50% of total score)
  const skillsWeight = 50;
  const requiredSkills = criteria.skills.length;
  let matchedSkills = 0;
  
  criteria.skills.forEach(skill => {
    if (candidate.skills.includes(skill)) {
      matchedSkills++;
    }
  });
  
  const skillsScore = requiredSkills > 0 
    ? (matchedSkills / requiredSkills) * skillsWeight 
    : skillsWeight;
  
  // Experience match (30% of total score)
  const experienceWeight = 30;
  const experienceScore = candidate.experience >= criteria.experience 
    ? experienceWeight 
    : (candidate.experience / criteria.experience) * experienceWeight;
  
  // Location match (10% of total score)
  const locationWeight = 10;
  const locationScore = !criteria.location || candidate.location.toLowerCase().includes(criteria.location.toLowerCase()) 
    ? locationWeight 
    : 0;
  
  // Availability match (10% of total score)
  const availabilityWeight = 10;
  const availabilityScore = !criteria.immediateAvailability || candidate.availability === 'Immediate' 
    ? availabilityWeight 
    : 0;
  
  score = skillsScore + experienceScore + locationScore + availabilityScore;
  return Math.min(Math.round(score), maxScore);
};

// Mock search function
export const mockSearch = (criteria: SearchCriteria): Candidate[] => {
  // Filter candidates based on job boards
  let results = mockCandidates.filter(candidate => 
    criteria.jobBoards.includes(candidate.jobBoard)
  );
  
  // Calculate match score for each candidate
  results = results.map(candidate => ({
    ...candidate,
    score: calculateMatchScore(candidate, criteria)
  }));
  
  // Sort by score (descending)
  results.sort((a, b) => b.score - a.score);
  
  // Return only candidates with a score above 50
  return results.filter(candidate => candidate.score > 50);
};

// Get all candidates
export const getAllCandidates = (): Candidate[] => {
  return mockCandidates;
};

// Get candidate by ID
export const getCandidateById = (id: string): Candidate | null => {
  return mockCandidates.find(candidate => candidate.id === id) || null;
};