import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Favorites from './pages/favorites/favorites';
import Details from './pages/details/details';
import Navbar from './components/navbar/navbar';
import DetailItem from './components/detail-item/detail-item';

function App() {
  //App 컴포넌트를 <BrowerRouter로 감싸준다
  // 쿼리 파라미터(동적으로  URL을 설정하는 페이지)
  return (
    <div className='base-container'>
      <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/favorites' element={<Favorites/>}></Route>
      <Route path='/detail/:id' element={<Details/>}></Route>
    </Routes>

    
 


    </div>
 
  
  );
}

export default App;
