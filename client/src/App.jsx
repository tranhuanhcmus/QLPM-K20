// Global style
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Measure from "./pages/Measure/Measure";
import { URLS } from "./constants/urls";
import AuthPage from "./pages/AuthPage/AuthPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import MainLayout from "./pages/MainLayout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={URLS.MEASURE} element={<Measure />} />
        <Route path={URLS.HOME_PAGE} element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path={URLS.ABOUT_PAGE} element={<About />} />
          <Route path={URLS.AUTH_PAGE} element={<AuthPage />} />
          <Route path={URLS.CONTACT_PAGE} element={<Contact />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
