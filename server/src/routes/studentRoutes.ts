import { Router } from 'express';
import {
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent,
  loginStudent,
} from '../controllers/studentController';

const router = Router();


router.post('/register', createStudent);


router.post('/login', loginStudent);


router.get('/students', getStudents);


router.patch('/student/:id', updateStudent);


router.delete('/student/:id', deleteStudent);

export default router;
