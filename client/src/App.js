// Global style
import './App.scss';
import { Routes, Route } from 'react-router-dom';

import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import { URLS } from './constants/urls';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route 
          exact path={URLS.HOME_PAGE} 
          element={<><Header/><Home/><Footer/></>} 
        />
        <Route 
          path={URLS.ABOUT_PAGE} 
          element={<><Header/><About/><Footer/></>} 
        />
        <Route 
          path={URLS.CONTACT_PAGE} 
          element={<><Header/><Contact/><Footer/></>} 
        />
      </Routes>
    </div>
  );
}

export default App;
