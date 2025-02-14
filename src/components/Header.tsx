import CategoryNav from "./CategoryNav";
import InfoBar from "./InfoBar";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <div className="sticky top-0 z-50">
      <InfoBar />
      <NavBar />
      <div className="hidden lg:block">
        <CategoryNav />
      </div>
    </div>
  );
};

export default Header;
