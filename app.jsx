import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import * as api from './api';

// Icons (simple SVG components)
const DashboardIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>;
const ScanIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const ChartIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const ScriptIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
const HashtagIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>;
const CompetitorIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const AlertIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;
const VideoIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const AccountIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form states
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' });
  
  // Feature data states
  const [viralData, setViralData] = useState([]);
  const [marketplaceData, setMarketplaceData] = useState(null);
  const [profitData, setProfitData] = useState(null);
  const [scriptData, setScriptData] = useState(null);
  const [hashtagData, setHashtagData] = useState(null);
  const [competitorData, setCompetitorData] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const [trendData, setTrendData] = useState([]);
  
  // Input states
  const [productName, setProductName] = useState('');
  const [productCost, setProductCost] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [category, setCategory] = useState('general');
  const [instagramHandle, setInstagramHandle] = useState('');
  const [scriptProduct, setScriptProduct] = useState('');
  const [scriptCategory, setScriptCategory] = useState('general');
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchUser();
    }
  }, []);
  
  const fetchUser = async () => {
    try {
      const userData = await api.getCurrentUser();
      setUser(userData);
    } catch (err) {
      console.error('Failed to fetch user', err);
      handleLogout();
    }
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await api.login(loginData.username, loginData.password);
      localStorage.setItem('token', data.access_token);
      setUser(data.user);
      setIsLoggedIn(true);
    } catch (err) {
      setError('Login failed. Check credentials.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await api.register(registerData.username, registerData.email, registerData.password);
      localStorage.setItem('token', data.access_token);
      setUser(data.user);
      setIsLoggedIn(true);
    } catch (err) {
      setError('Registration failed. Username or email may already exist.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
  };
  
  const handleScanViral = async () => {
    setLoading(true);
    try {
      const data = await api.scanViral();
      setViralData(data);
    } catch (err) {
      setError('Failed to scan viral products');
    } finally {
      setLoading(false);
    }
  };
  
  const handleMarketplaceScan = async () => {
    if (!productName) return;
    setLoading(true);
    try {
      const data = await api.scanMarketplace(productName);
      setMarketplaceData(data);
    } catch (err) {
      setError('Failed to scan marketplace');
    } finally {
      setLoading(false);
    }
  };
  
  const handleProfitCalc = async () => {
    if (!productCost || !sellingPrice) return;
    setLoading(true);
    try {
      const data = await api.calculateProfit({
        product_cost: parseFloat(productCost),
        selling_price: parseFloat(sellingPrice),
        shipping_cost: 50,
        ads_cost: 200
      });
      setProfitData(data);
    } catch (err) {
      setError('Failed to calculate profit');
    } finally {
      setLoading(false);
    }
  };
  
  const handleGenerateScript = async () => {
    if (!scriptProduct) return;
    setLoading(true);
    try {
      const data = await api.generateScript({
        product_name: scriptProduct,
        category: scriptCategory,
        audience: 'general'
      });
      setScriptData(data);
    } catch (err) {
      setError('Failed to generate script');
    } finally {
      setLoading(false);
    }
  };
  
  const handleGenerateHashtags = async () => {
    if (!productName) return;
    setLoading(true);
    try {
      const data = await api.generateHashtags({
        product_name: productName,
        category: category
      });
      setHashtagData(data);
    } catch (err) {
      setError('Failed to generate hashtags');
    } finally {
      setLoading(false);
    }
  };
  
  const handleAnalyzeCompetitor = async () => {
    if (!instagramHandle) return;
    setLoading(true);
    try {
      const data = await api.analyzeCompetitor(instagramHandle);
      setCompetitorData(data);
    } catch (err) {
      setError('Failed to analyze competitor');
    } finally {
      setLoading(false);
    }
  };
  
  const handleGenerateVideo = async () => {
    if (!productName) return;
    setLoading(true);
    try {
      const data = await api.generateVideo({
        product_name: productName,
        category: category,
        duration: 30
      });
      setVideoData(data);
    } catch (err) {
      setError('Failed to generate video plan');
    } finally {
      setLoading(false);
    }
  };
  
  const handleGetTrendAlerts = async () => {
    setLoading(true);
    try {
      const data = await api.getTrendAlerts();
      setTrendData(data);
    } catch (err) {
      setError('Failed to get trend alerts');
    } finally {
      setLoading(false);
    }
  };
  
  // Render login/register page
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
        <div className="glass-card w-full max-w-md p-8">
          <h1 className="text-3xl font-bold text-neon-primary mb-2 text-center">SkyDrop AI</h1>
          <p className="text-gray-400 text-center mb-8">AI-Powered Dropshipping Automation</p>
          
          <div className="mb-6">
            <div className="flex border-b border-white/10">
              <button 
                className={`flex-1 py-2 ${!error ? 'border-neon-primary text-neon-primary' : 'text-gray-400'}`}
                onClick={() => setError('login')}
              >
                Login
              </button>
              <button 
                className={`flex-1 py-2 ${error === 'register' ? 'border-neon-primary text-neon-primary' : 'text-gray-400'}`}
                onClick={() => setError('register')}
              >
                Register
              </button>
            </div>
          </div>
          
          {error === 'login' ? (
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Username"
                  className="cyber-input w-full"
                  value={loginData.username}
                  onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="cyber-input w-full"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  required
                />
                {error && error !== 'login' && error !== 'register' && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}
                <button type="submit" className="neon-button w-full" disabled={loading}>
                  {loading ? 'Loading...' : 'Login'}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Username"
                  className="cyber-input w-full"
                  value={registerData.username}
                  onChange={(e) => setRegisterData({...registerData, username: e.target.value})}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="cyber-input w-full"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="cyber-input w-full"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                  required
                />
                {error && error !== 'login' && error !== 'register' && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}
                <button type="submit" className="neon-button w-full" disabled={loading}>
                  {loading ? 'Loading...' : 'Register'}
                </button>
              </div>
            </form>
          )}
          
          <p className="text-xs text-gray-500 text-center mt-6">
            Free Tier: Basic features • Pro: $29/mo • Agency: $99/mo
          </p>
        </div>
      </div>
    );
  }
  
  // Main dashboard
  return (
    <div className="flex h-screen bg-dark-bg text-white">
      {/* Sidebar */}
      <div className="w-64 glass-card m-4 p-4 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neon-primary">SkyDrop AI</h1>
          <p className="text-xs text-gray-400">Welcome, {user?.username}</p>
          <p className="text-xs text-neon-primary mt-1">Tier: {user?.tier}</p>
        </div>
        
        <nav className="flex-1 space-y-2">
          <div className={`sidebar-item ${currentPage === 'dashboard' ? 'active' : ''}`} onClick={() => setCurrentPage('dashboard')}>
            <DashboardIcon /> Dashboard
          </div>
          <div className={`sidebar-item ${currentPage === 'viral' ? 'active' : ''}`} onClick={() => setCurrentPage('viral')}>
            <ScanIcon /> Viral Scanner
          </div>
          <div className={`sidebar-item ${currentPage === 'marketplace' ? 'active' : ''}`} onClick={() => setCurrentPage('marketplace')}>
            <ChartIcon /> Marketplace
          </div>
          <div className={`sidebar-item ${currentPage === 'profit' ? 'active' : ''}`} onClick={() => setCurrentPage('profit')}>
            <ChartIcon /> Profit Calc
          </div>
          <div className={`sidebar-item ${currentPage === 'script' ? 'active' : ''}`} onClick={() => setCurrentPage('script')}>
            <ScriptIcon /> Script Gen
          </div>
          <div className={`sidebar-item ${currentPage === 'hashtag' ? 'active' : ''}`} onClick={() => setCurrentPage('hashtag')}>
            <HashtagIcon /> Hashtags
          </div>
          <div className={`sidebar-item ${currentPage === 'competitor' ? 'active' : ''}`} onClick={() => setCurrentPage('competitor')}>
            <CompetitorIcon /> Competitor
          </div>
          <div className={`sidebar-item ${currentPage === 'trends' ? 'active' : ''}`} onClick={() => setCurrentPage('trends')}>
            <AlertIcon /> Trend Alerts
          </div>
          <div className={`sidebar-item ${currentPage === 'video' ? 'active' : ''}`} onClick={() => setCurrentPage('video')}>
            <VideoIcon /> Video Gen
          </div>
          <div className={`sidebar-item ${currentPage === 'account' ? 'active' : ''}`} onClick={() => setCurrentPage('account')}>
            <AccountIcon /> Account
          </div>
        </nav>
        
        <button onClick={handleLogout} className="neon-button mt-4">
          Logout
        </button>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 m-4 p-6 glass-card overflow-auto">
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-400 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        {/* Dashboard */}
        {currentPage === 'dashboard' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="glass-card p-4">
                <h3 className="text-neon-primary mb-2">Viral Score</h3>
                <p className="text-3xl font-bold">87%</p>
                <p className="text-sm text-gray-400">↑ 12% this week</p>
              </div>
              <div className="glass-card p-4">
                <h3 className="text-neon-primary mb-2">Opportunities</h3>
                <p className="text-3xl font-bold">24</p>
                <p className="text-sm text-gray-400">New products found</p>
              </div>
              <div className="glass-card p-4">
                <h3 className="text-neon-primary mb-2">Profit Potential</h3>
                <p className="text-3xl font-bold">₹45.2K</p>
                <p className="text-sm text-gray-400">Estimated monthly</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-card p-4">
                <h3 className="text-lg font-semibold mb-4">Trending Categories</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Fashion', value: 35 },
                        { name: 'Beauty', value: 25 },
                        { name: 'Electronics', value: 20 },
                        { name: 'Home', value: 20 }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#00E5FF"
                      dataKey="value"
                      label
                    >
                      <Cell fill="#00E5FF" />
                      <Cell fill="#00E5FF80" />
                      <Cell fill="#00E5FF60" />
                      <Cell fill="#00E5FF40" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="glass-card p-4">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Viral Scanner</span>
                    <span className="text-neon-primary">2 mins ago</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Profit Calculator</span>
                    <span className="text-neon-primary">15 mins ago</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Script Generated</span>
                    <span className="text-neon-primary">1 hour ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Viral Scanner */}
        {currentPage === 'viral' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Viral Product Scanner</h2>
            <button onClick={handleScanViral} className="neon-button mb-6" disabled={loading}>
              {loading ? 'Scanning...' : 'Start Scan'}
            </button>
            
            {viralData.length > 0 && (
              <div className="space-y-4">
                {viralData.map((item, index) => (
                  <div key={index} className="glass-card p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{item.keyword}</h3>
                        <p className="text-sm text-gray-400">Category: {item.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-neon-primary font-bold">Score: {item.opportunity_score}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 mt-4">
                      <div className="text-center">
                        <p className="text-xs text-gray-400">Viral</p>
                        <p className="text-neon-primary">{item.viral_score}%</p>
                      </div>
     
