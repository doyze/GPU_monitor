import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [gpus, setGpus] = useState([]);
  const [ip, setIp] = useState('');

  useEffect(() => {
    // Fetch IP address once on component mount
    const fetchIp = async () => {
      try {
        const response = await fetch('/api/ip');
        const data = await response.json();
        setIp(data.ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    const fetchData = async () => {
      try {
        const response = await fetch('/api/gpu-info');
        const data = await response.json();
        console.log("Fetched data:", data); // Log the fetched data
        setGpus(data.gpus);
      } catch (error) {
        console.error("Error fetching GPU info:", error);
      }
    };

    fetchIp();
    fetchData();
    const interval = setInterval(fetchData, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>GPU Monitor</h1>
      </header>
      <main>
        {gpus && gpus.length > 0 ? (
          gpus.map(gpu => (
            <div key={gpu.id} className="gpu-card">
              <h2>{gpu.name}</h2>
              
              <div className="stat-bar">
                <p><strong>Temperature:</strong> {gpu.temperature}°C</p>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: `${gpu.temperature}%` }}></div>
                </div>
              </div>

              <div className="stat-bar">
                <p><strong>Load:</strong> {gpu.load_percent}%</p>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: `${gpu.load_raw}%` }}></div>
                </div>
              </div>

              <div className="stat-bar">
                <p><strong>Memory:</strong> {gpu.memory_used} / {gpu.memory_total} MB ({gpu.memory_util_percent}%)</p>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: `${gpu.memory_util_raw}%` }}></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading GPU data or no GPUs found...</p>
        )}
      </main>
      <footer>
        <p>IP Address: {ip}</p>
      </footer>
    </div>
  );
}

export default App;
