import React, { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import { toast, ToastContainer } from 'react-toastify';  // Import react-toastify
import 'react-toastify/dist/ReactToastify.css';  // Import CSS

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ name: '', description: '', location: '', date: '' });
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  // Fetch events from API (Read operation)
  const fetchEvents = async () => {
    const response = await fetch('http://localhost:3000/api/events');
    const data = await response.json();
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents(); // Initial fetch
  }, []);

  // Add new event (Create operation)
  const addEvent = async () => {
    const response = await fetch('http://localhost:3000/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvent),
    });

    const data = await response.json();
    setNewEvent({ name: '', description: '', location: '', date: '' });
    fetchEvents(); // Re-fetch events after adding a new one
    toast.success('Event added successfully!'); // Show success toast
  };

  // Delete event (Delete operation)
  const deleteEvent = async (id) => {
    await fetch(`http://localhost:3000/api/events/${id}`, {
      method: 'DELETE',
    });
    fetchEvents(); // Re-fetch events after deletion
    toast.error('Event deleted successfully!'); // Show error toast on delete
  };

  // Open edit dialog for updating an event
  const openEditDialog = (event) => {
    setCurrentEvent(event);
    setIsEditDialogOpen(true);
  };

  // Update event (Update operation)
  const updateEvent = async () => {
    const response = await fetch(`http://localhost:3000/api/events/${currentEvent._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentEvent),
    });

    const updatedEvent = await response.json();
    setCurrentEvent(null);
    setIsEditDialogOpen(false);
    fetchEvents(); // Re-fetch events after update
    toast.success('Event updated successfully!'); // Show success toast on update
  };

  return (
    <div className="container mx-auto p-4 flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Event Management</h2>

      {/* Add New Event Form */}
      <div className="bg-gray-100 p-4 rounded mb-6">
        <h3 className="font-bold">Add New Event</h3>
        <input
          type="text"
          required={true}
          placeholder="Event Name"
          className="border p-2 w-full my-2"
          value={newEvent.name}
          onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
        />
        <textarea
          placeholder="Description"
          required={true}
          className="border p-2 w-full my-2"
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          required={true}
          className="border p-2 w-full my-2"
          value={newEvent.location}
          onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
        />
        <input
          type="date"
          className="border p-2 w-full my-2"
          required={true}
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={addEvent}
        >
          Add Event
        </button>
      </div>

      {/* Event Cards Grid */}
      <div className="grid gap-4 mb-6 flex-grow">
        {events.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            onEdit={() => openEditDialog(event)}
            onDelete={() => deleteEvent(event._id)}
          />
        ))}
      </div>

      {/* Edit Dialog */}
      {isEditDialogOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">Edit Event</h3>
            <input
              type="text"
              placeholder="Event Name"
              className="border p-2 w-full my-2"
              value={currentEvent.name}
              onChange={(e) =>
                setCurrentEvent({ ...currentEvent, name: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              className="border p-2 w-full my-2"
              value={currentEvent.description}
              onChange={(e) =>
                setCurrentEvent({ ...currentEvent, description: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Location"
              className="border p-2 w-full my-2"
              value={currentEvent.location}
              onChange={(e) =>
                setCurrentEvent({ ...currentEvent, location: e.target.value })
              }
            />
            <input
              type="date"
              className="border p-2 w-full my-2"
              value={currentEvent.date}
              onChange={(e) =>
                setCurrentEvent({ ...currentEvent, date: e.target.value })
              }
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setIsEditDialogOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={updateEvent}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default EventManagement;
