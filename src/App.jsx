import Intro from "./components/Intro";
import PersonalInformation from "./components/PersonalInformation";
import Projects from "./components/Projects/Projects";

export default function App() {
  return (<>
    <main>
      <Intro />
      <Projects />
    </main>
    <PersonalInformation />
  </>);
}
