import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function Admin(){
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
  
  const approve = async (id) => {
    try {
  const r = await axios.post(`/api/approve/${id}`)
      alert('Project approved successfully! Transaction hash: ' + (r.data.tx?.txHash || r.data.project?.mock_tx_hash))
      fetchList()
    } catch (err) {
      alert('Error approving project: ' + err.message)
    }
  }
  
  return (
    <>
      <div className="welcome-header">
        <h1 className="page-title">Admin Dashboard</h1>
        <div className="blockchain-badge">
          <span className="blockchain-badge-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </span>
          Admin Controls
        </div>
      </div>
      
      <div className="card" style={{marginBottom: '24px'}}>
        <h3 style={{margin: '0 0 16px', fontSize: '16px'}}>Project Approval</h3>
        <p style={{color: '#64748b', margin: '0 0 16px'}}>
          Review and approve projects that have passed the AI verification stage. Approved projects will be added to the blockchain and tokens will be issued.
        </p>
        
        <div style={{display: 'flex', gap: '16px'}}>
          <div style={{
            background: '#f0fdf4', 
            padding: '12px', 
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            color: '#166534'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 11 12 14 22 4"></polyline>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
            </svg>
            <span>AI Verification: {projects.filter(p => p.ai_passed).length} Projects Passed</span>
          </div>
          
          <div style={{
            background: '#f0f9ff', 
            padding: '12px', 
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            color: '#0369a1'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>
            <span>Pending Approval: {projects.filter(p => p.status === 'Pending').length} Projects</span>
          </div>
        </div>
      </div>
      
      <div style={{display: 'grid', gap: '16px'}}>
        {projects.length === 0 && 
          <div className="card" style={{padding: '32px', textAlign: 'center', color: '#64748b'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{marginBottom: '16px', opacity: 0.5}}>
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <path d="M21 12H3M12 3v18"></path>
            </svg>
            <h3 style={{marginBottom: '8px', fontWeight: 500}}>No projects to review</h3>
            <p style={{maxWidth: '400px', margin: '0 auto'}}>
              Projects submitted by NGOs will appear here for approval
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
              
              <div>
                {p.status === 'Pending' ? (
                  <button 
                    onClick={() => approve(p.id)}
                    style={{
                      background: p.ai_passed ? '#166534' : '#d97706',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '10px 16px'
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    Approve Project
                  </button>
                ) : (
                  <div style={{
                    background: '#f0fdf4',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    color: '#166534',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Approved
                  </div>
                )}
              </div>
            </div>
            
            {p.mock_tx_hash && (
              <div style={{
                marginTop: '16px',
                padding: '12px',
                background: '#f8fafc',
                borderRadius: '6px',
                fontSize: '13px',
                fontFamily: 'monospace'
              }}>
                <div style={{color: '#64748b', marginBottom: '4px'}}>Transaction Hash:</div>
                <div style={{color: '#0369a1'}}>{p.mock_tx_hash}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
