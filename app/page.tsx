"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import GhostCursor from "./components/GhostCursor";
import ElectricBorder from "@/components/ElectricBorder";

type ScheduleDay = "day1" | "day2";
type ScheduleItem = {
  timeLabel: string;
  start: string;
  end: string;
  name: string;
  meta: string;
};
type IstDateParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
};

const SCHEDULE: Record<ScheduleDay, ScheduleItem[]> = {
  day1: [
    {
      timeLabel: "09:30-10:00",
      start: "09:30",
      end: "10:00",
      name: "Inauguration",
      meta: "YUVAAN Stage",
    },
    {
      timeLabel: "10:00-11:00",
      start: "10:00",
      end: "11:00",
      name: "Treasure Hunt R1",
      meta: "Full Campus",
    },
    {
      timeLabel: "13:30-16:00",
      start: "13:30",
      end: "16:00",
      name: "Mock CID R1, R2",
      meta: "Location TBD",
    },
    {
      timeLabel: "16:00-20:00",
      start: "16:00",
      end: "20:00",
      name: "Dance / Singing",
      meta: "YUVAAN Stage",
    },
    {
      timeLabel: "20:00-22:00",
      start: "20:00",
      end: "22:00",
      name: "Cultural Night",
      meta: "YUVAAN Stage",
    },
  ],
  day2: [
    {
      timeLabel: "10:00-12:00",
      start: "10:00",
      end: "12:00",
      name: "Treasure Hunt R2",
      meta: "Ground",
    },
    {
      timeLabel: "14:30-15:30",
      start: "14:30",
      end: "15:30",
      name: "Mock CID R3",
      meta: "YUVAAN Stage",
    },
    {
      timeLabel: "14:30-16:30",
      start: "14:30",
      end: "16:30",
      name: "Talk Tangle",
      meta: "Town Hall",
    },
    {
      timeLabel: "16:00-18:00",
      start: "16:00",
      end: "18:00",
      name: "Dance Battle",
      meta: "Town Hall",
    },
    {
      timeLabel: "18:30-20:30",
      start: "18:30",
      end: "20:30",
      name: "Ms. & Mr. Yuvaan",
      meta: "YUVAAN Stage",
    },
    {
      timeLabel: "20:30-22:00",
      start: "20:30",
      end: "22:00",
      name: "PRONITE - Main Artist",
      meta: "YUVAAN Stage",
    },
  ],
};
const SCHEDULE_DATES: Record<ScheduleDay, string> = {
  day1: "2026-03-14",
  day2: "2026-03-15",
};
const MERCH_TAB_HREF = "";

const IST_DATE_TIME_FORMATTER = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const getIstDateParts = (date: Date): IstDateParts => {
  const parts = IST_DATE_TIME_FORMATTER.formatToParts(date);
  const getPart = (type: "year" | "month" | "day" | "hour" | "minute") =>
    Number(parts.find((part) => part.type === type)?.value ?? "0");

  return {
    year: getPart("year"),
    month: getPart("month"),
    day: getPart("day"),
    hour: getPart("hour"),
    minute: getPart("minute"),
  };
};

