import React from 'react'
import "../App"
function Modal({ onClose ,children}) {
  return (

    <div className="backdrop" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="modal" tabIndex="-1" style={{ display: 'block', background: 'white' , maxWidth: '500px' , width:'100%'}}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
          
              <button onClick={onClose} type="button" className="btn-close" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {children}
            </div>
           
              <button onClick={onClose} type="button" className="btn btn-secondary">Close</button>
              
          </div>
        </div>
      </div>
    </div>

  )
}

export default Modal
