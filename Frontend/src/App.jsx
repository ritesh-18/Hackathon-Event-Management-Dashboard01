import React from 'react';
import { BrowserRouter as Router, Routes, Route , Outlet} from 'react-router-dom';
import Navbar from './components/Navbar';
import EventManagement from './pages/EventManagement';
import AttendeeManagement from './pages/AttendeeManagement';
import TaskTracker from './pages/TaskTracker';
import Signin from './pages/Signin';
import Home from './pages/Home';

const Layout = () => (
  <>
    <Navbar />
    <Outlet /> {/* This is where nested routes will render */}
  </>
);

const App = () => (
  <Router>
    <Routes>
      {/* Signin Route */}
      <Route path="/signin" element={<Signin />} />

      {/* Main Layout with Navbar */}
      <Route path="/" element={<Layout />}>
        {/* Nested Routes */}
        <Route path="home" element={<Home />} />
        <Route path="events" element={<EventManagement />} />
        <Route path="attendees" element={<AttendeeManagement />} />
        <Route path="tasks" element={<TaskTracker />} />
      </Route>
    </Routes>
  </Router>
);
export default App;
