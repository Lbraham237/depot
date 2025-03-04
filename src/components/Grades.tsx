import React, { useState } from 'react';
import { Grade, Student, Course } from '../types';
import { PlusCircle, Search, Edit, Trash, X, User } from 'lucide-react';

interface GradesProps {
  grades: Grade[];
  setGrades: React.Dispatch<React.SetStateAction<Grade[]>>;
  students: Student[];
  courses: Course[];
}

const Grades: React.FC<GradesProps> = ({ grades, setGrades, students, courses }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGrade, setEditingGrade] = useState<Grade | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [newGrade, setNewGrade] = useState<Partial<Grade>>({
    studentId: '',
    courseId: '',
    type: '',
    score: 0,
    maxScore: 100,
    date: new Date().toISOString().split('T')[0],
    comment: ''
  });

  const filteredGrades = grades.filter(grade => {
    const student = students.find(s => s.id === grade.studentId);
    const course = courses.find(c => c.id === grade.courseId);
    
    return (
      (student && (student.firstName.toLowerCase() + ' ' + student.lastName.toLowerCase()).includes(searchTerm.toLowerCase())) ||
      (course && course.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      grade.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getStudentNameById = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    return student ? `${student.firstName} ${student.lastName}` : 'Étudiant inconnu';
  };

  const getCourseNameById = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    return course ? course.name : 'Cours inconnu';
  };

  const calculatePercentage = (score: number, maxScore: number) => {
    return (score / maxScore) * 100;
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-100 text-green-800';
    if (percentage >= 75) return 'bg-blue-100 text-blue-800';
    if (percentage >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const handleAddGrade = () => {
    if (
      !newGrade.studentId || 
      !newGrade.courseId || 
      !newGrade.type || 
      !newGrade.date
    ) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const gradeToAdd: Grade = {
      id: Date.now().toString(),
      studentId: newGrade.studentId,
      courseId: newGrade.courseId,
      type: newGrade.type,
      score: newGrade.score || 0,
      maxScore: newGrade.maxScore || 100,
      date: newGrade.date,
      comment: newGrade.comment
    };

    setGrades([...grades, gradeToAdd]);
    setNewGrade({
      studentId: '',
      courseId: '',
      type: '',
      score: 0,
      maxScore: 100,
      date: new Date().toISOString().split('T')[0],
      comment: ''
    });
    setShowAddForm(false);
  };

  const handleUpdateGrade = () => {
    if (!editingGrade) return;
    
    if (
      !editingGrade.studentId || 
      !editingGrade.courseId || 
      !editingGrade.type || 
      !editingGrade.date
    ) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setGrades(grades.map(grade => 
      grade.id === editingGrade.id ? editingGrade : grade
    ));
    setEditingGrade(null);
  };

  const handleDeleteGrade = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
      setGrades(grades.filter(grade => grade.id !== id));
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
            placeholder="Rechercher des notes..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <select
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={selectedStudent || ''}
            onChange={(e) => setSelectedStudent(e.target.value || null)}
          >
            <option value="">Tous les étudiants</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>
                {student.firstName} {student.lastName}
              </option>
            ))}
          </select>
          <button
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            onClick={() => setShowAddForm(true)}
          >
            <PlusCircle className="h-5 w-5" />
            <span>Ajouter une note</span>
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Ajouter une nouvelle note</h3>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setShowAddForm(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Étudiant *</label>
              <select
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newGrade.studentId}
                onChange={(e) => setNewGrade({...newGrade, studentId: e.target.value})}
              >
                <option value="">Sélectionner un étudiant</option>
                {students.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.firstName} {student.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cours *</label>
              <select
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newGrade.courseId}
                onChange={(e) => setNewGrade({...newGrade, courseId: e.target.value})}
              >
                <option value="">Sélectionner un cours</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type d'évaluation *</label>
              <select
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newGrade.type}
                onChange={(e) => setNewGrade({...newGrade, type: e.target.value})}
              >
                <option value="">Sélectionner un type</option>
                <option value="Examen">Examen</option>
                <option value="Contrôle">Contrôle</option>
                <option value="Devoir">Devoir</option>
                <option value="Projet">Projet</option>
                <option value="Oral">Oral</option>
                <option value="TP">TP</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
              <input
                type="date"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newGrade.date}
                onChange={(e) => setNewGrade({...newGrade, date: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Note obtenue *</label>
              <input
                type="number"
                min="0"
                step="0.5"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newGrade.score}
                onChange={(e) => setNewGrade({...newGrade, score: parseFloat(e.target.value) || 0})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Note maximale *</label>
              <input
                type="number"
                min="1"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newGrade.maxScore}
                onChange={(e) => setNewGrade({...newGrade, maxScore: parseFloat(e.target.value) || 100})}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Commentaire</label>
              <textarea
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={3}
                value={newGrade.comment}
                onChange={(e) => setNewGrade({...newGrade, comment: e.target.value})}
              ></textarea>
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
              onClick={handleAddGrade}
            >
              Ajouter
            </button>
          </div>
        </div>
      )}

      {editingGrade && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Modifier une note</h3>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setEditingGrade(null)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Étudiant *</label>
              <select
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={editingGrade.studentId}
                onChange={(e) => setEditingGrade({...editingGrade, studentId: e.target.value})}
              >
                <option value="">Sélectionner un étudiant</option>
                {students.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.firstName} {student.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cours *</label>
              <select
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={editingGrade.courseId}
                onChange={(e) => setEditingGrade({...editingGrade, courseId: e.target.value})}
              >
                <option value="">Sélectionner un cours</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type d'évaluation *</label>
              <select
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={editingGrade.type}
                onChange={(e) => setEditingGrade({...editingGrade, type: e.target.value})}
              >
                <option value="">Sélectionner un type</option>
                <option value="Examen">Examen</option>
                <option value="Contrôle">Contrôle</option>
                <option value="Devoir">Devoir</option>
                <option value="Projet">Projet</option>
                <option value="Oral">Oral</option>
                <option value="TP">TP</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
              <input
                type="date"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={editingGrade.date}
                onChange={(e) => setEditingGrade({...editingGrade, date: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Note obtenue *</label>
              <input
                type="number"
                min="0"
                step="0.5"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={editingGrade.score}
                onChange={(e) => setEditingGrade({...editingGrade, score: parseFloat(e.target.value) || 0})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Note maximale *</label>
              <input
                type="number"
                min="1"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={editingGrade.maxScore}
                onChange={(e) => setEditingGrade({...editingGrade, maxScore: parseFloat(e.target.value) || 100})}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Commentaire</label>
              <textarea
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={3}
                value={editingGrade.comment}
                onChange={(e) => setEditingGrade({...editingGrade, comment: e.target.value})}
              ></textarea>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400 transition-colors"
              onClick={() => setEditingGrade(null)}
            >
              Annuler
            </button>
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              onClick={handleUpdateGrade}
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
                Étudiant
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cours
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Note
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredGrades.length > 0 ? (
              filteredGrades.map((grade) => {
                const percentage = calculatePercentage(grade.score, grade.maxScore);
                const colorClass = getGradeColor(percentage);
                
                return (
                  <tr key={grade.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {getStudentNameById(grade.studentId)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{getCourseNameById(grade.courseId)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                        {grade.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClass}`}>
                        {grade.score} / {grade.maxScore} ({percentage.toFixed(1)}%)
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(grade.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                        onClick={() => setEditingGrade(grade)}
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteGrade(grade.id)}
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                  Aucune note trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedStudent && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Résumé des notes pour {getStudentNameById(selectedStudent)}</h3>
          <div className="space-y-4">
            {courses.map(course => {
              const courseGrades = grades.filter(g => g.studentId === selectedStudent && g.courseId === course.id);
              if (courseGrades.length === 0) return null;
              
              const totalScore = courseGrades.reduce((sum, g) => sum + calculatePercentage(g.score, g.maxScore), 0);
              const averagePercentage = totalScore / courseGrades.length;
              const colorClass = getGradeColor(averagePercentage);
              
              return (
                <div key={course.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{course.name}</h4>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${colorClass}`}>
                      Moyenne: {averagePercentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="mt-2 space-y-1">
                    {courseGrades.map(g => (
                      <div key={g.id} className="flex justify-between text-sm">
                        <span>{g.type} ({new Date(g.date).toLocaleDateString()})</span>
                        <span>{g.score} / {g.maxScore}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Grades;