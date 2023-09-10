import Casi from './Casi/Casi';
import Fontima from './Fontima/Fontima';
import Ephy from './Ephy/Ephy';
import Skeleton from './Skeleton/Skeleton';
import Project from './Project';
import projects from '../../json/projects.json';
import Tfp from './Tfp/Tfp';
import Tw from './Tw/Tw';
import Tw2 from './Tw2/Tw2';
import Vec from './Vec/Vec';

// Rollup doesn't support lazy imports with dynamic paths. Hardcode is the way:
const previews = [
  Vec,
  Tfp,
  Tw,
  // Tfp2,
  Casi,
  Skeleton,
  Tw2,
  Ephy,
  Fontima
];

export default function Projects() {
  return (
    <section className="projects">
      <h2>Experimentos</h2>
      <div className="project__list">
        {projects.map((project, i) =>
          <Project {...{
            ...project,
            Preview: previews[i]
          }}
            key={project.id}
          />
        )}
      </div>
    </section >
  );
}
