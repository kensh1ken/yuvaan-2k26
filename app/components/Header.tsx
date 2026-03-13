"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);

  const closeNav = () => setNavOpen(false);

  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link href="/" className="nav-logo" onClick={closeNav}>
          <img src="/assets/logo/logo.png" alt="YUVAAN - Whispers of the Abyss" className="logo-image" />
        </Link>
        <nav className={`nav-links${navOpen ? " open" : ""}`} id="nav-links">
          <Link href="/" className="nav-link" onClick={closeNav}>
            Home
          </Link>
          <a href="https://iiitgmun.org.in" target="_blank" rel="noopener noreferrer" className="nav-link">
            MUN
          </a>
          <Link href="/#events" className="nav-link" onClick={closeNav}>
            Events
          </Link>
          <Link href="/#merch" className="nav-link" onClick={closeNav}>
            Merch
          </Link>
          <Link href="/#schedule" className="nav-link" onClick={closeNav}>
            Schedule
          </Link>
          <Link href="/team" className="nav-link" onClick={closeNav}>
            Team
          </Link>
          <Link href="/#sponsors" className="nav-link" onClick={closeNav}>
            Sponsors
          </Link>
          <Link href="/#contact" className="nav-link" onClick={closeNav}>
            Contact
          </Link>
        </nav>
        <button
          className={`nav-toggle${navOpen ? " active" : ""}`}
          id="nav-toggle"
          aria-label="Toggle navigation"
          onClick={() => setNavOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
