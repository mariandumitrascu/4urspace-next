// src/pages/malllist.tsx
import React, { useState, useEffect } from 'react';

type Mall = {
cid?: string;
pid?: string;
lid?: string;
bid?: string;
brand?: string;
mid?: string;
mall?: string;
st?: string;
city?: string;
area?: string;
sc?: string;
ip?: string;
};

const MallListPage: React.FC = () => {
const [malls, setMalls] = useState<Mall[]>([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
    const fetchData = async () => {
    try {
        const response = await fetch('/api/malls');
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Mall[] = await response.json();
        setMalls(data);
    } catch (error) {
        console.error('Failed to fetch malls:', error);
    } finally {
        setIsLoading(false);
    }
    };

    fetchData();
}, []);

return (
    <div>
    <h1>Mall List</h1>
    {isLoading ? (
        <p>Loading malls...</p>
    ) : (
        <ul>
        {malls.map((mall, index) => (
            <li key={index}>
            {Object.entries(mall).map(([key, value]) => (
                <p key={key}>{`${key}: ${value}`}</p>
            ))}
            </li>
        ))}
        </ul>
    )}
    </div>
);
};

export default MallListPage;
