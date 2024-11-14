// src/components/ProjectsList.js

import React from 'react';

function ProjectsList({ projects }) {
    return (
        <div>
            <h2>Projects List</h2>
            {projects.length === 0 ? (
                <p>No projects added yet.</p>
            ) : (
                <ul>
                    {projects.map((project) => (
                        <li key={project.id}>
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <p><strong>Budget:</strong> ${project.budget}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ProjectsList;

