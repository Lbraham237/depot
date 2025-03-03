import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import FormattedCV from '../components/FormattedCV';
import { Candidate } from '../types';
import { getCandidateById } from '../utils/mockData';
import { ArrowLeft } from 'lucide-react';

const CandidateDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // In a real application, this would be an API call to the backend
      setTimeout(() => {
        const foundCandidate = getCandidateById(id);
        setCandidate(foundCandidate);
        setLoading(false);
      }, 500);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Candidate Not Found</h2>
          <p className="text-gray-600 mb-6">The candidate you're looking for doesn't exist or has been removed.</p>
          <Link to="/candidates" className="text-blue-600 hover:text-blue-800 flex items-center justify-center">
            <ArrowLeft size={18} className="mr-2" />
            Back to Candidates
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/candidates" className="text-blue-600 hover:text-blue-800 flex items-center">
          <ArrowLeft size={18} className="mr-2" />
          Back to Candidates
        </Link>
      </div>
      
      <FormattedCV candidate={candidate} />
    </div>
  );
};

export default CandidateDetailPage;