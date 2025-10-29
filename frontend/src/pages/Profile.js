import React, { useEffect, useState } from 'react';
import API from '../api';
import './profile.css';

const Profile = () => {
  const [me, setMe] = useState(JSON.parse(localStorage.getItem('user')) || null);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await API.get('/auth/me'); // protected route
        setMe(res.data.user);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMe();
  }, []);

  if (!me) return <div className="loader">Loading...</div>;

  return (
    <div className="profile">
      <h2>Your Profile</h2>
      <div className="card">
        <p><strong>Name:</strong> {me.name}</p>
        <p><strong>Email:</strong> {me.email}</p>
        <p><strong>Joined:</strong> {new Date(me.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Profile;
