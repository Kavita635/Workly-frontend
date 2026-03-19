import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    university: user?.university || '',
    major: user?.major || '',
    skills: user?.skills?.join(', ') || ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    setLoading(true);
    setMessage('');
    try {
      await updateProfile({
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean)
      });
      setMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      setMessage('Failed to update profile.');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your personal information and resume.</p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        )}
      </div>

      {message && (
        <div className={`p-4 rounded-lg mb-6 ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              disabled={true} // Usually email is non-editable in mock
            />
            <Input
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="+1 234 567 8900"
            />
            <Input
              label="University"
              name="university"
              value={formData.university}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <Input
              label="Major/Degree"
              name="major"
              value={formData.major}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="e.g. B.S. Computer Science"
            />
            <div className="col-span-1 md:col-span-2">
              <Input
                label="Skills (comma separated)"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="React, JavaScript, Python"
              />
            </div>
            
            <div className="col-span-1 md:col-span-2 mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Resume</label>
              <div className="flex items-center gap-4">
                <Button variant="outline" disabled={!isEditing}>Upload New Resume (PDF)</Button>
                <span className="text-sm text-gray-500">No file chosen</span>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
              <Button variant="ghost" onClick={() => setIsEditing(false)} disabled={loading}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
