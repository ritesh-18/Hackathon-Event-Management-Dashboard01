const AttendeeCard = ({ attendee, onRemove }) => (
    <div className="border p-4 rounded shadow-md bg-white">
      <h3 className="text-xl font-bold">{attendee.name}</h3>
      <p><strong>Email:</strong> {attendee.email}</p>
      <button onClick={onRemove} className="bg-red-500 text-white px-2 py-1 mt-2 rounded">
        Remove
      </button>
    </div>
  );
  
  export default AttendeeCard;
  