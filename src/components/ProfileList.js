import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Profile from './Profile';

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('name'); // Initial sort by name

  useEffect(() => {
    fetchProfiles();
  }, [searchTerm, sortKey]); // React to changes in searchTerm or sortKey

  const fetchProfiles = async () => {
    try {
      const url = searchTerm.trim()
        ? `https://aditya-fullstackassingmentbackend-os9x.onrender.com/api/profiles/search?search=${encodeURIComponent(searchTerm)}&sort=${sortKey}`
        : `https://aditya-fullstackassingmentbackend-os9x.onrender.com/api/profiles?sort=${sortKey}`;
      const response = await axios.get(url);
      setProfiles(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortKey(e.target.value);
  };

  const handleDeleteProfile = async (profileId) => {
    // Optimistically remove the profile from the UI
    const updatedProfiles = profiles.filter(profile => profile._id !== profileId);
    setProfiles(updatedProfiles);
  // console.log(profileId,"++++++++++++++++++++++++++++++++++++++------------------------+");
  //   try {
  //     await axios.delete(`https://aditya-fullstackassingmentbackend-os9x.onrender.com/api/profiles/${profileId}`);
  //   } catch (error) {
  //     console.error('Error deleting profile:', error);
  //     // If deletion fails, add the profile back to the state
  //     setProfiles(profiles);
  //     // Optionally, you can show an error message to the user
  //     alert('Failed to delete profile. Please try again.');
  //   }
  };
  

  return (
    <div className="container mt-3">
      <form className="row mb-3">
        <div className="col">
          <input 
            type="text" 
            value={searchTerm} 
            onChange={handleSearchChange} 
            className="form-control" 
            placeholder="Search profiles..." 
          />
        </div>
        <div className="col">
          <select className="form-control" value={sortKey} onChange={handleSortChange}>
            <option value="name">Sort By Name</option>
            <option value="techStack">Sort By Tech Stack</option>
          </select>
        </div>
      </form>

      {profiles.length > 0 ? (
        profiles.map(profile => (
          <Profile key={profile._id} profile={profile} onDelete={handleDeleteProfile} />
        ))
      ) : (
        <p>No profiles found.</p>
      )}
    </div>
  );
};

export default ProfileList;
