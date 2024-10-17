import { memo } from "react";
import "./styles.scss";
// import { logo } from "/src/assets/images/logo_tempest_gaming.png";
import { FaFacebook } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
const Header = () => {
  return (
    <div className="header-top">
      <div className="container">
        <div className="row">
          <div className="col-6">Trái</div>
          <div className="col-6 header-top-right">
            <ul>
              <li>
                <Link to={""}>
                  <FaFacebook />
                </Link>
              </li>
              <li>
                <Link to={""}>
                  <FaGoogle />
                </Link>
              </li>
              <Link to={""}>
                <MdAccountCircle />
              </Link>
              <span>Đăng Nhập</span>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
