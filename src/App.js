import React from 'react';
import { Portfolio, WhatIDo,ContactForm,PortfolioProjectsPage, TechSkillsOrbit} from './components/Portfolio'; // Import named exports
import Navbar from './components/NavBar';
import './App.css';
 // Import the shared CSS file

function App() {
  return (
    <div className="App">
       
      <Navbar />
      <Portfolio />
      <WhatIDo />
      <PortfolioProjectsPage/>
      <ContactForm/> {/* Add the WhatIDo component */}
      < TechSkillsOrbit/>
    </div>
  );
}

export default App;