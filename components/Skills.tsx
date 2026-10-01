import { getSkills } from "@/lib/skills";

export default async function Skills() {
  const skills = await getSkills();

  const grouped = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="relative w-full px-6 py-24 md:py-32 bg-transparent">
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center text-[#F8FAFC] mb-16">
        Skills
      </h2>
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        {Object.entries(grouped).map(([category, categorySkills]) => (
          <div key={category}>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[#94A3B8] mb-4">
              {category}
            </h3>
            <div className="flex flex-wrap gap-3">
              {categorySkills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-4 py-2 rounded-full bg-[#111827]/40 backdrop-blur-md border border-[#1E293B] text-sm font-medium text-[#F8FAFC]"
                >
                  {skill.name}
                  {skill.level && (
                    <span className="text-[#10B981] ml-2">· {skill.level}</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}