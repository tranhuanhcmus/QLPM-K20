// Global style
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Measure from "./pages/Measure/Measure";
import { URLS } from "./constants/urls";
import AuthPage from "./pages/AuthPage/AuthPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path={URLS.HOME_PAGE}
            element={
              <>
                <Header />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path={URLS.ABOUT_PAGE}
            element={
              <>
                <Header />
                <About />
                <Footer />
              </>
            }
          />
          <Route path={URLS.MEASURE} element={<Measure />} />
          <Route
            path={URLS.AUTH_PAGE}
            element={
              <>
                <Header />
                <AuthPage />
                <Footer />
              </>
            }
          />
          <Route
            path={URLS.CONTACT_PAGE}
            element={
              <>
                <Header />
                <Contact />
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
