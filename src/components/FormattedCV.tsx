import React, { useRef } from 'react';
import { Candidate } from '../types';
import { Download, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface FormattedCVProps {
  candidate: Candidate;
}

const FormattedCV: React.FC<FormattedCVProps> = ({ candidate }) => {
  const cvRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!cvRef.current) return;
    
    const canvas = await html2canvas(cvRef.current, {
      scale: 2,
      logging: false,
      useCORS: true
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 0;
    
    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save(`${candidate.name.replace(/\s+/g, '_')}_CV.pdf`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Formatted CV</h2>
        <button 
          onClick={downloadPDF}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <Download size={18} />
          <span>Download PDF</span>
        </button>
      </div>
      
      <div ref={cvRef} className="bg-white p-8 border border-gray-200 rounded-lg">
        {/* Header with CAPGEMINI branding */}
        <div className="border-b border-gray-300 pb-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-blue-800">{candidate.name}</h1>
              <p className="text-xl text-gray-600 mt-1">Software Developer</p>
              <div className="mt-4 space-y-1 text-gray-600">
                <div className="flex items-center">
                  <Mail size={16} className="mr-2 text-blue-600" />
                  <span>{candidate.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone size={16} className="mr-2 text-blue-600" />
                  <span>{candidate.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2 text-blue-600" />
                  <span>{candidate.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2 text-blue-600" />
                  <span>Availability: {candidate.availability}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-blue-800 font-bold text-2xl">CAPGEMINI</div>
              <div className="text-gray-500 text-sm mt-1">Candidate Profile</div>
              <div className="mt-4 bg-blue-100 text-blue-800 px-3 py-1 rounded-full inline-block">
                Match Score: {candidate.score}%
              </div>
            </div>
          </div>
        </div>
        
        {/* Professional Summary */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-3">Professional Summary</h2>
          <p className="text-gray-700">
            Experienced software developer with {candidate.experience} years of expertise in building robust applications.
            Specializes in {candidate.skills.slice(0, 3).join(', ')} and other technologies.
            Looking for new opportunities to leverage technical skills in challenging projects.
          </p>
        </div>
        
        {/* Technical Skills */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-3">Technical Skills</h2>
          <div className="flex flex-wrap gap-2">
            {candidate.skills.map(skill => (
              <span 
                key={skill} 
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        {/* Experience */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-3">Professional Experience</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-200 pl-4">
              <div className="flex justify-between">
                <h3 className="font-medium text-gray-800">Senior Developer</h3>
                <span className="text-gray-500 text-sm">2020 - Present</span>
              </div>
              <p className="text-gray-600 text-sm">Tech Company Inc.</p>
              <ul className="list-disc list-inside text-gray-700 mt-2 text-sm">
                <li>Developed and maintained RESTful web services</li>
                <li>Worked with Java and Oracle databases</li>
                <li>Implemented security features and optimized performance</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-blue-200 pl-4">
              <div className="flex justify-between">
                <h3 className="font-medium text-gray-800">Developer</h3>
                <span className="text-gray-500 text-sm">2017 - 2020</span>
              </div>
              <p className="text-gray-600 text-sm">Software Solutions Ltd.</p>
              <ul className="list-disc list-inside text-gray-700 mt-2 text-sm">
                <li>Built web applications using modern frameworks</li>
                <li>Collaborated with cross-functional teams</li>
                <li>Participated in code reviews and technical discussions</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Education */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-3">Education</h2>
          <div className="border-l-4 border-blue-200 pl-4">
            <div className="flex justify-between">
              <h3 className="font-medium text-gray-800">Bachelor of Science in Computer Science</h3>
              <span className="text-gray-500 text-sm">2013 - 2017</span>
            </div>
            <p className="text-gray-600 text-sm">University of Technology</p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-gray-300 text-center text-gray-500 text-sm">
          <p>CV formatted by CAPGEMINI CV Search System | Source: {candidate.jobBoard}</p>
          <p className="mt-1">This document complies with GDPR regulations</p>
        </div>
      </div>
    </div>
  );
};

export default FormattedCV;