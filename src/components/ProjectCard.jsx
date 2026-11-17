export default function ProjectCard({ project }) {
  return (
    <section>
      <div className="inner">
        <span className={`icon solid style2 major ${project.icon}`} />
        <h3>{project.name}</h3>
        <p>
          <strong>{project.tech}</strong>
          <br />
          {project.desc}
        </p>
        <a
          href={project.href}
          className="button small"
          target="_blank"
          rel="noreferrer"
        >
          {project.live ? 'Live Demo' : 'View on GitHub'}
        </a>
      </div>
    </section>
  )
}
