import React from 'react';
import './Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <div className='footer'>
      <div className='footer-container'>
        <p className="copyright">
          Copyright &copy; 2027 by Karla Oshikawa, Inc. All rights reserved.
        </p>
        <div className='social-container'>
          <a href="https://www.linkedin.com/in/karlaoshikawa/" target="_blank">{ <ion-icon name="logo-linkedin"></ion-icon> }</a>
          <a href="https://github.com/karlaoshikawa" target="_blank">{ <ion-icon name="logo-github"></ion-icon> }</a>
        </div>
        </div>
        </div>
    );
  }
}

export default Footer;
