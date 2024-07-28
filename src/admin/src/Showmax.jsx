import React, { useEffect, useState } from 'react';
import './Showmax.css'; // Assuming you have some styles for Showmax

const Showmax = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8006/execute-stored-procedure')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to execute stored procedure');
        }
        return response.json();
      })
      .then(data => {
        setResults(data);
        setError(null); // Reset error state if request succeeds
      })
      .catch(error => {
        console.error('Error:', error);
        setError('Failed to fetch data'); // Set error state if request fails
      });
  }, []);

  return (
    <div className='showmax'>
      <h1>Order Count Details</h1>
      {error && <div className="error">Error: {error}</div>}
      <div className="results">
        {results.map((result, index) => (
          <div key={index} className="result-item">
            <p><strong>User ID:</strong> {result.user_id}</p>
            <p><strong>Username:</strong> {result.username}</p>
            <p><strong>User Email:</strong> {result.useremail}</p>
            <p><strong>Order Count:</strong> {result.order_count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Showmax;
