// App.tsx
import { useState, ChangeEvent, FormEvent } from 'react';
import { LiquidChrome } from '../components/LiquidChrome';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
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
        monthly_volumes: number[];
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
    groundwater_data: {
        current_level: number;
        historical_levels: number[];
        status: string;
    };
}

interface WeatherData {
    location: string;
    temperature: number;
    humidity: number;
    description: string;
    icon: string;
    rainfall: number;
    wind_speed: number;
    timestamp: number;
}

interface RainfallData {
    location: string;
    annual_average: number;
    monthly_distribution: number[];
    monthly_labels: string[];
}

interface GroundwaterData {
    location: string;
    current_level: number;
    historical_levels: number[];
    status: string;
    years: number[];
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
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [rainfallData, setRainfallData] = useState<RainfallData | null>(null);
    const [groundwaterData, setGroundwaterData] = useState<GroundwaterData | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        // If location changes, fetch weather and rainfall data
        if (e.target.name === 'location' && e.target.value) {
            fetchWeatherData(e.target.value);
            fetchRainfallData(e.target.value);
            fetchGroundwaterData(e.target.value);
        }
    };

    const fetchWeatherData = async (location: string) => {
        try {
            const response = await fetch(`https://rwh-mvp.onrender.com/weather/${location}`);
            if (response.ok) {
                const data = await response.json();
                setWeatherData(data);
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const fetchRainfallData = async (location: string) => {
        try {
            const response = await fetch(`https://rwh-mvp.onrender.com/rainfall/${location}`);
            if (response.ok) {
                const data = await response.json();
                setRainfallData(data);
            }
        } catch (error) {
            console.error('Error fetching rainfall data:', error);
        }
    };

    const fetchGroundwaterData = async (location: string) => {
        try {
            const response = await fetch(`https://rwh-mvp.onrender.com/groundwater/${location}`);
            if (response.ok) {
                const data = await response.json();
                setGroundwaterData(data);
            }
        } catch (error) {
            console.error('Error fetching groundwater data:', error);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('https://rwh-mvp.onrender.com/assess', {
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

    // LiveWeatherCard component
    const LiveWeatherCard = ({ data }: { data: WeatherData }) => {
        return (
            <div className="weather-card">
                <h3>Current Weather in {data.location}</h3>
                <div className="weather-info">
                    <img 
                        src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`} 
                        alt={data.description} 
                    />
                    <div>
                        <p className="temperature">{data.temperature}°C</p>
                        <p>{data.description}</p>
                    </div>
                </div>
                <div className="weather-details">
                    <p>Humidity: {data.humidity}%</p>
                    <p>Wind: {data.wind_speed} m/s</p>
                    <p>Rainfall: {data.rainfall} mm</p>
                </div>
            </div>
        );
    };

    // RainfallChart component
    const RainfallChart = ({ data }: { data: RainfallData }) => {
        const chartData = data.monthly_distribution.map((value, index) => ({
            month: data.monthly_labels[index],
            rainfall: value
        }));

        return (
            <div className="chart-container">
                <h3>Monthly Rainfall Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis label={{ value: 'Rainfall (mm)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="rainfall" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    };

    // GroundwaterChart component
    const GroundwaterChart = ({ data }: { data: GroundwaterData }) => {
        const chartData = data.historical_levels.map((level, index) => ({
            year: data.years[index],
            level: level
        }));

        return (
            <div className="chart-container">
                <h3>Groundwater Levels (Past 5 Years)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis label={{ value: 'Depth (meters)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="level" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    };

    // GroundwaterStatus component - Fixed the type issue
    const GroundwaterStatus = ({ status }: { status: string | undefined }) => {
        let statusColor = '';
        let statusMessage = '';
    
        switch (status?.toLowerCase()) {
            case 'safe':
                statusColor = 'green';
                statusMessage = 'Groundwater levels are healthy and sustainable.';
                break;
            case 'semi-critical':
                statusColor = 'orange';
                statusMessage = 'Groundwater extraction should be monitored carefully.';
                break;
            case 'critical':
                statusColor = 'red';
                statusMessage = 'Groundwater extraction exceeds recharge rates. Conservation needed.';
                break;
            default:
                statusColor = 'gray';
                statusMessage = 'Status information not available.';
        }
    
        return (
            <div className="groundwater-status" style={{ borderColor: statusColor }}>
                <h3>Groundwater Status</h3>
                <div className="status-indicator" style={{ backgroundColor: statusColor }}>
                    <span>{status || 'Unknown'}</span>
                </div>
                <p>{statusMessage}</p>
            </div>
        );
    };

    return (
        <div className="App">
            <div style={{ width: '100%', height: '1600px', position: 'absolute', top: 0, left: 0, zIndex: -1 }}>
                <LiquidChrome
                    baseColor={[0.05, 0.4, 0.4]}
                    speed={0.5}
                    amplitude={0.6}
                    interactive={false}
                />
            </div>
            <header className="App-header">
                <h1>Rainwater Harvesting Assessment</h1>
            </header>

            <div className="container">
                {!result ? (
                    <>
                        {weatherData && <LiveWeatherCard data={weatherData} />}
                        
                        <form onSubmit={handleSubmit} className="form">
                            <h2>Enter All Details</h2>

                            <label>
                                Location:
                                
                                <select name="location" value={formData.location} onChange={handleChange}>
                                    <option value="">Select Location</option>
                                    <option value="durg">Durg</option>
                                    <option value="raipur">Raipur</option>
                                    <option value="pune">Pune</option>
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
                        
                        {rainfallData && <RainfallChart data={rainfallData} />}
                        {groundwaterData && <GroundwaterChart data={groundwaterData} />}
                        {groundwaterData && <GroundwaterStatus status={groundwaterData.status} />}
                    </>
                ) : (
                    <div className="results">
                        <h2>Assessment Results</h2>
                        <div className="result-card main-result">
                            <h3>Harvest Potential</h3>
                            <p>
                                Annual Harvestable Water:{' '}
                                <strong>{result.harvest_potential.annual_volume.toLocaleString()} liters</strong>
                            </p>
                            
                            {/* Add monthly rainfall chart */}
                            {rainfallData && (
                                <div className="chart-container">
                                    <h4>Monthly Harvest Distribution</h4>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <LineChart data={result.harvest_potential.monthly_volumes.map((volume, index) => ({
                                            month: rainfallData.monthly_labels[index],
                                            volume: volume
                                        }))}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="volume" stroke="#8884d8" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            )}
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
                    
                        <div className='w-full flex justify-center items-center'>
                            <button className='text-white rounded-md p-4 border-accent border mx-auto' onClick={() => setResult(null)}>Start Over</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Calculator;