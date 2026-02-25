import random
import httpx
from pytrends.request import TrendReq
from datetime import datetime, timedelta
import json
import asyncio

class ViralScanner:
    def __init__(self):
        self.pytrends = TrendReq(hl='en-US', tz=360)
    
    async def scan_viral_products(self):
        """Scan Google Trends for viral products"""
        categories = ['fashion', 'beauty', 'electronics', 'home', 'toys']
        trending_keywords = []
        
        for category in categories:
            try:
                self.pytrends.build_payload(kw_list=[category], timeframe='now 1-d')
                data = self.pytrends.interest_over_time()
                
                if not data.empty:
                    # Simulate getting related queries
                    related = self.pytrends.related_queries()
                    if related and category in related:
                        top_queries = related[category]['top']
                        if top_queries is not None:
                            for _, row in top_queries.head(5).iterrows():
                                keyword = row['query']
                                viral_score = random.uniform(65, 98)
                                trending_keywords.append({
                                    "keyword": keyword,
                                    "category": category,
                                    "viral_score": round(viral_score, 2),
                                    "competition_score": round(random.uniform(20, 85), 2),
                                    "margin_score": round(random.uniform(40, 95), 2),
                                    "opportunity_score": round(random.uniform(50, 98), 2)
                                })
            except Exception as e:
                print(f"Error scanning {category}: {e}")
                continue
        
        return trending_keywords[:20]  # Return top 20

class MarketplaceScanner:
    async def scan_marketplace(self, product_name):
        """Simulate marketplace scanning"""
        # Simulate different prices across marketplaces
        amazon_price = random.uniform(499, 4999)
        flipkart_price = amazon_price * random.uniform(0.85, 1.15)
        myntra_price = amazon_price * random.uniform(0.80, 1.20)
        
        price_gap = abs(amazon_price - flipkart_price)
        opportunity_score = min(100, (price_gap / amazon_price) * 200)
        
        return {
            "amazon": {
                "price": round(amazon_price, 2),
                "rating": round(random.uniform(3.5, 5.0), 1),
                "reviews": random.randint(50, 5000),
                "availability": random.choice(["In Stock", "Limited Stock", "Pre-order"])
            },
            "flipkart": {
                "price": round(flipkart_price, 2),
                "rating": round(random.uniform(3.5, 5.0), 1),
                "reviews": random.randint(20, 3000),
                "availability": random.choice(["In Stock", "Limited Stock", "Out of Stock"])
            },
            "myntra": {
                "price": round(myntra_price, 2),
                "rating": round(random.uniform(3.5, 5.0), 1),
                "reviews": random.randint(10, 2000),
                "availability": random.choice(["In Stock", "Limited Stock"])
            },
            "price_gap_opportunity_score": round(opportunity_score, 2)
        }

class ProfitCalculator:
    def calculate_profit(self, product_cost, selling_price, shipping_cost=50, ads_cost=200):
        """Calculate profit metrics"""
        profit_per_sale = selling_price - product_cost - shipping_cost - ads_cost
        break_even_roas = (product_cost + shipping_cost) / selling_price
        
        return {
            "profit_per_sale": round(profit_per_sale, 2),
            "break_even_roas": round(break_even_roas, 2),
            "profit_100_orders": round(profit_per_sale * 100, 2),
            "projection_1000_orders": round(profit_per_sale * 1000, 2)
        }

