import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Building, Clock, DollarSign } from 'lucide-react';
import Button from '../ui/Button';

const InternshipCard = ({ internship, showApply = false }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col hover:border-blue-500 hover:shadow-md transition duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{internship.title}</h3>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <Building className="w-4 h-4 mr-1.5" />
            <span>{internship.company}</span>
          </div>
        </div>
        <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
          {internship.type}
        </span>
      </div>

      <p className="text-sm text-gray-500 mb-6 line-clamp-2 flex-grow">
        {internship.description}
      </p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-1.5 text-gray-400" />
          <span className="truncate">{internship.location}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-1.5 text-gray-400" />
          <span>{internship.duration}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 col-span-2">
          <DollarSign className="w-4 h-4 mr-1.5 text-gray-400" />
          <span>{internship.stipend}</span>
        </div>
      </div>

      <div className="flex gap-3 mt-auto pt-4 border-t border-gray-50">
        <Link to={`/internships/${internship.id}`} className="flex-1">
          <Button variant={showApply ? "outline" : "primary"} className="w-full">
            View Details
          </Button>
        </Link>
        {showApply && (
          <Link to={`/internships/${internship.id}`} className="flex-1">
            <Button variant="primary" className="w-full">
              Apply
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default InternshipCard;
