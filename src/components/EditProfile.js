import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    fieldOfInterest: '',
    seeking: '',
    techStack: '',
    hireable: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
          const { data } = await axios.get(`https://aditya-fullstackassingmentbackend-os9x.onrender.com/api/profiles/${id}`);
          setFormData({
              name: data.name,
              email: data.email,
              bio: data.bio,
              location: data.location,
              fieldOfInterest: data.fieldOfInterest[0], // Assuming it's an array, take the first element
              seeking: data.seeking[0], // Same here
              techStack: data.techStack.join(', '),
              hireable: data.hireable,
          });
          setLoading(false);
      } catch (err) {
          console.error('Error fetching profile data:', err);
          setError('Failed to load profile data.');
          setLoading(false);
      }
  };
  
    
    fetchProfile();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value,
    }));
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Prepare data for sending, ensure arrays are properly formatted
      const updateData = {
        ...formData,
        fieldOfInterest: formData.fieldOfInterest.split(',').map(item => item.trim()),
        techStack: formData.techStack.split(',').map(item => item.trim()),
      };
      // Send the PATCH request to the backend
      await axios.patch(`https://aditya-fullstackassingmentbackend-os9x.onrender.com/api/profiles/${id}`, updateData);
      navigate('/'); // Navigate away after successful update
      setLoading(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile.');
      setLoading(false);
    }
};


  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="bio" className="form-label">Bio</label>
          <textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="fieldOfInterest" className="form-label">Field of Interest (comma-separated)</label>
          <input type="text" id="fieldOfInterest" name="fieldOfInterest" value={formData.fieldOfInterest} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="seeking" className="form-label">Seeking Employment?</label>
          <select id="seeking" name="seeking" value={formData.seeking} onChange={handleChange} className="form-select">
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="techStack" className="form-label">Tech Stack (comma-separated)</label>
          <input type="text" id="techStack" name="techStack" value={formData.techStack} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" id="hireable" name="hireable" checked={formData.hireable} onChange={handleChange} className="form-check-input" />
          <label htmlFor="hireable" className="form-check-label">Hireable</label>
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
