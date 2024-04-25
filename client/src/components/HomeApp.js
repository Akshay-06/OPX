import React from 'react'
import '../css/HomeApp.css'
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

// ..
AOS.init();

const HomeApp = () => {
  
  
  // Adjust the position of your parallax elements based on the scroll position
  
  return (
    <div className='app-home'>
      <div className="parallax-bg" >
        <p>Welcome to OPX: Out Patient Experience, where healthcare meets seamless convenience.</p>
      </div>

      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="footer-col">
              <h4>Contact Us</h4>
              <ul>
                <li><a href='#'>Phone Number <i className="fa fa-phone-alt"></i> : <br />+1 540558XXXX</a></li>
                <li><a href="#">Email <i className="fa fa-envelope"></i> : <br />opx@gmail.com</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>get help</h4>
              <ul>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Support</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Related Links</h4>
              <ul>
                <li><Link to="/opx">Home</Link></li>
                <li><Link to="/opx/login">Login</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>follow us</h4>
              <div className="social-links">
                <a target="_blank" href="https://www.facebook.com/RotaractClubofVirginiaTech/"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a target="_blank" href="https://www.instagram.com/rotaractclubvt/?hl=en"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>

          </div><div className='copyright'>
            Copyright &copy;, 2023 OPX.com
          </div>
        </div>
      </footer>
    </div>
  )
}

export default (HomeApp);