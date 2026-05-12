import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__brand">
          <img
            src="/assets/logo.svg"
            alt="Cognipharma logo"
            className="footer__logo"
          />
          <span>COGNIPHARMA</span>
        </div>
        <p className="footer__tagline">
          Marketing Solutions for Pharmaceutical Companies.
        </p>
        <p className="footer__copy">© 2026 Your Name. All rights reserved.</p>
        <p className="footer__disclaimer">
          Demo Portfolio Project. Not a Real Website.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
