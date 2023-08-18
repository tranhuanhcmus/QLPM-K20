import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";
import Cards from "../views/ui/Cards";
import Starter from "../views/Starter"; 
import Alerts from "../views/ui/Alerts";
import Badges from "../views/ui/Badges";
import Buttons from "../views/ui/Buttons";
import Grid from "../views/ui/Grid";
import ManageUser from "../views/ui/ManageUser";
import Order from "../views/ui/Order";
import Pattern from "../views/ui/Pattern";
import Forms from "../views/ui/Forms";
import Breadcrumbs from "../views/ui/Breadcrumbs";
import { useState } from "react";
import '../assets/scss/style.scss';  

const FullLayout = () => {
  const [selectPage, setSelectPage] = useState(0)
  const pagesAdmin = [<ManageUser/>, <Pattern/>,  <Order/>, <Starter/>,<Forms/> ]
  return (
    <main>
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
        <aside className="sidebarArea shadow" id="sidebarArea">
          <Sidebar setSelectPage={setSelectPage}/>
        </aside>
        {/********Content Area**********/}

        <div className="contentArea">
          {/********header**********/}
          {/* <Header /> */}
          {/********Middle Content**********/}
          <Container className="p-4 wrapper" fluid>
            <Outlet />
            <div className="scroll-page">
              {
                pagesAdmin[selectPage]
              }
            </div>
          
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
