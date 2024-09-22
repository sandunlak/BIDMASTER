const router = require("express").Router();
const Employee = require("../models/employee"); // Ensure you have the Employee model
const express = require("express");
require("dotenv").config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./authMiddleware');

// Add Employee Route
router.post("/add", async (req, res) => {
  const { fullName, email, jobTitle, } = req.body;

  try {
     

      // Create new employee object
      const newEmployee = new Employee({
          fullName,
          
          email,
         
          jobTitle,
          
      });

      // Save employee to the database
      await newEmployee.save();
      res.json("Employee Added");

  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error occurred" });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find employee by username
    const employee = await Employee.findOne({ username });

    // Check if employee exists
    if (!employee) {
      return res.status(400).json({ message: "Employee not found. Invalid credentials." });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password." });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: employee._id }, process.env.KEY, { expiresIn: '1h' });

    // Return success message and token
    res.json({ message: "Login successful", token });

  } catch (err) {
    // Handle any server error
    res.status(500).json({ message: "Server error" });
  }
});

// Get current employee
router.get('/me', authMiddleware, async (req, res) => {
  try {
    // Find the employee using the ID from the verified token
    const employee = await Employee.findById(req.user.id).select('-password'); // Exclude password
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }
    res.json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error occurred' });
  }
});

// Update Employee Data
router.put('/me', authMiddleware, async (req, res) => {
  try {
      // Find the employee using the ID from the verified token
      const employee = await Employee.findById(req.user.id);
      if (!employee) {
          return res.status(404).json({ message: 'Employee not found.' });
      }
      // Update the employee data
      const { fullName, email, address, contactNumber } = req.body;
      if (fullName) employee.fullName = fullName;
      if (email) employee.email = email;
      if (address) employee.address = address;
      if (contactNumber) employee.contactNumber = contactNumber;
      // Save the updated employee data
      await employee.save();
      res.json(employee);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error occurred' });
  }
});

// Route to get all employees
router.get("/all", async (req, res) => {
  try {
      const employees = await Employee.find({}, '-password -username'); // Exclude password and username
      res.json(employees);
  } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
  }
});

// Route to delete an employee by ID
router.delete('/delete/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const deletedEmployee = await Employee.findByIdAndDelete(id);
      if (!deletedEmployee) {
          return res.status(404).json({ message: "Employee not found" });
      }
      res.json({ message: "Employee deleted successfully", employeeId: id });
  } catch (err) {
      res.status(500).json({ message: "Error deleting employee", error: err.message });
  }
});

module.exports = router;