class ScriptGenerator:
    def generate_script(self, product_name, product_category, target_audience):
        """Generate Hinglish video scripts"""
        hooks = [
            f"{product_name} ki crazy demand dekhni hai? 😱",
            f"Is {product_category} ne to maza kara diya! 🔥",
            f"Stop! {product_name} ka ye secret koi nahi batayega 🤫",
            f"Ye {product_category} dekh ke ruk jaaoge! 👀",
            f"₹500 mein ye mil raha hai?! Unbelievable! 💫"
        ]
        
        problems = [
            f"Market mein itne options hain, confuse ho jao? 🤔",
            f"Online shopping mein quality ka tension hota hai na?",
            f"Budget mein best {product_category} dhundna mushkil hai?",
            f"Duplicate products se pareshan ho gaye?",
            f"Reviews padh ke bhi confuse ho jate ho?"
        ]
        
        solutions = [
            f"Introducing {product_name} - jo aapki life easy karega! ⚡",
            f"Ye {product_name} hai hi kamaal ka! Quality bhi top, price bhi budget friendly!",
            f"100% original {product_name} with warranty! Ab tension free shopping!",
            f"Ye {product_name} to game changer hai yaar! Must try!",
            f"Finally {product_name} launch hua hai India mein!"
        ]
        
        social_proofs = [
            f"10,000+ happy customers ⭐⭐⭐⭐⭐",
            f"98% customers ne diya 5 star rating!",
            f"Viral ho raha hai Instagram pe! 1M+ views!",
            f"Influencers bhi use kar rahe hai ye!",
            f"Last week 5000+ orders ship kiye!"
        ]
        
        ctas = [
            f"Link in bio! Offer limited time only! ⏰",
            f"Abhi order karo, 50% off! Link in description! 🏃",
            f"DM me 'PRICE' for details!",
            f"Click link in bio, use code SKYDROP for extra discount!",
            f"Flash sale! First 100 customers ko free shipping!"
        ]
        
        return {
            "hook": random.choice(hooks),
            "problem": random.choice(problems),
            "solution": random.choice(solutions),
            "social_proof": random.choice(social_proofs),
            "cta": random.choice(ctas),
            "full_script": f"{random.choice(hooks)}\n\n{random.choice(problems)}\n\n{random.choice(solutions)}\n\n{random.choice(social_proofs)}\n\n{random.choice(ctas)}"
        }

class HashtagGenerator:
    def generate_hashtags(self, product_name, category):
        """Generate India-focused hashtags"""
        base_tags = [
            "#viral", "#trending", "#explorepage", "#fyp", "#reels",
            "#instagram", "#shopping", "#onlineshopping", "#deals", "#discount"
        ]
        
        india_tags = [
            "#madeinindia", "#indianshopper", "#india", "#desi", "#indianmarket",
            "#localbazaar", "#indianbusiness", "#startupindia", "#vocalforlocal", "#indianecom"
        ]
        
        category_tags = {
            "fashion": ["#fashion", "#style", "#ootd", "#fashionista", "#streetstyle"],
            "beauty": ["#beauty", "#skincare", "#makeup", "#glowup", "#selfcare"],
            "electronics": ["#tech", "#gadgets", "#electronics", "#smartphone", "#techindia"],
            "home": ["#homedecor", "#interior", "#home", "#decor", "#homestyle"],
            "toys": ["#toys", "#kids", "#gifts", "#playtime", "#children"]
        }
        
        product_tags = [
            f"#{product_name.replace(' ', '')}",
            f"#{product_name.lower().replace(' ', '_')}",
            f"#{category}lover",
            f"#{category}india",
            f"#{category}gram"
        ]
        
        all_tags = base_tags + india_tags + category_tags.get(category, []) + product_tags
        random.shuffle(all_tags)
        
        return {
            "hashtags": all_tags[:20],
            "formatted": " ".join(all_tags[:20])
        }

class CompetitorAnalyzer:
    def analyze_competitor(self, instagram_handle):
        """Analyze competitor Instagram account"""
        # Simulate competitor analysis
        engagement_rate = round(random.uniform(1.5, 8.5), 2)
        estimated_views = random.randint(5000, 500000)
        
        content_types = ["Reels", "Carousel Posts", "Static Images", "Stories", "IGTV"]
        best_content = random.choice(content_types)
        
        suggestions = [
            "Post more Reels - high engagement trend",
            "Collaborate with micro-influencers in your niche",
            "Use more trending audio in videos",
            "Post consistently at 7 PM IST for maximum reach",
            "Add more user-generated content",
            "Run Instagram polls and Q&A for better engagement",
            "Focus on educational content about products",
            "Use local language captions for better connect"
        ]
        
        return {
            "engagement_rate": engagement_rate,
            "estimated_views": estimated_views,
            "best_content_type": best_content,
            "growth_suggestion": random.choice(suggestions)
        }

