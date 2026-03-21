import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockInternships, mockApplications } from '../api/mockData';
import { useAuth } from './AuthContext';

const InternshipContext = createContext();

export const useInternships = () => useContext(InternshipContext);

export const InternshipProvider = ({ children }) => {
  const { user } = useAuth();
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [savedInternships, setSavedInternships] = useState(() => {
    const saved = localStorage.getItem('workly_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 600));
      setInternships(mockInternships);
      setApplications(mockApplications);
      setLoading(false);
    };
    fetchData();
  }, []);

  const getInternshipById = (id) => {
    return internships.find(i => i.id === id);
  };

  const getCompanyInternships = (companyId) => {
    return internships.filter(i => i.companyId === companyId);
  };

  const getStudentApplications = (studentId) => {
    return applications.filter(a => a.studentId === studentId)
      .map(app => ({
        ...app,
        internship: internships.find(i => i.id === app.internshipId)
      }));
  };

  const getCompanyApplications = (companyId) => {
    const compInterns = getCompanyInternships(companyId).map(i => i.id);
    return applications.filter(a => compInterns.includes(a.internshipId))
      .map(app => ({
        ...app,
        internship: internships.find(i => i.id === app.internshipId)
      }));
  };

  const applyForInternship = async (internshipId, coverLetter) => {
    await new Promise(resolve => setTimeout(resolve, 800));

    if (applications.some(a => a.internshipId === internshipId && a.studentId === user.id)) {
      throw new Error('Already applied for this internship');
    }

    const newApp = {
      id: Math.random().toString(36).substr(2, 9),
      internshipId,
      studentId: user.id,
      status: 'pending',
      appliedAt: new Date().toISOString().split('T')[0],
      coverLetter
    };

    setApplications([...applications, newApp]);
  };

  const postInternship = async (internshipData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const newInternship = {
      id: Math.random().toString(36).substr(2, 9),
      companyId: user.id,
      company: user.companyName,
      postedAt: new Date().toISOString().split('T')[0],
      status: 'active',
      ...internshipData
    };

    setInternships([newInternship, ...internships]);
  };

  const updateApplicationStatus = async (applicationId, status) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setApplications(applications.map(app =>
      app.id === applicationId ? { ...app, status } : app
    ));
  };

  const toggleBookmark = (id) => {
    setSavedInternships(prev => {
      const updated = prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id];
      localStorage.setItem('workly_bookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <InternshipContext.Provider value={{
      internships,
      applications,
      loading,
      getInternshipById,
      getCompanyInternships,
      getStudentApplications,
      getCompanyApplications,
      applyForInternship,
      postInternship,
      updateApplicationStatus,
      savedInternships,
      toggleBookmark
    }}>
      {children}
    </InternshipContext.Provider>
  );
};
