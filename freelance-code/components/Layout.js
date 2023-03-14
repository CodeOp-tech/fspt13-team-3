import Footer from "./Footer";
import Navbar from "./Navbar";
import NavbarTwo from "./NavbarTwo";


const Layout = ({ children, navTwo}) => {
    return (
        <div className="flex flex-col min-h-screen">
            { navTwo ?
              <NavbarTwo />
              :
              <Navbar />
            }
            {children}
            <Footer />
        </div>
    );
}

export default Layout;