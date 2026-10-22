import { getSkills } from "@/lib/skills";

export default async function Skills() {
  const skills = await getSkills();
  const grouped = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="content-section skills-section">
      <div className="section-heading">
        <p className="eyebrow">TOOLS OF THE TRADE</p>
        <h2>Skills & <span>curiosity</span></h2>
      </div>
      <div className="skills-layout">
        <p className="skills-intro">A growing toolkit for turning ideas into useful, thoughtful digital experiences.</p>
        <div className="skills-groups">
          {Object.entries(grouped).map(([category, categorySkills]) => (
            <div key={category} className="skill-group">
              <h3>{category}</h3>
              <div className="skill-pills">
                {categorySkills.map((skill) => (
                  <span key={skill.id} className="skill-pill">
                    {skill.name}{skill.level && <span className="skill-level">· {skill.level}</span>}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
