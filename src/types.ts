export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  availability: string;
  experience: number;
  skills: string[];
  jobBoard: string;
  resumeUrl: string;
  score: number;
}

export interface SearchCriteria {
  skills: string[];
  experience: number;
  location: string;
  immediateAvailability: boolean;
  jobBoards: string[];
}