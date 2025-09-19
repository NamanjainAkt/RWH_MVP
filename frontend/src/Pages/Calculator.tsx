// App.tsx
import { useState, ChangeEvent, FormEvent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Header from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import './Calculator.css';

const API_BASE_URL = 'https://rwh-mvp.onrender.com';
// const API_BASE_URL = 'http://localhost:8000';

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
    const { t } = useLanguage();
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
            const response = await fetch(`${API_BASE_URL}/weather/${location}`);
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
            const response = await fetch(`${API_BASE_URL}/rainfall/${location}`);
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
            const response = await fetch(`${API_BASE_URL}/groundwater/${location}`);
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
            const response = await fetch(`${API_BASE_URL}/assess`, {
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
            alert(t('calculationFailed'));
        } finally {
            setLoading(false);
        }
    };

    // LiveWeatherCard component
    const LiveWeatherCard = ({ data }: { data: WeatherData }) => {
        return (
            <div className="weather-card">
                <h3>{t('currentWeatherIn')} {data.location}</h3>
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
                    <p>{t('humidity')}: {data.humidity}%</p>
                    <p>{t('wind')}: {data.wind_speed} m/s</p>
                    <p>{t('rainfall')}: {data.rainfall} mm</p>
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
                <h3>{t('monthlyRainfallDistribution')}</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis label={{ value: t('rainfallMm'), angle: -90, position: 'insideLeft' }} />
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
                <h3>{t('groundwaterLevels')}</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis label={{ value: t('depthMeters'), angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="level" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    };


    return (
        <>
            <Header />
            <div className="App mt-20">
                <header className="App-header">
                    <h1>{t('rainfallAssessment')}</h1>
                </header>

            <div className="container">
                {!result ? (
                    <>
                        {weatherData && <LiveWeatherCard data={weatherData} />}
                        
                        <form onSubmit={handleSubmit} className="form">
                            <h2>{t('enterAllDetails')}</h2>

                            <label>
                                {t('location')}:
                                
                                <select name="location" value={formData.location} onChange={handleChange}>
                                    <option value="">{t('selectLocation')}</option>
                                    <option value="durg">Durg</option>
                                    <option value="raipur">Raipur</option>
                                    <option value="pune">Pune</option>
                                    <option value="delhi">Delhi</option>
                                    <option value="mumbai">Mumbai</option>
                                    <option value="bangalore">Bangalore</option>
                                </select>
                            </label>

                            <label>

                                {t('roofArea')}:
                                
                                <input
                                    type="number"
                                    name="roof_area"
                                    value={formData.roof_area}
                                    onChange={handleChange}
                                />
                            </label>

                            <label>
                                {t('roofType')}:
                                <select name="roof_type" value={formData.roof_type} onChange={handleChange}>
                                    <option value="concrete">{t('concrete')}</option>
                                    <option value="tile">{t('tile')}</option>
                                    <option value="metal">{t('metal')}</option>
                                </select>
                            </label>

                            <label>
                                {t('residents')}:
                                <input
                                    type="number"
                                    name="residents"
                                    value={formData.residents}
                                    onChange={handleChange}
                                />
                            </label>

                            <label>
                                {t('waterUsage')}:
                                <input
                                    type="number"
                                    name="water_usage"
                                    value={formData.water_usage}
                                    onChange={handleChange}
                                />
                            </label>

                            <label>
                                {t('soilType')}:
                                <select name="soil_type" value={formData.soil_type} onChange={handleChange}>
                                    <option value="sandy">{t('sandy')}</option>
                                    <option value="loamy">{t('loamy')}</option>
                                    <option value="clayey">{t('clayey')}</option>
                                </select>
                            </label>

                            <label>
                                {t('budget')}:
                                <select name="budget" value={formData.budget} onChange={handleChange}>
                                    <option value="low">{t('low')}</option>
                                    <option value="medium">{t('medium')}</option>
                                    <option value="high">{t('high')}</option>
                                </select>
                            </label>

                            <button className='text-white rounded-md p-4 border-accent border' type="submit" disabled={loading}>
                                {loading ? t('calculating') : t('getAssessment')}
                            </button>
                        </form>
                        
                        {rainfallData && <RainfallChart data={rainfallData} />}
                        {groundwaterData && <GroundwaterChart data={groundwaterData} />}
                    
                    </>
                ) : (
                    <div className="results">
                        <h2>{t('assessmentResults')}</h2>
                        <div className="result-card main-result">
                            <h3>{t('harvestPotential')}</h3>
                            <p>
                                {t('annualHarvestableWater')}:{' '}
                                <strong>{result.harvest_potential.annual_volume.toLocaleString()} {t('liters')}</strong>
                            </p>
                            
                            {/* Add monthly rainfall chart */}
                            {rainfallData && (
                                <div className="chart-container">
                                    <h4>{t('monthlyHarvestDistribution')}</h4>
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
                            <h3>{t('recommendedStructure')}</h3>
                            <p>
                                {t('type')}: <strong>{result.structure_design.type}</strong>
                            </p>
                            <p>
                                {t('size')}: <strong>{result.structure_design.recommended_size}</strong>
                            </p>
                        </div>
                    
                        <div className="result-card">
                            <h3>{t('costBenefitAnalysisTitle')}</h3>
                            <p>
                                {t('installationCost')}: <strong>₹{result.cost_benefit.installation_cost.toLocaleString()}</strong>
                            </p>
                            <p>
                                {t('annualSavings')}: <strong>₹{result.cost_benefit.annual_savings.toLocaleString()}</strong>
                            </p>
                            <p>
                                {t('paybackPeriod')}: <strong>{result.cost_benefit.payback_period} {t('years')}</strong>
                            </p>
                        </div>
                    
                        <div className='w-full flex justify-center items-center'>
                            <button className='text-white rounded-md p-4 border-accent border mx-auto' onClick={() => setResult(null)}>{t('startOver')}</button>
                        </div>
                    </div>
                )}
            </div>
            </div>
        </>
    );
}

export default Calculator;