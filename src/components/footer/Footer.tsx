import React from 'react'
import './footer.scss'

function Footer() {
  return (
    <div className='footer'>
      <span className='app-name'><span style={{ color: '#ffae00' }}>Co</span>n<span style={{ color: '#007ba8' }}>ne</span>c<span className='special-t' style={{ color: 'red' }}>T</span>or</span>
      <span id='footer-slogan'><span style={{ color: '#ffae00',paddingRight:'5px' }}>Simply</span><span style={{ color: '#ffae00' ,paddingRight:'5px'}}>Connecting</span><span style={{ color: '#ffae00' ,paddingRight:'5px'}}>People.</span> </span>
    </div>
  )
}

export default Footer
