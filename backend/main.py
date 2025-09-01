from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from typing import Dict, Any
from pydantic import BaseModel

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load data from JSON files
with open('../data/rainfall_data.json') as f:
    rainfall_data = json.load(f)

with open('../data/groundwater_data.json') as f:
    groundwater_data = json.load(f)

with open('../data/cost_data.json') as f:
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