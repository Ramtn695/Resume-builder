export const CATEGORY = ['Fresher', 'Experienced']
export const PROGRAM_NAME = ['ITI', 'SSLC / 10th', 'Diploma', 'HSC / 12TH', 'U.G.', 'P.G.', 'Doctorate', 'Others']
export const UG_COURSES: string[] = [
  'Bachelor of Arts (BA)',
  'Bachelor of Science (BSc)',
  'Bachelor of Commerce (BCom)',
  'Bachelor of Technology (B.Tech)',
  'Bachelor of Engineering (B.E)',
  'Bachelor of Medicine, Bachelor of Surgery (MBBS)',
  'Bachelor of Laws (LLB)',
  'Bachelor of Education (B.Ed)',
  'Bachelor of Business Administration (BBA)',
  'Bachelor of Computer Applications (BCA)',
  'Others'
];

export const BA_SPECIALIZATIONS: string[] = [
  'BA English',
  'BA History',
  'BA Geography',
  'BA Political Science',
  'BA Economics',
  'BA Psychology',
  'BA Sociology',
  'BA Philosophy',
  'BA Literature',
  'BA Public Administration',
  'BA Journalism',
  'BA Mass Communication',
  'BA Hindi Literature',
  'BA Sanskrit',
  'BA Anthropology',
  'BA Home Science',
  'Others'
];

export const BSC_SPECIALIZATIONS: string[] = [
  'B.Sc. Physics',
  'B.Sc. Chemistry',
  'B.Sc. Biology',
  'B.Sc. Mathematics',
  'B.Sc. Zoology',
  'B.Sc. Botany',
  'B.Sc. Microbiology',
  'B.Sc. Geology',
  'B.Sc. Environmental Science',
  'B.Sc. Statistics',
  'B.Sc. Biotechnology',
  'B.Sc. Nursing',
  'B.Sc. Nutrition',
  'B.Sc. Food Science',
  'B.Sc. Oceanography',
  'B.Sc. Forensic Science',
  'Others'
];

export const BE_SPECIALIZATIONS: string[] = [
  'B.E. Civil Engineering',
  'B.E. Mechanical Engineering',
  'B.E. Electrical Engineering',
  'B.E. Electronics & Communication Engineering',
  'B.E. Computer Science & Engineering',
  'B.E. Chemical Engineering',
  'B.E. Aeronautical Engineering',
  'B.E. Automobile Engineering',
  'B.E. Biomedical Engineering',
  'B.E. Information Technology',
  'B.E. Petroleum Engineering',
  'B.E. Metallurgical Engineering',
  'B.E. Mining Engineering',
  'B.E. Textile Engineering',
  'B.E. Agricultural Engineering',
  'Others'
];

export const BTECH_SPECIALIZATIONS: string[] = [
  'B.Tech. Civil Engineering',
  'B.Tech. Mechanical Engineering',
  'B.Tech. Electrical Engineering',
  'B.Tech. Electronics & Communication Engineering',
  'B.Tech. Computer Science & Engineering',
  'B.Tech. Petroleum Engineering',
  'B.Tech. Metallurgical Engineering',
  'B.Tech. Mining Engineering',
  'B.Tech. Textile Engineering',
  'B.Tech. Agricultural Engineering',
  'B.Tech. Chemical Engineering',
  'B.Tech. Aeronautical Engineering',
  'B.Tech. Automobile Engineering',
  'B.Tech. Biomedical Engineering',
  'B.Tech. Information Technology',
  'Others'
];

export const PG_COURSES: string[] = [
  'Master of Arts (MA)',
  'Master of Science (MSc)',
  'Master of Business Administration (MBA)',
  'Master of Technology (MTech)',
  'Master of Engineering (M.E)',
  'Master of Education (M.Ed)',
  'Master of Laws (LLM)',
  'Master of Public Health (MPH)',
  'Master of Social Work (MSW)',
  'Master of Computer Applications (MCA)',
  'Others'
];

export const MA_SPECIALIZATIONS: string[] = [
  'MA English',
  'MA History',
  'MA Geography',
  'MA Political Science',
  'MA Economics',
  'MA Journalism',
  'MA Mass Communication',
  'MA Hindi Literature',
  'MA Sanskrit',
  'MA Anthropology',
  'MA International Relations',
  'MA Psychology',
  'MA Sociology',
  'MA Philosophy',
  'MA Public Administration',
  'MA Applied Linguistics',
  'Others'
];

