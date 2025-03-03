import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import CandidateList from '../components/CandidateList';
import { Candidate, SearchCriteria } from '../types';
import { mockSearch } from '../utils/mockData';

const SearchPage: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (criteria: SearchCriteria) => {
    setLoading(true);
    setHasSearched(true);
    
    // In a real application, this would be an API call to the backend
    // For this demo, we'll use mock data with a delay to simulate a real search
    setTimeout(() => {
      const results = mockSearch(criteria);
      setCandidates(results);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Search Candidates</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <SearchForm onSearch={handleSearch} />
        </div>
        
        <div className="lg:col-span-3">
          {hasSearched ? (
            <>
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  {loading ? 'Searching...' : `${candidates.length} Candidates Found`}
                </h2>
              </div>
              <CandidateList candidates={candidates} loading={loading} />
            </>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <h2 className="text-xl font-semibold mb-4">Start Your Search</h2>
              <p className="text-gray-600 mb-6">
                Define your search criteria on the left panel and click "Search Candidates" to find matching profiles.
              </p>
              <div className="p-8 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">Our system searches across:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    Monster
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    APEC
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    France Travail
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    LinkedIn
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    Indeed
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;