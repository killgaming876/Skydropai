from fastapi import FastAPI, Depends, HTTPException, status, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
import models
from database import engine, SessionLocal
from auth import (
    authenticate_user, create_access_token, get_password_hash,
    get_current_user, check_tier_access, get_db
)
from services import (
    ViralScanner, MarketplaceScanner, ProfitCalculator,
    ScriptGenerator, HashtagGenerator, CompetitorAnalyzer,
    VideoGenerator, TrendAlertService
)
from typing import Optional
import asyncio
from apscheduler.schedulers.background import BackgroundScheduler
import atexit

# Create tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="SkyDrop AI", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
viral_scanner = ViralScanner()
marketplace_scanner = MarketplaceScanner()
profit_calculator = ProfitCalculator()
script_generator = ScriptGenerator()
hashtag_generator = HashtagGenerator()
competitor_analyzer = CompetitorAnalyzer()
video_generator = VideoGenerator()
trend_service = TrendAlertService()

# Background scheduler for trend alerts
scheduler = BackgroundScheduler()
@scheduler.scheduled_job("interval", minutes=10)
def check_trends_job():
    """Background job to check trends"""
    asyncio.create_task(trend_service.check_trends())

scheduler.start()
atexit.register(lambda: scheduler.shutdown())

# Auth endpoints
@app.post("/api/register")
async def register(username: str, email: str, password: str, db: Session = Depends(get_db)):
    """Register new user"""
    db_user = db.query(models.User).filter(
        (models.User.username == username) | (models.User.email == email)
    ).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username or email already registered")
    
    hashed_password = get_password_hash(password)
    user = models.User(
        username=username,
        email=email,
        hashed_password=hashed_password,
        tier="free"
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    
    access_token = create_access_token(
        data={"sub": user.username},
        expires_delta=timedelta(minutes=30)
    )
    return {"access_token": access_token, "token_type": "bearer", "user": {"username": user.username, "tier": user.tier}}

@app.post("/api/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """Login endpoint"""
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(
        data={"sub": user.username},
        expires_delta=timedelta(minutes=30)
    )
    return {"access_token": access_token, "token_type": "bearer", "user": {"username": user.username, "tier": user.tier}}

@app.get("/api/user/me")
async def get_user_info(current_user: models.User = Depends(get_current_user)):
    """Get current user info"""
    return {"username": current_user.username, "email": current_user.email, "tier": current_user.tier}

# Feature endpoints
@app.get("/api/scan-viral")
async def scan_viral(current_user: models.User = Depends(get_current_user)):
    """Scan for viral products"""
    if not check_tier_access(current_user, "free"):
        raise HTTPException(status_code=403, detail="Upgrade required for this feature")
    trends = await viral_scanner.scan_viral_products()
    return trends

@app.post("/api/marketplace-scan")
async def marketplace_scan(data: dict, current_user: models.User = Depends(get_current_user)):
    """Scan marketplaces for product"""
    if not check_tier_access(current_user, "free"):
        raise HTTPException(status_code=403, detail="Upgrade required for this feature")
    result = await marketplace_scanner.scan_marketplace(data.get("product_name", ""))
    return result

@app.post("/api/profit-calc")
async def calculate_profit(data: dict, current_user: models.User = Depends(get_current_user)):
    """Calculate profit metrics"""
    if not check_tier_access(current_user, "free"):
        raise HTTPException(status_code=403, detail="Upgrade required for this feature")
    result = profit_calculator.calculate_profit(
        product_cost=data.get("product_cost", 0),
        selling_price=data.get("selling_price", 0),
        shipping_cost=data.get("shipping_cost", 50),
        ads_cost=data.get("ads_cost", 200)
    )
    return result

@app.post("/api/generate-script")
async def generate_script(data: dict, current_user: models.User = Depends(get_current_user)):
    """Generate Hinglish video script"""
    if not check_tier_access(current_user, "free"):
        raise HTTPException(status_code=403, detail="Upgrade required for this feature")
    result = script_generator.generate_script(
        product_name=data.get("product_name", ""),
        product_category=data.get("category", "general"),
        target_audience=data.get("audience", "general")
    )
    return result

@app.post("/api/generate-hashtags")
async def generate_hashtags(data: dict, current_user: models.User = Depends(get_current_user)):
    """Generate India-focused hashtags"""
    if not check_tier_access(current_user, "free"):
        raise HTTPException(status_code=403, detail="Upgrade required for this feature")
    result = hashtag_generator.generate_hashtags(
        product_name=data.get("product_name", ""),
        category=data.get("category", "general")
    )
    return result

@app.post("/api/competitor-analyze")
async def analyze_competitor(data: dict, current_user: models.User = Depends(get_current_user)):
    """Analyze competitor Instagram account"""
    if not check_tier_access(current_user, "pro"):
        raise HTTPException(status_code=403, detail="Pro feature - upgrade required")
    result = competitor_analyzer.analyze_competitor(data.get("instagram_handle", ""))
    return result

@app.post("/api/generate-video")
async def generate_video(data: dict, current_user: models.User = Depends(get_current_user)):
    """Generate video plan"""
    if not check_tier_access(current_user, "pro"):
        raise HTTPException(status_code=403, detail="Pro feature - upgrade required")
    result = video_generator.generate_video_plan(
        product_name=data.get("product_name", ""),
        category=data.get("category", "general"),
        duration=data.get("duration", 30)
    )
    return result

@app.get("/api/trend-alerts")
async def get_trend_alerts(current_user: models.User = Depends(get_current_user)):
    """Get trend alerts"""
    if not check_tier_access(current_user, "free"):
        raise HTTPException(status_code=403, detail="Upgrade required for this feature")
    trends = await trend_service.check_trends()
    return trends

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "version": "1.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
