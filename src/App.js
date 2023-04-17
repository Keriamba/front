import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import MyWords from './pages/mywords/MyWords';
import GetWords from './pages/getwords/GetWords';
import Phrases from './pages/phrases/Phrases';
import LevelTwo from './pages/mywords/leveltwo/LevelTwo';
import LevelThree from './pages/mywords/levelthree/LevelThree';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Login from './pages/login/Login';
import { fetchAuthMe } from './components/other/slices/auth';
import Registration from './pages/registration/Registration';
import LevelOne from './pages/mywords/levelone/LevelOne';

function App() {
  const dispatch = useDispatch()
/*   const isAuth = useSelector(boolAuthResult);
 */
  useEffect(() => {
    dispatch(fetchAuthMe())

  }, [dispatch])


  return (
    <div className="App">

      <Header />
      <Routes>
        <Route path='/' element={<GetWords />} />
        <Route path='/getwords' element={<GetWords />} />
        <Route exact path='/mywords/level-two' element={<LevelTwo />} />
        <Route exact path='/mywords/level-three' element={<LevelThree />} />
        <Route exact path='/mywords/level-one' element={<LevelOne />} />
        <Route exact path='/mywords' element={<MyWords />} />
        <Route path='/phrases' element={<Phrases />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Registration/>} />
      </Routes>

    </div>
  );
}

export default App;
