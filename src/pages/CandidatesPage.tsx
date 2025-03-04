import React, { useState, useEffect } from 'react';
import CandidateList from '../components/CandidateList';
import { Candidate } from '../types';
import { getAllCandidates } from '../utils/mockData';

const CandidatesPage: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // In a real application, this would be an API call to the backend
    setTimeout(() => {
      const allCandidates = getAllCandidates();
      setCandidates(allCandidates);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCandidates = candidates.filter(candidate => 
    candidate.name.toLowerCase().includes(filter.toLowerCase()) ||
    candidate.skills.some(skill => skill.toLowerCase().includes(filter.toLowerCase())) ||
    candidate.location.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Candidates</h1>
        <div className="w-64">
          <input
            type="text"
            placeholder="Filter candidates..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <CandidateList candidates={filteredCandidates} loading={loading} />
    </div>
  );
};

export default CandidatesPage;