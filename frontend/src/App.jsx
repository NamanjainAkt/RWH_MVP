// App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    location: '',
    roof_area: '',
    roof_type: 'concrete',
    residents: '',
    water_usage: '',
    budget: 'medium',
    soil_type: 'loamy'
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:8000/assess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      setResult(data);
      setStep(4);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to calculate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Rainwater Harvesting Assessment</h1>
      </header>

      <div className="container">
        {step === 1 && (
          <div className="step">
            <h2>Location Information</h2>
            <select name="location" value={formData.location} onChange={handleChange}>
              <option value="">Select Location</option>
              <option value="delhi">Delhi</option>
              <option value="mumbai">Mumbai</option>
              <option value="bangalore">Bangalore</option>
            </select>
            <button onClick={() => setStep(2)}>Next</button>
          </div>
        )}

        {step === 2 && (
          <div className="step">
            <h2>Property Details</h2>
            <input 
              type="number" 
              name="roof_area" 
              placeholder="Roof Area (sq ft)" 
              value={formData.roof_area} 
              onChange={handleChange} 
            />
            <select name="roof_type" value={formData.roof_type} onChange={handleChange}>
              <option value="concrete">Concrete</option>
              <option value="tile">Tile</option>
              <option value="metal">Metal</option>
            </select>
            <button onClick={() => setStep(3)}>Next</button>
          </div>
        )}

        {step === 3 && (
          <div className="step">
            <h2>Household Information</h2>
            <input 
              type="number" 
              name="residents" 
              placeholder="Number of Residents" 
              value={formData.residents} 
              onChange={handleChange} 
            />
            <input 
              type="number" 
              name="water_usage" 
              placeholder="Daily Water Usage (Liters)" 
              value={formData.water_usage} 
              onChange={handleChange} 
            />
            <select name="soil_type" value={formData.soil_type} onChange={handleChange}>
              <option value="sandy">Sandy Soil</option>
              <option value="loamy">Loamy Soil</option>
              <option value="clayey">Clayey Soil</option>
            </select>
            <button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Calculating...' : 'Get Assessment'}
            </button>
          </div>
        )}

        {step === 4 && result && (
          <div className="results">
            <h2>Assessment Results</h2>
            <div className="result-card">
              <h3>Harvest Potential</h3>
              <p>Annual Harvestable Water: <strong>{result.harvest_potential.annual_volume.toLocaleString()} liters</strong></p>
            </div>
            
            <div className="result-card">
              <h3>Recommended Structure</h3>
              <p>Type: <strong>{result.structure_design.type}</strong></p>
              <p>Size: <strong>{result.structure_design.recommended_size}</strong></p>
            </div>
            
            <div className="result-card">
              <h3>Cost-Benefit Analysis</h3>
              <p>Installation Cost: <strong>₹{result.cost_benefit.installation_cost.toLocaleString()}</strong></p>
              <p>Annual Savings: <strong>₹{result.cost_benefit.annual_savings.toLocaleString()}</strong></p>
              <p>Payback Period: <strong>{result.cost_benefit.payback_period} years</strong></p>
            </div>
            
            <button onClick={() => {setStep(1); setResult(null);}}>Start Over</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;