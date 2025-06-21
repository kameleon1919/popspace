import React from 'react';

export const App: React.FC = () => {
  console.log('🚀 PopSpace App - Version ULTRA minimale');
  
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f0f0',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#333' }}>🎯 PopSpace - Version ULTRA minimale</h1>
      <p>Si vous voyez ce message, React fonctionne parfaitement !</p>
      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#fff', 
        borderRadius: '8px',
        border: '1px solid #ddd'
      }}>
        <h2>✅ Tests réussis :</h2>
        <ul>
          <li>✅ React</li>
          <li>✅ JSX</li>
          <li>✅ Styles inline</li>
          <li>✅ Console.log</li>
        </ul>
      </div>
      <p style={{ marginTop: '20px', color: '#666' }}>
        Timestamp: {new Date().toLocaleString()}
      </p>
    </div>
  );
}; 