import './App.css';
import Header from './Components/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import { useEffect, useState } from 'react';
import auth from './auth/auth';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.getAccount()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return (
    !loading ? (
      <div className='flex-col h-auto'>
        <div className='w-96 content-center bg-slate-400 m-auto'>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    ) : (
      <div>Loading.....</div>
    )
  );
}

export default App;
