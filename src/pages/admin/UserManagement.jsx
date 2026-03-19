import React from 'react';
import { mockUsers } from '../../api/mockData';
import { Users, Trash2, Edit2, Shield, Search } from 'lucide-react';
import Button from '../../components/ui/Button';

export default function UserManagement() {
  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">User Management</h1>
        <p className="text-gray-600">View and manage all registered users on the platform.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <div className="relative max-w-sm w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Search users by name or email..."
            />
          </div>
          <Button size="sm" className="hidden sm:flex" variant="outline">Export CSV</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
              <tr>
                <th scope="col" className="px-6 py-4">Name</th>
                <th scope="col" className="px-6 py-4">Role</th>
                <th scope="col" className="px-6 py-4">Email</th>
                <th scope="col" className="px-6 py-4">Status</th>
                <th scope="col" className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map(u => (
                <tr key={u.id} className="bg-white border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {u.companyName ? `${u.name} (${u.companyName})` : u.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase ${
                      u.role === 'admin' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                      u.role === 'company' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      'bg-green-50 text-green-700 border border-green-200'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center text-green-600">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                     <button className="text-gray-400 hover:text-blue-600 transition-colors p-1">
                      <Edit2 className="w-4 h-4" />
                     </button>
                     <button className="text-gray-400 hover:text-red-600 transition-colors p-1">
                      <Trash2 className="w-4 h-4" />
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
          <span>Showing 1 to {mockUsers.length} of {mockUsers.length} entries</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
