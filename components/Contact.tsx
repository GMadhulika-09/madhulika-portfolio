import { getContactLinks } from "@/lib/contact";

export default async function Contact() {
  const links = await getContactLinks();

  return (
    <section id="contact" className="content-section contact-section">
      <p className="eyebrow">HAVE AN IDEA?</p>
      <h2>Let’s make<br /><span>something meaningful.</span></h2>
      <p className="contact-description">
        Feel free to reach out about technology, collaborations, hackathons, or interesting ideas.
      </p>
      <div className="contact-actions">
        {links?.email && <a className="primary-link" href={`mailto:${links.email}`}>Say hello ↗</a>}
        {links?.github && <a href={links.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}
        {links?.linkedin && <a href={links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>}
        {links?.phone && <a href={`tel:${links.phone}`}>Phone ↗</a>}
        {links?.resume_url && <a href={links.resume_url} target="_blank" rel="noopener noreferrer">Resume ↗</a>}
      </div>
      <footer className="site-footer">
        <span>G n v p Madhulika</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </section>
  );
}
