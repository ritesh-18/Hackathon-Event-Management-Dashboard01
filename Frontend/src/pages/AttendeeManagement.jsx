import React, { useState, useEffect } from 'react';
import AttendeeCard from '../components/AttendeeCard';
import axios from 'axios';

const AttendeeManagement = () => {
  const [attendees, setAttendees] = useState([]);
  const [newAttendee, setNewAttendee] = useState({ name: '', email: '' });

  useEffect(() => {
    fetchAttendees();
  }, []);

  const fetchAttendees = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/attendees');
      setAttendees(response.data.data);
    } catch (error) {
      console.error('Error fetching attendees:', error);
    }
  };

  const addAttendee = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/attendees', newAttendee);
      setAttendees([...attendees, response.data.data]);
      setNewAttendee({ name: '', email: '' });
    } catch (error) {
      console.error('Error adding attendee:', error);
    }
  };

  const removeAttendee = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/attendees/${id}`);
      setAttendees(attendees.filter((a) => a._id !== id));
    } catch (error) {
      console.error('Error deleting attendee:', error);
    }
  };
  console.log(attendees)

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Attendee Management</h2>
      <div className="grid gap-4 mb-6">
        {attendees.map((attendee) => (
          <AttendeeCard
            key={attendee._id}
            attendee={attendee}
            onRemove={() => removeAttendee(attendee._id)}
          />
        ))}
      </div>
      <div className="bg-gray-100 p-4 rounded">
        <h3 className="font-bold">Add New Attendee</h3>
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full my-2"
          value={newAttendee.name}
          onChange={(e) => setNewAttendee({ ...newAttendee, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full my-2"
          value={newAttendee.email}
          onChange={(e) => setNewAttendee({ ...newAttendee, email: e.target.value })}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={addAttendee}
        >
          Add Attendee
        </button>
      </div>
    </div>
  );
};

export default AttendeeManagement;
