import axios from "axios";

const API_URL = "http://localhost:8000/shifts/";

// Get all shifts
const getAllShifts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data: allShifts } = await axios.get(API_URL, config);
  return allShifts;
};

// Create new shift
const createNewShift = async (token, newShift) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const status = await axios.post(API_URL, newShift, config);

  return status.data;
};

// Get shift by id
const getShiftById = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const shift = await axios.get(API_URL + id, config);

  return shift.data;
};

// Update shift
const updateShift = async (token, updatedShift) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const status = await axios.put(API_URL + updatedShift.id, updatedShift, config);
  return status.data
};


// NOT DELETED! //

const shiftService = {
  createNewShift,
  getShiftById,
  updateShift,
  getAllShifts,
};

export default shiftService;
