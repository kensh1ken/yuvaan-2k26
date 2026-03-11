"use client";

import { type CSSProperties, useEffect, useState } from "react";

type ScheduleDay = "day1" | "day2";
type EventScheduleSlot = {
  day: ScheduleDay;
  start: string;
  end: string;
};

type EventItem = {
  title: string;
  posterClass: string;
  posterSrc: string;
  posterAlt: string;
  dateTime: string;
  coordinator: string;
  registrationUrl: string | null;
  scheduleSlots?: EventScheduleSlot[];
};

type PosterPopOutConfig = {
  width: string;
  bottom: string;
  x: string;
  scale: string;
  hoverScale: string;
};

type PosterPopOutStyle = CSSProperties & {
  "--poster-popout-width"?: string;
  "--poster-popout-bottom"?: string;
  "--poster-popout-x"?: string;
  "--poster-popout-scale"?: string;
  "--poster-popout-hover-scale"?: string;
};

type IstDateParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
};

const SCHEDULE_DATES: Record<ScheduleDay, string> = {
  day1: "2026-03-14",
  day2: "2026-03-15",
};

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

const EVENT_LIST: EventItem[] = [
  {
    title: "Treasure Hunt",
    posterClass: "poster-red-gold",
    posterSrc: "/assets/posters/treasure-removebg-preview.png",
    posterAlt: "Treasure Hunt poster",
    dateTime: "Round 1 :Day 1 10:00-11:00 Round 2 :Day 2 10:00-12:00",
    coordinator: "TBD",
    registrationUrl:
      "https://unstop.com/events/yuvaan26-treasure-hunt-the-upside-down-edition-yuvaan26-indian-institute-of-information-technology-iiit-guwahati-1652819",
    scheduleSlots: [
      { day: "day1", start: "10:00", end: "11:00" },
      { day: "day2", start: "10:00", end: "12:00" },
    ],
  },
  {
    title: "Mock CID",
    posterClass: "poster-noir",
    posterSrc: "/assets/posters/mockcid-removebg-preview.png",
    posterAlt: "Mock CID poster",
    dateTime: "\nRound 1 :Day 1 13:30-16:00\n Round 2 :Day 2 14:30-15:30",
    coordinator: "TBD",
    registrationUrl:
      "https://unstop.com/events/mock-cid-indian-institute-of-information-technology-iiit-guwahati-1642345",
    scheduleSlots: [
      { day: "day1", start: "13:30", end: "16:00" },
      { day: "day2", start: "14:30", end: "15:30" },
    ],
  },
  {
    title: "Dance Battle",
    posterClass: "poster-pink-purple",
    posterSrc: "/assets/posters/dance_battle-removebg-preview.png",
    posterAlt: "Dance Battle poster",
    dateTime: "Day 2 16:00-18:00",
    coordinator: "TBD",
    registrationUrl:
      "https://unstop.com/events/dance-battle-indian-institute-of-information-technology-iiit-guwahati-1651082",
    scheduleSlots: [{ day: "day2", start: "16:00", end: "18:00" }],
  },
  {
    title: "Mr & Mrs Yuvaan",
    posterClass: "poster-emerald",
    posterSrc: "/assets/posters/mrandmrs-removebg-preview.png",
    posterAlt: "Mr & Mrs Yuvaan poster",
    dateTime: "Day 2 18:30-20:30",
    coordinator: "TBD",
    registrationUrl:
      "https://unstop.com/events/ms-mr-yuvaan-yuvaan26-indian-institute-of-information-technology-iiit-guwahati-1650727",
    scheduleSlots: [{ day: "day2", start: "18:30", end: "20:30" }],
  },
];

const POP_OUT_POSTER_CONFIG: Record<string, PosterPopOutConfig> = {
  "Treasure Hunt": {
    width: "112%",
    bottom: "-170px",
    x: "-52%",
    scale: "1.24",
    hoverScale: "1.3",
  },
  "Mock CID": {
    width: "112%",
    bottom: "-137px",
    x: "-50%",
    scale: "1.03",
    hoverScale: "1.08",
  },
  "Dance Battle": {
    width: "112%",
    bottom: "-105px",
    x: "-50%",
    scale: "0.90",
    hoverScale: "0.96",
  },
  "Mr & Mrs Yuvaan": {
    width: "112%",
    bottom: "-120px",
    x: "-50%",
    scale: "1.00",
    hoverScale: "1.04",
  },
};

export default function EventsPage() {
  const [nowTimestamp, setNowTimestamp] = useState(() => Date.now());

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

  const isEventLive = (event: EventItem) =>
    (event.scheduleSlots ?? []).some(
      (slot) =>
        currentIstDate === SCHEDULE_DATES[slot.day] &&
        nowIstMinutes >= toMinutes(slot.start) &&
        nowIstMinutes < toMinutes(slot.end),
    );

  return (
    <section id="events" className="section events events-page">
      <div className="section-inner">
        <h2 className="section-title">Events</h2>
        <p className="section-text section-subtitle">
          Step into games of chance, puzzles of shadow, and stories written in neon and smoke.
          Each event is a doorway deeper into the abyss.
        </p>
        <div className="events-grid">
          {EVENT_LIST.map((event) => {
            const isLive = isEventLive(event);
            const popOutConfig = POP_OUT_POSTER_CONFIG[event.title];
            const popOutStyle: PosterPopOutStyle | undefined = popOutConfig
              ? {
                  "--poster-popout-width": popOutConfig.width,
                  "--poster-popout-bottom": popOutConfig.bottom,
                  "--poster-popout-x": popOutConfig.x,
                  "--poster-popout-scale": popOutConfig.scale,
                  "--poster-popout-hover-scale": popOutConfig.hoverScale,
                }
              : undefined;

            return (
              <article key={event.title} className="event-card">
                <div
                  className={`event-poster ${event.posterClass}${popOutConfig ? " poster-popout" : ""}`}
                  style={popOutStyle}
                >
                  <img src={event.posterSrc} alt={event.posterAlt} className="event-poster-img" />
                </div>
                <div className="event-content">
                  <div className="event-title-row">
                    <h3 className="event-title">{event.title}</h3>
                    {isLive ? <span className="schedule-live-badge">Live</span> : null}
                  </div>
                  <p className="event-detail">
                    <strong>Date & Time:</strong> {event.dateTime}
                  </p>
                  <p className="event-detail">
                    <strong>Coordinator:</strong> {event.coordinator}
                  </p>
                  {event.registrationUrl ? (
                    <a
                      href={event.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary event-register-btn"
                    >
                      Register
                    </a>
                  ) : (
                    <span className="btn-ghost event-register-btn event-register-disabled">
                      Registration Soon
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
