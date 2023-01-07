import './App.css';
import Home from './pages/Home'
import Search from './pages/Search'
import Teller from './pages/Teller'
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
import MostView from './pages/MostView';
import Recent from './pages/Recent';
import DashboardHeader from './pages/Dashboard/DashBoardHeader';
import AppWithContainer from './AppWithContainer';
import Navbar from './Navbar';
import AudioPlayerBottom from './AudioPlayerBottom';
import CateStories from './pages/Category/CateStories';
import AuthorStories from './pages/Author/AuthorStories';
import TellerStories from './pages/Teller/TellerStories';
import PageHeader from './PageHeader';

function App() {
  
  return (
    <div className="App">       
        <div className="d-flex">
        <Navbar/>
        <AppWithContainer>
          <PageHeader/>
          <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/search' element={<Search/>}/>
                <Route path='/teller' element={<Teller/>}/>
                <Route path='/teller/:tellerId' element={<TellerStories/>}/>
                <Route path='/author' element={<Author/>}/>
                <Route path='/author/:authorId' element={<AuthorStories/>}/>
                <Route path='/category' element={<Category/>}/>
                <Route path='/category/:categoryId' element={<CateStories/>}/>
                <Route path='/story/:storyId' element={<Story/>}/>
                <Route path='/mostview' element={<MostView/>}/>
                <Route path='/recent' element={<Recent/>}/>
                
              <Route element={<DashboardHeader />}>
                <Route path='/dashboard' element={<ManageStory/>}/>
                <Route path='/dashboard/teller' element={<ManageTeller/>}/>
                <Route path='/dashboard/author' element={<ManageAuthor/>}/>
                <Route path='/dashboard/story/:storyId' element={<DetailStory/>}/>
                <Route path='/dashboard/story/create' element={<CreateStory/>}/>
                <Route path='/dashboard/story/:storyId/edit' element={<UpdateStory/>}/>
                <Route path='/dashboard/category' element={<ManageCategory/>}/>
              </Route>
          </Routes>
        </AppWithContainer>
        </div>
        <AudioPlayerBottom/>
        <Footer/>

    </div>
  );
}

export default App;
