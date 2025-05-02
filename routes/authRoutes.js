// import express from 'express';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// const router = express.Router();

// router.post('/signup', async (req, res) => {
//   const { name, email, password, country } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   try {
//     const user = await User.create({ name, email, password: hashedPassword, country });
//     res.status(201).json({ message: 'User created' });
//   } catch (err) {
//     res.status(400).json({ message: 'User already exists' });
//   }
// });

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user || !(await bcrypt.compare(password, user.password)))
//     return res.status(401).json({ message: 'Invalid credentials' });

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//   res.json({ token });
// });

// export default router;
import express from "express";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;
