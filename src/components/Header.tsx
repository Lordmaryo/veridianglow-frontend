import CategoryNav from "./CategoryNav";
import InfoBar from "./InfoBar";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <nav className="sticky top-0 z-50">
      <InfoBar />
      <NavBar />
      <div className="hidden lg:block">
        <CategoryNav />
      </div>
    </nav>
  );
};

export default Header;
