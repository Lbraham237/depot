import React from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText, Settings, Database } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">CV Search and Formatting System</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find the perfect candidates for CAPGEMINI with our advanced CV search and formatting tool.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
          <div className="bg-blue-100 p-4 rounded-full mb-4">
            <Search size={32} className="text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Search Candidates</h2>
          <p className="text-gray-600 mb-4">
            Define your search criteria and scan multiple job boards to find the perfect candidates.
          </p>
          <Link 
            to="/search" 
            className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Start Searching
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
          <div className="bg-blue-100 p-4 rounded-full mb-4">
            <FileText size={32} className="text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Format CVs</h2>
          <p className="text-gray-600 mb-4">
            Automatically convert candidate CVs to a standardized CAPGEMINI template.
          </p>
          <Link 
            to="/candidates" 
            className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            View Candidates
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
          <div className="bg-blue-100 p-4 rounded-full mb-4">
            <Settings size={32} className="text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">System Settings</h2>
          <p className="text-gray-600 mb-4">
            Configure job board connections, CV templates, and system preferences.
          </p>
          <Link 
            to="/settings" 
            className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Configure Settings
          </Link>
        </div>
      </div>
      
      <div className="bg-blue-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mb-4">1</div>
            <h3 className="text-lg font-semibold mb-2">Define Search Criteria</h3>
            <p className="text-gray-600">
              Specify technical skills, experience level, location, and other requirements.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mb-4">2</div>
            <h3 className="text-lg font-semibold mb-2">Scan Job Boards</h3>
            <p className="text-gray-600">
              Our system searches multiple platforms including Monster, APEC, and France Travail.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mb-4">3</div>
            <h3 className="text-lg font-semibold mb-2">Review Formatted CVs</h3>
            <p className="text-gray-600">
              View and download standardized CVs ready for the recruitment process.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to find your ideal candidates?</h2>
        <Link 
          to="/search" 
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700"
        >
          Start Your Search Now
        </Link>
      </div>
    </div>
  );
};

export default HomePage;