import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-blue-500 text-white p-4">
    <div className="container mx-auto flex justify-between">
      <h1 className="text-lg font-bold">
      <Link to="/home" className="hover:underline">Event Dashboard</Link></h1>
      <div className="space-x-4">
        <Link to="/events" className="hover:underline">Events</Link>
        <Link to="/attendees" className="hover:underline">Attendees</Link>
        <Link to="/tasks" className="hover:underline">Tasks</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
