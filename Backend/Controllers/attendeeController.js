//importing the model of attendee 
const Attendee =require("../Models/Attendee");
//cretaing the controllers for this model

//add an attendee
exports.addAttendee=async(req, res)=>
{
    try {
        const attendee=await Attendee.create(req.body);
        res.status(201).json({
            message:"Attendee added successfully",
            data:attendee
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            
        })
        
    }
}

//get all the attendees
exports.getAttendees=async(req, res)=>{
    try {
        const attendees=await Attendee.find();
        res.status(200).json({
            message:"All attendees fetched successfully",
            data:attendees
        })
        
    } catch (error) {
        res.status(500).json({
            message:error.message,

        })
    }
}
//delete attendee
exports.deleteAttendee=async(req, res)=>{
    try {
        const attendee= await Attendee.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message:"Attendee deleted successfully",
            data:attendee
        })
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}