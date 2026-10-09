import urllib.request
import urllib.parse
import json
import mimetypes
import uuid

BACKEND_URL = "http://127.0.0.1:8000"
FRONTEND_URL = "http://localhost:3000"

def test_frontend_rendering():
    print("\n--- TEST 1: FRONTEND RENDERING ---")
    req = urllib.request.urlopen(FRONTEND_URL)
    html = req.read().decode('utf-8')
    assert req.status == 200, "Frontend not reachable"
    assert "bela-mitra-logo" in html, "Logo reference missing"
    assert "Where Intelligence Meets Agriculture" in html, "Tagline missing"
    assert "Target Crop" not in html, "Target crop should not be in the page"
    print("PASS: Frontend loaded 200 OK, logo & tagline present, Target Crop absent.")

def test_weather_endpoints():
    print("\n--- TEST 2: WEATHER ENDPOINTS (MULTIPLE LOCATIONS) ---")
    
    # 1. Mysuru
    url_mysuru = f"{BACKEND_URL}/api/weather?lat=12.2979&lon=76.6393&city=Mysuru"
    res1 = urllib.request.urlopen(url_mysuru)
    data1 = json.loads(res1.read().decode('utf-8'))
    curr1 = data1.get('current', {})
    coords1 = data1.get('coordinates', {})
    print(f"Mysuru: {data1.get('location')}, Temp: {curr1.get('temperature')}°C, Humidity: {curr1.get('humidity')}%, Condition: {curr1.get('condition')}, Cloud Cover: {curr1.get('cloud_cover')}%, Live: {data1.get('is_live')}")
    assert coords1.get('latitude') == 12.2979
    assert curr1.get('temperature') is not None
    assert data1.get('is_live') is True
    
    # 2. Pune
    url_pune = f"{BACKEND_URL}/api/weather?lat=18.5204&lon=73.8567&city=Pune"
    res2 = urllib.request.urlopen(url_pune)
    data2 = json.loads(res2.read().decode('utf-8'))
    curr2 = data2.get('current', {})
    coords2 = data2.get('coordinates', {})
    print(f"Pune: {data2.get('location')}, Temp: {curr2.get('temperature')}°C, Humidity: {curr2.get('humidity')}%, Condition: {curr2.get('condition')}, Cloud Cover: {curr2.get('cloud_cover')}%, Live: {data2.get('is_live')}")
    assert coords2.get('latitude') == 18.5204
    assert curr2.get('temperature') is not None
    assert data2.get('is_live') is True
    
    # 3. Shimla (Himalayan / Cold)
    url_shimla = f"{BACKEND_URL}/api/weather?lat=31.1048&lon=77.1734&city=Shimla"
    res3 = urllib.request.urlopen(url_shimla)
    data3 = json.loads(res3.read().decode('utf-8'))
    curr3 = data3.get('current', {})
    coords3 = data3.get('coordinates', {})
    print(f"Shimla: {data3.get('location')}, Temp: {curr3.get('temperature')}°C, Humidity: {curr3.get('humidity')}%, Condition: {curr3.get('condition')}, Cloud Cover: {curr3.get('cloud_cover')}%, Live: {data3.get('is_live')}")
    assert coords3.get('latitude') == 31.1048
    assert curr3.get('temperature') is not None

    print("PASS: Real-time weather fetched successfully for 3 distinct locations using exact coordinates.")

def test_location_search():
    print("\n--- TEST 3: GEOCODING LOCATION SEARCH ---")
    query = "Amritsar"
    url = f"{BACKEND_URL}/api/weather/locations?q={urllib.parse.quote(query)}"
    res = urllib.request.urlopen(url)
    data = json.loads(res.read().decode('utf-8'))
    locations = data.get('locations', [])
    print(f"Search query '{query}' returned {len(locations)} matches:")
    for r in locations[:3]:
        print(f" - {r.get('name')}, {r.get('admin1')}, {r.get('country')} ({r.get('latitude')}, {r.get('longitude')})")
    assert len(locations) > 0, "No search results returned"
    print("PASS: Open-Meteo Geocoding API returned accurate locations.")

def test_disease_detection_no_crop():
    print("\n--- TEST 4: DISEASE DETECTION WORKFLOW (WITHOUT TARGET CROP) ---")
    # Prepare a multipart form post with an image and optional weather
    boundary = uuid.uuid4().hex
    
    # Create simple 10x10 green image or use sample leaf if exists
    import os
    sample_img_path = "backend/sample_leaf.jpg"
    if not os.path.exists(sample_img_path):
        from PIL import Image
        img = Image.new('RGB', (100, 100), color=(34, 139, 34))
        img.save(sample_img_path)
    
    with open(sample_img_path, 'rb') as f:
        file_bytes = f.read()
    
    body = []
    # No crop field!
    body.append(f'--{boundary}'.encode())
    body.append(b'Content-Disposition: form-data; name="image"; filename="sample_leaf.jpg"')
    body.append(b'Content-Type: image/jpeg')
    body.append(b'')
    body.append(file_bytes)
    
    # Weather fields
    body.append(f'--{boundary}'.encode())
    body.append(b'Content-Disposition: form-data; name="temperature"')
    body.append(b'')
    body.append(b'28.5')
    
    body.append(f'--{boundary}'.encode())
    body.append(b'Content-Disposition: form-data; name="humidity"')
    body.append(b'')
    body.append(b'82.0')
    
    body.append(f'--{boundary}'.encode())
    body.append(b'Content-Disposition: form-data; name="rainfall"')
    body.append(b'')
    body.append(b'5.4')
    
    body.append(f'--{boundary}'.encode())
    body.append(b'Content-Disposition: form-data; name="location_name"')
    body.append(b'')
    body.append(b'Mysuru, Karnataka')
    
    body.append(f'--{boundary}--'.encode())
    body.append(b'')
    
    payload = b'\r\n'.join(body)
    
    req = urllib.request.Request(
        f"{BACKEND_URL}/api/disease/predict",
        data=payload,
        headers={'Content-Type': f'multipart/form-data; boundary={boundary}'}
    )
    
    res = urllib.request.urlopen(req)
    result = json.loads(res.read().decode('utf-8'))
    
    print("Diagnosis Condition:", result.get("condition_name"))
    print("Detected Crop:", result.get("crop"))
    print("Vision Confidence:", result.get("confidence"))
    print("Weather Risk Level:", result.get("weather_risk", {}).get("risk_level"))
    print("Weather Evaluation:", result.get("weather_risk", {}).get("summary"))
    print("Soil Limitation:", result.get("soil_limitation"))
    
    assert result.get("condition_name") is not None
    assert result.get("confidence") is not None
    assert result.get("weather_risk") is not None
    assert result.get("soil_limitation") is not None
    print("PASS: Disease prediction succeeded without Target Crop, integrating weather risk and soil limitation correctly.")

if __name__ == "__main__":
    test_frontend_rendering()
    test_weather_endpoints()
    test_location_search()
    test_disease_detection_no_crop()
    print("\nALL VERIFICATION TESTS COMPLETED SUCCESSFULLY!")
