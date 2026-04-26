import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in Computer Science & Engineering</h4>
                <h5>GLS University – Faculty of Engineering and Technology, Ahmedabad</h5>
              </div>
              <h3>2022 – 2026</h3>
            </div>
            <p>
              Pursuing B.Tech in Computer Science & Engineering with a CGPA of
              6.90 (up to Sem 7). Building a strong foundation in software
              development, networking, and cybersecurity concepts.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>HSC & SSC</h4>
                <h5>Vision International School of Excellence (CBSE), Ankleshwar</h5>
              </div>
              <h3>2020 – 2022</h3>
            </div>
            <p>
              Completed HSC with 68.8% and SSC with 61%. Developed early
              interest in technology and problem-solving.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Cybersecurity Intern</h4>
                <h5>BISAG-N, Gandhinagar</h5>
              </div>
              <h3>Dec 2025 – Apr 2026</h3>
            </div>
            <p>
              Developed secure authentication workflows and API security
              mechanisms for real-world systems. Implemented Post-Quantum
              Cryptography (ML-KEM), blockchain-based identity validation, and
              secure data handling practices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
