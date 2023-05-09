import React from 'react'

const FeedbackReport = () => {
  return (
    <main style={{position: 'fixed', right: 0, top: `calc(50% - 25px)`, transformOrigin: "bottom right", transform: "rotate(-90deg)"}}>
        <button className='btn btn-warning report-btn text-dark fw-bold'>Report Bug</button>
    </main>
  )
}

export default FeedbackReport