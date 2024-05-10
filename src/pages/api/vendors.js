// src/pages/api/vendors.js
export default async function handler(req, res) {

    // Extract query parameters or use default values
    const vendorName = req.query.q || 'Houston';
    const searchType = req.query.t || 'City';

    const url = `https://4urspace.com/autocomplete?type=vndrhdr&q=${encodeURIComponent(vendorName)}&t=${encodeURIComponent(searchType)}`;

    try {
        const apiResponse = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer YOUR_API_KEY', // Uncomment if your API requires an API key
            },
        });

        if (!apiResponse.ok) {
            throw new Error(`HTTP error! Status: ${apiResponse.status}`);
        }

        const data = await apiResponse.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Failed to fetch vendors:', error);
        res.status(500).json({ error: 'Failed to fetch data from API' });
    }
}
