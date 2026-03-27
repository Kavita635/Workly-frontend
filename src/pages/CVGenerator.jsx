
import React, { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Download, FileText } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const CVGenerator = () => {
  const { addToast } = useToast();
  const [form, setForm] = useState({
    name: '',
    skills: '',
    experience: '',
    marks10: '',
    marks12: '',
  });
  const cvRef = useRef(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const skillsList = form.skills
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  const handleDownload = () => {
    if (!cvRef.current) return;
    html2pdf(cvRef.current, {
      margin: 0.5,
      filename: `${form.name || 'cv'}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    });
    addToast('CV document generated successfully!', 'success');
  };

  return (
    <div className="min-h-screen bg-[#000000] pt-28 pb-16 px-4 md:px-8 flex flex-col items-center">
      <div className="w-full max-w-7xl flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">AI CV Builder</h1>
          <p className="text-[#a1a1aa]">Generate a professional, ATS-friendly resume instantly.</p>
        </div>
        <Button onClick={handleDownload} className="gap-2 shadow-[0_0_15px_rgba(124,58,237,0.3)]">
          <Download className="w-4 h-4" /> Download PDF
        </Button>
      </div>

      <div className="w-full max-w-7xl rounded-3xl flex flex-col lg:flex-row overflow-hidden gap-8">
        {/* Form */}
        <div className="flex-1 bg-[#111111] border border-[#1f1f1f] rounded-3xl p-8 flex flex-col gap-6 shadow-xl relative z-10">
          <div className="flex items-center gap-3 mb-2 border-b border-[#1f1f1f] pb-6">
            <div className="w-10 h-10 rounded-full bg-[#1f1f1f] border border-[#333333] flex items-center justify-center">
              <FileText className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Document Details</h2>
          </div>
          <form className="flex flex-col gap-5" onSubmit={e => e.preventDefault()}>
            <Input label="Full Name" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" />
            <Input label="Skills (comma-separated)" name="skills" value={form.skills} onChange={handleChange} placeholder="React, Node.js, Python" />
            <div className="flex flex-col gap-1.5 w-full">
               <label className="text-sm font-medium text-[#a1a1aa] ml-1">Experience</label>
               <textarea name="experience" value={form.experience} onChange={handleChange} rows={4} className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#1f1f1f] text-white rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all outline-none placeholder-[#475569] shadow-inner" placeholder="Briefly describe your work experience..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="10th Marks (%)" name="marks10" value={form.marks10} onChange={handleChange} placeholder="95%" />
              <Input label="12th Marks (%)" name="marks12" value={form.marks12} onChange={handleChange} placeholder="92%" />
            </div>
          </form>
        </div>
        <form className="flex-1 p-8 flex flex-col gap-5 bg-[#18181b]" onSubmit={e => e.preventDefault()}>
          <label className="text-white font-semibold">Name
            <input name="name" value={form.name} onChange={handleChange} className="mt-1 w-full px-3 py-2 rounded-xl bg-[#23232b] text-white border border-[#27272a] focus:outline-none focus:ring-1 focus:ring-purple-500" />
          </label>
          <label className="text-white font-semibold">Skills (comma-separated)
            <input name="skills" value={form.skills} onChange={handleChange} className="mt-1 w-full px-3 py-2 rounded-xl bg-[#23232b] text-white border border-[#27272a] focus:outline-none focus:ring-1 focus:ring-purple-500" />
          </label>
          <label className="text-white font-semibold">Experience
            <textarea name="experience" value={form.experience} onChange={handleChange} rows={3} className="mt-1 w-full px-3 py-2 rounded-xl bg-[#23232b] text-white border border-[#27272a] focus:outline-none focus:ring-1 focus:ring-purple-500" />
          </label>
          <label className="text-white font-semibold">10th Marks
            <input name="marks10" value={form.marks10} onChange={handleChange} className="mt-1 w-full px-3 py-2 rounded-xl bg-[#23232b] text-white border border-[#27272a] focus:outline-none focus:ring-1 focus:ring-purple-500" />
          </label>
          <label className="text-white font-semibold">12th Marks
            <input name="marks12" value={form.marks12} onChange={handleChange} className="mt-1 w-full px-3 py-2 rounded-xl bg-[#23232b] text-white border border-[#27272a] focus:outline-none focus:ring-1 focus:ring-purple-500" />
          </label>
          <button type="button" onClick={handleDownload} className="mt-4 py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors">Download as PDF</button>
        </form>
        {/* CV Preview */}
        <div className="flex-[1.2] flex justify-center lg:justify-end">
          <div ref={cvRef} className="aspect-[1/1.4] w-full max-w-[800px] bg-white text-gray-900 p-12 flex flex-col gap-6 shadow-2xl rounded-sm">
            <div className="border-b-2 border-gray-900 pb-4 mb-2">
              <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tight">{form.name || 'Your Name'}</h2>
              <p className="text-gray-500 mt-1 font-medium">Professional Student / Engineer</p>
            </div>
            
            <section>
              <h3 className="font-bold text-lg text-gray-800 uppercase tracking-wider mb-2">Education</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-gray-900">10th Standard</p>
                  <p className="text-gray-600">Score: {form.marks10 || '-'}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">12th Standard</p>
                  <p className="text-gray-600">Score: {form.marks12 || '-'}</p>
                </div>
              </div>
            </section>
            
            <section className="mt-2">
              <h3 className="font-bold text-lg text-gray-800 uppercase tracking-wider mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skillsList.length ? skillsList.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-md border border-gray-200">{skill}</span>
                )) : <span className="text-gray-400 italic">No skills added.</span>}
              </div>
            </section>
            
            <section className="mt-2">
              <h3 className="font-bold text-lg text-gray-800 uppercase tracking-wider mb-2">Experience & Projects</h3>
              <p className="whitespace-pre-line text-gray-700 leading-relaxed text-sm">{form.experience || 'No experience detailed yet.'}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVGenerator;
