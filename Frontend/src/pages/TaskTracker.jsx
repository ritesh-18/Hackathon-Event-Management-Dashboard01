import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from '../components/TaskCard';

const TaskTracker = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    name: '',
    status: 'Pending',
    deadline: '',
    assignedAttendee: [],
  });
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    fetchTasks();
    fetchAttendees();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/tasks');
      setTasks(response.data.task || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchAttendees = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/attendees');
      setAttendees(response.data.data || []);
    } catch (error) {
      console.error('Error fetching attendees:', error);
    }
  };

  const addTask = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/tasks', newTask);
      setTasks([...tasks, response.data]);
      setNewTask({ name: '', status: 'Pending', deadline: '', assignedAttendee: [] });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const updateStatus = async (id) => {
    try {
      const task = tasks.find((task) => task._id === id);
      const updatedTask = {
        ...task,
        status: task.status === 'Pending' ? 'Completed' : 'Pending',
      };

      const response = await axios.put(`http://localhost:3000/api/tasks/${id}`, { status: updatedTask.status });
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const addAttendee = (attendeeId) => {
    if (!newTask.assignedAttendee.includes(attendeeId)) {
      setNewTask((prev) => ({
        ...prev,
        assignedAttendee: [...prev.assignedAttendee, attendeeId],
      }));
    }
  };

  const removeAttendee = (attendeeId) => {
    setNewTask((prev) => ({
      ...prev,
      assignedAttendee: prev.assignedAttendee.filter((id) => id !== attendeeId),
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Task Tracker</h2>
  
      {/* Add New Task Form */}
      <div className="bg-gray-100 p-4 rounded mb-6">
        <h3 className="font-bold">Add New Task</h3>
        <input
          type="text"
          placeholder="Task Name"
          required={true}
          className="border p-2 w-full my-2"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
        />
        <input
          type="date"
          className="border p-2 w-full my-2"
          value={newTask.deadline}
          onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
        />
        <label className="block font-medium my-2">Assign Attendees:</label>
        <div className="relative">
          <select
            className="border p-2 w-full"
            onChange={(e) => addAttendee(e.target.value)}
            value=""
          >
            <option value="" disabled>
              Select Attendee
            </option>
            {attendees
              .filter((attendee) => !newTask.assignedAttendee.includes(attendee._id))
              .map((attendee) => (
                <option key={attendee._id} value={attendee._id}>
                  {attendee.name}
                </option>
              ))}
          </select>
          <div className="mt-2">
            {newTask.assignedAttendee.map((id) => {
              const attendee = attendees.find((attendee) => attendee._id === id);
              return (
                <span
                  key={id}
                  className="inline-flex items-center px-3 py-1 mr-2 bg-blue-500 text-white rounded-full"
                >
                  {attendee?.name}
                  <button
                    className="ml-2 text-red-300 hover:text-red-700"
                    onClick={() => removeAttendee(id)}
                  >
                    &times;
                  </button>
                </span>
              );
            })}
          </div>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={addTask}>
          Add Task
        </button>
      </div>
  
      {/* Task List */}
      <div className="grid gap-4">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} onUpdateStatus={() => updateStatus(task._id)} />
        ))}
      </div>
    </div>
  );
  
};

export default TaskTracker;
