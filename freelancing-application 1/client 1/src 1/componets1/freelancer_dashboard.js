import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FreelancerDashboard = () => {
    const [user, setUser] = useState(null);
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data (Freelancer)
        const userId = 'someUserId'; // Replace with logic to get the logged-in user's ID
        axios.get(`http://localhost:5000/api/users/${userId}`)
            .then(response => setUser(response.data))
            .catch(error => console.log(error));

        // Fetch freelancer's jobs (if any)
        axios.get(`http://localhost:5000/api/jobs/freelancer/${userId}`)
            .then(response => setJobs(response.data))
            .catch(error => console.log(error));
    }, []);

    const handleProfileUpdate = () => {
        navigate('/update-profile'); // Navigate to a profile update page
    };

    return (
        <div>
            {user ? (
                <>
                    <h2>Freelancer Dashboard</h2>
                    <div>
                        <h3>Profile</h3>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                        <button onClick={handleProfileUpdate}>Update Profile</button>
                    </div>
                    <div>
                        <h3>Your Jobs</h3>
                        {jobs.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Job Title</th>
                                        <th>Status</th>
                                        <th>Client</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jobs.map(job => (
                                        <tr key={job._id}>
                                            <td>{job.title}</td>
                                            <td>{job.status}</td>
                                            <td>{job.clientName}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>You have no jobs yet. Please check the job listings!</p>
                        )}
                    </div>
                </>
            ) : (
                <p>Loading your profile...</p>
            )}
        </div>
    );
};

export default FreelancerDashboard;
