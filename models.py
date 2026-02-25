from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    tier = Column(String, default="free")  # free, pro, agency
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class TrendAlert(Base):
    __tablename__ = "trend_alerts"
    
    id = Column(Integer, primary_key=True, index=True)
    keyword = Column(String, index=True)
    category = Column(String)
    viral_score = Column(Float)
    competition_score = Column(Float)
    detected_at = Column(DateTime, default=datetime.datetime.utcnow)
    is_notified = Column(Boolean, default=False)

class ScanHistory(Base):
    __tablename__ = "scan_history"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    scan_type = Column(String)
    keyword = Column(String)
    result = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
