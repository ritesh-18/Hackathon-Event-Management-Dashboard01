const EventCard = ({ event, onEdit, onDelete }) => (
    <div className="border p-4 rounded shadow-md bg-white">
      <h3 className="text-xl font-bold">{event.name}</h3>
      <p>{event.description}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Date:</strong> {event.date}</p>
      <div className="flex justify-end space-x-2 mt-2">
        <button onClick={onEdit} className="bg-green-500 text-white px-2 py-1 rounded">Edit</button>
        <button onClick={onDelete} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
      </div>
    </div>
  );
  
  export default EventCard;
  