import { useState } from "react";
import { motion } from "framer-motion";
import {
  ExclamationTriangleIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { bloodGroups, divisions, districtsByDivision } from "../data/locations";

const EmergencyRequest = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    patientName: "",
    contactPerson: "",
    phone: "",
    bloodGroup: "",
    unitsNeeded: "",
    hospital: "",
    division: "",
    district: "",
    urgency: "high",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "division" && { district: "" }),
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.patientName.trim())
      newErrors.patientName = "Patient name is required";
    if (!formData.contactPerson.trim())
      newErrors.contactPerson = "Contact person is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.bloodGroup) newErrors.bloodGroup = "Blood group is required";
    if (!formData.unitsNeeded)
      newErrors.unitsNeeded = "Units needed is required";
    if (!formData.hospital.trim())
      newErrors.hospital = "Hospital name is required";
    if (!formData.division) newErrors.division = "Division is required";
    if (!formData.district) newErrors.district = "District is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const urgencyColors = {
    critical: "bg-red-100 text-red-800 border-red-200",
    high: "bg-orange-100 text-orange-800 border-orange-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-red-100 rounded-full">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            Emergency Blood Request
          </h3>
          <p className="text-gray-600">
            Submit an urgent request for blood donors
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Patient Name *
            </label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                errors.patientName ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Enter patient name"
            />
            {errors.patientName && (
              <p className="text-red-600 text-sm mt-1">{errors.patientName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Person *
            </label>
            <input
              type="text"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                errors.contactPerson ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Your name"
            />
            {errors.contactPerson && (
              <p className="text-red-600 text-sm mt-1">
                {errors.contactPerson}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                errors.phone ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="+880171234567"
            />
            {errors.phone && (
              <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blood Group *
            </label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                errors.bloodGroup ? "border-red-300" : "border-gray-300"
              }`}
            >
              <option value="">Select blood group</option>
              {bloodGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
            {errors.bloodGroup && (
              <p className="text-red-600 text-sm mt-1">{errors.bloodGroup}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Units Needed *
            </label>
            <input
              type="number"
              name="unitsNeeded"
              value={formData.unitsNeeded}
              onChange={handleChange}
              min="1"
              max="10"
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                errors.unitsNeeded ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Number of units"
            />
            {errors.unitsNeeded && (
              <p className="text-red-600 text-sm mt-1">{errors.unitsNeeded}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Urgency Level
            </label>
            <select
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="critical">Critical (Within hours)</option>
              <option value="high">High (Within 24 hours)</option>
              <option value="medium">Medium (Within 2-3 days)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hospital Name *
            </label>
            <input
              type="text"
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                errors.hospital ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Hospital or clinic name"
            />
            {errors.hospital && (
              <p className="text-red-600 text-sm mt-1">{errors.hospital}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Division *
            </label>
            <select
              name="division"
              value={formData.division}
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                errors.division ? "border-red-300" : "border-gray-300"
              }`}
            >
              <option value="">Select division</option>
              {divisions.map((division) => (
                <option key={division} value={division}>
                  {division}
                </option>
              ))}
            </select>
            {errors.division && (
              <p className="text-red-600 text-sm mt-1">{errors.division}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              District *
            </label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              disabled={!formData.division}
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                errors.district ? "border-red-300" : "border-gray-300"
              } disabled:bg-gray-100 disabled:cursor-not-allowed`}
            >
              <option value="">Select district</option>
              {formData.division &&
                districtsByDivision[formData.division]?.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
            </select>
            {errors.district && (
              <p className="text-red-600 text-sm mt-1">{errors.district}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Information
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Any additional details about the emergency..."
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium border ${
              urgencyColors[formData.urgency]
            }`}
          >
            {formData.urgency.charAt(0).toUpperCase() +
              formData.urgency.slice(1)}{" "}
            Priority
          </div>
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <ExclamationTriangleIcon className="h-5 w-5" />
            <span>Submit Emergency Request</span>
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default EmergencyRequest;
