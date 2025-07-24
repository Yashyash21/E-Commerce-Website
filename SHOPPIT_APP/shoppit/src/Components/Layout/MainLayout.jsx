import NavBar from '../Ui/Navbar';
import Footer from '../Ui/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = ({numCartItems}) => {
  return (
    <div>
      <NavBar  numCartItems={numCartItems}/>
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;

