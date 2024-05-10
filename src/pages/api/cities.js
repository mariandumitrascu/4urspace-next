// src/pages/api/citylist.js

export default async function handler(req, res) {
const response = await fetch('https://4urspace.com/autocomplete?type=vndrsbycity', {
        headers: {
        // Optionally, add headers here if needed
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer YOUR_API_KEY', // Uncomment if API requires authorization
        },
    });

    const data = await response.json();

    if (response.ok) {
        res.status(200).json(data);
    } else {
        res.status(response.status).json(data);
    }
}
