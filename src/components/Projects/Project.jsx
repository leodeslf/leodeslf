import { Fragment } from "react";

export default function Project({
  about,
  argument,
  // id,
  links,
  title,
  // tools,
  Preview
}) {
  return (
    <article className="project">
      <span className="project__description">
        <div className="project__header">
          <h3>
            <a
              href={links[0].url}
              title={links[0].name}
            >
              {title}
            </a>
          </h3> / <h4>{about}</h4>
        </div>
        <p>
          Argumento: {argument}.
          Links: {links.map((link, i) =>
            <Fragment key={i}>
              {i > 0 ? ', ' : ''}<a
                href={link.url}
              >
                {link.name}
              </a>
            </Fragment>
          )}.
          {/* Nuevo: {tools.new.map((newTool, i) => <>
            {i > 0 && ', '}<strong key={i}>
              {newTool}
            </strong>
          </>)}. */}
        </p>
      </span>
      <span className="project__preview">
        <Preview />
      </span>
    </article>
  );
}
