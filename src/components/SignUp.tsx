import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { toast } from './ui/use-toast';
import { ToastAction } from './ui/toast';
import { signIn } from '@/auth/helpers';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    birthDay: '1',
    role:"user",
    birthMonth: 'Jan',
    birthYear: '2023',
    gender: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    axios
      .post(`/api/users/create`, formData)
      .then(async (response: any) => {
        console.log("response in register ", response);
        if (response.data.success) {
          toast({
            variant: "default",
            title: response?.data?.message,
          });
          const data = response?.data?.data[0];
          console.log('data', data);
          await signIn("credentials", {
            redirect: false,
            email: data?.email,
            password: data?.password,
          });
          // router.push("/");
        }
      })
      .catch((error) => { 
        if (error?.response?.data?.error) {
        console.log("error in register ", error?.response?.data?.error);
        toast({
          variant: "destructive",
          title: error?.response?.data?.error,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
        console.log("error in register ", error);
      });
  };

  return (
    <div className="flex justify-center items-center  bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-2">Sign Up</h2>
        <p className="mb-4">It quick and easy.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First name"
              className="w-1/2 px-4 py-2 border border-red-500 rounded-md"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-1/2 px-4 py-2 border border-red-500 rounded-md"
            />
          </div>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Mobile number or email address"
            className="w-full px-4 py-2 border border-red-500 rounded-md"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="New password"
            className="w-full px-4 py-2 border rounded-md"
          />
          <div className="flex space-x-2">
            <select
              name="birthDay"
              value={formData.birthDay}
              onChange={handleChange}
              className="w-1/3 px-4 py-2 border rounded-md"
            >
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              name="birthMonth"
              value={formData.birthMonth}
              onChange={handleChange}
              className="w-1/3 px-4 py-2 border rounded-md"
            >
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              name="birthYear"
              value={formData.birthYear}
              onChange={handleChange}
              className="w-1/3 px-4 py-2 border rounded-md"
            >
              {Array.from({ length: 100 }, (_, i) => (
                <option key={2023 - i} value={2023 - i}>
                  {2023 - i}
                </option>
              ))}
            </select>
          </div>
          <div className="flex space-x-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
                className="mr-2"
              />
              Female
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
                className="mr-2"
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="custom"
                checked={formData.gender === 'custom'}
                onChange={handleChange}
                className="mr-2"
              />
              Custom
            </label>
          </div>
          <button type="submit" className="w-full py-2 bg-green-600 text-white font-bold rounded-md">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
