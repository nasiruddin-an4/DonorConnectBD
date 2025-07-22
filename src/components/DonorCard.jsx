import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import Modal from "./UI/Modal";
import { donorTypes } from "../data/locations";

const DonorCard = ({ donor, onContact, onFavorite, isFavorite }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getDonorTypeLabel = (type) => {
    const donorType = donorTypes.find((dt) => dt.value === type);
    return donorType ? donorType.label : type;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-BD");
  };

  const getAvailabilityColor = (availability) => {
    return availability === "available"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-red-100 text-red-800 border-red-200";
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -4, shadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {donor.name}
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {donor.bloodGroup && (
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium border border-red-200">
                  {donor.bloodGroup}
                </span>
              )}
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200">
                {getDonorTypeLabel(donor.donorType)}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium border ${getAvailabilityColor(
                  donor.availability
                )}`}
              >
                {donor.availability === "available"
                  ? "Available"
                  : "Unavailable"}
              </span>
            </div>
          </div>
          <button
            onClick={() => onFavorite(donor.id)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            {isFavorite ? (
              <HeartSolidIcon className="h-5 w-5 text-red-500" />
            ) : (
              <HeartIcon className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <MapPinIcon className="h-4 w-4 mr-2" />
            <span>
              {donor.district}, {donor.division}
            </span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <PhoneIcon className="h-4 w-4 mr-2" />
            <span>{donor.phone}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <CalendarIcon className="h-4 w-4 mr-2" />
            <span>Registered: {formatDate(donor.registeredDate)}</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setShowDetails(true)}
            className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            View Details
          </button>
          <button
            onClick={() => onContact(donor)}
            className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            Contact
          </button>
        </div>
      </motion.div>

      <Modal
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        title="Donor Details"
        size="md"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-700">
                {donor.name.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {donor.name}
              </h3>
              <p className="text-gray-600">
                {getDonorTypeLabel(donor.donorType)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {donor.bloodGroup && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blood Group
                </label>
                <p className="text-gray-900">{donor.bloodGroup}</p>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Availability
              </label>
              <p
                className={`inline-block px-2 py-1 rounded text-sm ${
                  donor.availability === "available"
                    ? "text-green-800"
                    : "text-red-800"
                }`}
              >
                {donor.availability === "available"
                  ? "Available"
                  : "Unavailable"}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <MapPinIcon className="h-5 w-5 text-gray-400" />
              <span className="text-gray-700">
                {donor.district}, {donor.division}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <PhoneIcon className="h-5 w-5 text-gray-400" />
              <span className="text-gray-700">{donor.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <EnvelopeIcon className="h-5 w-5 text-gray-400" />
              <span className="text-gray-700">{donor.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-gray-400" />
              <span className="text-gray-700">
                Registered: {formatDate(donor.registeredDate)}
              </span>
            </div>
            {donor.lastDonation && (
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
                <span className="text-gray-700">
                  Last donation: {formatDate(donor.lastDonation)}
                </span>
              </div>
            )}
          </div>

          <div className="flex space-x-3 pt-4">
            <a
              href={`tel:${donor.phone}`}
              className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors text-center"
            >
              Call Now
            </a>
            <a
              href={`mailto:${donor.email}`}
              className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-700 transition-colors text-center"
            >
              Send Email
            </a>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DonorCard;
