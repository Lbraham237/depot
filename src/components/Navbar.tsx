import React from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText, Settings, Home } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <FileText size={24} />
              <span className="font-bold text-xl">CV Search System</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-1 px-3 py-2 rounded hover:bg-blue-700">
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link to="/search" className="flex items-center space-x-1 px-3 py-2 rounded hover:bg-blue-700">
              <Search size={18} />
              <span>Search</span>
            </Link>
            <Link to="/candidates" className="flex items-center space-x-1 px-3 py-2 rounded hover:bg-blue-700">
              <FileText size={18} />
              <span>Candidates</span>
            </Link>
            <Link to="/settings" className="flex items-center space-x-1 px-3 py-2 rounded hover:bg-blue-700">
              <Settings size={18} />
              <span>Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;