import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInternships } from '../../context/InternshipContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function PostInternship() {
  const { postInternship } = useInternships();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
      navigate('/company/manage');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Post an Internship</h1>
        <p className="text-gray-600">Create a new opportunity to find the best talent.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Employment Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <textarea
              name="description"
              required
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Describe the role and responsibilities..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Requirements (Comma separated)</label>
            <textarea
              name="requirements"
              required
              rows="3"
              value={formData.requirements}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. React, JavaScript, HTML/CSS"
            ></textarea>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <Button type="submit" disabled={loading} size="lg">
              {loading ? 'Posting...' : 'Post Internship'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
