import { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  DollarSign, 
  Users, 
  Wrench,
  MapPin,
  Phone,
  Mail
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
  Line
} from 'recharts';

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Static data for quotes
  const quoteRequests = [
    {
      id: '001',
      customerName: 'Rajesh Kumar',
      location: 'Sector 15, Gurgaon',
      roofArea: '250 sq ft',
      estimatedCost: '₹45,000',
      status: 'pending',
      date: '2024-01-15',
      phone: '+91 9876543210',
      email: 'rajesh.kumar@email.com'
    },
    {
      id: '002',
      customerName: 'Priya Sharma',
      location: 'DLF Phase 2, Gurgaon',
      roofArea: '180 sq ft',
      estimatedCost: '₹32,000',
      status: 'quoted',
      date: '2024-01-14',
      phone: '+91 9876543211',
      email: 'priya.sharma@email.com'
    },
    {
      id: '003',
      customerName: 'Amit Singh',
      location: 'Cyber City, Gurgaon',
      roofArea: '300 sq ft',
      estimatedCost: '₹55,000',
      status: 'accepted',
      date: '2024-01-13',
      phone: '+91 9876543212',
      email: 'amit.singh@email.com'
    }
  ];

  // Static data for jobs
  const jobs = [
    {
      id: 'J001',
      customerName: 'Neha Gupta',
      location: 'Sector 28, Gurgaon',
      status: 'scheduled',
      scheduledDate: '2024-01-20',
      amount: '₹38,000',
      progress: 0
    },
    {
      id: 'J002',
      customerName: 'Vikram Mehta',
      location: 'Golf Course Road, Gurgaon',
      status: 'in-progress',
      scheduledDate: '2024-01-18',
      amount: '₹42,000',
      progress: 60
    },
    {
      id: 'J003',
      customerName: 'Sunita Agarwal',
      location: 'Sector 45, Gurgaon',
      status: 'completed',
      scheduledDate: '2024-01-10',
      amount: '₹35,000',
      progress: 100
    }
  ];

  // Analytics data
  const monthlyEarnings = [
    { month: 'Jan', earnings: 125000 },
    { month: 'Feb', earnings: 145000 },
    { month: 'Mar', earnings: 165000 },
    { month: 'Apr', earnings: 155000 },
    { month: 'May', earnings: 180000 },
    { month: 'Jun', earnings: 175000 }
  ];

  const jobStatusData = [
    { name: 'Completed', value: 35, color: '#10B981' },
    { name: 'In Progress', value: 8, color: '#F59E0B' },
    { name: 'Scheduled', value: 12, color: '#3B82F6' },
    { name: 'Pending', value: 5, color: '#EF4444' }
  ];

  const weeklyJobs = [
    { day: 'Mon', jobs: 3 },
    { day: 'Tue', jobs: 2 },
    { day: 'Wed', jobs: 4 },
    { day: 'Thu', jobs: 1 },
    { day: 'Fri', jobs: 3 },
    { day: 'Sat', jobs: 5 },
    { day: 'Sun', jobs: 2 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'quoted': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'quoted': return <DollarSign className="w-4 h-4" />;
      case 'accepted': return <CheckCircle className="w-4 h-4" />;
      case 'scheduled': return <Calendar className="w-4 h-4" />;
      case 'in-progress': return <Wrench className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Vendor Dashboard</h1>
              <p className="text-gray-600">Welcome back, GreenTech Solutions</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Rating</p>
                <p className="text-lg font-semibold text-yellow-600">4.8 ⭐</p>
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
              { id: 'dashboard', label: 'Dashboard', icon: BarChart },
              { id: 'quotes', label: 'Quotes', icon: DollarSign },
              { id: 'jobs', label: 'Jobs', icon: Wrench },
              { id: 'calendar', label: 'Calendar', icon: Calendar }
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
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <DollarSign className="h-6 w-6 text-green-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Earnings
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          ₹8,45,000
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-blue-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Completed Jobs
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">35</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Users className="h-6 w-6 text-purple-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Active Customers
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">127</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Wrench className="h-6 w-6 text-orange-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Pending Jobs
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">8</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Earnings Chart */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Earnings</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyEarnings}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                    <Bar dataKey="earnings" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Job Status Distribution */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Job Status Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={jobStatusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {jobStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Weekly Jobs Chart */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Job Schedule</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyJobs}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="jobs" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'quotes' && (
          <div className="space-y-6">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h2 className="text-xl font-semibold text-gray-900">Quote Requests</h2>
                <p className="mt-2 text-sm text-gray-700">
                  Manage your quote requests and submit competitive pricing.
                </p>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {quoteRequests.map((quote) => (
                  <li key={quote.id}>
                    <div className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <Users className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="flex items-center">
                              <p className="text-sm font-medium text-gray-900">{quote.customerName}</p>
                              <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(quote.status)}`}>
                                {getStatusIcon(quote.status)}
                                <span className="ml-1 capitalize">{quote.status}</span>
                              </span>
                            </div>
                            <div className="mt-1 flex items-center text-sm text-gray-500">
                              <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4" />
                              {quote.location}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Roof Area</p>
                            <p className="text-sm font-medium text-gray-900">{quote.roofArea}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Estimated Cost</p>
                            <p className="text-sm font-medium text-gray-900">{quote.estimatedCost}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                              <Phone className="w-3 h-3 mr-1" />
                              Call
                            </button>
                            <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700">
                              {quote.status === 'pending' ? 'Submit Quote' : 'View Details'}
                            </button>
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

        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h2 className="text-xl font-semibold text-gray-900">Job Management</h2>
                <p className="mt-2 text-sm text-gray-700">
                  Track and update the status of your ongoing and completed jobs.
                </p>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {jobs.map((job) => (
                  <li key={job.id}>
                    <div className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                              <Wrench className="h-5 w-5 text-green-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="flex items-center">
                              <p className="text-sm font-medium text-gray-900">{job.customerName}</p>
                              <span className="ml-2 text-xs text-gray-500">#{job.id}</span>
                            </div>
                            <div className="mt-1 flex items-center text-sm text-gray-500">
                              <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4" />
                              {job.location}
                            </div>
                            <div className="mt-1 flex items-center text-sm text-gray-500">
                              <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4" />
                              Scheduled: {job.scheduledDate}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Amount</p>
                            <p className="text-sm font-medium text-gray-900">{job.amount}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Progress</p>
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${job.progress}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{job.progress}%</p>
                          </div>
                          <div className="flex flex-col space-y-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                              {getStatusIcon(job.status)}
                              <span className="ml-1 capitalize">{job.status.replace('-', ' ')}</span>
                            </span>
                            <button className="text-xs text-blue-600 hover:text-blue-800">
                              Update Status
                            </button>
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

        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Calendar View</h2>
              <div className="grid grid-cols-7 gap-4 text-center">
                <div className="font-medium text-gray-500">Mon</div>
                <div className="font-medium text-gray-500">Tue</div>
                <div className="font-medium text-gray-500">Wed</div>
                <div className="font-medium text-gray-500">Thu</div>
                <div className="font-medium text-gray-500">Fri</div>
                <div className="font-medium text-gray-500">Sat</div>
                <div className="font-medium text-gray-500">Sun</div>
                
                {/* Sample calendar grid */}
                {Array.from({ length: 35 }, (_, i) => (
                  <div key={i} className="h-20 border border-gray-200 p-2 text-sm">
                    {i + 1 <= 31 && (
                      <>
                        <div className="font-medium">{i + 1}</div>
                        {(i + 1) % 7 === 0 && (
                          <div className="text-xs bg-blue-100 text-blue-800 px-1 rounded mt-1">
                            Site Visit
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default VendorDashboard;