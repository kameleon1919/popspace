import React from 'react';

const TestApp: React.FC = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🎉 PopSpace Test - Application React fonctionne !</h1>
      <p>Si vous voyez ce message, React démarre correctement.</p>
      <p>Timestamp: {new Date().toLocaleString()}</p>
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
        <h2>Configuration des services :</h2>
        <p>API Host: {process.env.REACT_APP_API_HOST || 'localhost'}</p>
        <p>API Port: {process.env.REACT_APP_API_PORT || '8889'}</p>
        <p>Hermes Port: {process.env.REACT_APP_HERMES_PORT || '8890'}</p>
        <p>LiveKit: {process.env.REACT_APP_LIVEKIT_ENDPOINT || 'Non configuré'}</p>
      </div>
    </div>
  );
};

export default TestApp; 