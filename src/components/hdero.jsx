import "./Hero.css";

function Hero() {
  const scrollToRegister = () =>
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="hero" id="hero" aria-label="Webinar Overview">
      <div className="hero__overlay" aria-hidden="true" />
      <div className="hero__content container">
        <span className="hero__badge">Free Webinar · 2026</span>
        <h1 className="hero__heading">
          The Role of Pharmaceuticals
          <br /> in the Modern World
        </h1>
        <p className="hero__subtitle">
          A scientific conversation on innovation, global impact, and the future
          of the pharmaceutical industry.
        </p>
        <ul className="hero__details" aria-label="Event Details">
          <li>
            <img src="/assets/icon-calendar.svg" alt="" aria-hidden="true" />
            <span>June 15, 2026</span>
          </li>
          <li>
            <img src="/assets/icon-clock.svg" alt="" aria-hidden="true" />
            <span>2:00 PM - 4:00 PM UTC</span>
          </li>
          <li>
            <img src="/assets/icon-online.svg" alt="" aria-hidden="true" />
            <span>Online Event · Free</span>
          </li>
        </ul>
        <button className="btn btn--primary" onClick={scrollToRegister}>
          Register Now
        </button>
      </div>
      <div className="hero__scroll-indicator" aria-hidden="true">
        <span className="hero__scroll-dot" />
      </div>
    </section>
  );
}

export default Hero;
