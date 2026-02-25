# SkyDrop AI - AI-Powered Dropshipping Automation Dashboard

SkyDrop AI is a comprehensive SaaS platform for dropshippers that leverages AI to automate market research, content creation, and competitor analysis.

## Features

- 🔍 **Viral Product Scanner**: Google Trends integration to find trending products
- 🏪 **Marketplace Scanner**: Compare prices across Amazon, Flipkart, and Myntra
- 💰 **Profit Calculator**: Calculate margins and ROI
- 📝 **AI Script Generator**: Create Hinglish video scripts for Reels/Shorts
- #️⃣ **Hashtag Generator**: India-focused hashtag suggestions
- 📊 **Competitor Analyzer**: Instagram competitor analysis
- ⚡ **Trend Alerts**: Real-time trend notifications
- 🎥 **Video Generator**: 9:16 video scene planning with FFmpeg commands

## Tech Stack

- **Backend**: FastAPI, SQLite, JWT Authentication
- **Frontend**: React, Vite, Tailwind CSS
- **APIs**: Google Trends (pytrends), Simulated marketplace data

## Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env
# Edit .env with your secret key

# Run the server
python main.py
