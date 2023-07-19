// Global style
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Measure from "./pages/Measure/Measure";
import { URLS } from "./constants/urls";
import { Toaster } from "react-hot-toast";
import MainLayout from "./pages/MainLayout";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Authentication from "./pages/Authentication/Authentication";

function App() {
  return (
    <div className="app">
      <div className="app__toaster">
        <Toaster />
      </div>
      <Routes>
        <Route path={URLS.HOME_PAGE} element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path={URLS.AUTH_PAGE} element={<Authentication />} />
          <Route path={URLS.ABOUT_PAGE} element={<About />} />
          <Route path={URLS.CONTACT_PAGE} element={<Contact />} />
        </Route>

        <Route path={URLS.MEASURE} element={<Measure />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
