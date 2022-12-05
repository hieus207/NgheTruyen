import './App.css';
import Home from './pages/Home'
import Search from './pages/Search'
import Teller from './pages/Teller'
import Dashboard from './pages/Dashboard'
import Header from './Header';
import Footer from './Footer';
import { Route,Routes } from 'react-router-dom';
import Story from './pages/Story';

function App() {
  return (
    <div className="App">
        <Header/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/search' element={<Search/>}/>
            <Route path='/teller' element={<Teller/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/story' element={<Story/>}/>
        </Routes>
        <Footer/>

    </div>
  );
}

export default App;
