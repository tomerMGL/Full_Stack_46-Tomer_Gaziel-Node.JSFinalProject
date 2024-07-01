const departmentModel = require("../Models/departmentModel");
const employeeModel = require("../Models/employeeModel");
const shiftsModel = require("../Models/shiftModel");

const fakeData = async () => {
  // set departments
  const newDepartments = await departmentModel.insertMany([
    { name: "R&D" },
    { name: "CREATIVE" },
    { name: "PRODUCT" },
    { name: "MARKETING" },
    { name: "ANALYTICS" },
    { name: "FINANCE & LEGAL" },
    { name: "HR" },
    { name: "CUSTOMER SERVICE" },
    { name: "DATA & AI" },
    { name: "SECURITY IT" },
    { name: "QA" },
  ]);

  //   set employees
  const newEmployees = await employeeModel.insertMany([
    {
      firstName: "Pamela",
      lastName: "J. Borelli",
      startWorkYear: "2008",
      departmentId: newDepartments[0]._id,
    },
    {
      firstName: "Edwardo",
      lastName: "E. Godwin",
      startWorkYear: "2013",
      departmentId: newDepartments[1]._id,
    },
    {
      firstName: "James",
      lastName: "C. Smith",
      startWorkYear: "2020",
      departmentId: newDepartments[3]._id,
    },
    {
      firstName: "Mildred",
      lastName: "D. Kemper",
      startWorkYear: "2020",
      departmentId: newDepartments[0]._id,
    },
    {
      firstName: "Margaret",
      lastName: "S. Smith",
      startWorkYear: "2023",
      departmentId: newDepartments[2]._id,
    },
    {
      firstName: "Joshua",
      lastName: "D. Hoffman",
      startWorkYear: "2024",
      departmentId: newDepartments[1]._id,
    },
    {
      firstName: "Charles",
      lastName: "E. Garrison",
      startWorkYear: "2021",
      departmentId: newDepartments[3]._id,
    },
    {
      firstName: "William",
      lastName: "A. Hughes",
      startWorkYear: "2019",
      departmentId: newDepartments[5]._id,
    },
    {
      firstName: "Anita",
      lastName: "M. Nedd",
      startWorkYear: "2019",
      departmentId: newDepartments[4]._id,
    },
    {
      firstName: "Kenneth",
      lastName: "L. Moody",
      startWorkYear: "2017",
      departmentId: newDepartments[2]._id,
    },
    {
      firstName: "Robert",
      lastName: "B. Welch",
      startWorkYear: "2016",
      departmentId: newDepartments[0]._id,
    },
    {
      firstName: "Harold",
      lastName: "B. Tanner",
      startWorkYear: "2018",
      departmentId: newDepartments[5]._id,
    },
    {
      firstName: "Diana",
      lastName: "R. Dunlap",
      startWorkYear: "2019",
      departmentId: newDepartments[6]._id,
    },
    {
      firstName: "Michael",
      lastName: "B. Rivera",
      startWorkYear: "2020",
      departmentId: newDepartments[8]._id,
    },
    {
      firstName: "John",
      lastName: "J. Alvares",
      startWorkYear: "2021",
      departmentId: newDepartments[7]._id,
    },
    {
      firstName: "Susan",
      lastName: "J. Bloomquist",
      startWorkYear: "2022",
      departmentId: newDepartments[6]._id,
    },
    {
      firstName: "Jane",
      lastName: "S. Bryan",
      startWorkYear: "2022",
      departmentId: newDepartments[8]._id,
    },
    {
      firstName: "Jessica",
      lastName: "J. Long",
      startWorkYear: "2022",
      departmentId: newDepartments[9]._id,
    },
    {
      firstName: "Vicente",
      lastName: "A. Westcott",
      startWorkYear: "2023",
      departmentId: newDepartments[4]._id,
    },
    {
      firstName: "Jennifer",
      lastName: "D. Smith",
      startWorkYear: "2024",
      departmentId: newDepartments[9]._id,
    },
    {
      firstName: "Theresa",
      lastName: "J. Gray",
      startWorkYear: "2008",
      departmentId: newDepartments[10]._id,
    },
    {
      firstName: "Wesley",
      lastName: "E. Jones",
      startWorkYear: "2009",
      departmentId: newDepartments[9]._id,
    },
  ]);

  //   Added random managers
  for (let i = 0; i < newDepartments.length; i++) {
    await departmentModel.findByIdAndUpdate(newDepartments[i]._id, {
      manager: newEmployees[getRandomNumber(10)]._id,
    });
  }

  const newShifts = await shiftsModel.insertMany([
    { date: new Date(), startingHour: "08:00", endingHour: "10:00" },
    { date: new Date(), startingHour: "10:00", endingHour: "12:00" },
    { date: new Date(), startingHour: "12:00", endingHour: "14:00" },
    { date: new Date(), startingHour: "14:00", endingHour: "16:00" },
    { date: new Date(), startingHour: "16:00", endingHour: "18:00" },
    { date: new Date(), startingHour: "18:00", endingHour: "20:00" },
  ]);

  
};

const getRandomNumber = (max) => Math.floor(Math.random() * max);

module.exports = fakeData;
