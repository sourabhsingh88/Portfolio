import About from "./Sections/About"
import Education from "./Sections/Education"
import Hero from "./Sections/Hero"
import Projects from "./Sections/Projects"
import ProjectsList from "./Sections/ProjectsList"
import Technologies from "./Sections/Technologies"
import Contact from "./Sections/Contact"
import Navbar from "./Sections/Navbar"
import Footer from "./Sections/Footer"
import { Route, Routes } from "react-router-dom"

const App = () => {
  return (
    <Routes>
      {/* Main homepage route */}
      <Route path="/" element={
        <>
          <Navbar/>
          <Hero/>
          <About/>
          <Education/>
          <Technologies/>
          <Projects/>
          <Contact/>
          <Footer/>
        </>
      } />
      
      {/* Projects list page route */}
      <Route path="/projects" element={
        <>
          <Navbar/>
          <ProjectsList/>
          <Footer/>
        </>
      } />
    </Routes>
  )
}

export default App