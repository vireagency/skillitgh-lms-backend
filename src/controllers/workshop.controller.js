const Workshop = require('../models/workshop.model');
const User = require('../models/user.model');
const { sendMail } = require('../utils/email.transport');

exports.getUpcomingWorkshops = async (req, res) => {
  try {
    const today = new Date();
    const upcomingWorkshops = await Workshop.find({ date: { $gte: today }});
    if (!upcomingWorkshops || upcomingWorkshops.length === 0) {
      return res.status(404).json({ success: false, message: "No upcoming workshops found!" });
    }
    res.status(200).json({ success: true, status: "Upcoming", message: "These are the upcoming workshops for you.", workshops: upcomingWorkshops });
  } catch (error) {
    console.error("Error fetching upcoming workshops: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

exports.getPreviousWorkshops = async (req, res) => {
  try {
    const today = new Date();
    const previousWorkshops = await Workshop.find({ date: { $lt: today }});
    if (!previousWorkshops || previousWorkshops.length === 0) {
      return res.status(404).json({ success: false, message: "No previous workshops found!" });
    }
    res.status(200).json({ success: true, status: "Previous", message: "These are the previous workshops for you.", workshops: previousWorkshops });
  } catch (error) {
    console.error("Error fetching previous workshops:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

exports.getWorkshopById = async (req, res) => {
  try {
    const { workshopId } = req.params;
    if (!workshopId) {
      return res.status(400).json({ success: false, message: "Workshop ID is required!" });
    }
    const workshop = await Workshop.findById(workshopId);
    if (!workshop) {
      return res.status(404).json({ success: false, message: "Workshop not found!" });
    }
    res.status(200).json({ success: true, message: "Workshop details fetched successfully.", workshop: workshop });
  } catch (error) {
    console.error("Error fetching workshop by ID:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

exports.createWorkshop = async (req, res) => {
  try {
    const { title, description, date, duration, location, price } = req.body;
    const workshopImage = req.files?.workshopImage?.[0]?.path;
    const resource = req.files?.resource?.map(file => file.path);

    console.log("Workshop Image and Resource:", req.files);

     let facilitator;
    try {
      facilitator = JSON.parse(req.body.facilitator);
    } catch (error) {
      return res.status(400).json({ success: false, message: "Invalid facilitator data!" });
    }

    if (!title || !description || !date || !duration || !facilitator || !location) {
      return res.status(400).json({ success: false, message: "All fields are required!" });
    }
    const existingWorkshop = await Workshop.findOne({ title, date });
    if (existingWorkshop) {
      return res.status(400).json({ success: false, message: "Workshop with this title and date already exists!" });
    }
    const today = new Date();
    const workshopDate = new Date(date);
    if (workshopDate < today) {
      return res.status(400).json({ success: false, message: "Workshop date must be in the future!" });
    }

    const newWorkshop = new Workshop({ title, description, date, duration, facilitator, location, resource, workshopImage, price });

    // if (req.files && req.files.length > 0) {
    //   newWorkshop.resource = req.files.map(file => file.path);
    // }


    await newWorkshop.save();
    res.status(201).json({ success: true, message: "Workshop created successfully.", workshop: newWorkshop });
  } catch (error) {
    console.error("Error creating workshop:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

exports.deleteWorkshop = async (req, res) => {
  try {
    const { workshopId } = req.params;
    if (!workshopId) {
      return res.status(400).json({ success: false, message: "Workshop ID is required!" });
    }
    const deletedWorkshop = await Workshop.findByIdAndDelete(workshopId);
    if (!deletedWorkshop) {
      return res.status(404).json({ success: false, message: "Workshop not found!" });
    }
    res.status(200).json({ success: true, message: "Workshop deleted successfully." });
  } catch (error) {
    console.error("Error deleting workshop:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

exports.registerForWorkshop = async (req, res) => {
  try {
    const { workshopId } = req.params;
    const { userId } = req.user;

    // const workshop = await Workshop.findById(workshopId);
    // if (!workshop) {
    //   return res.status(404).json({ success: false, message: "Workshop not found!" });
    // }
    // const today = new Date();
    // const workshopDate = new Date(workshop.date);
    // if (workshopDate < today) {
    //   return res.status(400).json({ success: false, message: "Cannot register for a past workshop!" });
    // }
    const today = new Date();
    const workshop = await Workshop.findOne({ date: { $gte: today }, _id: workshopId });
    if (!workshop) {
      return res.status(404).json({ success: false, message: "Workshop not found! Make sure you chose an upcoming workshop" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }
    const alreadyRegistered = workshop.attendees.includes(userId) && user.workshops.includes(workshopId);
    if (alreadyRegistered) {
      return res.status(400).json({ success: false, message: "You have already registered for this workshop!" });
    }

    workshop.attendees.push(userId); // Alternatively, you can use workshop.attendees.addToSet(id) to avoid duplicates

    const isRegistered = workshop.attendees.includes(userId);
  
    await workshop.save();

    user.workshops.push(workshopId);
    if (!user.hasChosenPath) {
      user.hasChosenPath = true; 
    }
    
    await user.save();  

    // Send confirmation email
    const email = user.email;
    const subject = "Workshop Registration Confirmation";
    const text = `You have successfully registered for the workshop: ${workshop.title}. \n\nDetails:\nTitle: ${workshop.title}\nDate: ${workshop.date}\nDuration: ${workshop.duration}\nLocation: ${workshop.location}\nPrice: ${workshop.price}`;
    await sendMail({ email, subject, text });

    res.status(200).json({ success: true, message: "Successfully registered for the workshop!", registration: {...workshop.toObject(), isRegistered } });

  } catch (error) {
    console.error("Error registering for workshop!", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

exports.updateWorkshop = async (req, res) => {
  try {
    const { workshopId } = req.params;
    const { title, description, date, duration, location, price } = req.body;
    const workshopImage = req.files?.workshopImage?.[0]?.path;
    const resource = req.files?.resource?.map(file => file.path);

    if (!title || !description || !date || !duration || !location) {
      return res.status(400).json({ success: false, message: "All fields are required!" });
    }
    const workshop = await Workshop.findById(workshopId);
    if (!workshop) {
      return res.status(404).json({ success: false, message: "Workshop not found!" });
    }

    const today = new Date();
    const workshopDate = new Date(date);
    if (workshopDate < today) {
      return res.status(400).json({ success: false, message: "Workshop date must be in the future!" });
    }
    workshop.title = title;
    workshop.description = description;
    workshop.date = date;
    workshop.duration = duration;
    workshop.location = location;
    workshop.price = price;
    if (workshopImage) {
      workshop.workshopImage = workshopImage;
    }
    if (resource) {
      workshop.resource = [...workshop.resource, ...resource];
    }
    await workshop.save();
    res.status(200).json({ success: true, message: "Workshop updated successfully.", workshop });
  } catch (error) {
    console.error("Error updating workshop:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

exports.updateWorkshopResources = async (req, res) => {
  try { 
    const { workshopId } = req.params;
    const workshop = await Workshop.findById(workshopId);
    if (!workshop) {
      return res.status(404).json({ success: false, message: "Workshop not found!"});
    }
    const newResources = req.files?.map(file => file.path);
    workshop.resource = [...workshop.resource, ...newResources]

    await workshop.save();
    res.status(200).json({ success: true, message: "Workshop resources updated successfully.", workshop: workshop.resource });
  } catch (error) {
    console.error("Error updating workshop resources:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

exports.getWorkshopAttendees = async (req, res) => {
  try {
    const { workshopId } = req.params;
    const workshop = await Workshop.findById(workshopId).populate('attendees', 'firstName lastName email');
    if (!workshop) {
      return res.status(404).json({ success: false, message: "Workshop not found!" });
    }
    res.status(200).json({ success: true, message: "Workshop attendees fetched successfully.", attendees: workshop.attendees });
  } catch (error) {
    console.error("Error fetching workshop attendees:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

exports.unregisterFromWorkshop = async (req, res) => {
  try {
    const { workshopId } = req.params;
    const { userId } = req.user;

    const workshop = await Workshop.findById(workshopId);
    if (!workshop) {
      return res.status(404).json({ success: false, message: "Workshop not found!" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }
    const isRegistered = workshop.attendees.includes(userId) && user.workshops.includes(workshopId);
    if (!isRegistered) {
      return res.status(400).json({ success: false, message: "You are not registered for this workshop!" });
    }
    workshop.attendees = workshop.attendees.filter(attendee => attendee.toString() !== userId.toString());
    user.workshops = user.workshops.filter(workshop => workshop.toString() !== workshopId.toString());
    await workshop.save();
    await user.save();

    res.status(200).json({ success: true, message: "Successfully unregistered from the workshop!" });

  } catch (error) {
    console.error("Error unregistering from workshop:", error);
    res.status(500).json({ success: false, messasge: "Internal Server Error" });
  }
}



