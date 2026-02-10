import React from 'react'

function PrivacyConsent({ onAccept }) {
  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:9999}}>
      <div style={{background:'white',padding:'24px',borderRadius:'12px',maxWidth:'400px'}}>
        <h3>🔒 Privacy Notice</h3>
        <p>UniRoute uses AI to provide education guidance. We respect your privacy.</p>
        <ul style={{fontSize:'14px'}}>
          <li>No personal data stored</li>
          <li>Chat messages not linked to you</li>
          <li>GDPR compliant</li>
        </ul>
        <button onClick={onAccept} style={{width:'100%',padding:'12px',background:'#4F46E5',color:'white',border:'none',borderRadius:'8px',cursor:'pointer'}}>
          Accept & Continue
        </button>
      </div>
    </div>
  )
}

export default PrivacyConsent
