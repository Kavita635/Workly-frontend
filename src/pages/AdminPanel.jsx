import React, { useEffect, useState } from 'react';
import { X, Edit, Trash2, Plus } from 'lucide-react';

const AdminPanel = () => {
  const [companies, setCompanies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ companyName: '', date: '', role: '', eligibility: '' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');

  // Fetch companies
  const fetchCompanies = async () => {
    try {
      const res = await fetch('/api/company');
      const data = await res.json();
      setCompanies(data);
    } catch {
      setCompanies([]);
    }
  };

  useEffect(() => { fetchCompanies(); }, []);

  // Toast auto-hide
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(''), 2500);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const openModal = (company = null) => {
    setEditId(company ? company.id : null);
    setForm(company ? {
      companyName: company.companyName,
      date: company.date,
      role: company.role,
      eligibility: company.eligibility
    } : { companyName: '', date: '', role: '', eligibility: '' });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditId(null);
    setForm({ companyName: '', date: '', role: '', eligibility: '' });
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const method = editId ? 'PUT' : 'POST';
      const url = editId ? `/api/company/${editId}` : '/api/company';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Failed');
      setToast(editId ? 'Company updated!' : 'Company added!');
      closeModal();
      fetchCompanies();
    } catch {
      setToast('Error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this company?')) return;
    try {
      await fetch(`/api/company/${id}`, { method: 'DELETE' });
      setToast('Company deleted!');
      fetchCompanies();
    } catch {
      setToast('Error. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 px-4">
      <h1 className="text-3xl font-bold text-white mb-8">Admin Panel - TNP Automation</h1>
      <button
        className="mb-6 flex items-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-semibold shadow"
        onClick={() => openModal()}
      >
        <Plus className="w-5 h-5" /> Add Company Visit
      </button>
      {/* Table */}
      <div className="overflow-x-auto bg-[#18181b] rounded-2xl shadow border border-[#23232b]">
        <table className="min-w-full divide-y divide-[#23232b]">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#a1a1aa] uppercase">Company Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#a1a1aa] uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#a1a1aa] uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#a1a1aa] uppercase">Eligibility</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-[#a1a1aa] uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-8 text-[#a1a1aa]">No companies found.</td></tr>
            ) : (
              companies.map((c, i) => (
                <tr key={c.id || i} className="hover:bg-[#23232b] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-white font-medium">{c.companyName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#e4e4e7]">{c.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#e4e4e7]">{c.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#e4e4e7]">{c.eligibility}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button onClick={() => openModal(c)} className="inline-flex items-center text-blue-400 hover:text-blue-600 mr-3"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(c.id)} className="inline-flex items-center text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-[#18181b] rounded-2xl shadow-xl p-8 w-full max-w-md relative border border-[#23232b]">
            <button className="absolute top-4 right-4 text-[#a1a1aa] hover:text-red-400" onClick={closeModal}><X className="w-5 h-5" /></button>
            <h2 className="text-xl font-bold text-white mb-6">{editId ? 'Edit Company Visit' : 'Add Company Visit'}</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <label className="text-white font-semibold">Company Name
                <input name="companyName" value={form.companyName} onChange={handleChange} required className="mt-1 w-full px-3 py-2 rounded-xl bg-[#23232b] text-white border border-[#27272a] focus:outline-none focus:ring-1 focus:ring-purple-500" />
              </label>
              <label className="text-white font-semibold">Date
                <input type="date" name="date" value={form.date} onChange={handleChange} required className="mt-1 w-full px-3 py-2 rounded-xl bg-[#23232b] text-white border border-[#27272a] focus:outline-none focus:ring-1 focus:ring-purple-500" />
              </label>
              <label className="text-white font-semibold">Role
                <input name="role" value={form.role} onChange={handleChange} required className="mt-1 w-full px-3 py-2 rounded-xl bg-[#23232b] text-white border border-[#27272a] focus:outline-none focus:ring-1 focus:ring-purple-500" />
              </label>
              <label className="text-white font-semibold">Eligibility Criteria
                <textarea name="eligibility" value={form.eligibility} onChange={handleChange} rows={2} required className="mt-1 w-full px-3 py-2 rounded-xl bg-[#23232b] text-white border border-[#27272a] focus:outline-none focus:ring-1 focus:ring-purple-500" />
              </label>
              <button type="submit" disabled={loading} className="mt-2 py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors disabled:opacity-60">{loading ? 'Saving...' : editId ? 'Update' : 'Add'}</button>
            </form>
          </div>
        </div>
      )}
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-50 bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg font-semibold animate-fade-in-out">{toast}</div>
      )}
    </div>
  );
};

export default AdminPanel;
