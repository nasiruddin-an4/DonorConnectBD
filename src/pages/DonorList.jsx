import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  Filter,
  X,
  ChevronDown,
} from "lucide-react";
import donorsData from "../data/donors.json";
import { divisions, donorTypes } from "../data/locations";

const DonorList = () => {
  const [donors] = useState(donorsData);
  const [filteredDonors, setFilteredDonors] = useState(donorsData);
  const [sortBy, setSortBy] = useState("name");
  const [filterDivision, setFilterDivision] = useState("");
  const [filterType, setFilterType] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleSort = (criteria) => {
    setSortBy(criteria);
    let sorted = [...filteredDonors];

    switch (criteria) {
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "division":
        sorted.sort((a, b) => a.division.localeCompare(b.division));
        break;
      case "registered":
        sorted.sort(
          (a, b) => new Date(b.registeredDate) - new Date(a.registeredDate)
        );
        break;
      default:
        break;
    }

    setFilteredDonors(sorted);
  };

  const handleFilter = (division, type) => {
    let filtered = donors;

    if (division) {
      filtered = filtered.filter((donor) => donor.division === division);
    }

    if (type) {
      filtered = filtered.filter((donor) => donor.donorType === type);
    }

    setFilteredDonors(filtered);
    setFilterDivision(division);
    setFilterType(type);
  };

  const clearFilters = () => {
    setFilteredDonors(donors);
    setFilterDivision("");
    setFilterType("");
    setShowMobileFilters(false);
  };

  const getDonorTypeLabel = (type) => {
    const donorType = donorTypes.find((dt) => dt.value === type);
    return donorType ? donorType.label : type;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-BD");
  };

  const activeFiltersCount = [filterDivision, filterType].filter(
    Boolean
  ).length;

  return (
    <div className="min-h-screen bg-gray-100 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Donor Directory
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Browse our complete list of registered donors. All information is
            publicly available to help connect those in need with generous
            donors.
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full flex items-center justify-between bg-white rounded-lg shadow-sm p-4 border border-gray-200"
          >
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <span className="font-medium text-gray-700">
                Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </span>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-gray-400 transition-transform ${
                showMobileFilters ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Filters Dropdown */}
        {showMobileFilters && (
          <div className="lg:hidden bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Division
                </label>
                <select
                  value={filterDivision}
                  onChange={(e) => handleFilter(e.target.value, filterType)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">All Divisions</option>
                  {divisions.map((division) => (
                    <option key={division} value={division}>
                      {division}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donor Type
                </label>
                <select
                  value={filterType}
                  onChange={(e) => handleFilter(filterDivision, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">All Types</option>
                  {donorTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="name">Name</option>
                  <option value="division">Division</option>
                  <option value="registered">Recently Registered</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-2">
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Controls */}
        <div className="hidden lg:block bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <span className="font-medium text-gray-700">Filters:</span>
              </div>

              <select
                value={filterDivision}
                onChange={(e) => handleFilter(e.target.value, filterType)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">All Divisions</option>
                {divisions.map((division) => (
                  <option key={division} value={division}>
                    {division}
                  </option>
                ))}
              </select>

              <select
                value={filterType}
                onChange={(e) => handleFilter(filterDivision, e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                {donorTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>

              {(filterDivision || filterType) && (
                <button
                  onClick={clearFilters}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-4">
              <span className="font-medium text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="name">Name</option>
                <option value="division">Division</option>
                <option value="registered">Recently Registered</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg shadow-sm hover:shadow-lg duration-300 transition-colors p-4 sm:p-6 text-center">
            <div className="text-xl sm:text-2xl font-bold text-primary-600 mb-1 sm:mb-2">
              {filteredDonors.length}
            </div>
            <div className="text-sm sm:text-base text-gray-600">
              Total Donors
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm hover:shadow-lg duration-300 transition-colors p-4 sm:p-6 text-center">
            <div className="text-xl sm:text-2xl font-bold text-secondary-600 mb-1 sm:mb-2">
              {
                filteredDonors.filter((d) => d.availability === "available")
                  .length
              }
            </div>
            <div className="text-sm sm:text-base text-gray-600">
              Available Now
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm hover:shadow-lg duration-300 transition-colors p-4 sm:p-6 text-center">
            <div className="text-xl sm:text-2xl font-bold text-accent-600 mb-1 sm:mb-2">
              {new Set(filteredDonors.map((d) => d.division)).size}
            </div>
            <div className="text-sm sm:text-base text-gray-600">
              Divisions Covered
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              {filteredDonors.length} Donor
              {filteredDonors.length !== 1 ? "s" : ""}
            </h3>
          </div>

          {/* Donor List */}
          <div className="divide-y divide-gray-200">
            {filteredDonors.map((donor) => (
              <div
                key={donor.id}
                className="p-4 sm:p-6 hover:bg-gray-50 transition-colors"
              >
                {/* Mobile Layout */}
                <div className="block sm:hidden">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-semibold text-gray-900 truncate">
                        {donor.name}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {donor.district}, {donor.division}
                      </p>
                    </div>
                    {donor.bloodGroup && (
                      <div className="ml-3 px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                        {donor.bloodGroup}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <div className="px-2 py-1 bg-secondary-100 text-secondary-800 rounded-full text-xs font-medium">
                      {getDonorTypeLabel(donor.donorType)}
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        donor.availability === "available"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {donor.availability === "available"
                        ? "Available"
                        : "Unavailable"}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{donor.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{donor.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span>
                        Registered: {formatDate(donor.registeredDate)}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <a
                      href={`tel:${donor.phone}`}
                      className="flex-1 bg-primary-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors text-center"
                    >
                      Call
                    </a>
                    <a
                      href={`mailto:${donor.email}`}
                      className="flex-1 bg-gray-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors text-center"
                    >
                      Email
                    </a>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:block">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    {/* Main Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {donor.name}
                        </h4>

                        {donor.bloodGroup && (
                          <div className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                            {donor.bloodGroup}
                          </div>
                        )}

                        <div className="px-3 py-1 bg-secondary-100 text-secondary-800 rounded-full text-sm font-medium">
                          {getDonorTypeLabel(donor.donorType)}
                        </div>

                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            donor.availability === "available"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {donor.availability === "available"
                            ? "Available"
                            : "Unavailable"}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>
                            {donor.district}, {donor.division}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4" />
                          <span>{donor.phone}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4" />
                          <span className="truncate">{donor.email}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Registered: {formatDate(donor.registeredDate)}
                          </span>
                        </div>
                      </div>

                      {donor.lastDonation && (
                        <div className="mt-2 text-sm text-gray-600">
                          <span className="font-medium">Last donation:</span>{" "}
                          {formatDate(donor.lastDonation)}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 lg:mt-0 lg:ml-6">
                      <div className="flex space-x-2">
                        <a
                          href={`tel:${donor.phone}`}
                          className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                        >
                          Call
                        </a>
                        <a
                          href={`mailto:${donor.email}`}
                          className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                        >
                          Email
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredDonors.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <div className="text-gray-400 mb-4">
              <Filter className="h-12 sm:h-16 w-12 sm:w-16 mx-auto" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              No donors found
            </h3>
            <p className="text-gray-600 px-4">
              Try adjusting your filters to see more results.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorList;
