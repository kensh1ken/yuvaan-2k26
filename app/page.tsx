"use client";

import { useEffect, useMemo, useState } from "react";
import Galaxy from "./components/Galaxy";

type EventItem = {
  id: string;
  title: string;
  description: string;
  posterClass: string;
  posterSrc: string;
  posterAlt: string;
  tag: string;
};

type ScheduleDay = "day1" | "day2";

const EVENTS: EventItem[] = [
  {
    id: "treasure",
    title: "Treasure Hunt",
    description:
      "The whispers have begun... Hidden clues, twisted paths, and a treasure waiting in the shadows. This is not just a game, it is a test of wit, speed, and instinct.",
    posterClass: "poster-red-gold",
    posterSrc: "/assets/posters/treasure.png",
    posterAlt: "Treasure Hunt poster",
    tag: "Deep Red â€¢ Gold",
  },
  {
    id: "speed",
    title: "Speed Dating",
    description:
      "Some conversations last forever... Some only need a few minutes to change everything. Take a seat, start the clock, and see where it goes.",
    posterClass: "poster-pink-purple",
    posterSrc: "/assets/posters/speeddating.png",
    posterAlt: "Speed Dating poster",
    tag: "Neon Pink â€¢ Purple",
  },
  {
    id: "mockcid",
    title: "Mock CID",
    description:
      "A mystery waits in the shadows... Clues scattered, truths hidden, and suspects everywhere. Connect the dots and uncover what others cannot see.",
    posterClass: "poster-noir",
    posterSrc: "/assets/posters/mockcid.png",
    posterAlt: "Mock CID poster",
    tag: "Noir Red â€¢ Dark Brown",
  },
  {
    id: "pageant",
    title: "Mr & Mrs Yuvaan",
    description:
      "Confidence is not just seen, it is felt. Grace is not just shown, it is carried. Step forward and let your personality speak louder than words.",
    posterClass: "poster-emerald",
    posterSrc: "/assets/posters/mrandmrs.png",
    posterAlt: "Mr & Mrs Yuvaan poster",
    tag: "Emerald Green",
  },
];

