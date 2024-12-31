const TaskCard = ({ task, onUpdateStatus }) => (
  <div className="bg-white shadow p-4 rounded">
  <h4 className="font-bold text-lg">{task.name}</h4>
  <p>Status: {task.status}</p>
  <p>Deadline: {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No Deadline'}</p>
  <button
    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
    onClick={onUpdateStatus}
  >
    {task.status === 'Pending' ? 'Mark as Completed' : 'Mark as Pending'}
  </button>
</div>
);

export default TaskCard;
