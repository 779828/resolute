import { Router } from 'express';
import {
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent,
  loginStudent,
} from '../controllers/studentController';

const router = Router();

// POST /api/register - Create a new student
router.post('/register', createStudent);

// POST /api/login - Login
router.post('/login', loginStudent);

// GET /api/students - Get all students
router.get('/students', getStudents);

// PATCH /api/student/:id - Update a student
router.patch('/student/:id', updateStudent);

// DELETE /api/student/:id - Delete a student
router.delete('/student/:id', deleteStudent);

export default router;
