const Event=require("../Models/Event");

//here i am writing the logic of eventController
exports.creatEvent=async(req, res)=>{
    try {
        const data =req.body;
        const event=await Event.create(data);
        res.status(201).json(event);
        
    } catch (error) {
        res.status(400).json({
            message:error.message,
            status:"fail while creating event"
        })
    }
}
// here i am writing the logic of getEvents
exports.getEvents=async(req, res)=>{
    try {
        // fetching data from database
        const events = await Event.find();
        res.status(200).json(events);
        
    } catch (error) {
        res.status(400).json({
            message:error.message,
            status:"fail while fetching events data from Database"
        })
    }
}
// here i am writing the logic of updateEvent
exports.updateEvent=async(req, res)=>{
    try {
        const id=req.params.id;
        const data =req.body;
        //fetch that data from db and update it 
        const event =await Event.findByIdAndUpdate({_id:id},data,{new:true});
        res.status(200).json(event);
        
    } catch (error) {
        res.status(400).json({
            message:error.message,
            status:"fail while updating event"
        })
    }
}
// here i am writing the logic of deleteEvent
exports.deleteEvent=async(req, res)=>{
    try {
        const id=req.params.id;
        console.log(id)
        //fetch that data from db and delete it
        const event=await Event.findByIdAndDelete({_id:id});
         res.status(200).json({
            message:"Event deleted successfully",
            status:"success"
         })
        
    } catch (error) {
        res.status(400).json({
            message:error.message,
            status:"fail while deleting event"
        })
    }
}