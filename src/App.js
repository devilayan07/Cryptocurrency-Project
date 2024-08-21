import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import CryptoList from './Pages/CMS/CryptoList/CryptoList';
import CryptoDetails from './Pages/CMS/CryptoDetails/CryptoDetails';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<CryptoList/>}/>
          <Route path='/crypto/:id' element={<CryptoDetails/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
