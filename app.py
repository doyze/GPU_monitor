from fastapi import FastAPI
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import GPUtil as GPU
import uvicorn
import os
import socket

app = FastAPI()

# Path to the React build directory
build_dir = os.path.join(os.path.dirname(__file__), "frontend", "build")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_realtime_gpu_info():
    try:
        gpus = GPU.getGPUs()
        gpu_data = []
        for gpu in gpus:
            gpu_data.append({
                'id': gpu.id,
                'name': gpu.name,
                'load_percent': f'{gpu.load*100:.2f}',
                'load_raw': gpu.load * 100,
                'memory_used': f'{gpu.memoryUsed:.2f}',
                'memory_total': f'{gpu.memoryTotal:.2f}',
                'memory_util_percent': f'{gpu.memoryUtil*100:.2f}',
                'memory_util_raw': gpu.memoryUtil * 100,
                'temperature': f'{gpu.temperature:.0f}'
            })
        return gpu_data
    except Exception as e:
        return [{'error': str(e)}]

@app.get("/api/gpu-info")
async def api_gpu_info():
    gpu_info = get_realtime_gpu_info()
    return JSONResponse(content={"gpus": gpu_info})

@app.get("/api/ip")
async def get_ip():
    hostname = socket.gethostname()
    ip_address = socket.gethostbyname(hostname)
    return JSONResponse(content={"ip": ip_address})

# Serve static files from the React build directory
app.mount("/static", StaticFiles(directory=os.path.join(build_dir, "static")), name="static")

@app.get("/{full_path:path}")
async def serve_react_app(full_path: str):
    # This catch-all route serves the React app's index.html
    # for any path that is not an API endpoint.
    return FileResponse(os.path.join(build_dir, "index.html"))

if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=5001)
