import React, { useState } from 'react';
import { SearchCriteria } from '../types';

interface SearchFormProps {
  onSearch: (criteria: SearchCriteria) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [skills, setSkills] = useState<string[]>(['Java', 'REST', 'Web Services', 'SQL', 'Oracle']);
  const [newSkill, setNewSkill] = useState('');
  const [experience, setExperience] = useState(3);
  const [location, setLocation] = useState('');
  const [immediateAvailability, setImmediateAvailability] = useState(false);
  const [jobBoards, setJobBoards] = useState<string[]>(['Monster', 'APEC', 'France Travail']);
  
  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleJobBoardToggle = (board: string) => {
    if (jobBoards.includes(board)) {
      setJobBoards(jobBoards.filter(b => b !== board));
    } else {
      setJobBoards([...jobBoards, board]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      skills,
      experience,
      location,
      immediateAvailability,
      jobBoards
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Search Criteria</h2>
      
      {/* Skills Section */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Technical Skills</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {skills.map(skill => (
            <div key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
              <span>{skill}</span>
              <button 
                type="button" 
                onClick={() => handleRemoveSkill(skill)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill"
            className="flex-grow px-3 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleAddSkill}
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>
      
      {/* Experience */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Years of Experience (Minimum: {experience})
        </label>
        <input
          type="range"
          min="0"
          max="15"
          value={experience}
          onChange={(e) => setExperience(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>0</span>
          <span>5</span>
          <span>10</span>
          <span>15+</span>
        </div>
      </div>
      
      {/* Location */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Geographic Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City or region"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {/* Immediate Availability */}
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={immediateAvailability}
            onChange={(e) => setImmediateAvailability(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="ml-2 text-gray-700">Immediate Availability</span>
        </label>
      </div>
      
      {/* Job Boards */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Job Boards</label>
        <div className="space-y-2">
          {['Monster', 'APEC', 'France Travail', 'LinkedIn', 'Indeed'].map(board => (
            <label key={board} className="flex items-center">
              <input
                type="checkbox"
                checked={jobBoards.includes(board)}
                onChange={() => handleJobBoardToggle(board)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-gray-700">{board}</span>
            </label>
          ))}
        </div>
      </div>
      
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Search Candidates
      </button>
    </form>
  );
};

export default SearchForm;