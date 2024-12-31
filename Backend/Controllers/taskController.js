const Task = require('../Models/Task');
const mongoose = require('mongoose');


//here i am creating all the routes for the task
exports.getTasks = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id).populate('assignedAttendee', 'name email');
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json({ task });
    } catch (error) {
      res.status(500).json({ error: error.message, message: 'Error in fetching task' });
    }
  };
  
  exports.getAllTask = async (req, res) => {
    try {
      const tasks = await Task.find().populate('assignedAttendee', 'name email');
      res.status(200).json({ task: tasks });
    } catch (error) {
      res.status(500).json({ error: error.message, message: 'Error in fetching tasks' });
    }
  };
  
  exports.updateTaskStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      if (!['Pending', 'Completed'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }
  
      const updatedTask = await Task.findByIdAndUpdate(id, { status }, { new: true });
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(500).json({ error: error.message, message: 'Error in updating task status' });
    }
  };
  

//creating a task for attendee
exports.createTask=async(req, res)=>{
    try {
        const { name, description, deadline, status, assignedAttendee } = req.body;

        // Validate that assignedAttendee is an array of ObjectId strings
        const assignedAttendeeIds = assignedAttendee.map((id) =>new mongoose.Types.ObjectId(id));
    
        const task = new Task({
          name,
          description,
          deadline,
          status,
          assignedAttendee: assignedAttendeeIds,
        });
    
        await task.save();
        res.status(201).json(task);
        
    } catch (error) {
        res.status(500).json({
            error:error.message,
            message:"Error in creating task"
        })
    }
}
//updating the task Status
// exports.updateTaskStatus=async(req, res)=>{
//     try {
//         const id=req.params.id;
//     const task=await Task.findById(id);
//     if(!task){
//         return res.status(404).json({
//             message:"Task not found"
//         })
//     }
//     const data =req.body;
//     const updatedTask=await Task.findByIdAndUpdate({_id:id} , data, {new:true});
//     res.status(200).json(updatedTask);
    
        
//     } catch (error) {
//         res.status(500).json({
//             error:error.message,
//             message:"Error in updating task status"
//         })
//     }
// }