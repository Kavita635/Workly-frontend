export const mockUsers = [
  { id: '1', name: 'John Doe', email: 'student@test.com', password: 'password', role: 'student', skills: ['React', 'JavaScript', 'Node.js'] },
  { id: '2', name: 'TechCorp HR', email: 'company@test.com', password: 'password', role: 'company', companyName: 'TechCorp Innovations' },
  { id: '3', name: 'Admin', email: 'admin@test.com', password: 'password', role: 'admin' },
];

export const mockInternships = [
  {
    id: '1',
    title: 'Frontend Developer Intern',
    company: 'TechCorp Innovations',
    companyId: '2',
    location: 'Remote',
    duration: '6 months',
    stipend: '$1000/month',
    type: 'Full-time',
    description: 'We are looking for a passionate Frontend Developer intern with experience in React and Tailwind CSS.',
    requirements: ['React', 'JavaScript', 'HTML/CSS', 'Responsive Design'],
    postedAt: '2023-10-01',
    status: 'active'
  },
  {
    id: '2',
    title: 'Backend Engineering Intern',
    company: 'DataSystems Inc.',
    companyId: '4',
    location: 'New York, NY',
    duration: '3 months',
    stipend: '$1500/month',
    type: 'Part-time',
    description: 'Join our backend team to build scalable APIs using Node.js and PostgreSQL.',
    requirements: ['Node.js', 'Express', 'SQL', 'Git'],
    postedAt: '2023-10-05',
    status: 'active'
  },
  {
    id: '3',
    title: 'UI/UX Design Intern',
    company: 'Creative Studio',
    companyId: '5',
    location: 'San Francisco, CA',
    duration: '4 months',
    stipend: '$1200/month',
    type: 'Full-time',
    description: 'Help design beautiful user interfaces for our mobile and web applications.',
    requirements: ['Figma', 'Prototyping', 'Wireframing', 'User Research'],
    postedAt: '2023-10-10',
    status: 'active'
  }
];

export const mockApplications = [
  {
    id: '1',
    internshipId: '1',
    studentId: '1',
    status: 'pending', // pending, reviewed, accepted, rejected
    appliedAt: '2023-10-15',
    resumeUrl: 'dummy.pdf',
    coverLetter: 'I would love to join your team.'
  }
];
