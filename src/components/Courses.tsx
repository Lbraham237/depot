import React, { useState } from 'react';
import { Course } from '../types';
import { PlusCircle, Search, Edit, Trash, X } from 'lucide-react';

interface CoursesProps {
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
}

const Courses: React.FC<CoursesProps> = ({ courses, setCourses }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    name: '',
    code: '',
    description: '',
    teacher: '',
    credits: 0,
    semester: ''
  });

  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.semester.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCourse = () => {
    if (
      !newCourse.name || 
      !newCourse.code || 
      !newCourse.teacher || 
      !newCourse.semester
    ) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const courseToAdd: Course = {
      id: Date.now().toString(),
      name: newCourse.name,
      code: newCourse.code,
      description: newCourse.description || '',
      teacher: newCourse.teacher,
      credits: newCourse.credits || 0,
      semester: newCourse.semester
    };

    setCourses([...courses, courseToAdd]);
    setNewCourse({
      name: '',
      code: '',
      description: '',
      teacher: '',
      credits: 0,
      semester: ''
    });
    setShowAddForm(false);
  };

  const handleUpdateCourse = () => {
    if (!editingCourse) return;
    
    if (
      !editingCourse.name || 
      !editingCourse.code || 
      !editingCourse.teacher || 
      !editingCourse.semester
    ) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setCourses(courses.map(course => 
      course.id === editingCourse.id ? editingCourse : course
    ));
    setEditingCourse(null);
  };

  const handleDeleteCourse = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher un cours..."
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
            <h3 className="text-lg font-semibold">Ajouter un nouveau cours</h3>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setShowAddForm(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom du cours *</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newCourse.name}
                onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Code du cours *</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newCourse.code}
                onChange={(e) => setNewCourse({...newCourse, code: e.target.value})}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={3}
                value={newCourse.description}
                onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Enseignant *</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newCourse.teacher}
                onChange={(e) => setNewCourse({...newCourse, teacher: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Crédits</label>
              <input
                type="number"
                min="0"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newCourse.credits}
                onChange={(e) => setNewCourse({...newCourse, credits: parseInt(e.target.value) || 0})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Semestre *</label>
              <select
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newCourse.semester}
                onChange={(e) => setNewCourse({...newCourse, semester: e.target.value})}
              >
                <option value="">Sélectionner un semestre</option>
                <option value="Premier semestre">Premier semestre</option>
                <option value="Deuxième semestre">Deuxième semestre</option>
                <option value="Année complète">Année complète</option>
              </select>
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
              onClick={handleAddCourse}
            >
              Ajouter
            </button>
          </div>
        </div>
      )}

      {editingCourse && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Modifier un cours</h3>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setEditingCourse(null)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom du cours *</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={editingCourse.name}
                onChange={(e) => setEditingCourse({...editingCourse, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Code du cours *</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={editingCourse.code}
                onChange={(e) => setEditingCourse({...editingCourse, code: e.target.value})}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={3}
                value={editingCourse.description}
                onChange={(e) => setEditingCourse({...editingCourse, description: e.target.value})}
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Enseignant *</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={editingCourse.teacher}
                onChange={(e) => setEditingCourse({...editingCourse, teacher: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Crédits</label>
              <input
                type="number"
                min="0"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={editingCourse.credits}
                onChange={(e) => setEditingCourse({...editingCourse, credits: parseInt(e.target.value) || 0})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Semestre *</label>
              <select
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={editingCourse.semester}
                onChange={(e) => setEditingCourse({...editingCourse, semester: e.target.value})}
              >
                <option value="">Sélectionner un semestre</option>
                <option value="Premier semestre">Premier semestre</option>
                <option value="Deuxième semestre">Deuxième semestre</option>
                <option value="Année complète">Année complète</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400 transition-colors"
              onClick={() => setEditingCourse(null)}
            >
              Annuler
            </button>
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              onClick={handleUpdateCourse}
            >
              Mettre à jour
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cours
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Enseignant
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Semestre
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Crédits
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <tr key={course.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {course.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {course.code}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{course.teacher}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {course.semester}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.credits}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                      onClick={() => setEditingCourse(course)}
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteCourse(course.id)}
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  Aucun cours trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;