import './App.css';
import Home from './Component/home/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Meals from './Component/meal/meals';
import DetailMeal from './Component/detailMeal/detailMeal';

function App() {

  return (
   <>
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<><Home/></>}/>
        <Route path='/meals/:ingredients' exact element={<><Meals/></>}/>
        <Route path='/meals/:ingredients/:meal' exact element={<><DetailMeal/></>}/>
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
