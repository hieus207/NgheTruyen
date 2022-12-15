import './App.css';
import Home from './pages/Home'
import Search from './pages/Search'
import Teller from './pages/Teller'

import Header from './Header';
import Footer from './Footer';
import { Route,Routes } from 'react-router-dom';
import Story from './pages/Story';
import ManageStory from './pages/Dashboard/ManageStory/ManageStory';
import DetailStory from './pages/Dashboard/ManageStory/DetailStory';
import CreateStory from './pages/Dashboard/ManageStory/CreateStory';
import ManageTeller from './pages/Dashboard/ManageTeller/ManageTeller';
import ManageAuthor from './pages/Dashboard/ManageAuthor/ManageAuthor';
import ManageCategory from './pages/Dashboard/ManageCategory/ManageCategory';
import UpdateStory from './pages/Dashboard/ManageStory/UpdateStory';
import Author from './pages/Author';
import Category from './pages/Category';

function App() {
  return (
    <div className="App">
        <Header/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/search' element={<Search/>}/>
            <Route path='/teller/:tellerId' element={<Teller/>}/>
            <Route path='/author/:authorId' element={<Author/>}/>
            <Route path='/category/:categoryId' element={<Category/>}/>
            <Route path='/dashboard' element={<ManageStory/>}/>
            <Route path='/dashboard/teller' element={<ManageTeller/>}/>
            <Route path='/dashboard/author' element={<ManageAuthor/>}/>
            <Route path='/dashboard/story/:storyId' element={<DetailStory/>}/>
            <Route path='/dashboard/story/create' element={<CreateStory/>}/>
            <Route path='/dashboard/story/:storyId/edit' element={<UpdateStory/>}/>
            <Route path='/dashboard/category' element={<ManageCategory/>}/>
            <Route path='/story/:storyId' element={<Story/>}/>
            
        </Routes>
        <Footer/>

    </div>
  );
}

export default App;
