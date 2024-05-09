// src/pages/citylist.tsx
import React, { useState, useEffect } from 'react';

type City = {
  con: string;
  cid: string;
  cn: string;
  cc?: string;
};

const CityListPage: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/cities');  // Update the fetch URL to your proxy endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: City[] = await response.json();
        setCities(data);
      } catch (error) {
        console.error('Failed to fetch cities:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>City List</h1>
      {isLoading ? (
        <p>Loading cities...</p>
      ) : (
        <ul>
          {cities.map((city, index) => (
            <li key={index}>
              <p>Country: {city.con}</p>
              <p>City ID: {city.cid}</p>
              <p>City Name: {city.cn}</p>
              {city.cc && <p>City Code: {city.cc}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CityListPage;
