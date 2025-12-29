
import React from 'react';
import { CITIES } from '../constants';

interface CitySelectorProps {
  activeCity: string;
  onCityChange: (city: string) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({ activeCity, onCityChange }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {CITIES.map((city) => (
        <button
          key={city}
          onClick={() => onCityChange(city)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeCity === city
              ? 'bg-[#b8860b] text-white shadow-md'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-[#b8860b] hover:text-[#b8860b]'
          }`}
        >
          {city}
        </button>
      ))}
    </div>
  );
};

export default CitySelector;
