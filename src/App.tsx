import React, { useState } from 'react';
import { BookOpen, Users, MessageCircle, Bell, Menu, X, Calculator, Calendar, Send, PlusCircle } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('attendance');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [totalClasses, setTotalClasses] = useState(60);
  const [attendedClasses, setAttendedClasses] = useState(40);
  const [newMessage, setNewMessage] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [showHelpForm, setShowHelpForm] = useState(false);
  const [newHelpRequest, setNewHelpRequest] = useState({ title: '', location: '', description: '' });

  // Enhanced class schedule
  const classSchedule = [
    { id: 1, subject: 'Data Structures', teacher: 'Dr. Kumar', time: '10:00 AM', room: '301', attended: true },
    { id: 2, subject: 'Database Systems', teacher: 'Prof. Singh', time: '11:30 AM', room: '405', attended: false },
    { id: 3, subject: 'Computer Networks', teacher: 'Dr. Sharma', time: '2:00 PM', room: '201', attended: true },
    { id: 4, subject: 'Operating Systems', teacher: 'Prof. Gupta', time: '3:30 PM', room: '302', attended: false },
    { id: 5, subject: 'Software Engineering', teacher: 'Dr. Verma', time: '5:00 PM', room: '405', attended: true },
  ];

  const [messages, setMessages] = useState([
    { id: 1, teacher: 'Dr. Kumar', subject: 'Data Structures', message: 'Assignment submission deadline extended to next week.', time: '2 hours ago' },
    { id: 2, teacher: 'Prof. Singh', subject: 'Database', message: 'Extra class scheduled for tomorrow at 3 PM.', time: '3 hours ago' },
    { id: 3, teacher: 'Dr. Sharma', subject: 'Computer Networks', message: 'Lab manual updated on the portal.', time: '5 hours ago' }
  ]);

  const [helpRequests, setHelpRequests] = useState([
    { id: 1, user: 'Rahul', title: 'Need notes for Computer Networks', description: 'Missed last week\'s classes', location: 'Library', time: '2:00 PM' },
    { id: 2, user: 'Priya', title: 'Looking for Data Structures textbook', description: 'Cormen 3rd Edition', location: 'Hostel Block A', time: '4:30 PM' }
  ]);

  const teachers = [
    'Dr. Kumar - Data Structures',
    'Prof. Singh - Database',
    'Dr. Sharma - Computer Networks',
    'Prof. Gupta - Operating Systems',
    'Dr. Verma - Software Engineering'
  ];

  const handleSendMessage = () => {
    if (newMessage && selectedTeacher) {
      const [teacher, subject] = selectedTeacher.split(' - ');
      setMessages([
        {
          id: messages.length + 1,
          teacher,
          subject,
          message: newMessage,
          time: 'Just now'
        },
        ...messages
      ]);
      setNewMessage('');
      setSelectedTeacher('');
      setShowMessageForm(false);
    }
  };

  const handleCreateHelpRequest = () => {
    if (newHelpRequest.title && newHelpRequest.location) {
      setHelpRequests([
        {
          id: helpRequests.length + 1,
          user: 'You',
          title: newHelpRequest.title,
          description: newHelpRequest.description,
          location: newHelpRequest.location,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        ...helpRequests
      ]);
      setNewHelpRequest({ title: '', location: '', description: '' });
      setShowHelpForm(false);
    }
  };

  const attendancePercentage = (attendedClasses / totalClasses) * 100;
  const requiredClasses = Math.ceil((0.75 * totalClasses - attendedClasses) / (1 - 0.75));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-blue-600 text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8" />
              <span className="ml-2 text-xl font-bold">UniConnect</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => setActiveTab('attendance')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'attendance' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
              >
                Attendance
              </button>
              <button 
                onClick={() => setActiveTab('messages')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'messages' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
              >
                Messages
              </button>
              <button 
                onClick={() => setActiveTab('help')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'help' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
              >
                Help Requests
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md hover:bg-blue-700"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => {
                  setActiveTab('attendance');
                  setMobileMenuOpen(false);
                }}
                className="block px-3 py-2 rounded-md text-base font-medium w-full text-left hover:bg-blue-700"
              >
                Attendance
              </button>
              <button
                onClick={() => {
                  setActiveTab('messages');
                  setMobileMenuOpen(false);
                }}
                className="block px-3 py-2 rounded-md text-base font-medium w-full text-left hover:bg-blue-700"
              >
                Messages
              </button>
              <button
                onClick={() => {
                  setActiveTab('help');
                  setMobileMenuOpen(false);
                }}
                className="block px-3 py-2 rounded-md text-base font-medium w-full text-left hover:bg-blue-700"
              >
                Help Requests
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'attendance' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Calculator className="w-6 h-6 mr-2" /> Attendance Calculator
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Classes
                  </label>
                  <input
                    type="number"
                    value={totalClasses}
                    onChange={(e) => setTotalClasses(parseInt(e.target.value) || 0)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Classes Attended
                  </label>
                  <input
                    type="number"
                    value={attendedClasses}
                    onChange={(e) => setAttendedClasses(parseInt(e.target.value) || 0)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
              <div className="mt-6">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Current Attendance</span>
                    <span className="text-lg font-bold">{attendancePercentage.toFixed(2)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        attendancePercentage >= 75 ? 'bg-green-600' : 'bg-red-600'
                      }`}
                      style={{ width: `${Math.min(100, attendancePercentage)}%` }}
                    ></div>
                  </div>
                </div>
                {attendancePercentage < 75 && (
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-800">
                      You need to attend <strong>{requiredClasses}</strong> more classes to reach 75% attendance.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Calendar className="w-6 h-6 mr-2" /> Today's Classes
              </h3>
              <div className="space-y-4">
                {classSchedule.map((class_) => (
                  <div key={class_.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{class_.subject}</p>
                      <p className="text-sm text-gray-600">{class_.teacher}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{class_.time}</p>
                      <p className="text-sm text-gray-600">Room {class_.room}</p>
                      <span className={`text-xs px-2 py-1 rounded ${
                        class_.attended ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {class_.attended ? 'Attended' : 'Upcoming'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="bg-white rounded-lg shadow-lg">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold flex items-center">
                <MessageCircle className="w-6 h-6 mr-2" /> Teacher Messages
              </h2>
            </div>
            {showMessageForm ? (
              <div className="p-6 space-y-4">
                <select
                  value={selectedTeacher}
                  onChange={(e) => setSelectedTeacher(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Teacher</option>
                  {teachers.map((teacher, index) => (
                    <option key={index} value={teacher}>
                      {teacher}
                    </option>
                  ))}
                </select>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full p-2 border rounded-md h-32"
                />
                <div className="flex space-x-4">
                  <button
                    onClick={handleSendMessage}
                    className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
                  >
                    <Send className="w-4 h-4 mr-2" /> Send Message
                  </button>
                  <button
                    onClick={() => setShowMessageForm(false)}
                    className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="divide-y">
                  {messages.map((message) => (
                    <div key={message.id} className="p-6 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{message.teacher}</h3>
                          <p className="text-sm text-gray-600">{message.subject}</p>
                        </div>
                        <span className="text-sm text-gray-500">{message.time}</span>
                      </div>
                      <p className="mt-2 text-gray-700">{message.message}</p>
                    </div>
                  ))}
                </div>
                <div className="p-6 bg-gray-50">
                  <button
                    onClick={() => setShowMessageForm(true)}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
                  >
                    <PlusCircle className="w-4 h-4 mr-2" /> New Message
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'help' && (
          <div className="bg-white rounded-lg shadow-lg">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold flex items-center">
                <Users className="w-6 h-6 mr-2" /> Help Requests
              </h2>
            </div>
            {showHelpForm ? (
              <div className="p-6 space-y-4">
                <input
                  type="text"
                  placeholder="What do you need help with?"
                  value={newHelpRequest.title}
                  onChange={(e) => setNewHelpRequest({ ...newHelpRequest, title: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={newHelpRequest.location}
                  onChange={(e) => setNewHelpRequest({ ...newHelpRequest, location: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
                <textarea
                  placeholder="Additional details..."
                  value={newHelpRequest.description}
                  onChange={(e) => setNewHelpRequest({ ...newHelpRequest, description: e.target.value })}
                  className="w-full p-2 border rounded-md h-32"
                />
                <div className="flex space-x-4">
                  <button
                    onClick={handleCreateHelpRequest}
                    className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
                  >
                    <PlusCircle className="w-4 h-4 mr-2" /> Create Request
                  </button>
                  <button
                    onClick={() => setShowHelpForm(false)}
                    className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="divide-y">
                  {helpRequests.map((request) => (
                    <div key={request.id} className="p-6 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{request.title}</h3>
                          <p className="text-gray-700 mt-1">{request.description}</p>
                          <div className="flex items-center mt-2 text-sm text-gray-600">
                            <Bell className="w-4 h-4 mr-1" />
                            <span>{request.location} • {request.time}</span>
                          </div>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                          Help Out
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-6 bg-gray-50">
                  <button
                    onClick={() => setShowHelpForm(true)}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
                  >
                    <PlusCircle className="w-4 h-4 mr-2" /> Create Help Request
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;