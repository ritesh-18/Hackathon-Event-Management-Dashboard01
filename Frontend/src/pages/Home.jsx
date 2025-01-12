import React , { useState, useEffect } from 'react';
import EventCard from "../components/EventCard";


const Home = () => {
    //in this component we are just displaying a welcome message along with all the Events that are available
    const [events, setEvents] = useState([]);
      const fetchEvents = async () => {
        const response = await fetch('http://localhost:3000/api/events');
        const data = await response.json();
        setEvents(data);
      };
    
      useEffect(() => {
        fetchEvents(); // Initial fetch
      }, []);
  return (
    <div className="p-4 mt-2">
        <div className='flex justify-center items-center'>
        <h1 className='text-3xl'> Welcome To Event Management System</h1>
       
        </div>
      
        <div className='flex justify-center items-center'>
        <h1 className='text-3xl text-green-700'>Current Events</h1>
       
        </div>
        
      
      {/* Events displaying card */}
      <div className="grid gap-4 mb-6 mt-5 flex-grow">
        {events.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            onEdit={() => openEditDialog(event)}
            onDelete={() => deleteEvent(event._id)}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
