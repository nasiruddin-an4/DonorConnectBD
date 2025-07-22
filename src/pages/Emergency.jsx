import { useState } from "react";
import { motion } from "framer-motion";
import {
  ExclamationTriangleIcon,
  ClockIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import EmergencyRequest from "../components/EmergencyRequest";
import { useToast } from "../hooks/useToast";

const Emergency = () => {
  const [activeRequests] = useState([
    {
      id: 1,
      patientName: "Ahmed Hassan",
      bloodGroup: "O-",
      unitsNeeded: 3,
      hospital: "Dhaka Medical College Hospital",
      location: "Dhaka, Dhaka",
      urgency: "critical",
      timePosted: "2 hours ago",
      contact: "+880171234567",
    },
    {
      id: 2,
      patientName: "Fatima Rahman",
      bloodGroup: "A+",
      unitsNeeded: 2,
      hospital: "Chittagong Medical College",
      location: "Chittagong, Chittagong",
      urgency: "high",
      timePosted: "4 hours ago",
      contact: "+880181234567",
    },
  ]);

  const { success, error } = useToast();

  const handleEmergencySubmit = (formData) => {
    // In a real app, this would send to backend
    console.log("Emergency request:", formData);
    success(
      "Emergency Request Submitted",
      "Your request has been posted and donors will be notified immediately.",
      6000
    );
  };

  const urgencyColors = {
    critical: "bg-red-100 text-red-800 border-red-200",
    high: "bg-orange-100 text-orange-800 border-orange-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  };

  const urgencyBorders = {
    critical: "border-red-500",
    high: "border-orange-500",
    medium: "border-yellow-500",
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Emergency Blood Requests
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Submit urgent blood requests or respond to critical needs in your
            area. Every minute counts in saving lives.
          </p>
        </div>

        {/* Emergency Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm p-6 text-center"
          >
            <div className="text-3xl font-bold text-red-600 mb-2">24/7</div>
            <div className="text-gray-600">Emergency Response</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6 text-center"
          >
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {activeRequests.length}
            </div>
            <div className="text-gray-600">Active Requests</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm p-6 text-center"
          >
            <div className="text-3xl font-bold text-green-600 mb-2">15min</div>
            <div className="text-gray-600">Average Response Time</div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Submit Emergency Request */}
          <div>
            <EmergencyRequest onSubmit={handleEmergencySubmit} />
          </div>

          {/* Active Emergency Requests */}
          <div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-orange-100 rounded-full">
                  <ClockIcon className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Active Emergency Requests
                  </h3>
                  <p className="text-gray-600">
                    Urgent requests needing immediate attention
                  </p>
                </div>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {activeRequests.map((request) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`border-l-4 ${
                      urgencyBorders[request.urgency]
                    } bg-gray-50 rounded-lg p-4`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {request.patientName}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {request.hospital}
                        </p>
                        <p className="text-sm text-gray-600">
                          {request.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-red-600 mb-1">
                          {request.bloodGroup}
                        </div>
                        <div className="text-sm text-gray-600">
                          {request.unitsNeeded} units needed
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium border ${
                            urgencyColors[request.urgency]
                          }`}
                        >
                          {request.urgency.charAt(0).toUpperCase() +
                            request.urgency.slice(1)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {request.timePosted}
                        </span>
                      </div>
                      <a
                        href={`tel:${request.contact}`}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center space-x-1"
                      >
                        <PhoneIcon className="h-4 w-4" />
                        <span>Call Now</span>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              {activeRequests.length === 0 && (
                <div className="text-center py-8">
                  <ClockIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    No active emergency requests at the moment
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Emergency Guidelines */}
        <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            Emergency Guidelines
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <h4 className="font-medium mb-2">For Requesters:</h4>
              <ul className="space-y-1">
                <li>• Provide accurate patient and hospital information</li>
                <li>• Include contact details for immediate response</li>
                <li>• Specify exact blood group and units needed</li>
                <li>• Update request status when fulfilled</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">For Donors:</h4>
              <ul className="space-y-1">
                <li>• Respond quickly to critical requests</li>
                <li>• Verify your eligibility before committing</li>
                <li>• Contact the hospital directly for coordination</li>
                <li>• Follow all medical screening procedures</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emergency;
