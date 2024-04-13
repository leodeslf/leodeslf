import Intro from "./components/Intro";
import Footer from "./components/Footer";
import Projects from "./components/Projects/Projects";

export default function App() {
  return (<>
    <main>
      <Intro />
      <Projects />
    </main>
    <Footer />
  </>);
}
