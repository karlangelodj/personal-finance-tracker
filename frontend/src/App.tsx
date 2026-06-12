import { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('http://localhost:8080/api/ping')
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch(() => setMessage('Failed to connect to backend'));
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Personal Finance Tracker</h1>
      <p className="text-slate-600">Backend says: {message}</p>
    </div>
  );
}

export default App;