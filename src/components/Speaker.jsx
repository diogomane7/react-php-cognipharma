import { useRef, useEffect } from "react";
import "./speaker.css";

function speaker() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="speaker fade-in" id="speaker" ref={sectionRef}>
      <div className="speaker__inner container">
        <p className="section-label">Featured Speaker</p>
        <h2 className="section-heading">Meet the Expert</h2>
        <div className="speaker__card">
          <div className="speaker__photo-wrap">
            <img
              src="/assets/speaker.jpg"
              alt="Dr. James Hartley, Professor of Pharmaceutical Sciences"
              className="speaker__photo"
            />
          </div>
          <div className="speaker__info">
            <h3 className="speaker__name">Dr. James Hartley</h3>
            <p className="speaker__title">
              Professor of Pharmaceutical Sciences · London College
            </p>
            <p className="speaker__bio">
              A leading voice in pharmaceutical sciences and drug policy, Prof.
              Hartley has spent over 20 years bridging academic research and
              industry practice. He is a former scientific advisor to the
              European Medicine Journal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default speaker;
