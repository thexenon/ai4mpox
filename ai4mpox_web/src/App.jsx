import React from 'react'; import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Profiles from './pages/Profiles';
import Project from './pages/Project';
import Articles from './pages/Articles';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/profiles' element={<Profiles />} />
        <Route path='/project' element={<Project />} />
        <Route path='/articles' element={<Articles />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;