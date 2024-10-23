import React, { useEffect } from "react"; // Import React and useEffect hook from React.
import { useForm } from "react-hook-form"; // Import useForm from react-hook-form for form handling.
import { useNavigate } from "react-router-dom"; // Import useNavigate for programmatic navigation.
import Textbox from "../components/Textbox"; // Import a custom Textbox component for input fields.
import Button from "../components/Button"; // Import a custom Button component for form submission.
import { useSelector } from "react-redux"; // Import useSelector to access Redux store state.

const Login = () => {
  // Use useSelector to get the user object from Redux state.
  const { user } = useSelector((state) => state.auth); 

  // Destructure register, handleSubmit, and errors from useForm.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Create a navigate function to redirect users.
  const navigate = useNavigate();

  // Function to handle form submission.
  const submitHandler = async (data) => {
    console.log("submit"); // Log the submitted data (replace with actual login logic).
  };

  // useEffect to navigate to the dashboard if the user is already logged in.
  useEffect(() => {
    user && navigate("/dashboard"); // Redirect to dashboard if user exists.
  }, [user, navigate]); // Dependencies array includes user and navigate.

  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]'>
      <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
        
        {/* Left side of the login page */}
        <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
          <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20'>
            <span className='flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base bordergray-300 text-gray-600'>
              Manage all your tasks in one place!
            </span>
            <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700'>
              <span>Cloud-Based</span>
              <span>Task Manager</span>
            </p>

            {/* Decorative element */}
            <div className='cell'>
              <div className='circle rotate-in-up-left'></div>
            </div>
          </div>
        </div>

        {/* Right side of the login page */}
        <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
          <form
            onSubmit={handleSubmit(submitHandler)} // Handle form submission with react-hook-form.
            className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14'
          >
            <div className=''>
              <p className='text-blue-600 text-3xl font-bold text-center'>
                Welcome back!
              </p>
              <p className='text-center text-base text-gray-700 '>
                Keep all your credentials safe.
              </p>
            </div>

            <div className='flex flex-col gap-y-5'>
              {/* Email input */}
              <Textbox
                placeholder='email@example.com' // Placeholder text for the input.
                type='email' // Input type is email.
                name='email' // Name attribute for the input.
                label='Email Address' // Label for the input.
                className='w-full rounded-full' // Custom styling for the input.
                register={register("email", {
                  required: "Email Address is required!", // Validation rule: required field.
                })}
                error={errors.email ? errors.email.message : ""} // Display error message if exists.
              />
              
              {/* Password input */}
              <Textbox
                placeholder='your password' // Placeholder text for the input.
                type='password' // Input type is password.
                name='password' // Name attribute for the input.
                label='Password' // Label for the input.
                className='w-full rounded-full' // Custom styling for the input.
                register={register("password", {
                  required: "Password is required!", // Validation rule: required field.
                })}
                error={errors.password ? errors.password.message : ""} // Display error message if exists.
              />

              {/* Link for password recovery */}
              <span className='text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer'>
                Forget Password?
              </span>

              {/* Submit button */}
              <Button
                type='submit' // Button type is submit.
                label='Submit' // Button label.
                className='w-full h-10 bg-blue-700 text-white rounded-full' // Custom styling for the button.
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; // Export the Login component for use in other files.
