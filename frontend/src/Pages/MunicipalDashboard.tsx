import { useState } from 'react';
import { 
  Users, 
  DollarSign, 
  Droplets, 
  Award,
  TrendingUp,
  Building,
  Calendar,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

const MunicipalDashboard = () => {
  const [activeTab, setActiveTab] = useState('analytics');

  // Analytics data
  const systemInstallationData = [
    { month: 'Jan', residential: 45, commercial: 12, public: 8 },
    { month: 'Feb', residential: 52, commercial: 15, public: 10 },
    { month: 'Mar', residential: 48, commercial: 18, public: 7 },
    { month: 'Apr', residential: 61, commercial: 20, public: 12 },
    { month: 'May', residential: 55, commercial: 22, public: 9 },
    { month: 'Jun', residential: 67, commercial: 25, public: 15 }
  ];

  const subsidyDistribution = [
    { category: 'Residential', amount: 2500000, color: '#3B82F6' },
    { category: 'Commercial', amount: 1800000, color: '#10B981' },
    { category: 'Public Buildings', amount: 950000, color: '#F59E0B' },
    { category: 'Schools', amount: 750000, color: '#EF4444' }
  ];

  const waterSavingTrend = [
    { month: 'Jan', saved: 125000 },
    { month: 'Feb', saved: 145000 },
    { month: 'Mar', saved: 168000 },
    { month: 'Apr', saved: 192000 },
    { month: 'May', saved: 215000 },
    { month: 'Jun', saved: 238000 }
  ];

  const regionWiseData = [
    { region: 'North Zone', systems: 89, subsidy: 1200000 },
    { region: 'South Zone', systems: 76, subsidy: 980000 },
    { region: 'East Zone', systems: 65, subsidy: 850000 },
    { region: 'West Zone', systems: 94, subsidy: 1350000 },
    { region: 'Central Zone', systems: 58, subsidy: 720000 }
  ];

  // Vendor data
  const vendors = [
    {
      id: 'V001',
      name: 'GreenTech Solutions',
      contact: '+91 9876543210',
      email: 'contact@greentech.com',
      specialization: 'Residential Systems',
      rating: 4.8,
      completedJobs: 45,
      status: 'approved',
      location: 'Gurgaon'
    },
    {
      id: 'V002',
      name: 'AquaHarvest Pro',
      contact: '+91 9876543211',
      email: 'info@aquaharvest.com',
      specialization: 'Commercial Systems',
      rating: 4.6,
      completedJobs: 32,
      status: 'pending',
      location: 'Delhi'
    },
    {
      id: 'V003',
      name: 'RainCatch Systems',
      contact: '+91 9876543212',
      email: 'admin@raincatch.com',
      specialization: 'Industrial Systems',
      rating: 4.9,
      completedJobs: 28,
      status: 'approved',
      location: 'Noida'
    },
    {
      id: 'V004',
      name: 'EcoWater Install',
      contact: '+91 9876543213',
      email: 'hello@ecowater.com',
      specialization: 'Public Buildings',
      rating: 4.5,
      completedJobs: 19,
      status: 'rejected',
      location: 'Faridabad'
    }
  ];

  // Subsidy applications
  const subsidyApplications = [
    {
      id: 'SA001',
      applicantName: 'Rajesh Kumar',
      location: 'Sector 15, Gurgaon',
      systemType: 'Residential',
      requestedAmount: '₹25,000',
      status: 'pending',
      dateApplied: '2024-01-15',
      roofArea: '250 sq ft'
    },
    {
      id: 'SA002',
      applicantName: 'Sharma Enterprises',
      location: 'DLF Cyber City',
      systemType: 'Commercial',
      requestedAmount: '₹85,000',
      status: 'approved',
      dateApplied: '2024-01-12',
      roofArea: '800 sq ft'
    },
    {
      id: 'SA003',
      applicantName: 'Delhi Public School',
      location: 'Sector 45, Gurgaon',
      systemType: 'Educational',
      requestedAmount: '₹45,000',
      status: 'under_review',
      dateApplied: '2024-01-10',
      roofArea: '500 sq ft'
    },
    {
      id: 'SA004',
      applicantName: 'Priya Apartments',
      location: 'Golf Course Road',
      systemType: 'Residential Complex',
      requestedAmount: '₹120,000',
      status: 'rejected',
      dateApplied: '2024-01-08',
      roofArea: '1200 sq ft'
    }
  ];

  // Awareness workshops
  const workshops = [
    {
      id: 'W001',
      title: 'Rainwater Harvesting Benefits',
      date: '2024-01-25',
      location: 'Community Center, Sector 14',
      expectedAttendees: 150,
      status: 'scheduled'
    },
    {
      id: 'W002',
      title: 'Technical Installation Workshop',
      date: '2024-02-02',
      location: 'Municipal Hall, DLF Phase 1',
      expectedAttendees: 80,
      status: 'scheduled'
    },
    {
      id: 'W003',
      title: 'School Awareness Program',
      date: '2024-02-10',
      location: 'Various Schools',
      expectedAttendees: 500,
      status: 'planned'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'planned': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'under_review': return <AlertTriangle className="w-4 h-4" />;
      case 'scheduled': return <Calendar className="w-4 h-4" />;
      case 'planned': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Municipal Dashboard</h1>
              <p className="text-gray-600">Gurgaon Municipal Corporation - RWH Program</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Budget</p>
                <p className="text-lg font-semibold text-green-600">₹5.2 Cr</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'vendors', label: 'Vendors', icon: Building },
              { id: 'subsidies', label: 'Subsidies', icon: DollarSign },
              { id: 'awareness', label: 'Awareness', icon: Users }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Building className="h-6 w-6 text-blue-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Systems Installed
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">382</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <DollarSign className="h-6 w-6 text-green-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Subsidy Disbursed
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">₹60 L</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Droplets className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Water Saved (L)
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">23.8 Lakhs</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Award className="h-6 w-6 text-purple-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Active Vendors
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">12</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* System Installations Chart */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly System Installations</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={systemInstallationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="residential" stackId="a" fill="#3B82F6" name="Residential" />
                    <Bar dataKey="commercial" stackId="a" fill="#10B981" name="Commercial" />
                    <Bar dataKey="public" stackId="a" fill="#F59E0B" name="Public" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Subsidy Distribution */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Subsidy Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={subsidyDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="amount"
                      label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {subsidyDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Additional Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Water Saving Trend */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Cumulative Water Saved (Liters)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={waterSavingTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value.toLocaleString()} L`} />
                    <Area type="monotone" dataKey="saved" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Region-wise Performance */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Region-wise Performance</h3>
                <div className="space-y-4">
                  {regionWiseData.map((region) => (
                    <div key={region.region} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{region.region}</p>
                        <p className="text-xs text-gray-500">{region.systems} systems</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">₹{region.subsidy.toLocaleString()}</p>
                        <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(region.systems / 100) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'vendors' && (
          <div className="space-y-6">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h2 className="text-xl font-semibold text-gray-900">Vendor Management</h2>
                <p className="mt-2 text-sm text-gray-700">
                  Manage and approve vendors for rainwater harvesting installations.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
                  Add New Vendor
                </button>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {vendors.map((vendor) => (
                  <li key={vendor.id}>
                    <div className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <Building className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="flex items-center">
                              <p className="text-sm font-medium text-gray-900">{vendor.name}</p>
                              <span className="ml-2 text-xs text-gray-500">#{vendor.id}</span>
                              <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(vendor.status)}`}>
                                {getStatusIcon(vendor.status)}
                                <span className="ml-1 capitalize">{vendor.status}</span>
                              </span>
                            </div>
                            <div className="mt-1 flex items-center text-sm text-gray-500">
                              <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4" />
                              {vendor.location}
                            </div>
                            <div className="mt-1 text-sm text-gray-500">
                              Specialization: {vendor.specialization}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Rating</p>
                            <p className="text-sm font-medium text-gray-900">{vendor.rating} ⭐</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Completed Jobs</p>
                            <p className="text-sm font-medium text-gray-900">{vendor.completedJobs}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                              <Phone className="w-3 h-3 mr-1" />
                              Contact
                            </button>
                            {vendor.status === 'pending' && (
                              <>
                                <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700">
                                  Approve
                                </button>
                                <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700">
                                  Reject
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'subsidies' && (
          <div className="space-y-6">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h2 className="text-xl font-semibold text-gray-900">Subsidy Tracking</h2>
                <p className="mt-2 text-sm text-gray-700">
                  Review and manage subsidy applications from citizens and organizations.
                </p>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {subsidyApplications.map((application) => (
                  <li key={application.id}>
                    <div className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                              <DollarSign className="h-5 w-5 text-green-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="flex items-center">
                              <p className="text-sm font-medium text-gray-900">{application.applicantName}</p>
                              <span className="ml-2 text-xs text-gray-500">#{application.id}</span>
                            </div>
                            <div className="mt-1 flex items-center text-sm text-gray-500">
                              <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4" />
                              {application.location}
                            </div>
                            <div className="mt-1 text-sm text-gray-500">
                              {application.systemType} • {application.roofArea}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Requested Amount</p>
                            <p className="text-sm font-medium text-gray-900">{application.requestedAmount}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Applied Date</p>
                            <p className="text-sm font-medium text-gray-900">{application.dateApplied}</p>
                          </div>
                          <div className="flex flex-col space-y-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                              {getStatusIcon(application.status)}
                              <span className="ml-1 capitalize">{application.status.replace('_', ' ')}</span>
                            </span>
                            {application.status === 'pending' && (
                              <div className="flex space-x-1">
                                <button className="text-xs text-green-600 hover:text-green-800">
                                  Approve
                                </button>
                                <button className="text-xs text-red-600 hover:text-red-800">
                                  Reject
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'awareness' && (
          <div className="space-y-6">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h2 className="text-xl font-semibold text-gray-900">Awareness Programs</h2>
                <p className="mt-2 text-sm text-gray-700">
                  Upcoming workshops and awareness campaigns for rainwater harvesting.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
                  Schedule New Workshop
                </button>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {workshops.map((workshop) => (
                  <li key={workshop.id}>
                    <div className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                              <Users className="h-5 w-5 text-purple-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="flex items-center">
                              <p className="text-sm font-medium text-gray-900">{workshop.title}</p>
                              <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(workshop.status)}`}>
                                {getStatusIcon(workshop.status)}
                                <span className="ml-1 capitalize">{workshop.status}</span>
                              </span>
                            </div>
                            <div className="mt-1 flex items-center text-sm text-gray-500">
                              <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4" />
                              {workshop.date}
                            </div>
                            <div className="mt-1 flex items-center text-sm text-gray-500">
                              <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4" />
                              {workshop.location}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Expected Attendees</p>
                            <p className="text-sm font-medium text-gray-900">{workshop.expectedAttendees}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                              Edit
                            </button>
                            <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Awareness Impact Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Users className="h-6 w-6 text-blue-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Workshops Conducted
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">24</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <TrendingUp className="h-6 w-6 text-green-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          People Reached
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">3,240</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-purple-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Conversion Rate
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">12.5%</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MunicipalDashboard;