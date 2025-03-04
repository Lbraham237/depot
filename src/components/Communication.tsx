import React, { useState } from 'react';
import { Message, Student } from '../types';
import { PlusCircle, Search, Trash, X, Mail, CheckCircle, AlertCircle } from 'lucide-react';

interface CommunicationProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  students: Student[];
}

const Communication: React.FC<CommunicationProps> = ({ messages, setMessages, students }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showComposeForm, setShowComposeForm] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [newMessage, setNewMessage] = useState<Partial<Message>>({
    studentId: '',
    sender: 'teacher',
    subject: '',
    content: '',
    date: new Date().toISOString(),
    read: false
  });

  const filteredMessages = messages.filter(message => {
    const student = students.find(s => s.id === message.studentId);
    
    return (
      (student && (student.firstName.toLowerCase() + ' ' + student.lastName.toLowerCase()).includes(searchTerm.toLowerCase())) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getStudentNameById = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    return student ? `${student.firstName} ${student.lastName}` : 'Étudiant inconnu';
  };

  const handleSendMessage = () => {
    if (
      !newMessage.studentId || 
      !newMessage.subject || 
      !newMessage.content
    ) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const messageToAdd: Message = {
      id: Date.now().toString(),
      studentId: newMessage.studentId,
      sender: 'teacher',
      subject: newMessage.subject,
      content: newMessage.content,
      date: new Date().toISOString(),
      read: false
    };

    setMessages([...messages, messageToAdd]);
    setNewMessage({
      studentId: '',
      sender: 'teacher',
      subject: '',
      content: '',
      date: new Date().toISOString(),
      read: false
    });
    setShowComposeForm(false);
  };

  const handleDeleteMessage = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      setMessages(messages.filter(message => message.id !== id));
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  const handleMarkAsRead = (id: string) => {
    setMessages(messages.map(message => 
      message.id === id ? { ...message, read: true } : message
    ));
  };

  const handleSelectMessage = (message: Message) => {
    setSelectedMessage(message);
    if (!message.read) {
      handleMarkAsRead(message.id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
            placeholder="Rechercher des messages..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={() => setShowComposeForm(true)}
        >
          <PlusCircle className="h-5 w-5" />
          <span>Nouveau message</span>
        </button>
      </div>

      {showComposeForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Composer un nouveau message</h3>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setShowComposeForm(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Destinataire *</label>
              <select
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newMessage.studentId}
                onChange={(e) => setNewMessage({...newMessage, studentId: e.target.value})}
              >
                <option value="">Sélectionner un parent d'élève</option>
                {students.map(student => (
                  <option key={student.id} value={student.id}>
                    Parent de {student.firstName} {student.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sujet *</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newMessage.subject}
                onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
              <textarea
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={6}
                value={newMessage.content}
                onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
              ></textarea>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400 transition-colors"
              onClick={() => setShowComposeForm(false)}
            >
              Annuler
            </button>
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              onClick={handleSendMessage}
            >
              Envoyer
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-medium">Messages</h3>
          </div>
          <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((message) => (
                <div 
                  key={message.id} 
                  className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedMessage?.id === message.id ? 'bg-indigo-50' : ''} ${!message.read ? 'font-semibold' : ''}`}
                  onClick={() => handleSelectMessage(message)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium">
                        {message.sender === 'parent' ? `Parent de ${getStudentNameById(message.studentId)}` : `À: Parent de ${getStudentNameById(message.studentId)}`}
                      </p>
                      <p className="text-sm">{message.subject}</p>
                    </div>
                    <div className="flex items-center">
                      {!message.read && (
                        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                      )}
                      <span className="text-xs text-gray-500">
                        {new Date(message.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                Aucun message trouvé
              </div>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          {selectedMessage ? (
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{selectedMessage.subject}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedMessage.sender === 'parent' 
                      ? `De: Parent de ${getStudentNameById(selectedMessage.studentId)}` 
                      : `À: Parent de ${getStudentNameById(selectedMessage.studentId)}`}
                  </p>
                  <p className="text-sm text-gray-500">{formatDate(selectedMessage.date)}</p>
                </div>
                <div className="flex space-x-2">
                  {selectedMessage.sender === 'parent' && (
                    <button
                      className="text-indigo-600 hover:text-indigo-900 p-1"
                      onClick={() => {
                        setShowComposeForm(true);
                        setNewMessage({
                          ...newMessage,
                          studentId: selectedMessage.studentId,
                          subject: `Re: ${selectedMessage.subject}`,
                          content: `\n\n-------- Message original --------\n${selectedMessage.content}`
                        });
                      }}
                    >
                      <Mail className="h-5 w-5" />
                    </button>
                  )}
                  <button
                    className="text-red-600 hover:text-red-900 p-1"
                    onClick={() => handleDeleteMessage(selectedMessage.id)}
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="whitespace-pre-line">{selectedMessage.content}</p>
              </div>
            </div>
          ) : (
            <div className="p-6 flex flex-col items-center justify-center h-full text-gray-500">
              <Mail className="h-12 w-12 mb-4" />
              <p>Sélectionnez un message pour le lire</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Statistiques de communication</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                <Mail className="h-6 w-6" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Total des messages</p>
                <p className="text-xl font-semibold">{messages.length}</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-green-100 text-green-600">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Messages lus</p>
                <p className="text-xl font-semibold">{messages.filter(m => m.read).length}</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-yellow-100 text-yellow-600">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Messages non lus</p>
                <p className="text-xl font-semibold">{messages.filter(m => !m.read).length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communication;