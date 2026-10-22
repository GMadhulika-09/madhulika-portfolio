import { getAbout } from "@/lib/about";

export default async function About() {
  const content = await getAbout();
  const paragraphs = content.split("\n\n").filter((p) => p.trim().length > 0);

  return (
    <section id="about" className="content-section about-section">
      <div className="section-heading">
        <p className="eyebrow">A LITTLE CONTEXT</p>
        <h2>About <span>me</span></h2>
      </div>
      <div className="about-body">
        <p className="about-lead">Curious by nature.<br />Building one idea at a time.</p>
        <div className="about-copy">
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
