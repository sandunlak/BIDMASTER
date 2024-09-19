
import './App.css';
import Header from  './components/Header';
import {BrowserRouter as Router,Route, Routes} from "react-router-dom";

import Auctions from './components/Auctions';
import AuctionHouses from './components/AuctionHouses';
import Footer from './components/Footer';


import ItemListPage from '../src/components/ItemListPage';
import CreateItemListing from './components/CreateItemListing';

import Arts from './components/Arts';
import Jewellery from './components/Jewellery';
import Collectibles from './components/Collectibles';

import ChooseRole from './components/BidderOrSeller';
import Login from './components/Login';
import SellerAccount from './components/SellerAccount';
import SellerSignUp from './components/SellerSignup';
import SellerLogin from './components/SellerLogin';
import AdminPanel from './components/AdminPanel';
import AuctionManagement from './components/AuctionManagement';
import AuctionDetail from './components/AuctionDetail';


function App() {
  return (
    <Router>
    <div className="App">
      <main>
        <Header />
       
     
        <Routes>

          <Route path="/Auctions" element={<Auctions/>} />
          <Route path="/AuctionHouses" element={<AuctionHouses/>} />
          
          <Route path="/AddItems" element={<CreateItemListing/>} />
          
          <Route path="/Arts" element={<Arts/>}/>
          <Route path="/Jewellery" element={<Jewellery/>}/>
          <Route path="/Collectibles" element={<Collectibles/>}/>
          
          <Route path="/ChooseRole" element={<ChooseRole/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/SellerLogin" element={<SellerLogin/>}/>
          <Route path="/SellerAccount" element={<SellerAccount/>}/>
          <Route path="/SellerSignUp" element={<SellerSignUp/>}/>
          <Route path="/Admin" element={<AdminPanel/>}></Route>
          <Route path="/AuctionManagement" element={<AuctionManagement/>}></Route>
          <Route path="/auction/:id" element={<AuctionDetail/>} />

          


          <Route path="/ItemListView" element={<ItemListPage/>} />

        </Routes>

        <Footer />
        </main>
    </div>
    </Router>
  );
}

export default App;
