import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutProduct from './components/AboutProduct';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <AboutProduct />
        <Features />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

export default App;