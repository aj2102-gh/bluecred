import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function Projects(){
  const [projects, setProjects] = useState([])
  useEffect(() => fetchList(), [])
  
  const fetchList = async () => {
    try {
  const r = await axios.get('/api/projects')
      setProjects(r.data)
    } catch (err) {
      console.error("Error fetching projects:", err)
    }
  }
  
  return (
    <>
      <div className="welcome-header">
        <h1 className="page-title">All Projects</h1>
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
      
      <div style={{display:'grid', gap:16, marginTop:24}}>
        {projects.length === 0 && 
          <div className="card" style={{padding: '32px', textAlign: 'center', color: '#64748b'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{marginBottom: '16px', opacity: 0.5}}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <h3 style={{marginBottom: '8px', fontWeight: 500}}>No projects yet</h3>
            <p style={{maxWidth: '400px', margin: '0 auto'}}>
              Start by submitting a new project from the Submit Project section
            </p>
          </div>
        }
        
        {projects.map(p => (
          <div key={p.id} className="card" style={{padding: '20px'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems: 'flex-start'}}>
              <div style={{flex: 1}}>
                <div style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                  <h3 style={{fontWeight: 600, margin: 0, fontSize: '18px'}}>{p.title}</h3>
                  <span style={{
                    marginLeft: '12px', 
                    fontSize: '12px', 
                    padding: '4px 8px', 
                    borderRadius: '4px',
                    background: p.status === 'Verified' ? '#ecfdf5' : '#fff8f1',
                    color: p.status === 'Verified' ? '#166534' : '#9a3412'
                  }}>
                    {p.status}
                  </span>
                </div>
                
                <div className="small" style={{marginBottom: '4px'}}>
                  <strong>NGO:</strong> {p.ngo_name}
                </div>
                
                <div style={{display: 'flex', gap: '16px', marginTop: '12px'}}>
                  <div className="small" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: p.ai_passed ? '#f0fdf4' : '#fef2f2',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    color: p.ai_passed ? '#166534' : '#b91c1c'
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <path d="M21 12H3M12 3v18"></path>
                    </svg>
                    AI Verification: {p.ai_passed ? 'Passed' : 'Failed'} ({(p.ai_confidence * 100).toFixed(1)}%)
                  </div>
                  
                  <div className="small" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: '#f1f5f9',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    color: '#475569',
                    fontFamily: 'monospace'
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    </svg>
                    IPFS: {p.ipfs_cid?.substring(0, 16)}...
                  </div>
                </div>
              </div>
              
              <div style={{textAlign:'right'}}>
                {p.mock_tx_hash ? 
                  <div style={{
                    background: '#f0f9ff',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontFamily: 'monospace',
                    color: '#0369a1'
                  }}>
                    <div style={{fontSize: '11px', marginBottom: '4px', color: '#64748b'}}>Transaction Hash</div>
                    {p.mock_tx_hash.substring(0, 18)}...
                  </div> 
                  : 
                  <div style={{
                    background: '#f1f5f9',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    color: '#64748b'
                  }}>
                    Pending Transaction
                  </div>
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
