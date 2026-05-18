import { Request, Response } from 'express';
import Student, { IStudent } from '../models/Student';
import { encryptLevel2, decryptLevel2 } from '../utils/crypto';

const ENCRYPTED_FIELDS: (keyof Pick<IStudent, 'fullName' | 'email' | 'phoneNumber' | 'dateOfBirth' | 'gender' | 'address' | 'courseEnrolled' | 'password'>)[] = [
  'fullName',
  'email',
  'phoneNumber',
  'dateOfBirth',
  'gender',
  'address',
  'courseEnrolled',
  'password',
];


function encryptStudentData(data: Record<string, any>): Record<string, any> {
  const encrypted = { ...data };
  for (const field of ENCRYPTED_FIELDS) {
    if (encrypted[field]) {
      encrypted[field] = encryptLevel2(encrypted[field]);
    }
  }
  return encrypted;
}


function decryptStudentData(student: Record<string, any>): Record<string, any> {
  const decrypted = { ...student };
  for (const field of ENCRYPTED_FIELDS) {
    if (decrypted[field]) {
      try {
        decrypted[field] = decryptLevel2(decrypted[field]);
      } catch (error) {
        // If decryption fails, return as-is
        console.error(`Failed to decrypt field ${field}:`, error);
      }
    }
  }
  return decrypted;
}


export const createStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const studentData = req.body;

    // Apply Level 2 encryption before storing
    const encryptedData = encryptStudentData(studentData);

    const student = new Student(encryptedData);
    const savedStudent = await student.save();

    res.status(201).json({
      success: true,
      message: 'Student registered successfully',
      data: { id: savedStudent._id },
    });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({
        success: false,
        message: 'Email already exists',
      });
      return;
    }
    res.status(500).json({
      success: false,
      message: 'Error creating student',
      error: error.message,
    });
  }
};


export const getStudents = async (_req: Request, res: Response): Promise<void> => {
  try {
    const students = await Student.find().lean();

    const decryptedStudents = students.map((student) => {
      const obj = decryptStudentData(student as Record<string, any>);
      return {
        _id: student._id,
        fullName: obj.fullName,
        email: obj.email,
        phoneNumber: obj.phoneNumber,
        dateOfBirth: obj.dateOfBirth,
        gender: obj.gender,
        address: obj.address,
        courseEnrolled: obj.courseEnrolled,
        password: obj.password,
        createdAt: student.createdAt,
        updatedAt: student.updatedAt,
      };
    });

    res.status(200).json({
      success: true,
      data: decryptedStudents,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching students',
      error: error.message,
    });
  }
};


export const updateStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;


    const encryptedData = encryptStudentData(updateData);

    const updatedStudent = await Student.findByIdAndUpdate(id, encryptedData, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updatedStudent) {
      res.status(404).json({
        success: false,
        message: 'Student not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
    });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({
        success: false,
        message: 'Email already exists',
      });
      return;
    }
    res.status(500).json({
      success: false,
      message: 'Error updating student',
      error: error.message,
    });
  }
};


export const deleteStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      res.status(404).json({
        success: false,
        message: 'Student not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error deleting student',
      error: error.message,
    });
  }
};


export const loginStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
      return;
    }


    const encryptedEmail = encryptLevel2(email);

    const student = await Student.findOne({ email: encryptedEmail }).lean();

    if (!student) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
      return;
    }

    const encryptedPassword = encryptLevel2(password);

    if (student.password !== encryptedPassword) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        id: student._id,
        fullName: decryptLevel2(student.fullName),
        email: decryptLevel2(student.email),
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message,
    });
  }
};
