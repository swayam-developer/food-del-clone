import { assets } from "../../assets/assets";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Try our latest mobile app which is available on App store and Google
            play store. It is more user friendly and easy to use. Also, Do
            follow us on our social media accounts to know more about us and
            connect with us.we are happy to serve you anytime & anywhere!
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>HOME</li>
            <li>ABOUT US</li>
            <li>DELIVERY</li>
            <li>PRIVACY POLICY</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-212-456-789</li>
            <li>Tomato@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copy-right">
        &copy; Tomato.com - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
