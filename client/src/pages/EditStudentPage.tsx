import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { encryptStudentData } from '../utils/crypto';
import CustomSelect from '../components/CustomSelect';
import CustomDatePicker from '../components/CustomDatePicker';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface StudentFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  courseEnrolled: string;
  password: string;
}

const EditStudentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const student = location.state?.student;

  const [formData, setFormData] = useState<StudentFormData>({
    fullName: student?.fullName || '',
    email: student?.email || '',
    phoneNumber: student?.phoneNumber || '',
    dateOfBirth: student?.dateOfBirth || '',
    gender: student?.gender || '',
    address: student?.address || '',
    courseEnrolled: student?.courseEnrolled || '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (!student) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground">Student not found</h2>
          <p className="mt-2 text-muted-foreground">No student data available to edit.</p>
          <button
            onClick={() => navigate('/students')}
            className="mt-4 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
          >
            Back to Students
          </button>
        </div>
      </div>
    );
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Must be 10 digits';
    }
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.courseEnrolled.trim()) newErrors.courseEnrolled = 'Course is required';
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Minimum 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleCustomChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      // Only send fields that have changed or password if provided
      const dataToSend: Record<string, string> = { ...formData };
      if (!dataToSend.password) {
        delete dataToSend.password;
      }

      // Encrypt with Level 1 before sending
      const encryptedData = encryptStudentData(dataToSend);

      await axios.patch(`${API_URL}/student/${student._id}`, encryptedData);
      toast.success('Student updated successfully!');
      setTimeout(() => navigate('/students'), 1500);
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'Update failed. Please try again.';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full rounded-lg border-2 border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors";

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-xl sm:p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/30">
              <svg className="h-7 w-7 text-accent-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-card-foreground">Edit Student</h1>
            <p className="mt-1 text-sm text-muted-foreground">Update information for {student.fullName}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-card-foreground">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={inputClasses}
              />
              {errors.fullName && <span className="mt-1 block text-xs text-destructive">{errors.fullName}</span>}
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-card-foreground">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClasses}
                />
                {errors.email && <span className="mt-1 block text-xs text-destructive">{errors.email}</span>}
              </div>
              <div>
                <label htmlFor="phoneNumber" className="mb-1.5 block text-sm font-medium text-card-foreground">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={inputClasses}
                />
                {errors.phoneNumber && <span className="mt-1 block text-xs text-destructive">{errors.phoneNumber}</span>}
              </div>
            </div>

            {/* DOB & Gender */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="dateOfBirth" className="mb-1.5 block text-sm font-medium text-card-foreground">
                  Date of Birth
                </label>
                <CustomDatePicker
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleCustomChange}
                  placeholder="Select date of birth"
                />
                {errors.dateOfBirth && <span className="mt-1 block text-xs text-destructive">{errors.dateOfBirth}</span>}
              </div>
              <div>
                <label htmlFor="gender" className="mb-1.5 block text-sm font-medium text-card-foreground">
                  Gender
                </label>
                <CustomSelect
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleCustomChange}
                  placeholder="Select Gender"
                  options={[
                    { value: 'Male', label: 'Male' },
                    { value: 'Female', label: 'Female' },
                    { value: 'Other', label: 'Other' },
                  ]}
                />
                {errors.gender && <span className="mt-1 block text-xs text-destructive">{errors.gender}</span>}
              </div>
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="mb-1.5 block text-sm font-medium text-card-foreground">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className={inputClasses}
              />
              {errors.address && <span className="mt-1 block text-xs text-destructive">{errors.address}</span>}
            </div>

            {/* Course & Password */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="courseEnrolled" className="mb-1.5 block text-sm font-medium text-card-foreground">
                  Course Enrolled
                </label>
                <input
                  id="courseEnrolled"
                  type="text"
                  name="courseEnrolled"
                  value={formData.courseEnrolled}
                  onChange={handleChange}
                  className={inputClasses}
                />
                {errors.courseEnrolled && <span className="mt-1 block text-xs text-destructive">{errors.courseEnrolled}</span>}
              </div>
              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-card-foreground">
                  Password <span className="text-muted-foreground">(optional)</span>
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Leave blank to keep current"
                    className="w-full rounded-lg border-2 border-input bg-background px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && <span className="mt-1 block text-xs text-destructive">{errors.password}</span>}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent"></span>
                    Updating...
                  </span>
                ) : (
                  'Update Student'
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate('/students')}
                className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-sm font-medium text-secondary-foreground transition-all hover:bg-muted"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditStudentPage;
