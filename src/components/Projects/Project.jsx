import { Fragment } from "react";
import { capitalize } from ".";

export default function Project({
  about,
  argument,
  links,
  title,
  tools,
  Preview
}) {
  return (
    <article className="project">
      <span className="project__preview">
        <Preview />
      </span>
      <span className="project__summary">
        <div className="project__header">
          <h3>
            <a
              href={links[0].url}
              title={`${capitalize(links[0].name)}.`}
            >
              {title}
            </a>
          </h3> / <h4>{about}</h4>
        </div>
        <p className="project__description">
          Motivación: {argument}. Ver {links.map((link, i) =>
            <Fragment key={i}>
              {i > 0 ? (i === links.length - 1 ? ' y ' : ', ') : ''}<a
                href={link.url}
              >
                {link.name}
              </a>
            </Fragment>
          )}.
        </p>
        <p></p>
        <p className="project__new-stack">
          Aprendizaje relevante: {tools.new.map((newTool, i) =>
            <Fragment key={i}>
              {i > 0 && ', '}<strong>
                {newTool}
              </strong>
            </Fragment>)}.
        </p>
      </span>
    </article>
  );
}
