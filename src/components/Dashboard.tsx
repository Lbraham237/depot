import React from 'react';
import { Users, BookOpen, Calendar, MessageSquare, TrendingUp } from 'lucide-react';
import { DashboardStats } from '../types';

const Dashboard: React.FC<DashboardStats> = ({ 
  studentCount, 
  courseCount, 
  scheduleCount, 
  messageCount 
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <Users className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 font-medium">Étudiants</p>
              <p className="text-2xl font-semibold">{studentCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <BookOpen className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 font-medium">Cours</p>
              <p className="text-2xl font-semibold">{courseCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <Calendar className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 font-medium">Cours planifiés</p>
              <p className="text-2xl font-semibold">{scheduleCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <MessageSquare className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 font-medium">Messages</p>
              <p className="text-2xl font-semibold">{messageCount}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Activité récente</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                <Users className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">Nouvel étudiant inscrit</p>
                <p className="text-xs text-gray-500">Il y a 2 heures</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="p-2 rounded-full bg-green-100 text-green-600">
                <BookOpen className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">Nouveau cours ajouté</p>
                <p className="text-xs text-gray-500">Il y a 1 jour</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="p-2 rounded-full bg-yellow-100 text-yellow-600">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">Nouveau message reçu</p>
                <p className="text-xs text-gray-500">Il y a 3 heures</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Statistiques de performance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Taux de réussite</span>
                <span className="text-sm font-medium">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Assiduité</span>
                <span className="text-sm font-medium">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Satisfaction des parents</span>
                <span className="text-sm font-medium">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Événements à venir</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="p-2 rounded-full bg-red-100 text-red-600">
              <Calendar className="h-5 w-5" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Réunion parents-professeurs</p>
              <p className="text-xs text-gray-500">15 novembre 2023, 18:00 - 20:00</p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="p-2 rounded-full bg-blue-100 text-blue-600">
              <Calendar className="h-5 w-5" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Examens trimestriels</p>
              <p className="text-xs text-gray-500">1-5 décembre 2023</p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="p-2 rounded-full bg-green-100 text-green-600">
              <Calendar className="h-5 w-5" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Sortie scolaire - Musée des Sciences</p>
              <p className="text-xs text-gray-500">12 décembre 2023, 09:00 - 16:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;