import { useState } from "react";
import { Heart, CheckCircle } from "lucide-react";
import {
  divisions,
  districtsByDivision,
  bloodGroups,
  donorTypes,
} from "../data/locations";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    bloodGroup: "",
    donorType: "",
    division: "",
    district: "",
    availability: "available",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
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

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (
      !/^\+?88?01[3-9]\d{8}$/.test(formData.phone.replace(/\s/g, ""))
    ) {
      newErrors.phone = "Please enter a valid Bangladeshi phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.donorType) {
      newErrors.donorType = "Please select donor type";
    }

    if (formData.donorType === "blood" && !formData.bloodGroup) {
      newErrors.bloodGroup = "Blood group is required for blood donors";
    }

    if (!formData.division) {
      newErrors.division = "Please select division";
    }

    if (!formData.district) {
      newErrors.district = "Please select district";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // In a real app, this would send data to backend
      console.log("Donor registration:", formData);
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Registration Successful!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for joining our donor community. Your information has
              been registered and you'll be contacted when your donation is
              needed.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: "",
                  phone: "",
                  email: "",
                  bloodGroup: "",
                  donorType: "",
                  division: "",
                  district: "",
                  availability: "available",
                });
              }}
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Register Another Donor
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Become a Donor
          </h1>
          <p className="text-lg text-gray-600">
            Join thousands of generous donors across Bangladesh. Your
            contribution can save lives.
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.name ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.phone ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="+880171234567"
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.email ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Donor Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Donor Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="donorType"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Donor Type *
                  </label>
                  <select
                    id="donorType"
                    name="donorType"
                    value={formData.donorType}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.donorType ? "border-red-300" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select donor type</option>
                    {donorTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {errors.donorType && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.donorType}
                    </p>
                  )}
                </div>

                {formData.donorType === "blood" && (
                  <div>
                    <label
                      htmlFor="bloodGroup"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Blood Group *
                    </label>
                    <select
                      id="bloodGroup"
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
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
                      <p className="text-red-600 text-sm mt-1">
                        {errors.bloodGroup}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Location Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Location Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="division"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Division *
                  </label>
                  <select
                    id="division"
                    name="division"
                    value={formData.division}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
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
                    <p className="text-red-600 text-sm mt-1">
                      {errors.division}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="district"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    District *
                  </label>
                  <select
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    disabled={!formData.division}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.district ? "border-red-300" : "border-gray-300"
                    } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                  >
                    <option value="">Select district</option>
                    {formData.division &&
                      districtsByDivision[formData.division]?.map(
                        (district) => (
                          <option key={district} value={district}>
                            {district}
                          </option>
                        )
                      )}
                  </select>
                  {errors.district && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.district}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Availability */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Availability
              </h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="availability"
                    value="available"
                    checked={formData.availability === "available"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-gray-700">
                    Currently available for donation
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="availability"
                    value="not-available"
                    checked={formData.availability === "not-available"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-gray-700">Not available right now</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg"
              >
                Register as Donor
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
