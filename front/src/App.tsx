import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './components/Contact'
import AboutMain from './components/AboutMain'
import Team from './components/Team'

import ImageDetails from './pages/ImageDetails';
import FavoritesPage from './pages/FavoritesPage';
import RegisterOrLogin from './pages/RegisterOrLogin';
import { UserProvider } from "./context/UserContext";
import AllUsers from './components/AllUsers';
function App() {
  return (
     <UserProvider>
    <Router>
      <Header />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          {/* <Route path="/about/*" element={<About />} /> */}
         <Route path="/about" element={<About />}>
  <Route index element={<AboutMain />} />
  <Route path="team" element={<Team />} />
  <Route path="contact" element={<Contact />} />
  </Route>

          <Route path="/RegisterOrLogin" element={<RegisterOrLogin />} /> {/* עדכון לנתיב הנכון */}
          <Route path="/gallery/:id" element={<ImageDetails />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/users" element={<AllUsers />} />

                

        </Routes>
      </div>
    </Router>
    </UserProvider>
  );
}

export default App;
