import { useState, useEffect } from "react";
import {
  Search as SearchIcon,
  Filter,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Heart,
} from "lucide-react";
import donorsData from "../data/donors.json";
import {
  divisions,
  districtsByDivision,
  bloodGroups,
  donorTypes,
} from "../data/locations";
import DonorCard from "../components/DonorCard";
import { useToast } from "../hooks/useToast";

const Search = () => {
  const [donors, setDonors] = useState(donorsData);
  const [filteredDonors, setFilteredDonors] = useState(donorsData);
  const [favorites, setFavorites] = useState(new Set());
  const [filters, setFilters] = useState({
    name: "",
    bloodGroup: "",
    donorType: "",
    division: "",
    district: "",
    availability: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const { success, info } = useToast();

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    if (key === "division" && value !== filters.division) {
      newFilters.district = "";
    }
    setFilters(newFilters);
  };

  useEffect(() => {
    let filtered = donors;

    if (filters.name) {
      filtered = filtered.filter((donor) =>
        donor.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.bloodGroup) {
      filtered = filtered.filter(
        (donor) => donor.bloodGroup === filters.bloodGroup
      );
    }

    if (filters.donorType) {
      filtered = filtered.filter(
        (donor) => donor.donorType === filters.donorType
      );
    }

    if (filters.division) {
      filtered = filtered.filter(
        (donor) => donor.division === filters.division
      );
    }

    if (filters.district) {
      filtered = filtered.filter(
        (donor) => donor.district === filters.district
      );
    }

    if (filters.availability) {
      filtered = filtered.filter(
        (donor) => donor.availability === filters.availability
      );
    }

    setFilteredDonors(filtered);
  }, [filters, donors]);

  const resetFilters = () => {
    setFilters({
      name: "",
      bloodGroup: "",
      donorType: "",
      division: "",
      district: "",
      availability: "",
    });
  };

  const handleContact = (donor) => {
    info(
      "Contact Information",
      `You can reach ${donor.name} at ${donor.phone} or ${donor.email}`,
      8000
    );
  };

  const handleFavorite = (donorId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(donorId)) {
      newFavorites.delete(donorId);
      success(
        "Removed from Favorites",
        "Donor removed from your favorites list"
      );
    } else {
      newFavorites.add(donorId);
      success("Added to Favorites", "Donor added to your favorites list");
    }
    setFavorites(newFavorites);
  };

  const getDonorTypeLabel = (type) => {
    const donorType = donorTypes.find((dt) => dt.value === type);
    return donorType ? donorType.label : type;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-BD");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find Donors Near You
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search our database of registered donors by name, blood group,
            location, and availability.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Name Search */}
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by donor name..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={filters.name}
                  onChange={(e) => handleFilterChange("name", e.target.value)}
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-5 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {/* Blood Group */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Blood Group
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={filters.bloodGroup}
                    onChange={(e) =>
                      handleFilterChange("bloodGroup", e.target.value)
                    }
                  >
                    <option value="">All Blood Groups</option>
                    {bloodGroups.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Donor Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Donor Type
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={filters.donorType}
                    onChange={(e) =>
                      handleFilterChange("donorType", e.target.value)
                    }
                  >
                    <option value="">All Types</option>
                    {donorTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Division */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Division
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={filters.division}
                    onChange={(e) =>
                      handleFilterChange("division", e.target.value)
                    }
                  >
                    <option value="">All Divisions</option>
                    {divisions.map((division) => (
                      <option key={division} value={division}>
                        {division}
                      </option>
                    ))}
                  </select>
                </div>

                {/* District */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    District
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={filters.district}
                    onChange={(e) =>
                      handleFilterChange("district", e.target.value)
                    }
                    disabled={!filters.division}
                  >
                    <option value="">All Districts</option>
                    {filters.division &&
                      districtsByDivision[filters.division]?.map((district) => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Availability
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={filters.availability}
                    onChange={(e) =>
                      handleFilterChange("availability", e.target.value)
                    }
                  >
                    <option value="">All Status</option>
                    <option value="available">Available</option>
                    <option value="not-available">Not Available</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {filteredDonors.length} Donor
            {filteredDonors.length !== 1 ? "s" : ""} Found
          </h2>
        </div>

        {/* Donor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredDonors.map((donor) => (
            <DonorCard
              key={donor.id}
              donor={donor}
              onContact={handleContact}
              onFavorite={handleFavorite}
              isFavorite={favorites.has(donor.id)}
            />
          ))}
        </div>

        {filteredDonors.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <SearchIcon className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No donors found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
