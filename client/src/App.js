// Global style
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Measure from "./pages/Measure/Measure";
import Coat from './pages/Coat/Coat';
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
            <Route path={URLS.COAT} element={<Coat />}
            />
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