export default function Page() {
  const [navOpen, setNavOpen] = useState(false);
  const [activeDay, setActiveDay] = useState<ScheduleDay>("day1");
  const [modalEvent, setModalEvent] = useState<{ title: string; description: string } | null>(
    null,
  );

  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const revealElements = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setModalEvent(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalEvent ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalEvent]);

  const closeNav = () => setNavOpen(false);

  const scrollToEvents = () => {
    document.getElementById("events")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className="navbar">
        <div className="nav-inner">
          <a href="#hero" className="nav-logo" onClick={closeNav}>
            <img
              src="/assets/logo/logo.png"
              alt="YUVAAN - Whispers of the Abyss"
              className="logo-image"
            />
          </a>
          <nav className={`nav-links${navOpen ? " open" : ""}`} id="nav-links">
            <a href="#hero" className="nav-link" onClick={closeNav}>
              Home
            </a>
            <a href="#about" className="nav-link" onClick={closeNav}>
              About
            </a>
            <a href="#events" className="nav-link" onClick={closeNav}>
              Events
            </a>
            <a href="#schedule" className="nav-link" onClick={closeNav}>
              Schedule
            </a>
            <a href="#team" className="nav-link" onClick={closeNav}>
              Team
            </a>
            <a href="#sponsors" className="nav-link" onClick={closeNav}>
              Sponsors
            </a>
            <a
              href="https://mun.yuvaan-placeholder.com"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              MUN
            </a>
            <a href="#contact" className="nav-link" onClick={closeNav}>
              Contact
            </a>
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

      <section id="hero" className="hero section">
        <div className="hero-galaxy-layer" aria-hidden="true">
          <Galaxy
            mouseRepulsion
            mouseInteraction
            density={0.7}
            glowIntensity={0.2}
            saturation={0}
            hueShift={140}
            twinkleIntensity={0.2}
            rotationSpeed={0.06}
            repulsionStrength={1.4}
            autoCenterRepulsion={0}
            starSpeed={0.35}
            speed={0.75}
            transparent
          />
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content reveal pirata-one-regular">
          <div className="hero-logo">
            <img
              src="/assets/logo/logo.png"
              alt="YUVAAN - Whispers of the Abyss"
              className="hero-logo-image"
            />
          </div>
          <p className="hero-tagline">Between fear and fascination lies the abyss.</p>
          <p className="hero-subtext">
            This March, Yuvaan invites you to walk the edge, chase the thrill, and answer the call
            that rises from the dark.
          </p>
          <p className="hero-dates">14-15 March</p>
          <button className="btn-primary" id="enter-abyss-btn" onClick={scrollToEvents}>
            Enter the Abyss
            <span className="btn-glow"></span>
          </button>
        </div>
      </section>

      <section id="about" className="section about">
        <div className="section-inner reveal">
          <h2 className="section-title">When the abyss whispers... you listen.</h2>
          <p className="section-text">
            YUVAAN - Whispers of the Abyss is a cultural and technical festival that blurs the line
            between spectacle and story. Over two nights and two days, the campus transforms into a
            living mystery - from high-stakes competitions and immersive games to performances that
            pull you into the dark and refuse to let go. This is not just a fest. It is an
            experience, a descent into a world where curiosity is your only compass and thrill is
            your only constant.
          </p>
        </div>
      </section>

      <section id="events" className="section events">
        <div className="section-inner">
          <h2 className="section-title reveal">Events</h2>
          <p className="section-text section-subtitle reveal">
            Step into games of chance, puzzles of shadow, and stories written in neon and smoke.
            Each event is a doorway deeper into the abyss.
          </p>
          <div className="events-grid">
            {EVENTS.map((event) => (
              <article
                key={event.id}
                className="event-card reveal"
                onClick={() => setModalEvent({ title: event.title, description: event.description })}
              >
                <div className={`event-poster ${event.posterClass}`}>
                  <img src={event.posterSrc} alt={event.posterAlt} className="event-poster-img" />
                </div>
                <div className="event-content">
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-tag">{event.tag}</p>
                  <button className="btn-ghost" type="button">
                    Learn More
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div
        className={`modal-overlay${modalEvent ? " active" : ""}`}
        id="event-modal"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setModalEvent(null);
          }
        }}
      >
        <div className="modal">
          <button
            className="modal-close"
            id="modal-close"
            aria-label="Close event details"
            onClick={() => setModalEvent(null)}
          >
            &times;
          </button>
          <p className="modal-tag">Event</p>
          <h3 className="modal-title" id="modal-title">
            {modalEvent?.title ?? "Title"}
          </h3>
          <p className="modal-body" id="modal-body">
            {modalEvent?.description ?? "More details will be revealed soon."}
          </p>
          <div className="modal-footer">
            <span className="modal-badge">More details coming soon.</span>
          </div>
        </div>
      </div>

      <section id="pronites" className="section pronites">
        <div className="section-inner pronites-inner reveal">
          <div className="pronites-spotlight"></div>
          <div className="pronites-content">
            <h2 className="section-title">Night falls. The stage awakens.</h2>
            <p className="section-text">
              As darkness settles, the heart of YUVAAN begins to pulse. Under a wash of crimson and
              abyssal purple, the main stage turns into a portal: live artists, surprise acts, and
              performances that feel less like shows and more like shared hallucinations. This is
              where the carnival roars to life, where the crowd becomes a single, electric
              silhouette against the light.
            </p>
            <p className="section-text">
              Stay tuned for the artist lineup - the night has secrets it has not yet revealed.
            </p>
          </div>
        </div>
      </section>

      <section id="schedule" className="section schedule">
        <div className="section-inner">
          <h2 className="section-title reveal">Schedule</h2>
          <p className="section-subtitle reveal">
            Two days. Parallel dimensions of chaos, creativity, and controlled madness.
          </p>
          <div className="schedule-tabs reveal">
            <button
              className={`schedule-tab${activeDay === "day1" ? " active" : ""}`}
              data-day="day1"
              type="button"
              onClick={() => setActiveDay("day1")}
            >
              Day 1
            </button>
            <button
              className={`schedule-tab${activeDay === "day2" ? " active" : ""}`}
              data-day="day2"
              type="button"
              onClick={() => setActiveDay("day2")}
            >
              Day 2
            </button>
          </div>

          <div className="schedule-grid">
            <div className={`schedule-day${activeDay === "day1" ? " active" : ""}`} id="day1">
              <article className="schedule-card">
                <p className="schedule-time">10:00 AM</p>
                <h3 className="schedule-name">Opening Ceremony</h3>
                <p className="schedule-meta">Main Arena â€¢ All Delegates</p>
              </article>
              <article className="schedule-card">
                <p className="schedule-time">11:30 AM</p>
                <h3 className="schedule-name">Treasure Hunt - Phase I</h3>
                <p className="schedule-meta">Campus Grounds â€¢ Teams of 3-4</p>
              </article>
              <article className="schedule-card">
                <p className="schedule-time">02:00 PM</p>
                <h3 className="schedule-name">Mock CID - Case Briefing</h3>
                <p className="schedule-meta">Black Box Room â€¢ Pre-registered Participants</p>
              </article>
              <article className="schedule-card">
                <p className="schedule-time">07:00 PM</p>
                <h3 className="schedule-name">Pronites - Night One</h3>
                <p className="schedule-meta">Main Stage â€¢ Open Entry (Pass Holders)</p>
              </article>
            </div>

            <div className={`schedule-day${activeDay === "day2" ? " active" : ""}`} id="day2">
              <article className="schedule-card">
                <p className="schedule-time">10:30 AM</p>
                <h3 className="schedule-name">Speed Dating</h3>
                <p className="schedule-meta">Mystic Lounge â€¢ Limited Slots</p>
              </article>
              <article className="schedule-card">
                <p className="schedule-time">01:00 PM</p>
                <h3 className="schedule-name">Treasure Hunt - Final Run</h3>
                <p className="schedule-meta">Hidden Route â€¢ Shortlisted Teams</p>
              </article>
              <article className="schedule-card">
                <p className="schedule-time">03:30 PM</p>
                <h3 className="schedule-name">Mr & Mrs Yuvaan</h3>
                <p className="schedule-meta">Main Stage â€¢ Live Audience Voting</p>
              </article>
              <article className="schedule-card">
                <p className="schedule-time">07:30 PM</p>
                <h3 className="schedule-name">Pronites - Finale</h3>
                <p className="schedule-meta">Main Stage â€¢ Headline Act</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="section team">
        <div className="section-inner">
          <h2 className="section-title reveal">Team</h2>
          <p className="section-subtitle reveal">
            Behind the curtain, in the control room of the abyss, a crew that thrives on chaos
            keeps the show alive.
          </p>
          <div className="team-grid">
            <article className="team-card reveal">
              <div className="team-avatar">A</div>
              <h3 className="team-name">Core Coordinator</h3>
              <p className="team-role">Festival Lead</p>
            </article>
            <article className="team-card reveal">
              <div className="team-avatar">B</div>
              <h3 className="team-name">Events Head</h3>
              <p className="team-role">Gameplay & Curation</p>
            </article>
            <article className="team-card reveal">
              <div className="team-avatar">C</div>
              <h3 className="team-name">Production Head</h3>
              <p className="team-role">Stage & Tech</p>
            </article>
            <article className="team-card reveal">
              <div className="team-avatar">D</div>
              <h3 className="team-name">Design & Media</h3>
              <p className="team-role">Visual Identity</p>
            </article>
            <article className="team-card reveal">
              <div className="team-avatar">E</div>
              <h3 className="team-name">Sponsorships</h3>
              <p className="team-role">Partners & Outreach</p>
            </article>
            <article className="team-card reveal">
              <div className="team-avatar">F</div>
              <h3 className="team-name">Hospitality</h3>
              <p className="team-role">Experience & Logistics</p>
            </article>
          </div>
        </div>
      </section>

      <section id="sponsors" className="section sponsors">
        <div className="section-inner">
          <h2 className="section-title reveal">Sponsors</h2>
          <p className="section-subtitle reveal">The ones who fuel the madness and light up the abyss.</p>
          <div className="sponsor-carousel reveal">
            <div className="sponsor-track">
              <div className="sponsor-logo">Logo 1</div>
              <div className="sponsor-logo">Logo 2</div>
              <div className="sponsor-logo">Logo 3</div>
              <div className="sponsor-logo">Logo 4</div>
              <div className="sponsor-logo">Logo 5</div>
              <div className="sponsor-logo">Logo 1</div>
              <div className="sponsor-logo">Logo 2</div>
              <div className="sponsor-logo">Logo 3</div>
              <div className="sponsor-logo">Logo 4</div>
              <div className="sponsor-logo">Logo 5</div>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="footer">
        <div className="footer-inner">
          <div className="footer-left">
            <h2 className="footer-title">Answer the Call.</h2>
            <p className="footer-text">
              For registrations, collaborations, and queries from the dark, reach out:
            </p>
            <a href="mailto:yuvaanfest@example.com" className="footer-email">
              yuvaanfest@example.com
            </a>
          </div>
          <div className="footer-right">
            <p className="footer-text">Find us in the shadows:</p>
            <div className="social-icons">
              <a href="#" aria-label="Instagram" className="social-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5"></rect>
                  <circle cx="12" cy="12" r="4.5"></circle>
                  <circle cx="17.5" cy="6.5" r="1.2"></circle>
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="social-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5"></rect>
                  <path d="M13.2 19h-2.6v-6.1H9v-2.2h1.6V9.2c0-1.8.9-2.8 2.9-2.8h1.8v2.3h-1.1c-.8 0-1 .3-1 1v1h2.1l-.3 2.2h-1.8V19z"></path>
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="social-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5"></rect>
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
    </>
  );
}

