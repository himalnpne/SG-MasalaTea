import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutProduct from './components/AboutProduct';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter basename="/SG-MasalaTea">

      <div className="App">
        <Header />
        <main>
          <Hero />
          <AboutProduct />
          <Features />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;