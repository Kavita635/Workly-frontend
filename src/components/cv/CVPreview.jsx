import React, { forwardRef } from 'react';

const CVPreview = forwardRef(({ form }, ref) => {
  const skillsList = form.skills
    ? form.skills.split(',').map(s => s.trim()).filter(Boolean)
    : [];
    
  // Dynamic parsing logic to split experience strings into structured arrays
  const experienceList = form.experience 
    ? form.experience.split('\n').filter(Boolean) 
    : [];

  return (
    <div className="flex-[1.2] flex justify-center lg:justify-end">
      {/* 
        A4 proportioned canvas container mapping exactly at width 800px.
        Utilizes a classic LinkedIn/SaaS structural grid separated by aggressive borders 
        and heavy sans-serif typography constraints for a modern feel.
      */}
      <div 
        ref={ref} 
        className="aspect-[1/1.4] w-full max-w-[800px] bg-white text-gray-900 px-12 py-14 flex flex-col gap-6 shadow-2xl rounded-sm font-sans"
      >
        {/* HEADER: Name & Professional Core */}
        <div className="border-b-4 border-gray-900 pb-4 mb-2">
          <h1 className="text-4xl font-extrabold text-gray-900 uppercase tracking-tight">
            {form.name || 'Your Full Name'}
          </h1>
          <p className="text-gray-600 mt-2 text-lg font-medium tracking-wide flex justify-between items-center">
            <span>{form.role || 'Professional Identity (e.g. Software Engineer)'}</span>
            <span className="text-sm font-normal text-gray-400">{form.email || 'Email missing'}</span>
          </p>
        </div>
        
        {/* SUMMARY SECTION */}
        <section>
          <h2 className="font-bold text-sm text-gray-800 uppercase tracking-widest border-b border-gray-300 pb-1 mb-3">
             Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-[15px] prose">
            {form.summary || 'A motivated professional seeking to leverage skills and experience to drive innovation... (Click Auto-Generate AI Summary)'}
          </p>
        </section>

        {/* EXPERIENCE GRID */}
        <section className="mt-2">
          <h2 className="font-bold text-sm text-gray-800 uppercase tracking-widest border-b border-gray-300 pb-1 mb-3">
             Professional Experience
          </h2>
          {experienceList.length > 0 ? (
            <div className="flex flex-col gap-4">
              {experienceList.map((exp, idx) => (
                <div key={idx} className="flex flex-col">
                  {/* Pseudo-bullet design for unstructured text arrays */}
                  <div className="flex items-start">
                     <span className="text-gray-400 mr-2 mt-0.5">•</span>
                     <p className="text-gray-700 text-[15px] leading-relaxed flex-1">{exp}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic text-sm">Experience details not yet mapped.</p>
          )}
        </section>
        
        {/* EDUCATION & SKILLS SPLIT */}
        <div className="grid grid-cols-2 gap-8 mt-2">
          <section>
            <h2 className="font-bold text-sm text-gray-800 uppercase tracking-widest border-b border-gray-300 pb-1 mb-3">
               Education
            </h2>
            <div className="flex flex-col gap-3 text-[15px]">
              <div>
                <p className="font-bold text-gray-900">12th Standard Board</p>
                <p className="text-gray-600">Score Requirement: {form.marks12 || '-'}</p>
              </div>
              <div>
                <p className="font-bold text-gray-900">10th Standard Board</p>
                <p className="text-gray-600">Score Requirement: {form.marks10 || '-'}</p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="font-bold text-sm text-gray-800 uppercase tracking-widest border-b border-gray-300 pb-1 mb-3">
               Technical Skills
            </h2>
            <ul className="list-disc pl-5 text-gray-700 text-[15px] space-y-1">
              {skillsList.length > 0 ? (
                skillsList.map((skill, idx) => (
                  <li key={idx} className="font-medium text-gray-800">{skill}</li>
                ))
              ) : (
                <li className="text-gray-400 italic list-none -ml-5">No technical skills detected.</li>
              )}
            </ul>
          </section>
        </div>

      </div>
    </div>
  );
});

export default CVPreview;
