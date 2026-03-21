import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInternships } from '../../context/InternshipContext';
import { useToast } from '../../context/ToastContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function PostInternship() {
  const { postInternship } = useInternships();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    duration: '',
    stipend: '',
    type: 'Full-time',
    description: '',
    requirements: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await postInternship({
        ...formData,
        requirements: formData.requirements.split(',').map(r => r.trim()).filter(Boolean)
      });
      setSuccess(true);
      addToast('Internship posted successfully!', 'success');
      setTimeout(() => navigate('/company/manage'), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Post an Internship</h1>
        <p className="text-[#a1a1aa]">Create a new opportunity to find the best talent.</p>
      </div>

      <div className="bg-[#111111] rounded-xl shadow-none border border-[#1f1f1f] overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          <Input
            label="Job Title"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Frontend Developer Intern"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Location"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Remote, San Francisco"
            />
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Employment Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#111111] border border-gray-300 rounded-lg text-sm shadow-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
            <Input
              label="Duration"
              name="duration"
              required
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g. 3 Months"
            />
            <Input
              label="Stipend"
              name="stipend"
              required
              value={formData.stipend}
              onChange={handleChange}
              placeholder="e.g. $1000/month or Unpaid"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Description</label>
            <textarea
              name="description"
              required
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#111111] border border-gray-300 rounded-lg text-sm shadow-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Describe the role and responsibilities..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Requirements (Comma separated)</label>
            <textarea
              name="requirements"
              required
              rows="3"
              value={formData.requirements}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#111111] border border-gray-300 rounded-lg text-sm shadow-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. React, JavaScript, HTML/CSS"
            ></textarea>
          </div>

          <div className="pt-4 border-t border-[#1f1f1f] flex flex-col sm:flex-row justify-end items-center gap-4">
            {success && <span className="text-green-500 text-sm font-semibold bg-green-900/20 px-4 py-2.5 rounded-full border border-green-900/50 flex flex-col sm:flex-row  items-center text-center">Internship Posted Successfully! Redirecting...</span>}
            <Button type="submit" disabled={loading || success || !formData.title.trim() || !formData.location.trim()} size="lg" className="disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Posting...' : success ? 'Posted!' : 'Post Internship'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
