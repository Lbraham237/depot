import React, { useState } from 'react';
import { Student } from '../types';
import { PlusCircle, Search, Edit, Trash, X } from 'lucide-react';

interface StudentsProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

const Students: React.FC<StudentsProps> = ({ students, setStudents }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    grade: '',
    parentEmail: '',
    parentPhone: '',
    address: '',
    enrollmentDate: new Date().toISOString().split('T')[0]
  });

  const filteredStudents = students.filter(student => 
    student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStudent = () => {
    if (
      !newStudent.firstName || 
      !newStudent.lastName || 
      !newStudent.email || 
      !newStudent.grade
    ) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const studentToAdd: Student = {
      id: Date.now().toString(),
      firstName: newStudent.firstName,
      lastName: newStudent.lastName,
      email: newStudent.email,
      dateOfBirth: newStudent.dateOfBirth || '',
      grade: newStudent.grade,
      parentEmail: newStudent.parentEmail || '',
      parentPhone: newStudent.parentPhone || '',
      address: newStudent.address || '',
      enrollmentDate: newStudent.enrollmentDate || new Date().toISOString().split('T')[0]
    };

    setStudents([...students, studentToAdd]);
    setNewStudent({
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: '',
      grade: '',
      parentEmail: '',
      parentPhone: '',
      address: '',
      enrollmentDate: new Date().toISOString().split('T')[0]
    });
    setShowAddForm(false);
  };

  const handleUpdateStudent = () => {
    if (!editingStudent) return;
    
    if (
      !editingStudent.firstName || 
      !editingStudent.lastName || 
      !editingStudent.email || 
      !editingStudent.grade
    ) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setStudents(students.map(student => 
      student.id === editingStudent.id ? editingStudent : student
    ));
    setEditingStudent(null);
  };

  const handleDeleteStudent = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
      setStudents(students.filter(student => student.id !== id));
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
            placeholder="Rechercher un étudiant..."
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
          <span>Ajouter un étudiant</span>
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Ajouter un nouvel étudiant</h3>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setShowAddForm(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newStudent.firstName}
                onChange={(e) => setNewStudent({...newStudent, firstName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newStudent.lastName}
                onChange={(e) => setNewStudent({...newStudent, lastName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newStudent.email}
                onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
              <input
                type="date"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newStudent.dateOfBirth}
                onChange={(e) => setNewStudent({...newStudent, dateOfBirth: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Niveau *</label>
              <select
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newStudent.grade}
                onChange={(e) => setNewStudent({...newStudent, grade: e.target.value})}
              >
                <option value="">Sélectionner un niveau</option>
                <option value="Seconde">Seconde</option>
                <option value="Première">Première</option>
                <option value="Terminale">Terminale</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email du parent</label>
              <input
                type="email"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newStudent.parentEmail}
                onChange={(e) => setNewStudent({...newStudent, parentEmail: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone du parent</label>
              <input
                type="tel"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newStudent.parentPhone}
                onChange={(e) => setNewStudent({...newStudent, parentPhone: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newStudent.address}
                onChange={(e) => setNewStudent({...newStudent, address: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date d'inscription</label>
              <input
                type="date"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newStudent.enrollmentDate}
                onChange={(e) => setNewStudent({...newStudent, enrollmentDate: e.target.value})}
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
              onClick={handleAddStudent}
            >
              Ajouter
            </button>
          </div>
        </div>
      )}

      {editingStudent && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Modifier un étudiant</h3>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setEditingStudent(null)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={editingStudent.firstName}
                onChange={(e) => setEditingStudent({...editingStudent, firstName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={editingStudent.lastName}
                onChange={(e) => setEditingStudent({...editingStudent, lastName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={editingStudent.email}
                onChange={(e) => setEditingStudent({...editingStudent, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
              <input
                type="date"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={editingStudent.dateOfBirth}
                onChange={(e) => setEditingStudent({...editingStudent, dateOfBirth: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Niveau *</label>
              <select
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={editingStudent.grade}
                onChange={(e) => setEditingStudent({...editingStudent, grade: e.target.value})}
              >
                <option value="">Sélectionner un niveau</option>
                <option value="Seconde">Seconde</option>
                <option value="Première">Première</option>
                <option value="Terminale">Terminale</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email du parent</label>
              <input
                type="email"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={editingStudent.parentEmail}
                onChange={(e) => setEditingStudent({...editingStudent, parentEmail: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone du parent</label>
              <input
                type="tel"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={editingStudent.parentPhone}
                onChange={(e) => setEditingStudent({...editingStudent, parentPhone: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={editingStudent.address}
                onChange={(e) => setEditingStudent({...editingStudent, address: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date d'inscription</label>
              <input
                type="date"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={editingStudent.enrollmentDate}
                onChange={(e) => setEditingStudent({...editingStudent, enrollmentDate: e.target.value})}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400 transition-colors"
              onClick={() => setEditingStudent(null)}
            >
              Annuler
            </button>
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              onClick={handleUpdateStudent}
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
                Nom
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Niveau
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact parent
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {student.firstName} {student.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {student.dateOfBirth && new Date(student.dateOfBirth).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {student.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{student.parentEmail}</div>
                    <div>{student.parentPhone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                      onClick={() => setEditingStudent(student)}
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteStudent(student.id)}
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  Aucun étudiant trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;