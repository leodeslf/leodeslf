// import Hero from "./components/Hero/Hero";
import Intro from "./components/Intro";
import PersonalInformation from "./components/PersonalInformation";
import Projects from "./components/Projects/Projects";

export default function App() {
  return (<>
    {/* <Hero /> */}
    <h1>
      <a
        href="/"
        title="Leonardo de Souza Leal Figueira"
      >
        Leonardo de S. Leal F.
      </a>
    </h1>
    <main>
      <Intro />
      <Projects />
    </main>
    <PersonalInformation />
  </>);
}
