import './App.css';
import {Route,Routes} from 'react-router-dom';
import {QueryClientProvider,QueryClient} from 'react-query';
import React from 'react';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SingleMovie from './pages/SingleMovie';

const queryClient=new QueryClient();

function App() {
  
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Routes>
          <Route path='/movies/:movieId' element={<SingleMovie/>}/>
          <Route path='/signUp' element={<SignUp/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/' element={<Home/>} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
