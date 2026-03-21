import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { addToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    university: '',
    major: '',
    skills: ''
  });

  // ✅ Handle user loading properly
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        university: user.university || '',
        major: user.major || '',
        skills: user.skills?.join(', ') || ''
      });
    }
  }, [user]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      setTimeout(() => {
        setResumeFile(file);
        setUploading(false);
        addToast("Resume uploaded successfully!", "success");
      }, 800);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProfile({
        ...formData,
        skills: formData.skills
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      });

      addToast('Profile updated successfully!', 'success');
      setIsEditing(false);
    } catch (err) {
      addToast('Failed to update profile.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-[#a1a1aa]">
            Manage your personal information and resume.
          </p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        )}
      </div>

      {/* Main Card */}
      <div className="bg-[#111111] rounded-xl shadow-none border border-[#1f1f1f] overflow-hidden">
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
              disabled
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

            {/* Resume Upload */}
            <div className="col-span-1 md:col-span-2 mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Resume
              </label>

              <div className="flex items-center gap-4 relative">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  disabled={!isEditing}
                  className="absolute inset-0 w-48 h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                />

                <Button variant="outline" disabled={!isEditing}>
                  {uploading ? 'Uploading...' : 'Upload New Resume (PDF)'}
                </Button>

                {resumeFile ? (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center text-sm text-green-400 font-medium"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    {resumeFile.name}
                  </motion.div>
                ) : (
                  <span className="text-sm text-[#a1a1aa]">
                    No file chosen
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
          {isEditing && (
            <div className="flex justify-end gap-3 pt-6 border-t border-[#1f1f1f]">
              <Button
                variant="ghost"
                onClick={() => setIsEditing(false)}
                disabled={loading}
              >
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