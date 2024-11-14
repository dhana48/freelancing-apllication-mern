// src/components/AddProjects.js

import React, { useState } from 'react';

function AddProjects({ addProject }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newProject = {
            id: Date.now(), // Unique ID based on the current timestamp
            title,
            description,
            budget,
        };

        addProject(newProject);

        setTitle('');
        setDescription('');
        setBudget('');
    };

    return (
        <div>
            <h2>Add New Project</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Project Title:
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </label>
                <br />
                <label>
                    Description:
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                    />
                </label>
                <br />
                <label>
                    Budget:
                    <input 
                        type="number" 
                        value={budget} 
                        onChange={(e) => setBudget(e.target.value)} 
                        required 
                    />
                </label>
                <br />
                <button type="submit">Add Project</button>
            </form>
        </div>
    );
}

export default AddProjects;

