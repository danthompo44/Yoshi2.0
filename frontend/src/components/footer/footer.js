import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer>
      <div id="main-ft-container">
        <div id="ft-container">
          <div id="ft-span"></div>
          <div id="ft-text">
            <p>
              <span className="copyright">&copy;</span> OldSkool Games
            </p>
          </div>
          <div id="ft-socials">
            <i className="fab fa-facebook-f social-icon"></i>
            <i className="fab fa-twitter social-icon"></i>
            <i className="fab fa-instagram social-icon"></i>
            <i className="fab fa-youtube social-icon"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
