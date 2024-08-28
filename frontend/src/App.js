
import './App.css';
import AddStudent from './components/AddStudent';
import Header from './components/Header';
import AllStudents from './components/AllStudents';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
import AddSalesDetails from './components/AddSalesDetails';
import ReadSalesDetails from './components/ReadSalesDetails';
import AddProduct from './components/AddProduct';
import ReadProduct from './components/ReadProduct';



function App() {

  return (
    <Router>
      <div>
        <Header />
        <Routes> {/* Wrap Route components inside Routes */}
          <Route path="/enter" exact element={<AddSalesDetails />} />
          <Route path="/readproduct" exact element={<ReadProduct/>} />
          
          <Route path="/addproduct" exact element={<AddProduct/>} />
          <Route path="/add" exact element={<AddStudent />} />
          <Route path="/read" exact element={<ReadSalesDetails/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