class VideoGenerator:
    def generate_video_plan(self, product_name, category, duration=30):
        """Generate video scene breakdown for 9:16 format"""
        scenes = []
        current_time = 0
        
        # Intro scene (0-3 seconds)
        scenes.append({
            "time": f"{current_time}-{current_time+3}s",
            "duration": 3,
            "scene": "Hook shot - Product closeup with dramatic zoom",
            "audio": "Trending bgm + 'Ye dekhlo jaldi!'",
            "text_overlay": product_name.upper(),
            "visual_style": "Fast zoom in, bright colors"
        })
        current_time += 3
        
        # Problem scene (3-8 seconds)
        scenes.append({
            "time": f"{current_time}-{current_time+5}s",
            "duration": 5,
            "scene": "Person looking confused, then discovering product",
            "audio": "Sound effect + 'Confused? Ye lo solution'",
            "text_overlay": "Problem Solved!",
            "visual_style": "Split screen showing before/after"
        })
        current_time += 5
        
        # Product features (8-18 seconds)
        scenes.append({
            "time": f"{current_time}-{current_time+10}s",
            "duration": 10,
            "scene": f"3-4 quick shots showing {category} features",
            "audio": "Upbeat music + feature voiceover",
            "text_overlay": "🔥 Features 🔥",
            "visual_style": "Quick cuts, zoom effects"
        })
        current_time += 10
        
        # Social proof (18-23 seconds)
        scenes.append({
            "time": f"{current_time}-{current_time+5}s",
            "duration": 5,
            "scene": "Reviews, ratings, happy customers collage",
            "audio": "Customer testimonial audio",
            "text_overlay": "⭐⭐⭐⭐⭐ 10k+ Reviews",
            "visual_style": "Photo grid with animations"
        })
        current_time += 5
        
        # CTA and price (23-30 seconds)
        scenes.append({
            "time": f"{current_time}-{duration}s",
            "duration": duration - current_time,
            "scene": "Product display with price and link",
            "audio": "Call to action + 'Link in bio!'",
            "text_overlay": "Limited Offer! Link in Bio ⬆️",
            "visual_style": "Static shot with animated arrows pointing to link"
        })
        
        # FFmpeg command simulation
        ffmpeg_command = f"""
        ffmpeg -i background_video.mp4 
               -i product_shot1.png -i product_shot2.png 
               -filter_complex "[0:v]scale=1080:1920[bg];
                               [1:v]scale=540:960[img1];
                               [2:v]scale=540:960[img2];
                               [bg][img1]overlay=270:480[bg1];
                               [bg1][img2]overlay=810:480" 
               -c:a copy output_video.mp4
        """
        
        return {
            "video_script": self.generate_script(product_name, category),
            "scene_breakdown": scenes,
            "layout_plan": {
                "aspect_ratio": "9:16",
                "resolution": "1080x1920",
                "safe_zone": "Center 80% area",
                "text_safe_area": "Top 20% and Bottom 20%"
            },
            "ffmpeg_structure": ffmpeg_command.strip()
        }
    
    def generate_script(self, product_name, category):
        """Helper to generate script"""
        return f"""
        INTRO: "{product_name} ki crazy demand! 😱"
        
        SCENE 1: Problem introduction
        "Shopping mein pareshani? Fake products? High price?"
        
        SCENE 2: Solution
        "Try karo ye amazing {category}!"
        
        SCENE 3: Features
        "Quality check ✓ Best price ✓ Fast shipping ✓"
        
        SCENE 4: Social Proof
        "Lakhon customers ka bharosa!"
        
        OUTRO: "Link in bio! Order now! 🚀"
        """

class TrendAlertService:
    def __init__(self):
        self.pytrends = TrendReq(hl='en-US', tz=360)
        self.scanner = ViralScanner()
    
    async def check_trends(self):
        """Background task to check trends every 10 minutes"""
        trends = await self.scanner.scan_viral_products()
        return trends
