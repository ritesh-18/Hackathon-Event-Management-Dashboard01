const express=require("express");
const {creatEvent,getEvents,updateEvent,deleteEvent} = require("../Controllers/eventController");
const router =express.Router();

router.post("/" , creatEvent);
router.get("/", getEvents);
router.put("/:id",updateEvent);
router.delete("/:id",deleteEvent);
module.exports=router;