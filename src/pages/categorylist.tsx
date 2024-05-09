    // src/pages/categorylist.tsx
    import React, { useState, useEffect } from 'react';
    import { useRouter } from 'next/router';

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
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
        const { vendor_name, search_type } = router.query;
        try {
            const response = await fetch(`/api/categories?vendor_name=${vendor_name}&search_type=${search_type}`);
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

        // Ensure the router has completed the initial navigation to have access to query parameters
        if (router.isReady) {
        fetchData();
        }
    }, [router.isReady, router.query]); // React to changes in the router state

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
