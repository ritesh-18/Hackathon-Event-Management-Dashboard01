const express=require("express");
const router=express.Router();
const{
    getAttendees,
    addAttendee,
    deleteAttendee
}=require("../Controllers/attendeeController");
router.post("/", addAttendee);
router.get("/", getAttendees);
router.delete("/:id", deleteAttendee);
module.exports=router;