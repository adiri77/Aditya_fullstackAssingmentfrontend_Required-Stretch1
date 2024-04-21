import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';  // Ensure the path is correct

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    dateOfGrad: '',
    githubUsername: '',
    websiteUrl: '',
    bio: '',
    location: '',
    fieldOfInterest: '',
    seeking: '',
    techStack: [''],
    hireable: false,
  });

  const { login } = useAuth();  // Destructure login method from useAuth
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleTechStackChange = (index) => (e) => {
    const newTechStack = [...formData.techStack];
    newTechStack[index] = e.target.value;
    setFormData({ ...formData, techStack: newTechStack });
  };

  const addTechStackInput = () => {
    setFormData({ ...formData, techStack: [...formData.techStack, ''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirmation) {
      alert('Passwords do not match!');
      return;
    }
    try {
      const response = await axios.post('https://aditya-fullstackassingmentbackend-os9x.onrender.com/api/signup', {
          ...formData,
          techStack: formData.techStack.filter((tech) => tech !== '')
      });
      if (response.data.token && response.data.userId) {
          login(response.data.token, response.data.userId); 
          navigate('/');
      }
      await axios.post('https://aditya-fullstackassingmentbackend-os9x.onrender.com/api/register', {
        email: formData.email,
        password: formData.password, // Consider encrypting the password or handling it securely
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message); // Show error message from backend
      } else {
        console.error('Error creating profile:', error);
      }
    }
  };
  // Remainder of the component (form inputs, etc.) remains unchanged
  return (
    <div className="container mt-4">
      <h2>Academy Student Sign Up</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        {/* Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
<div className="mb-3">
  <label htmlFor="email" className="form-label">Email</label>
  <input
    type="email"
    className="form-control"
    id="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    required
    placeholder="Enter your email"
  />
</div>

{/* Password */}
<div className="mb-3">
  <label htmlFor="password" className="form-label">Password</label>
  <input
    type="password"
    className="form-control"
    id="password"
    name="password"
    value={formData.password}
    onChange={handleChange}
    required
    placeholder="Enter a password"
  />
</div>

{/* Password Confirmation */}
<div className="mb-3">
  <label htmlFor="passwordConfirmation" className="form-label">Confirm Password</label>
  <input
    type="password"
    className="form-control"
    id="passwordConfirmation"
    name="passwordConfirmation"
    value={formData.passwordConfirmation}
    onChange={handleChange}
    required
    placeholder="Confirm your password"
  />
</div>

{/* Date of Graduation */}
<div className="mb-3">
  <label htmlFor="dateOfGrad" className="form-label">Date of Graduation</label>
  <input
    type="date"
    className="form-control"
    id="dateOfGrad"
    name="dateOfGrad"
    value={formData.dateOfGrad}
    onChange={handleChange}
    required
  />
</div>

{/* Github Username */}
<div className="mb-3">
  <label htmlFor="githubUsername" className="form-label">GitHub Username</label>
  <input
    type="text"
    className="form-control"
    id="githubUsername"
    name="githubUsername"
    value={formData.githubUsername}
    onChange={handleChange}
    placeholder="Enter your GitHub username"
  />
</div>

{/* Website URL */}
<div className="mb-3">
  <label htmlFor="websiteUrl" className="form-label">Website URL</label>
  <input
    type="url"
    className="form-control"
    id="websiteUrl"
    name="websiteUrl"
    value={formData.websiteUrl}
    onChange={handleChange}
    placeholder="https://yourwebsite.com"
  />
</div>

{/* Bio */}
<div className="mb-3">
  <label htmlFor="bio" className="form-label">Bio</label>
  <textarea
    className="form-control"
    id="bio"
    name="bio"
    value={formData.bio}
    onChange={handleChange}
    rows="3"
    placeholder="Tell us a little about yourself"
  ></textarea>
</div>

{/* Location */}
<div className="mb-3">
  <label htmlFor="location" className="form-label">Location</label>
  <select
    className="form-select"
    id="location"
    name="location"
    value={formData.location}
    onChange={handleChange}
    required
  >
    <option value="">Select your location</option>
    <option value="Brisbane">Brisbane</option>
    {/* Add more location options here */}
  </select>
</div>

{/* Field of Interest */}
<div className="mb-3">
  <label htmlFor="fieldOfInterest" className="form-label">Field of Interest</label>
  <select
    className="form-select"
    id="fieldOfInterest"
    name="fieldOfInterest"
    value={formData.fieldOfInterest}
    onChange={handleChange}
    required
  >
    <option value="">Select your field of interest</option>
    <option value="Security">Security</option>
    {/* Add more fields of interest here */}
  </select>
</div>

        
        {/* Tech Stack - dynamically add tech stack fields */}
        <div className="mb-3">
          <label htmlFor="techStack" className="form-label">Tech Stack</label>
          {formData.techStack.map((tech, index) => (
            <input
              key={index}
              type="text"
              className="form-control mb-2"
              id={`techStack-${index}`}
              value={tech}
              onChange={handleTechStackChange(index)}
              placeholder={`Tech #${index + 1}`}
            />
          ))}
          <button type="button" onClick={addTechStackInput} className="btn btn-secondary btn-sm">Add Tech</button>
        </div>

        {/* Hireable Toggle */}
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="hireable"
            name="hireable"
            checked={formData.hireable}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="hireable">Hireable</label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
