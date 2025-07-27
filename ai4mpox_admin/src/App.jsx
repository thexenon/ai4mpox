import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import SignIn from './pages/SignIn';
import News from './pages/News';
import AddNews from './pages/add-new/news';
import EditNews from './pages/add-new/editnews';
import Admin from './pages/Admin';
import AddAdmin from './pages/add-new/admin';
import EditAdmin from './pages/add-new/editadmin';
import People from './pages/People';
import AddPeople from './pages/add-new/people';
import EditPeople from './pages/add-new/editpeople';
import Reports from './pages/Reports';
import AddReport from './pages/add-new/report';
import EditReport from './pages/add-new/editreport';
import Slide from './pages/Slide';
import AddSlide from './pages/add-new/slide';
import EditSlide from './pages/add-new/editslide';

function checkCookie(name) {
  return document.cookie
    .split(';')
    .some((c) => c.trim().startsWith(name + '='));
}

function SessionRedirector() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const hasToken = localStorage.getItem('token');
    if (hasToken && location.pathname === '/') {
      navigate('/dashboard', { replace: true });
    } else if (!hasToken && location.pathname !== '/') {
      navigate('/', { replace: true });
    }
  }, [location, navigate]);
  return null;
}

function App() {
  return (
    <Router>
      <SessionRedirector />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/news" element={<News />} />
          <Route path="/add-new/news" element={<AddNews />} />
          <Route path="/add-new/editnews" element={<EditNews />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/add-new/admin" element={<AddAdmin />} />
          <Route path="/add-new/editadmin" element={<EditAdmin />} />
          <Route path="/people" element={<People />} />
          <Route path="/add-new/people" element={<AddPeople />} />
          <Route path="/add-new/editpeople" element={<EditPeople />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/add-new/report" element={<AddReport />} />
          <Route path="/add-new/editreport" element={<EditReport />} />
          <Route path="/slide" element={<Slide />} />
          <Route path="/add-new/slide" element={<AddSlide />} />
          <Route path="/add-new/editslide" element={<EditSlide />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
