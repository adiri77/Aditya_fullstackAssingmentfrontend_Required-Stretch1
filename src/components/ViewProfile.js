// src/components/ViewProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ViewProfile.css';  // Import custom CSS for styling

const ViewProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/profiles/${id}`);
        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch profile details:', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>Profile not found.</p>;

  return (
    <div className="profile-view-container">
      <div className="profile-header">
        <img src={profile.avatar || 'https://static.vecteezy.com/system/resources/previews/011/490/381/original/happy-smiling-young-man-avatar-3d-portrait-of-a-man-cartoon-character-people-illustration-isolated-on-white-background-vector.jpg'} alt="Profile Avatar" className="profile-avatar"/>
        <h2>{profile.name}</h2>
        <h5 className="profile-subtitle">{profile.title}</h5>
      </div>
      <div className="profile-body">
        <p className="profile-bio">{profile.bio}</p>
        <div className="profile-skills">
          {profile.techStack.map((tech, index) => (
            <span key={index} className="skill-tag">{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
