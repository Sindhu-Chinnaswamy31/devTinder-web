import NavBar from './NavBar';
import {Outlet} from "react-router-dom";
import Footer from './Footer';
const Body = () => {
    return (
        <div>
            <NavBar />
            <Outlet /> {/* Renders the matching child route of a parent route or nothing if no child route matches. */}
            <Footer />
       </div>
    )
};

export default Body;