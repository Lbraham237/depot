import React, { useState } from 'react';
import { ScheduleItem, Course } from '../types';
import { PlusCircle, Search, Edit, Trash, X } from 'lucide-react';

interface ScheduleProps {
  scheduleItems: ScheduleItem[];
  setScheduleItems: React.Dispatch<React.SetStateAction<ScheduleItem[]>>;
  courses: Course[];
}

const Schedule: React.FC<ScheduleProps> = ({ scheduleItems, setScheduleItems, courses }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingScheduleItem, setEditingScheduleItem] = useState<ScheduleItem | null>(null);
  const [newScheduleItem, setNewScheduleItem] = useState<Partial<ScheduleItem>>({
    courseId: '',
    dayOfWeek: '',
    startTime: '',
    endTime: '',
    room: ''
  });

  const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  const filteredScheduleItems = scheduleItems.filter(item => {
    const course = courses.find(c => c.id === item.courseId);
    return (
      course?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.dayOfWeek.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.room.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getCourseNameById = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    return course ? course.name : 'Cours inconnu';
  };

  const handleAddScheduleItem = () => {
    if (
      !newScheduleItem.courseId || 
      !newScheduleItem.dayOfWeek || 
      !newScheduleItem.startTime || 
      !newScheduleItem.endTime || 
      !newScheduleItem.room
    ) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const scheduleItemToAdd: ScheduleItem = {
      id: Date.now().toString(),
      courseId: newScheduleItem.courseId,
      dayOfWeek: newScheduleItem.dayOfWeek,
      startTime: newScheduleItem.startTime,
      endTime: newScheduleItem.endTime,
      room: newScheduleItem.room
    };

    setScheduleItems([...scheduleItems, scheduleItemToAdd]);
    setNewScheduleItem({
      courseId: '',
      dayOfWeek: '',
      startTime: '',
      endTime: '',
      room: ''
    });
    setShowAddForm(false);
  };

  const handleUpdateScheduleItem = () => {
    if (!editingScheduleItem) return;
    
    if (
      !editingScheduleItem.courseId || 
      !editingScheduleItem.dayOfWeek || 
      !editingScheduleItem.startTime || 
      !editingScheduleItem.endTime || 
      !editingScheduleItem.room
    ) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setScheduleItems(scheduleItems.map(item => 
      item.id === editingScheduleItem.id ? editingScheduleItem : item
    ));
    setEditingScheduleItem(null);
  };

  const handleDeleteScheduleItem = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet élément de l\'emploi du temps ?')) {
      setScheduleItems(scheduleItems.filter(item => item.id !== id));
    }
  };

  // Group schedule items by day of week
  const scheduleByDay = daysOfWeek.map(day => {
    return {
      day,
      items: filteredScheduleItems
        .filter(item => item.dayOfWeek === day)
        .sort((a, b) => a.startTime.localeCompare(b.startTime))
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher dans l'emploi du temps..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={() => setShowAddForm(true)}
        >
          <PlusCircle className="h-5 w-5" />
          <span>Ajouter un cours</span>
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Ajouter un cours à l'emploi du temps</h3>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setShowAddForm(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cours *</label>
              <select
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newScheduleItem.courseId}
                onChange={(e) => setNewScheduleItem({...newScheduleItem, courseId: e.target.value})}
              >
                <option value="">Sélectionner un cours</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.name} ({course.code})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jour *</label>
              <select
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newScheduleItem.dayOfWeek}
                onChange={(e) => setNewScheduleItem({...newScheduleItem, dayOfWeek: e.target.value})}
              >
                <option value="">Sélectionner un jour</option>
                {daysOfWeek.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heure de début *</label>
              <input
                type="time"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newScheduleItem.startTime}
                onChange={(e) => setNewScheduleItem({...newScheduleItem, startTime: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heure de fin *</label>
              <input
                type="time"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newScheduleItem.endTime}
                onChange={(e) => setNewScheduleItem({...newScheduleItem, endTime: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salle *</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newScheduleItem.room}
                onChange={(e) => setNewScheduleItem({...newScheduleItem, room: e.target.value})}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400 transition-colors"
              onClick={() => setShowAddForm(false)}
            >
              Annuler
            </button>
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              onClick={handleAddScheduleItem}
            >
              Ajouter
            </button>
          </div>
        </div>
      )}

      {editingScheduleItem && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Modifier un cours dans l'emploi du temps</h3>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setEditingScheduleItem(null)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cours *</label>
              <select
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={editingScheduleItem.courseId}
                onChange={(e) => setEditingScheduleItem({...editingScheduleItem, courseId: e.target.value})}
              >
                <option value="">Sélectionner un cours</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.name} ({course.code})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jour *</label>
              <select
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={editingScheduleItem.dayOfWeek}
                onChange={(e) => setEditingScheduleItem({...editingScheduleItem, dayOfWeek: e.target.value})}
              >
                <option value="">Sélectionner un jour</option>
                {daysOfWeek.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heure de début *</label>
              <input
                type="time"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={editingScheduleItem.startTime}
                onChange={(e) => setEditingScheduleItem({...editingScheduleItem, startTime: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heure de fin *</label>
              <input
                type="time"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={editingScheduleItem.endTime}
                onChange={(e) => setEditingScheduleItem({...editingScheduleItem, endTime: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salle *</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={editingScheduleItem.room}
                onChange={(e) => setEditingScheduleItem({...editingScheduleItem, room: e.target.value})}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400 transition-colors"
              onClick={() => setEditingScheduleItem(null)}
            >
              Annuler
            </button>
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              onClick={handleUpdateScheduleItem}
            >
              Mettre à jour
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {scheduleByDay.map(({ day, items }) => (
          <div key={day} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">{day}</h3>
            {items.length > 0 ? (
              <div className="space-y-3">
                {items.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{getCourseNameById(item.courseId)}</p>
                      <p className="text-sm text-gray-500">
                        {item.startTime} - {item.endTime} | {item.room}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={() => setEditingScheduleItem(item)}
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteScheduleItem(item.id)}
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">Aucun cours programmé</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;