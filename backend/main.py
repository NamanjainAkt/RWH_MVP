from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
import requests
from typing import Dict, Any, Optional
from pydantic import BaseModel
import os

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# OpenWeatherMap API key - you'll need to get your own API key from openweathermap.org
# For production, use environment variables instead of hardcoding
OWM_API_KEY = os.getenv("OWM_API_KEY", "4965edceb05bcfcf83e8cb551b6a6ee1")  # Replace with your actual API key

# Get the absolute path to the directory containing this script
script_dir = os.path.dirname(__file__)

# Load data from JSON files using absolute paths
with open(os.path.join(script_dir, './data/rainfall_data.json')) as f:
    rainfall_data = json.load(f)

with open(os.path.join(script_dir, './data/groundwater_data.json')) as f:
    groundwater_data = json.load(f)

with open(os.path.join(script_dir, './data/cost_data.json')) as f:
    cost_data = json.load(f)

# Request models
class UserInputs(BaseModel):
    location: str
    roof_area: float
    roof_type: str
    residents: int
    water_usage: int
    budget: str
    soil_type: str

# API endpoints
@app.get("/")
async def root():
    return {"message": "RWH Assessment API"}

@app.get("/locations")
async def get_locations():
    return list(rainfall_data.keys())

# New endpoint for current weather data
@app.get("/weather/{location}")
async def get_weather(location: str):
    if OWM_API_KEY == "4965edceb05bcfcf83e8cb551b6a6ee1":
        raise HTTPException(status_code=500, detail="OpenWeatherMap API key is not set. Please set the OWM_API_KEY environment variable.")
    try:
        # Map your location names to city names for OpenWeatherMap
        city_mapping = {
            "delhi": "Delhi,IN",
            "mumbai": "Mumbai,IN",
            "bangalore": "Bangalore,IN"
            
        }
        
        city = city_mapping.get(location.lower(), location)
        
        # Make request to OpenWeatherMap API
        url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={OWM_API_KEY}&units=metric"
        response = requests.get(url)
        
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Failed to fetch weather data")
            
        data = response.json()
        
        # Extract relevant weather information
        weather_data = {
            "location": location,
            "temperature": data["main"]["temp"],
            "humidity": data["main"]["humidity"],
            "description": data["weather"][0]["description"],
            "icon": data["weather"][0]["icon"],
            "rainfall": data.get("rain", {}).get("1h", 0),  # Rainfall in last hour if available
            "wind_speed": data["wind"]["speed"],
            "timestamp": data["dt"]
        }
        
        return weather_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# New endpoint for historical rainfall data
@app.get("/rainfall/{location}")
async def get_rainfall_data(location: str):
    try:
        location = location.lower()
        if location not in rainfall_data:
            raise HTTPException(status_code=404, detail=f"No data available for {location}")
            
        # Return the rainfall data for the specified location
        return {
            "location": location,
            "annual_average": rainfall_data[location]["annual_average"],
            "monthly_distribution": rainfall_data[location]["monthly_distribution"],
            "monthly_labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# New endpoint for groundwater status
@app.get("/groundwater/{location}")
async def get_groundwater_status(location: str):
    try:
        location = location.lower()
        if location not in groundwater_data:
            raise HTTPException(status_code=404, detail=f"No data available for {location}")
            
        # Return the groundwater data for the specified location
        return {
            "location": location,
            "current_level": groundwater_data[location]["current_level"],
            "historical_levels": groundwater_data[location]["historical_levels"],
            "status": groundwater_data[location]["status"],
            "years": list(range(2018, 2023))  # Last 5 years for historical data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/assess")
async def assess_rwh(inputs: UserInputs):
    # Simplified calculations
    location = inputs.location.lower()
    
    # Get rainfall data
    rainfall = rainfall_data.get(location, rainfall_data["delhi"])
    
    # Calculate harvestable water
    runoff_coefficients = {"concrete": 0.85, "tile": 0.75, "metal": 0.90}
    runoff_coeff = runoff_coefficients.get(inputs.roof_type, 0.8)
    
    # CRITICAL FIX: Multiply by 1000 to convert cubic meters to liters
    annual_volume = (
        inputs.roof_area * 0.092903 *  # sq ft to sq m
        (rainfall["annual_average"] / 1000) *  # mm to meters
        runoff_coeff *
        0.90 *  # Collection efficiency
        1000  # CONVERSION: cubic meters to liters ← THIS WAS MISSING
    )
    
    # Get groundwater data
    groundwater = groundwater_data.get(location, groundwater_data["delhi"])
    
    # Get cost data
    cost = cost_data.get(location, cost_data["delhi"])
    
    # Improved structure recommendation based on roof area and volume
    if annual_volume < 100000:  # Less than 100 KL
        structure_type = "recharge_pit"
        recommended_size = max(5, round(annual_volume * 0.002))  # 0.2% of annual volume
    else:
        structure_type = "recharge_trench"
        recommended_size = max(10, round(annual_volume * 0.0015))  # 0.15% of annual volume
    
    # More realistic cost estimation
    base_cost = 15000 + (annual_volume * 0.15)  # More realistic base cost
    installation_cost = base_cost * cost["material_multiplier"]
    
    # Realistic water savings calculation
    # Using average of municipal and tanker water costs
    water_cost_per_liter = 0.08  # More realistic average cost
    annual_savings = annual_volume * water_cost_per_liter
    
    # Ensure payback period is reasonable
    payback_period = round(installation_cost / annual_savings, 1) if annual_savings > 0 else 0
    
    return {
        "harvest_potential": {
            "annual_volume": round(annual_volume, 2),
            "monthly_volumes": [round((annual_volume * (rainfall["monthly_distribution"][i] / rainfall["annual_average"])), 2) 
                               for i in range(12)],
        },
        "structure_design": {
            "type": structure_type,
            "recommended_size": f"{recommended_size}KL"
        },
        "cost_benefit": {
            "installation_cost": round(installation_cost, 2),
            "annual_savings": round(annual_savings, 2),
            "payback_period": payback_period
        },
        "groundwater_data": groundwater
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)