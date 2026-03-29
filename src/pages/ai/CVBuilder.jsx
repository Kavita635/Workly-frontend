import React, { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { Download, FileText, Sparkles, Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '../../context/ToastContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import CVPreview from '../../components/cv/CVPreview';

const CVBuilder = () => {
  const { addToast } = useToast();
  const cvRef = useRef(null);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [form, setForm] = useState({
    name: '',
    role: '',
    email: '',
    summary: '',
    skills: '',
    experience: '',
    marks10: '',
    marks12: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateAISummary = () => {
    if (!form.skills) {
      addToast('Please enter some skills first to generate an accurate summary.', 'error');
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI network delay mapping text generations
    setTimeout(() => {
      const skillsArray = form.skills.split(',').map(s => s.trim()).filter(Boolean);
      const topSkills = skillsArray.slice(0, 3).join(', ');
      
      const aiMockSummary = `Dynamic and motivated student with foundational expertise in ${topSkills || 'modern development concepts'}. Adept at solving complex problems, learning new technologies rapidly, and contributing collaboratively within team-oriented environments. Seeking to leverage academic knowledge and personal project experience in a challenging internship role to drive value and professional growth.`;
      
      setForm(prev => ({ ...prev, summary: aiMockSummary }));
      setIsGenerating(false);
      addToast('Summary generated successfully using AI!', 'success');
    }, 1200);
  };

  const handleDownload = () => {
    if (!cvRef.current) return;
    addToast('Generating PDF document, please wait...', 'success');
    
    html2pdf(cvRef.current, {
      margin: 0,
      filename: `${form.name ? form.name.replace(/\s+/g, '_') : 'my'}_professional_cv.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    });
  };

  return (
    <div className="min-h-screen bg-[#000000] pt-28 pb-16 px-4 md:px-8 flex flex-col items-center">
      <div className="w-full max-w-[1400px] flex justify-between items-end mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-400 text-sm font-semibold mb-3">
             <Sparkles className="w-4 h-4" /> Premium AI Formatting
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">AI CV Builder</h1>
          <p className="text-[#a1a1aa] max-w-lg">Generate a professional, ATS-friendly recruiter-ready resume instantly using parsed NLP recommendations.</p>
        </div>
        <Button onClick={handleDownload} className="gap-2 shadow-[0_0_20px_-5px_rgba(124,58,237,0.5)] bg-purple-600 hover:bg-purple-700 py-3 px-6 text-base font-bold">
          <Download className="w-5 h-5" /> Export PDF
        </Button>
      </div>

      <div className="w-full max-w-[1400px] rounded-3xl flex flex-col lg:flex-row gap-8">
        {/* LEFT PANE: Form Control Panel */}
        <div className="flex-1 bg-[#111111] border border-[#1f1f1f] rounded-3xl p-8 flex flex-col gap-6 shadow-xl relative z-10 overflow-hidden">
          
          <div className="absolute top-0 right-0 py-6 px-10 bg-purple-600/10 blur-3xl rounded-full" />
          
          <div className="flex items-center gap-3 mb-2 border-b border-[#1f1f1f] pb-6 relative z-10">
            <div className="w-10 h-10 rounded-full bg-[#1f1f1f] border border-[#333333] flex items-center justify-center">
              <FileText className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Document Structure</h2>
              <p className="text-xs text-[#a1a1aa]">Real-time editing mode enabled</p>
            </div>
          </div>
          
          <form className="flex flex-col gap-6 relative z-10 hidden-scrollbar overflow-y-auto max-h-[800px] pr-2" onSubmit={e => e.preventDefault()}>
            
            {/* Identity Group */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">Identity Details</h3>
              <Input label="Full Name" name="name" value={form.name} onChange={handleChange} placeholder="e.g. John Doe" />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Target Role" name="role" value={form.role} onChange={handleChange} placeholder="e.g. Frontend Engineer" />
                <Input label="Email Address" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" />
              </div>
            </div>

            {/* AI Summary Group */}
            <div className="space-y-4 pt-4 border-t border-[#1f1f1f]">
              <div className="flex justify-between items-center mb-2">
                 <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Executive Summary</h3>
                 <button 
                  type="button" 
                  onClick={generateAISummary}
                  disabled={isGenerating}
                  className="flex items-center text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors bg-purple-900/20 px-3 py-1.5 rounded-lg border border-purple-900/50"
                 >
                   {isGenerating ? (
                      <span className="flex items-center"><div className="w-3 h-3 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mr-2"/> Processing...</span>
                   ) : (
                      <span className="flex items-center"><Wand2 className="w-3 h-3 mr-1.5" /> Auto-Generate</span>
                   )}
                 </button>
              </div>
              <textarea 
                name="summary" 
                value={form.summary} 
                onChange={handleChange} 
                rows={4} 
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#1f1f1f] text-white rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all outline-none placeholder-[#475569] shadow-inner font-mono text-sm" 
                placeholder="Write a brief professional summary or click Auto-Generate using AI..." 
              />
            </div>
            
            {/* Qualifications Group */}
            <div className="space-y-4 pt-4 border-t border-[#1f1f1f]">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">Qualifications</h3>
              <Input label="Technical Skills (comma-separated)" name="skills" value={form.skills} onChange={handleChange} placeholder="TypeScript, React, Golang, GraphQL" />
              
              <div className="flex flex-col gap-1.5 w-full mt-2">
                 <label className="text-sm font-medium text-[#a1a1aa] ml-1">Work & Project Experience</label>
                 <textarea 
                   name="experience" 
                   value={form.experience} 
                   onChange={handleChange} 
                   rows={5} 
                   className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#1f1f1f] text-white rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all outline-none placeholder-[#475569] shadow-inner font-mono text-sm" 
                   placeholder={`Built scalable rest API using Node.js\nOptimized database reads by 40%\nLed frontend component library initiative`} 
                 />
                 <p className="text-xs text-[#475569] ml-1">Tip: Use Enter to separate items onto new lines for better bullet formatting.</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-2">
                <Input label="10th Marks (%)" name="marks10" value={form.marks10} onChange={handleChange} placeholder="e.g. 95%" />
                <Input label="12th Marks (%)" name="marks12" value={form.marks12} onChange={handleChange} placeholder="e.g. 92%" />
              </div>
            </div>

          </form>
        </div>
        
        {/* RIGHT PANE: Component Abstraction Preview */}
        <div className="flex-[1.2] flex justify-center lg:justify-end">
          <CVPreview ref={cvRef} form={form} />
        </div>
        
      </div>
    </div>
  );
};

export default CVBuilder;
