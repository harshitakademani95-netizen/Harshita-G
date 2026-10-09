
import os
import base64
from io import BytesIO

from flask import Flask, request, jsonify
from groq import Groq
from dotenv import load_dotenv
from PIL import Image

load_dotenv()

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 10 * 1024 * 1024

def get_groq_client():
    api_key = os.environ.get("GROQ_API_KEY")
    if not api_key:
        return None
    return Groq(api_key=api_key)

client = get_groq_client()
if not client:
    print("\n" + "=" * 65)
    print("⚠️  NOTICE: GROQ_API_KEY is not set.")
    print("Please set your Groq API key in your .env file:")
    print("GROQ_API_KEY=gsk_your_api_key_here")
    print("Get a free key at https://console.groq.com/keys")
    print("=" * 65 + "\n")

@app.get("/")
def index():
    has_key = bool(os.environ.get("GROQ_API_KEY"))
    return jsonify({
        "status": "online",
        "service": "Groq Image Disease Analyzer",
        "groq_api_key_configured": has_key,
        "endpoint": "POST /analyze (send multipart/form-data with 'image')"
    })

@app.post("/analyze")
def analyze_image():
    uploaded = request.files.get("image")

    if not uploaded:
        return jsonify({"error": "Please upload an image"}), 400

    active_client = client or get_groq_client()
    if not active_client:
        return jsonify({
            "error": "GROQ_API_KEY is not configured. Please add GROQ_API_KEY to your .env file."
        }), 500

    try:
        image = Image.open(uploaded.stream)
        image.verify()

        uploaded.stream.seek(0)
        image = Image.open(uploaded.stream).convert("RGB")

        buffer = BytesIO()
        image.save(buffer, format="JPEG")
        encoded = base64.b64encode(
            buffer.getvalue()
        ).decode("utf-8")

        result = active_client.chat.completions.create(
            model="qwen/qwen3.6-27b",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "Analyze images for visible signs of disease. "
                        "Describe observable features, possible causes, "
                        "uncertainty, and appropriate next steps. "
                        "Do not claim a definitive diagnosis. "
                        "If the image is unsuitable, say so."
                    )
                },
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": (
                                "Analyze this image. Describe visible "
                                "symptoms and possible explanations. "
                                "If this is a plant, assess possible "
                                "plant diseases. If it is a human "
                                "medical image, recommend professional "
                                "assessment rather than diagnosing."
                            )
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": (
                                    "data:image/jpeg;base64,"
                                    + encoded
                                )
                            }
                        }
                    ]
                }
            ],
            temperature=0.2,
            max_completion_tokens=800
        )

        return jsonify({
            "analysis": result.choices[0].message.content
        })

    except Exception as error:
        app.logger.exception("Image analysis failed")
        return jsonify({
            "error": "Unable to analyze this image."
        }), 500


if __name__ == "__main__":
    app.run(debug=True)