import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    title: "Quản lí users",
    icon: "bi bi-people",
  },
  {
    title: "Quản lí thiết kế",
    icon: "bi bi-patch-check",
  },
  {
    title: "Đơn đặt",
    icon: "bi bi-bell",
  },

  {
    title: "Doanh thu",
    icon: "bi bi-hdd-stack",
  },
  {
    title: "Thêm mẫu",
    icon: "bi bi-card-text",
  },
];

const Sidebar = ({ setSelectPage }) => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <span className="ms-auto d-lg-none">
          <Button
            close
            size="sm"
            className="ms-auto d-lg-none"
            onClick={() => showMobilemenu()}
          ></Button>
        </span>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <button
              onClick={()=>setSelectPage(index)}
                className={
                  location.pathname === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </button>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
