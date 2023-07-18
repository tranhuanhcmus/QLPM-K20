// Global style
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Measure from './pages/Measure/Measure';
import Authen from './pages/Authentication/Authentication';
import { URLS } from './constants/urls';
import { Toaster } from 'react-hot-toast';

function App() {
  
  return (
    <div className="app">
      <div className="app__toaster">
        <Toaster/>
      </div>
      <Routes>
        <Route 
          exact path={URLS.HOME_PAGE} 
          element={<><Header/><Home/><Footer/></>} 
        />
        <Route 
          path={URLS.AUTHEN} 
          element={<><Header/><Authen/><Footer/></>} 
        />
        <Route 
          path={URLS.ABOUT_PAGE} 
          element={<><Header/><About/><Footer/></>} 
        />
        <Route 
          path={URLS.MEASURE} 
          element={<Measure />} 
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
