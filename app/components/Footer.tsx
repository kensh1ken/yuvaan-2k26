export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <h2 className="footer-title">Answer the Call.</h2>
          <p className="footer-text">
            For registrations, collaborations, and queries from the dark, reach out:
          </p>
          <a href="mailto:yuvaanfest@iiitg.ac.in" className="footer-email">
            yuvaanfest@iiitg.ac.in
          </a>
        </div>
        <div className="footer-right">
          <p className="footer-text">Find us in the shadows:</p>
          <div className="social-icons">
            <a
              href="https://www.instagram.com/yuvaan_iiitg/"
              aria-label="Instagram"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7.8 3h8.4C19 3 21 5 21 7.8v8.4c0 2.8-2 4.8-4.8 4.8H7.8C5 21 3 19 3 16.2V7.8C3 5 5 3 7.8 3zm-.2 2C6.2 5 5 6.2 5 7.6v8.8C5 17.8 6.2 19 7.6 19h8.8c1.4 0 2.6-1.2 2.6-2.6V7.6C19 6.2 17.8 5 16.4 5H7.6zm9.3 1.5a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2zM12 7.8a4.2 4.2 0 1 1 0 8.4 4.2 4.2 0 0 1 0-8.4zm0 2a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4z"></path>
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className="social-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M13.2 19h-2.6v-6.1H9v-2.2h1.6V9.2c0-1.8.9-2.8 2.9-2.8h1.8v2.3h-1.1c-.8 0-1 .3-1 1v1h2.1l-.3 2.2h-1.8V19z"></path>
              </svg>
            </a>
            <a href="#" aria-label="Twitter" className="social-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.7 9.2c.4-0.3.7-0.6.9-1.1-.4.2-.8.3-1.2.4-.4-0.4-.9-0.7-1.6-0.7-1.2 0-2.1 0.9-2.1 2.1 0 .2 0 .4.1.6-1.7-0.1-3.2-0.9-4.1-2.3-.2.4-.3.7-.3 1.2 0 .8.4 1.5 1.1 1.9-.3 0-0.6-0.1-0.9-0.2 0 1.1.8 2 1.8 2.2-.2.1-.5.1-.7.1-.1 0-.3 0-.4 0 .3.9 1.2 1.5 2.2 1.5-0.8.6-1.9 0.9-3 0.9H8c1.1 0.7 2.4 1.1 3.8 1.1 4.6 0 7.1-3.8 7.1-7.1v-0.3c.3-0.2.6-0.6.8-0.9z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; {year} YUVAAN - Whispers of the Abyss.</span>
        <span>Crafted in the dark.</span>
      </div>
    </footer>
  );
}
