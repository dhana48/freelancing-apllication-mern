import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewProject = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState('');
    const [skills, setSkills] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !budget || !skills) {
            setMessage('All fields are required.');
            return;
        }

        try {
            const newProject = {
                title,
                description,
                budget,
                skills: skills.split(',').map(skill => skill.trim()),
            };

            const response = await axios.post('http://localhost:5000/api/projects', newProject);

            if (response.status === 201) {
                setMessage('Project created successfully!');
                setTimeout(() => {
                    navigate('/admin'); // Navigate back to the admin dashboard after successful creation
                }, 2000);
            }
        } catch (error) {
            setMessage('Error creating project. Please try again.');
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Create New Project</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Project Title</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Budget</label>
                    <input 
                        type="number" 
                        value={budget} 
                        onChange={(e) => setBudget(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Skills (comma separated)</label>
                    <input 
                        type="text" 
                        value={skills} 
                        onChange={(e) => setSkills(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Create Project</button>
            </form>
        </div>
    );
};

export default NewProject;
