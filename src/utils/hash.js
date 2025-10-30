const Workshop = require("../models/workshop.model");

exports.generateUniqueShareId = async (length = 10) => {
  let id;
  let found = true;

  const { nanoid } = await import("nanoid");

  while (found) {
    id = nanoid(length);
    found = await Workshop.findOne({ shareId: id });
  }
  return id;
};