export default function Page() {
  const [activeDay, setActiveDay] = useState<ScheduleDay>("day1");
  const [nowTimestamp, setNowTimestamp] = useState(() => Date.now());

  
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
    const timer = window.setInterval(() => {
      setNowTimestamp(Date.now());
    }, 30000);

    return () => window.clearInterval(timer);
  }, []);

  const istNow = getIstDateParts(new Date(nowTimestamp));
  const currentIstDate = `${istNow.year}-${String(istNow.month).padStart(2, "0")}-${String(
    istNow.day,
  ).padStart(2, "0")}`;
  const nowIstMinutes = istNow.hour * 60 + istNow.minute;

  return (
    <div className="page-home">
      <video className="home-video-bg" autoPlay muted loop playsInline>
        <source src="/assets/background/Infinite_Warp_Video_Generation.mp4" type="video/mp4" />
      </video>
      <section id="hero" className="hero section">
        <div className="hero-ghost-layer" aria-hidden="true">
          <GhostCursor />
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
          <div className="hero-dates-slot" aria-hidden="true"></div>
        </div>
      </section>

      <section id="merch" className="section merch home-merch">
        <ElectricBorder
          color="#7df9ff"
          speed={1}
          chaos={0.12}
          thickness={2}
          borderRadius={16}
          className="merch-electric-wrap reveal"
          style={{ borderRadius: 16 }}
        >
          <div className="section-inner">
            <a
              href={MERCH_TAB_HREF}
              className="events-nav-tab merch-nav-tab"
              aria-label="Open merch link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="events-nav-tab-label merch-tab-label">🛒Buy-Explore the Phantom Market</span>
              <span className="events-nav-tab-arrow" aria-hidden="true">
                &rarr;
              </span>
            </a>
            <div className="merch-grid">
              <article className="merch-card">
                <img
                  src="/assets/merch/Gemini_Generated_Image_82t1nh82t1nh82t1.png"
                  alt="YUVAAN merch concept art"
                  className="merch-image"
                />
              </article>
              <article className="merch-card">
                <img
                  src="/assets/merch/WhatsApp%20Image%202026-02-09%20at%208.32.56%20PM.jpeg"
                  alt="YUVAAN merch sample photo"
                  className="merch-image"
                />
              </article>
            </div>
          </div>
        </ElectricBorder>
      </section>

      <section id="events" className="section events home-events">
        <div className="section-inner reveal">
          <Link href="/events" className="events-nav-tab" aria-label="Open events page">
            <span className="events-nav-tab-label">Events</span>
            <span className="events-nav-tab-arrow" aria-hidden="true">
              &rarr;
            </span>
          </Link>
        </div>
      </section>

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
          <div
            className="schedule-tabs reveal"
            data-active-index={activeDay === "day1" ? "0" : "1"}
          >
            <span className="schedule-tab-indicator" aria-hidden="true"></span>
            <button
              className={`schedule-tab${activeDay === "day1" ? " active" : ""}`}
              data-day="day1"
              type="button"
              onClick={() => setActiveDay("day1")}
              aria-pressed={activeDay === "day1"}
            >
              Day 1
            </button>
            <button
              className={`schedule-tab${activeDay === "day2" ? " active" : ""}`}
              data-day="day2"
              type="button"
              onClick={() => setActiveDay("day2")}
              aria-pressed={activeDay === "day2"}
            >
              Day 2
            </button>
          </div>

          <div className="schedule-grid">
            <div className={`schedule-day${activeDay === "day1" ? " active" : ""}`} id="day1">
              {SCHEDULE.day1.map((item) => {
                const isLive =
                  currentIstDate === SCHEDULE_DATES.day1 &&
                  nowIstMinutes >= toMinutes(item.start) &&
                  nowIstMinutes < toMinutes(item.end);
                return (
                  <article className="schedule-card" key={`day1-${item.name}-${item.start}`}>
                    <div className="schedule-time-row">
                      <p className="schedule-time">{item.timeLabel}</p>
                      {isLive ? <span className="schedule-live-badge">Live</span> : null}
                    </div>
                    <h3 className="schedule-name">{item.name}</h3>
                    <p className="schedule-meta">{item.meta}</p>
                  </article>
                );
              })}
            </div>

            <div className={`schedule-day${activeDay === "day2" ? " active" : ""}`} id="day2">
              {SCHEDULE.day2.map((item) => {
                const isLive =
                  currentIstDate === SCHEDULE_DATES.day2 &&
                  nowIstMinutes >= toMinutes(item.start) &&
                  nowIstMinutes < toMinutes(item.end);
                return (
                  <article className="schedule-card" key={`day2-${item.name}-${item.start}`}>
                    <div className="schedule-time-row">
                      <p className="schedule-time">{item.timeLabel}</p>
                      {isLive ? <span className="schedule-live-badge">Live</span> : null}
                    </div>
                    <h3 className="schedule-name">{item.name}</h3>
                    <p className="schedule-meta">{item.meta}</p>
                  </article>
                );
              })}
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
    </div>
  );
}

