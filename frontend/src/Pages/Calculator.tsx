// App.tsx
import { useState, ChangeEvent, FormEvent } from 'react';
import { LiquidChrome } from '../components/LiquidChrome';
import './Calculator.css';

interface FormData {
    location: string;
    roof_area: string;
    roof_type: string;
    residents: string;
    water_usage: string;
    budget: string;
    soil_type: string;
}

interface Result {
    harvest_potential: {
        annual_volume: number;
    };
    structure_design: {
        type: string;
        recommended_size: string;
    };
    cost_benefit: {
        installation_cost: number;
        annual_savings: number;
        payback_period: number;
    };
}

function Calculator() {
    const [formData, setFormData] = useState<FormData>({
        location: '',
        roof_area: '',
        roof_type: 'concrete',
        residents: '',
        water_usage: '',
        budget: 'medium',
        soil_type: 'loamy',
    });

    const [result, setResult] = useState<Result | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
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

            const data: Result = await response.json();
            setResult(data);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to calculate. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <div style={{ width: '100%', height: '1000px', position: 'absolute', top: 0, left: 0, zIndex: -1 }}>
                <LiquidChrome
                    baseColor={[0.0, 0.0, 0.1]}
                    speed={0.5}
                    amplitude={0.6}
                    interactive={true}
                />
            </div>
            <header className="App-header">
                <h1>Rainwater Harvesting Assessment</h1>
            </header>

            <div className="container">
                {!result ? (
                    <form onSubmit={handleSubmit} className="form">
                        <h2>Enter All Details</h2>

                        <label>
                            Location:
                            <select name="location" value={formData.location} onChange={handleChange}>
                                <option value="">Select Location</option>
                                <option value="delhi">Delhi</option>
                                <option value="mumbai">Mumbai</option>
                                <option value="bangalore">Bangalore</option>
                            </select>
                        </label>

                        <label>
                            Roof Area (sq ft):
                            <input
                                type="number"
                                name="roof_area"
                                value={formData.roof_area}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Roof Type:
                            <select name="roof_type" value={formData.roof_type} onChange={handleChange}>
                                <option value="concrete">Concrete</option>
                                <option value="tile">Tile</option>
                                <option value="metal">Metal</option>
                            </select>
                        </label>

                        <label>
                            Number of Residents:
                            <input
                                type="number"
                                name="residents"
                                value={formData.residents}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Daily Water Usage (Liters):
                            <input
                                type="number"
                                name="water_usage"
                                value={formData.water_usage}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Soil Type:
                            <select name="soil_type" value={formData.soil_type} onChange={handleChange}>
                                <option value="sandy">Sandy</option>
                                <option value="loamy">Loamy</option>
                                <option value="clayey">Clayey</option>
                            </select>
                        </label>

                        <label>
                            Budget:
                            <select name="budget" value={formData.budget} onChange={handleChange}>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </label>

                        <button className='text-white rounded-md p-4 border-accent border' type="submit" disabled={loading}>
                            {loading ? 'Calculating...' : 'Get Assessment'}
                        </button>
                    </form>
                ) : (
                    <div className="results">
                        <h2>Assessment Results</h2>
                        <div className="result-card">
                            <h3>Harvest Potential</h3>
                            <p>
                                Annual Harvestable Water:{' '}
                                <strong>{result.harvest_potential.annual_volume.toLocaleString()} liters</strong>
                            </p>
                        </div>

                        <div className="result-card">
                            <h3>Recommended Structure</h3>
                            <p>
                                Type: <strong>{result.structure_design.type}</strong>
                            </p>
                            <p>
                                Size: <strong>{result.structure_design.recommended_size}</strong>
                            </p>
                        </div>

                        <div className="result-card">
                            <h3>Cost-Benefit Analysis</h3>
                            <p>
                                Installation Cost: <strong>₹{result.cost_benefit.installation_cost.toLocaleString()}</strong>
                            </p>
                            <p>
                                Annual Savings: <strong>₹{result.cost_benefit.annual_savings.toLocaleString()}</strong>
                            </p>
                            <p>
                                Payback Period: <strong>{result.cost_benefit.payback_period} years</strong>
                            </p>
                        </div>

                        <button className='text-white rounded-md p-4 border-accent border' onClick={() => setResult(null)}>Start Over</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Calculator;
