const Workshop = require('../models/workshop.model');
const User = require('../models/user.model');

exports.getUpcomingWorkshops = async (req, res) => {
  try {
    const today = new Date();
    const upcomingWorkshops = await Workshop.find({ date: { $gte: today }});
    if (!upcomingWorkshops || upcomingWorkshops.length === 0) {
      return res.status(404).json({ success: false, message: "No upcoming workshops found!" });
    }
    res.status(200).json({ success: true, message: "These are the upcoming workshops for you.", data: upcomingWorkshops });
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
    res.status(200).json({ success: true, message: "These are the previous workshops for you.", data: previousWorkshops });
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
    res.status(200).json({ success: true, message: "Workshop details fetched successfully.", data: workshop });
  } catch (error) {
    console.error("Error fetching workshop by ID:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

exports.createWorkshop = async (req, res) => {
  try {
    const { title, description, date, duration, facilitator, location, resource } = req.body;
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
    const newWorkshop = new Workshop({ title, description, date, duration, facilitator, location, resource });

    if (req.files && req.files.length > 0) {
      newWorkshop.resource = req.files.map(file => file.path);
    }
    await newWorkshop.save();
    res.status(201).json({ success: true, message: "Workshop created successfully.", data: newWorkshop });
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
    const { id } = req.user;

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
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }
    if (workshop.attendees.includes(id)) {
      return res.status(400).json({ success: false, message: "You are already registered for this workshop!" });
    }

    workshop.attendees.push(id);
    await workshop.save();

    user.workshops.push(workshopId);
    await user.save();

    res.status(200).json({ success: true, message: "Successfully registered for the workshop!", data: workshop });

  } catch (error) {
    console.error("Error registering for workshop!", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}



