// Global style
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Measure from "./pages/Measure/Measure";
import Coat from './pages/List/Men/Coat/Coat';
import Suits_1 from './pages/List/Men/Suits/Suits_1'
import Suits_2 from './pages/List/Men/Suits/Suits_2'
import Blazers from './pages/List/Men/Blazers/Blazers'
import Tailored from './pages/List/Wedding/Tailored/Tailored'
import Ties from './pages/List/Accessories/Ties/Ties'
import Wedding_1 from './pages/List/Wedding/Wedding_1'
import Accessories_1 from './pages/List/Accessories/Accessories_1'
import Men_1 from './pages/List/Men/Men_1'
import Men_2 from './pages/List/Men/Men_2'
import Men_3 from './pages/List/Men/Men_3'
import { URLS } from "./constants/urls";
import { Toaster } from "react-hot-toast";
import MainLayout from "./pages/MainLayout";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Authentication from "./pages/Authentication/Authentication";
import { BusinessLogicProvider } from './libs/business-logic/src/provider';

function App() {
  return (
    <BusinessLogicProvider>
      <div className="app">
        <div className="app__toaster">
          <Toaster />
        </div>
        <Routes>
          <Route path={URLS.HOME_PAGE} element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path={URLS.AUTHEN} element={<Authentication />} />
            <Route path={URLS.ABOUT_PAGE} element={<About />} />
            <Route path={URLS.COAT} element={<Coat />} />
            <Route path={URLS.SUITS} element={<Suits_1 />} />
            <Route path={URLS.SUITS2} element={<Suits_2 />} />
            <Route path={URLS.BLAZERS} element={<Blazers />} />
            <Route path={URLS.TAILORED} element={<Tailored />} />
            <Route path={URLS.TIES} element={<Ties />} />
            <Route path={URLS.MEN} element={<Men_1 />} />
            <Route path={URLS.MEN2} element={<Men_2 />} />
            <Route path={URLS.MEN3} element={<Men_3 />} />
            <Route path={URLS.WEDDING} element={<Wedding_1 />} />
            <Route path={URLS.ACCESSORIES} element={<Accessories_1 />} />
            <Route path={URLS.CONTACT_PAGE} element={<Contact />} />      
          </Route>

          <Route path={URLS.MEASURE} element={<Measure />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </BusinessLogicProvider>
  );
}

export default App;
