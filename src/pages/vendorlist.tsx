// src/pages/vendorlist.tsx
import React, { useState, useEffect } from 'react';

type Vendor = {
cid?: string;
cn?: string;
pic?: string;
bid?: string;
bn?: string;
pc?: string;
prjs?: string;
citys?: string;
malls?: string;
brands?: string;
bcatgs?: string;
nr?: string;
ar?: string;
ip?: string;
pr?: string;
un?: string;
countryid?: string;
statecode?: string;
otherstate?: string;
city?: string;
streetname?: string;
zipcode?: string;
};

const VendorListPage: React.FC = () => {
const [vendors, setVendors] = useState<Vendor[]>([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
    const fetchData = async () => {
    try {
        const response = await fetch('/api/vendors');
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Vendor[] = await response.json();
        setVendors(data);
    } catch (error) {
        console.error('Failed to fetch vendors:', error);
    } finally {
        setIsLoading(false);
    }
    };

    fetchData();
}, []);

return (
    <div>
    <h1>Vendor List</h1>
    {isLoading ? (
        <p>Loading vendors...</p>
    ) : (
        <ul>
        {vendors.map((vendor, index) => (
            <li key={index}>
            {Object.entries(vendor).map(([key, value]) => (
                <p key={key}>{`${key}: ${value}`}</p>
            ))}
            </li>
        ))}
        </ul>
    )}
    </div>
);
};

export default VendorListPage;
