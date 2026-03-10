const TEAM_LIST = [
  { avatar: "A", name: "Core Coordinator", role: "Festival Lead" },
  { avatar: "B", name: "Events Head", role: "Gameplay & Curation" },
  { avatar: "C", name: "Production Head", role: "Stage & Tech" },
  { avatar: "D", name: "Design & Media", role: "Visual Identity" },
  { avatar: "E", name: "Sponsorships", role: "Partners & Outreach" },
  { avatar: "F", name: "Hospitality", role: "Experience & Logistics" },
];

export default function TeamPage() {
  return (
    <section id="team" className="section team">
      <div className="section-inner">
        <h2 className="section-title">Team</h2>
        <p className="section-subtitle">
          Behind the curtain, in the control room of the abyss, a crew that thrives on chaos keeps
          the show alive.
        </p>
        <div className="team-grid">
          {TEAM_LIST.map((member) => (
            <article key={member.name} className="team-card">
              <div className="team-avatar">{member.avatar}</div>
              <h3 className="team-name">{member.name}</h3>
              <p className="team-role">{member.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
