import React, { createContext, useContext, useState, useEffect } from "react";
import { mockInternships, mockApplications } from "../api/mockData";

const InternshipContext = createContext();

export const useInternships = () => {
  return useContext(InternshipContext);
};

export const InternshipProvider = ({ children }) => {
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setInternships(mockInternships);
      setApplications(mockApplications);
      setLoading(false);
    };
    fetchData();
  }, []);

  const getCompanyApplications = (companyId) => {
    return applications; // mock matching
  };

  const getStudentApplications = (studentId) => {
    return applications; // mock matching
  };

  const updateApplicationStatus = (appId, status) => {
    setApplications(prev => prev.map(app => app.id === appId ? { ...app, status } : app));
  };

  return (
    <InternshipContext.Provider value={{ 
      internships, 
      loading,
      getCompanyApplications,
      getStudentApplications,
      updateApplicationStatus
    }}>
      {children}
    </InternshipContext.Provider>
  );
};
