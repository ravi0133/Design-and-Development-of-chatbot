import React, { useState } from 'react'

function TrustIndicator({ confidence, disclaimer }) {
  const [show, setShow] = useState(false)
  if (!confidence) return null
  
  return (
    <div style={{background:'#f5f5f5',borderRadius:'8px',padding:'8px',marginTop:'8px',fontSize:'13px'}}>
      <div onClick={() => setShow(!show)} style={{cursor:'pointer',display:'flex',justifyContent:'space-between'}}>
        <span>{confidence.icon} {confidence.level} confidence ({Math.round(confidence.score*100)}%)</span>
        <span>{show ? '▲' : '▼'}</span>
      </div>
      {show && (
        <div style={{marginTop:'8px',color:'#666'}}>
          <p>{confidence.explanation}</p>
          {disclaimer && <p style={{color:'#e65100',marginTop:'4px'}}>{disclaimer}</p>}
        </div>
      )}
    </div>
  )
}

export default TrustIndicator
