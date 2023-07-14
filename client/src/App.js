// Global style
import './App.scss';
import { useLocation } from "react-router-dom";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import MainRoute from './route/mainRoute';

function App() {
  const { pathname } = useLocation();
  const listPageHideHeaderFooter = ["/measure"];
  
  const isInPage = listPageHideHeaderFooter.includes(pathname);
  
  return (
    <div className="App">
      {!isInPage && <Header/>}
        <MainRoute/>
        {!isInPage && <Footer/>}
           
    </div>
  );
}

export default App;


