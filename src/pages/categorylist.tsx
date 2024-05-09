// src/pages/categorylist.tsx
import React, { useState, useEffect } from 'react';

type Category = {
cid?: string;
pid?: string;
lid?: string;
cgid?: string;
cgname?: string;
};

const CategoryListPage: React.FC = () => {
const [categories, setCategories] = useState<Category[]>([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
    const fetchData = async () => {
    try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Category[] = await response.json();
        setCategories(data);
    } catch (error) {
        console.error('Failed to fetch categories:', error);
    } finally {
        setIsLoading(false);
    }
    };

    fetchData();
}, []);

return (
    <div>
    <h1>Category List</h1>
    {isLoading ? (
        <p>Loading categories...</p>
    ) : (
        <ul>
        {categories.map((category, index) => (
            <li key={index}>
            {Object.entries(category).map(([key, value]) => (
                <p key={key}>{`${key}: ${value}`}</p>
            ))}
            </li>
        ))}
        </ul>
    )}
    </div>
);
};

export default CategoryListPage;
