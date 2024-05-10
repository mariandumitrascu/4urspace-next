import { Vendor } from "../common/types";

export default async function FetchVendors(vendorName: string, searchType: string) {

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

        return apiResponse.json();
    } catch (error) {
        console.error('Failed to fetch data from API', error);
    }
}
