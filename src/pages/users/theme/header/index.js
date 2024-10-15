import { memo } from "react";
import "./styles.scss";

const Header = () => {
  return (
    <div className="header-top">
      <div className="container">Header</div>
    </div>
  );
};

export default memo(Header);
