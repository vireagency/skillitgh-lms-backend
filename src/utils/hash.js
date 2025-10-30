const Workshop = require("../models/workshop.model");
import("nanoid");
//const { nanoid } = require("nanoid");

exports.UniqueShareId = async function (length = 10) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, (byte) => ("0" + byte.toString(16)).slice(-2))
    .join("")
    .slice(0, length);
};

exports.generateHash = async (input) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
};

exports.generateShortHash = async (input, length = 10) => {
  const fullHash = await generateHash(input);
  return fullHash.slice(0, length);
};

exports.generateRandomHash = async (length = 10) => {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, (byte) => ("0" + byte.toString(16)).slice(-2))
    .join("")
    .slice(0, length);
};

exports.generateUniqueShareId = async (length = 10) => {
  let id;
  let found = true;

  while (found) {
    id = nanoid(length);
    found = await Workshop.findOne({ shareId: id });
  }
  return id;
};
