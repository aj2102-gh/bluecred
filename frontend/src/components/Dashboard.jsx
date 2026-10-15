import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    verified: 0,
    pending: 0
  });
  
  useEffect(() => {
    async function fetchData() {
      try {
  const response = await axios.get('/api/projects');
        setProjects(response.data);
        
        // Calculate stats
        const total = response.data.length;
        const verified = response.data.filter(p => p.status === 'Verified').length;
        const pending = response.data.filter(p => p.status === 'Pending').length;
        
        setStats({
          total,
          verified,
          pending
        });
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }
    
    fetchData();
  }, []);

  return (
    <>
      <div className="welcome-header">
        <h1 className="page-title">Welcome to BlueCred</h1>
        <div className="blockchain-badge">
          <span className="blockchain-badge-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
          </span>
          Blockchain Verified
        </div>
      </div>
      
      <p style={{marginTop: '-16px', marginBottom: '24px', color: '#64748b'}}>
        Monitor, verify, and trade carbon credits with AI-powered transparency
      </p>

      <div className="stats-grid">
        <div className="card stats-card">
          <div className="stats-card-title">
            Total Credits
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
          </div>
          <div className="stats-card-value">{stats.total * 100 || 12847}</div>
          <div className="stats-card-change positive">+20.1% from last month</div>
        </div>
        
        <div className="card stats-card">
          <div className="stats-card-title">
            Verified Projects
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div className="stats-card-value">{stats.verified || 89}</div>
          <div className="stats-card-change positive">+12 new this month</div>
        </div>
        
        <div className="card stats-card">
          <div className="stats-card-title">
            Revenue Distribution
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <div className="stats-card-value">$2.4M</div>
          <div className="stats-card-change positive">+15.3% from last month</div>
        </div>
        
        <div className="card stats-card">
          <div className="stats-card-title">
            Active Communities
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div className="stats-card-value">156</div>
          <div className="stats-card-change positive">+8 new partnerships</div>
        </div>
      </div>

      <div className="analytics-section">
        <h2 className="section-title">Platform Analytics</h2>
        <p className="section-description">Comprehensive data visualization showing revenue distribution, regional performance, and growth trends</p>
        
        <div className="card distribution-section">
          <div className="distribution-header">
            <div>
              <h3 className="distribution-title">
                <svg xmlns="http://www.w3.org/2000/svg" className="distribution-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="8 14 12 11 16 14"></polyline>
                  <line x1="12" y1="11" x2="12" y2="17"></line>
                  <line x1="12" y1="8" x2="12" y2="8"></line>
                </svg>
                Revenue Distribution (80/10/10 Split)
              </h3>
              <p className="distribution-subtitle">Platform revenue allocation across project developers, platform operations, and verification costs</p>
            </div>
          </div>
          
          <div className="chart-container">
            <div className="chart">
              {/* Simplified chart representation */}
              <div style={{width: '200px', height: '200px', borderRadius: '50%', background: 'conic-gradient(#818cf8 0% 80%, #38bdf8 80% 90%, #4ade80 90% 100%)', position: 'relative'}}>
                <div style={{position: 'absolute', width: '100px', height: '100px', borderRadius: '50%', background: 'white', top: '50px', left: '50px'}}></div>
              </div>
            </div>
            <div className="breakdown">
              <h4 style={{marginTop: 0}}>Revenue Breakdown</h4>
              
              <div className="breakdown-item">
                <div className="breakdown-label">Project Developers</div>
                <div className="breakdown-value">
                  $1,920,000
                  <span className="breakdown-percentage">80%</span>
                </div>
              </div>
              
              <div className="breakdown-item">
                <div className="breakdown-label">Platform Fee</div>
                <div className="breakdown-value">
                  $240,000
                  <span className="breakdown-percentage">10%</span>
                </div>
              </div>
              
              <div className="breakdown-item">
                <div className="breakdown-label">Verification Costs</div>
                <div className="breakdown-value">
                  $240,000
                  <span className="breakdown-percentage">10%</span>
                </div>
              </div>
              
              <div className="breakdown-total">
                <div>Total Revenue</div>
                <div>$2,400,000</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}