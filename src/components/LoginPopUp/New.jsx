import React from 'react';

const New = () => {
    const checkAuth = () => {
        fetch('http://localhost:4007/checkauth', {
            headers: {
                'access-token': localStorage.getItem("token")
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Parse the response as JSON
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .then(data => {
            console.log('Response data:', data);
        })
        .catch(err => {
            console.error('Fetch error:', err);
        });
    }

    return (
        <button onClick={checkAuth}>Check Auth</button>
    );
}

export default New;
