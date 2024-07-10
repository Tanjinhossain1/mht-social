"use client";
import { signIn } from "@/auth/helpers";
import SignUp from "@/components/SignUp";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";
import React from "react";
import { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });
      window.location.reload()
      // router.push(res);
      console.log("Login successful", res);
    } catch (err: any) {
      console.error("Login error", err.message);
      // setError(err.message || 'An error occurred');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-6xl font-bold text-blue-600">MHT SOCIAL</h1>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address or phone number"
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-bold rounded-md"
          >
            Log In
          </button>
          <a href="#" className="block text-center text-blue-600 mt-2">
            Forgotten password?
          </a>
          <hr className="my-4" />
        </form>
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="w-full py-2 bg-green-600 text-white font-bold rounded-md"
              >
                Create new account
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
               <SignUp />
              </DialogHeader>
              {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
            </DialogContent>
          </Dialog>
      </div>
    </div>
  );
}
