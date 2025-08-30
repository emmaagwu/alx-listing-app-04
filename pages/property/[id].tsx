// import { PROPERTYLISTINGSAMPLE } from "@/constants/index";
// import { useRouter } from "next/router";
// import PropertyDetail from "@/components/property/PropertyDetail";

// export default function PropertyPage() {
//   const router = useRouter();
//   const { id } = router.query;
//   const property = PROPERTYLISTINGSAMPLE.find((item) => item.name === id);

//   if (!property) return <p>Property not found</p>;

//   return (
//     <div>
//       <PropertyDetail property={property} />
//     </div>
//   );
// }


'use client';

import { useRouter } from 'next/router';
import axios from 'axios';
import { useState, useEffect } from 'react';
import PropertyDetail from '@/components/property/PropertyDetail';

interface Property {
  id: string;
  name: string;
  address: {
    state: string;
    city: string;
    country: string;
  };
  rating: number;
  category: string[];
  price: number;
  offers: {
    bed: string;
    shower: string;
    occupants: string;
  };
  image: string;
  discount?: string;
}

export default function PropertyDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return; // wait until router query is ready
      try {
        const response = await axios.get(`/api/properties/${id}`);
        setProperty(response.data);
      } catch (err) {
        console.error('Error fetching property details:', err);
        setError('Failed to load property details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg">Loading property details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg">Property not found.</p>
      </div>
    );
  }

  return <PropertyDetail property={property} />;
}
