import './App.css';
import Home from './pages/Home'
import Search from './pages/Search'
import Teller from './pages/Teller'

import Header from './Header';
import Footer from './Footer';
import { Route,Routes } from 'react-router-dom';
import Story from './pages/Story';
import ManageStory from './pages/Dashboard/ManageStory';
import DetailStory from './pages/Dashboard/DetailStory';
import CreateStory from './pages/Dashboard/CreateStory';
import ManageTeller from './pages/Dashboard/ManageTeller';
import ManageAuthor from './pages/Dashboard/ManageAuthor';
import ManageCategory from './pages/Dashboard/ManageCategory';

function App() {
  return (
    <div className="App">
        <Header/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/search' element={<Search/>}/>
            <Route path='/teller' element={<Teller/>}/>
            <Route path='/dashboard' element={<ManageStory/>}/>
            <Route path='/dashboard/teller' element={<ManageTeller/>}/>
            <Route path='/dashboard/author' element={<ManageAuthor/>}/>
            <Route path='/dashboard/story' element={<DetailStory/>}/>
            <Route path='/dashboard/category' element={<ManageCategory/>}/>
            <Route path='/story' element={<Story/>}/>
            <Route path='/dashboard/story/create' element={<CreateStory/>}/>
        </Routes>
        <Footer/>

    </div>
  );
}

export default App;
