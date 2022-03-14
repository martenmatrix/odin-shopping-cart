import { BrowserRouter, Route, Routes, Link, Outlet } from 'react-router-dom';
import './styles/App.css';
import './styles/Header.css';
import Homepage from './Homepage';
import ShopPage from './ShopPage';
import SmallLogo from './img/branding/small-logo.png';

function Layout() {
  return (
    <div className="main">
      <header>
        <img className="logo" alt="Small logo of the company" src={SmallLogo}/>
        <Link className="section home" to='/'>Home</Link>
        <Link className="section shop" to='/shop'>Shop</Link>
      </header>
      <Outlet />
    </div>
  )
}

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage shopPath='shop'/>} />
            <Route path="shop/*" element={<ShopPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