export const MSC_SPECIALIZATIONS: string[] = [
  'M.Sc. Physics',
  'M.Sc. Chemistry',
  'M.Sc. Biology',
  'M.Sc. Mathematics',
  'M.Sc. Nursing',
  'M.Sc. Nutrition',
  'M.Sc. Food Science',
  'M.Sc. Oceanography',
  'M.Sc. Forensic Science',
  'M.Sc. Applied Mathematics',
  'M.Sc. Microbiology',
  'M.Sc. Environmental Science',
  'M.Sc. Statistics',
  'M.Sc. Biotechnology',
  'M.Sc. Geology',
  'M.Sc. Zoology',
  'Others'
];

export const MTECH_SPECIALIZATIONS: string[] = [
  'M.Tech. Civil Engineering',
  'M.Tech. Mechanical Engineering',
  'M.Tech. Electrical Engineering',
  'M.Tech. Electronics & Communication Engineering',
  'M.Tech. Data Science',
  'M.Tech. Robotics',
  'M.Tech. Nanotechnology',
  'M.Tech. Environmental Engineering',
  'M.Tech. Production Engineering',
  'M.Tech. Computer Science & Engineering',
  'M.Tech. Chemical Engineering',
  'M.Tech. Power Systems',
  'M.Tech. Structural Engineering',
  'M.Tech. Transportation Engineering',
  'M.Tech. Thermal Engineering',
  'Others'
];

export const ME_SPECIALIZATIONS = [
  'M.E. Data Science',
  'M.E. Robotics',
  'M.E. Nanotechnology',
  'M.E. Environmental Engineering',
  'M.E. Production Engineering',
  'M.E. Civil Engineering',
  'M.E. Mechanical Engineering',
  'M.E. Electrical Engineering',
  'M.E. Electronics & Communication Engineering',
  'M.E. Computer Science & Engineering',
  'M.E. Chemical Engineering',
  'M.E. Power Systems',
  'M.E. Structural Engineering',
  'M.E. Transportation Engineering',
  'M.E. Thermal Engineering',
  'Others'
];

export const DOCTORATE_COURSES: string[] = [
  'Doctor of Philosophy (PhD)',
  'Doctor of Medicine (MD)',
  'Doctor of Education (EdD)',
  'Doctor of Science (DSc)',
  'Doctor of Veterinary Medicine (DVM)',
  'Doctor of Dental Surgery (DDS)',
  'Doctor of Pharmacy (PharmD)',
  'Others'
];

export const PHD_SPECIALIZATIONS: string[] = [
  'PhD Physics',
  'PhD Chemistry',
  'PhD Biology',
  'PhD Mathematics',
  'PhD Computer Science',
  'PhD Engineering',
  'PhD Economics',
  'PhD English Literature',
  'PhD History',
  'PhD Environmental Science',
  'Others'
];

// Specialization Mapping - Maps program names to their specialization arrays
export const SPECIALIZATION_MAP = {
  'Bachelor of Arts (BA)': BA_SPECIALIZATIONS,
  'Bachelor of Science (BSc)': BSC_SPECIALIZATIONS,
  'Bachelor of Technology (B.Tech)': BTECH_SPECIALIZATIONS,
  'Bachelor of Engineering (B.E)': BE_SPECIALIZATIONS,
  'Master of Arts (MA)': MA_SPECIALIZATIONS,
  'Master of Science (MSc)': MSC_SPECIALIZATIONS,
  'Master of Technology (MTech)': MTECH_SPECIALIZATIONS,
  'Master of Engineering (M.E)': ME_SPECIALIZATIONS,
  'Doctor of Philosophy (PhD)': PHD_SPECIALIZATIONS
};

// All programs grouped by education level (key = level label, value = course list)
export const PROGRAMS_BY_LEVEL: { [level: string]: string[] } = {
  'U.G.': UG_COURSES,
  'P.G.': PG_COURSES,
  'Doctorate': DOCTORATE_COURSES
};

// All programs as a single flat array (UG + PG + Doctorate)
export const ALL_PROGRAMS: string[] = [
  ...UG_COURSES,
  ...PG_COURSES,
  ...DOCTORATE_COURSES
];

