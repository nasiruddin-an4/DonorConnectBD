import { useState } from "react";
import { Users, TrendingUp, MapPin, Calendar, Activity } from "lucide-react";
import donorsData from "../data/donors.json";
import { divisions } from "../data/locations";

const Dashboard = () => {
  const [donors] = useState(donorsData);

  // Calculate statistics
  const totalDonors = donors.length;
  const availableDonors = donors.filter(
    (d) => d.availability === "available"
  ).length;
  const bloodDonors = donors.filter((d) => d.donorType === "blood").length;
  const organDonors = donors.filter((d) => d.donorType === "organ").length;
  const charityDonors = donors.filter((d) => d.donorType === "charity").length;

  // Recent registrations (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentRegistrations = donors.filter(
    (d) => new Date(d.registeredDate) >= thirtyDaysAgo
  );

  // Donors by division
  const donorsByDivision = divisions
    .map((division) => ({
      division,
      count: donors.filter((d) => d.division === division).length,
    }))
    .sort((a, b) => b.count - a.count);

  // Blood group distribution
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const bloodGroupStats = bloodGroups.map((group) => ({
    group,
    count: donors.filter((d) => d.bloodGroup === group).length,
  }));

  const maxCount = Math.max(...donorsByDivision.map((d) => d.count));

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-BD");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Donor Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Overview of donor statistics and recent activity across Bangladesh.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Donors
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {totalDonors}
                </p>
              </div>
              <div className="p-3 bg-primary-100 rounded-full">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Available Now
                </p>
                <p className="text-3xl font-bold text-secondary-600">
                  {availableDonors}
                </p>
              </div>
              <div className="p-3 bg-secondary-100 rounded-full">
                <Activity className="h-8 w-8 text-secondary-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Recent Registrations
                </p>
                <p className="text-3xl font-bold text-accent-600">
                  {recentRegistrations.length}
                </p>
              </div>
              <div className="p-3 bg-accent-100 rounded-full">
                <TrendingUp className="h-8 w-8 text-accent-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Last 30 days</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Divisions Covered
                </p>
                <p className="text-3xl font-bold text-purple-600">
                  {divisions.length}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Donor Types */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Donor Types
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Blood Donors</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: `${(bloodDonors / totalDonors) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {bloodDonors}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-700">Organ Donors</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(organDonors / totalDonors) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {organDonors}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-700">Charity Donors</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${(charityDonors / totalDonors) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {charityDonors}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Blood Groups */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Blood Group Distribution
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {bloodGroupStats.map(({ group, count }) => (
                <div key={group} className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-primary-700 font-bold">{group}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Donors by Division */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Donors by Division
            </h3>
            <div className="space-y-4">
              {donorsByDivision.map(({ division, count }) => (
                <div
                  key={division}
                  className="flex items-center justify-between"
                >
                  <span className="text-gray-700">{division}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-primary-600 h-3 rounded-full"
                        style={{ width: `${(count / maxCount) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Registrations */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Calendar className="h-5 w-5 text-gray-600" />
              <h3 className="text-xl font-semibold text-gray-900">
                Recent Registrations
              </h3>
            </div>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {recentRegistrations.length > 0 ? (
                recentRegistrations
                  .sort(
                    (a, b) =>
                      new Date(b.registeredDate) - new Date(a.registeredDate)
                  )
                  .slice(0, 10)
                  .map((donor) => (
                    <div
                      key={donor.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {donor.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {donor.donorType === "blood" ? donor.bloodGroup : ""}{" "}
                          {donor.donorType} donor • {donor.district},{" "}
                          {donor.division}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          {formatDate(donor.registeredDate)}
                        </p>
                        <div
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
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
                    </div>
                  ))
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No recent registrations
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
