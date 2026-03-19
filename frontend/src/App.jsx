import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import Home from "./pages/Home";
import History from "./pages/History";
import Bible from "./pages/Bible";
import About from "./pages/About";
import Prayer from "./pages/Prayer";
import Services from "./pages/Services";
import Footer from "./components/Footer";
import Verse from "./pages/Verse";
import Article from "./pages/Article";
import BibleStory from "./pages/BibleStory";
import Glossary from "./pages/Glossary";
import { useState } from "react";

function App() {
  const [darkMode , setDarkMode]=useState(false)
  return (
    <BrowserRouter>
    <div className={darkMode? "dark": "light"}>
      <Navbar toggleDarkMode={()=>setDarkMode(!darkMode)} darkMode={darkMode}/>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/history" element={<History />} />

        <Route path="/services" element={<Services />} />

        <Route path="/bible" element={<Bible />} />

        <Route path="/about" element={<About />} />

        <Route path="/prayer" element={<Prayer />} />

        <Route path="/verse" element={<Verse />} />

        <Route path="/article/:id" element={<Article />} />

        <Route path="/bible/:id" element={<BibleStory />} />

        <Route path="/glossary" element={<Glossary/>}/>
      </Routes>
      <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;