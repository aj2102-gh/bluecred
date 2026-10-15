import React, {useState} from 'react'
import axios from 'axios'

export default function Submit(){
  const [form,setForm] = useState({ngo_name:'',title:'',lat:'',lon:'',ngo_wallet:'',community_wallet:''})
  const [file,setFile] = useState(null)
  const [resp,setResp] = useState(null)
  const [loading,setLoading] = useState(false)

  const submit = async(e)=>{
    e.preventDefault();
    if(!form.ngo_name || !form.title || !file){ 
      alert('NGO name, title and image are required'); 
      return; 
    }
    setResp(null)
    setLoading(true)
    const fd = new FormData()
    Object.entries(form).forEach(([k,v])=>fd.append(k,v))
    fd.append('image', file)
    
    try{
  const r = await axios.post('/api/submit', fd, {
        // Let the browser set multipart/form-data boundary
        headers: { /* 'Content-Type' intentionally omitted */ },
        withCredentials: false,
        timeout: 20000,
      })
      setResp(r.data)
    }catch(err){
      const msg = err?.response?.data?.error || err?.message || 'Request failed'
      setResp({error: msg})
    }finally{ 
      setLoading(false) 
    }
  }

  return (
    <div>
      <div className="welcome-header">
        <h1 className="page-title">Submit New Project</h1>
        <div className="blockchain-badge">
          <span className="blockchain-badge-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
          </span>
          AI Verification Ready
        </div>
      </div>
      
      <div className="card" style={{maxWidth: '800px', margin: '24px 0'}}>
        <h2 style={{marginTop: 0, marginBottom: '20px', fontSize: '18px', color: '#1e293b'}}>Project Details</h2>
        
        <form onSubmit={submit}>
          <div style={{marginBottom: '16px'}}>
            <label className="small" style={{display: 'block', marginBottom: '4px', fontWeight: 500}}>NGO Name</label>
            <input 
              value={form.ngo_name} 
              onChange={e=>setForm({...form,ngo_name:e.target.value})}
              placeholder="Enter your organization name" 
              style={{padding: '10px 12px'}}
            />
          </div>
          
          <div style={{marginBottom: '16px'}}>
            <label className="small" style={{display: 'block', marginBottom: '4px', fontWeight: 500}}>Project Title</label>
            <input 
              value={form.title} 
              onChange={e=>setForm({...form,title:e.target.value})}
              placeholder="Enter a descriptive title" 
              style={{padding: '10px 12px'}}
            />
          </div>
          
          <div style={{display:'flex', gap:16, marginBottom: '16px'}}>
            <div style={{flex:1}}>
              <label className="small" style={{display: 'block', marginBottom: '4px', fontWeight: 500}}>Latitude</label>
              <input 
                value={form.lat} 
                onChange={e=>setForm({...form,lat:e.target.value})}
                placeholder="e.g. 34.052235" 
                style={{padding: '10px 12px'}}
              />
            </div>
            <div style={{flex:1}}>
              <label className="small" style={{display: 'block', marginBottom: '4px', fontWeight: 500}}>Longitude</label>
              <input 
                value={form.lon} 
                onChange={e=>setForm({...form,lon:e.target.value})}
                placeholder="e.g. -118.243683" 
                style={{padding: '10px 12px'}}
              />
            </div>
          </div>
          
          <div style={{marginBottom: '16px'}}>
            <label className="small" style={{display: 'block', marginBottom: '4px', fontWeight: 500}}>NGO Wallet Address</label>
            <input 
              value={form.ngo_wallet} 
              onChange={e=>setForm({...form,ngo_wallet:e.target.value})}
              placeholder="Enter NGO wallet address" 
              style={{padding: '10px 12px', fontFamily: 'monospace'}}
            />
          </div>
          
          <div style={{marginBottom: '24px'}}>
            <label className="small" style={{display: 'block', marginBottom: '4px', fontWeight: 500}}>Community Wallet Address</label>
            <input 
              value={form.community_wallet} 
              onChange={e=>setForm({...form,community_wallet:e.target.value})}
              placeholder="Enter community wallet address" 
              style={{padding: '10px 12px', fontFamily: 'monospace'}}
            />
          </div>
          
          <div style={{marginBottom: '24px'}}>
            <label className="small" style={{display: 'block', marginBottom: '8px', fontWeight: 500}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                Evidence Image
              </div>
            </label>
            <div style={{
              border: '1px dashed #cbd5e1', 
              borderRadius: '8px', 
              padding: '32px 16px',
              textAlign: 'center',
              backgroundColor: '#f8fafc'
            }}>
              {file ? (
                <div>
                  <div style={{fontSize: '14px', color: '#0ea5a4', marginBottom: '8px'}}>File selected: {file.name}</div>
                  <button 
                    type="button" 
                    onClick={() => setFile(null)}
                    style={{backgroundColor: '#f1f5f9', color: '#475569', padding: '6px 12px'}}
                  >
                    Change File
                  </button>
                </div>
              ) : (
                <div>
                  <div style={{marginBottom: '12px', color: '#64748b'}}>
                    Upload a geotagged image as evidence
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={e=>setFile(e.target.files[0])}
                    id="file-upload" 
                    style={{display: 'none'}}
                  />
                  <label htmlFor="file-upload" style={{
                    backgroundColor: '#f1f5f9',
                    color: '#1e293b',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'inline-block'
                  }}>
                    Select Image
                  </label>
                </div>
              )}
            </div>
          </div>
          
          <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '24px'}}>
            <button 
              type="submit" 
              style={{
                padding: '12px 24px', 
                fontSize: '15px', 
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
                    <line x1="12" y1="2" x2="12" y2="6"></line>
                    <line x1="12" y1="18" x2="12" y2="22"></line>
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                    <line x1="2" y1="12" x2="6" y2="12"></line>
                    <line x1="18" y1="12" x2="22" y2="12"></line>
                    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                  </svg>
                  Uploading & Verifying...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  Submit Project
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      
      {resp && (
        <div className="card" style={{maxWidth: '800px', margin: '24px 0'}}>
          <h3 style={{marginTop: 0, fontSize: '16px'}}>Project Submission Result</h3>
          {resp.error ? (
            <div style={{color: '#b91c1c', padding: '12px', background: '#fee2e2', borderRadius: '6px'}}>
              Error: {resp.error}
            </div>
          ) : (
            <div>
              <div style={{background: '#f0fdf4', padding: '16px', borderRadius: '6px', marginBottom: '16px'}}>
                <div style={{color: '#166534', fontWeight: 500, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px'}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  Project Submitted Successfully
                </div>
                <div style={{fontSize: '14px', color: '#0f766e'}}>
                  AI Verification: {resp.ai?.passed ? 'Passed' : 'Failed'} ({(resp.ai?.confidence * 100).toFixed(1)}% confidence)
                </div>
              </div>
              
              <div style={{fontSize: '14px', fontFamily: 'monospace', background: '#f1f5f9', padding: '12px', borderRadius: '6px', overflow: 'auto', maxHeight: '200px'}}>
                <pre style={{whiteSpace:'pre-wrap', margin: 0}}>{JSON.stringify(resp, null, 2)}</pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
