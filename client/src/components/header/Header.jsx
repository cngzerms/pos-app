import { Badge, Input, message } from "antd";
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Header.css";

const Header = ({ setSearch }) => {
  const cart = useSelector((state) => state.cart);
  const { pathName } = useLocation();
  const navigate = useNavigate();

  const logOut = () => {
    if (window.confirm("Çıkış yapmak istediğinize emin misiniz?")) {
      localStorage.removeItem("posUser");
      navigate("/login");
      message.success("Çıkış İşlemi Başarılı");
    }
  };
  return (
    <div className="border-b mb-6">
      <header className="py-4 px-6 flex justify-between items-center gap-10">
        <div className="logo">
          <Link to="/">
            <h2 className="text-2xl font-bold md:text-4xl">LOGO</h2>
          </Link>
        </div>
        <div
          className="header-search flex-1 flex justify-center"
          onClick={() => {
            pathName !== "/" && navigate("/");
          }}
        >
          <Input
            size="large"
            placeholder="Ürün ara.."
            prefix={<SearchOutlined />}
            className="rounded-full max-w-[1200px]"
            onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
          />
        </div>
        <div className="menu-links ">
          <Link
            to={"/"}
            className={`menu-link ${pathName === "/" && "active"}`}
          >
            <HomeOutlined className="md:text2-xl text-xl" />
            <span className="text-[10px] md:text-xs">Anasayfa</span>
          </Link>
          <Badge
            count={cart.cartItems.length}
            offset={[0, 0]}
            className="md:flex hidden"
          >
            <Link
              to={"/cart"}
              className={`menu-link ${pathName === "/cart" && "active"}`}
            >
              <ShoppingCartOutlined className="md:text2-xl text-xl" />
              <span className="text-[10px] md:text-xs">Sepet</span>
            </Link>
          </Badge>
          <Link
            to={"/bills"}
            className={`menu-link ${pathName === "/bills" && "active"}`}
          >
            <CopyOutlined className="md:text2-xl text-xl" />
            <span className="text-[10px] md:text-xs">Faturalar</span>
          </Link>
          <Link
            to={"/customers"}
            className={`menu-link ${pathName === "/customers" && "active"}`}
          >
            <UserOutlined className="md:text2-xl text-xl" />
            <span className="text-[10px] md:text-xs">Müşteriler</span>
          </Link>
          <Link
            to={"/statistic"}
            className={`menu-link ${pathName === "/statistic" && "active"}`}
          >
            <BarChartOutlined className="md:text2-xl text-xl" />
            <span className="text-[10px] md:text-xs">İstatistikler</span>
          </Link>
          <div onClick={logOut}>
            <Link className="menu-link">
              <LogoutOutlined className="md:text2-xl text-xl" />
              <span className="text-[10px] md:text-xs">Çıkış</span>
            </Link>
          </div>
        </div>
        <Badge
          count={cart.cartItems.length}
          offset={[0, 0]}
          className="md:hidden flex"
        >
          <Link
            to={"/cart"}
            className={`menu-link ${pathName === "/cart" && "active"}`}
          >
            <ShoppingCartOutlined className="text-2xl" />
            <span className="text-[10px] md:text-xs">Sepet</span>
          </Link>
        </Badge>
      </header>
    </div>
  );
};

export default Header;
