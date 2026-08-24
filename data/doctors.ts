export interface Qualification {
  year: string;
  title: string;
  detail: string;
}

/** One weekly clinic block, used to build the read-only Scheduler on a profile. */
export interface AvailabilityBlock {
  /** 1 = Monday … 6 = Saturday. Sunday is emergency cover only. */
  day: 1 | 2 | 3 | 4 | 5 | 6;
  start: string;
  end: string;
  label: string;
  tone: 'accent' | 'success' | 'warning';
}

export interface Doctor {
  slug: string;
  name: string;
  /** Department slug — the booking flow filters on this. */
  department: string;
  specialty: string;
  subspecialties: string[];
  experienceYears: number;
  languages: string[];
  rating: number;
  reviewCount: number;
  consultationFee: number;
  /** Human phrase shown on the "next available" chip. */
  nextAvailable: string;
  photo: string;
  bio: string;
  qualifications: Qualification[];
  availability: AvailabilityBlock[];
}

export const doctors: Doctor[] = [
  {
    slug: 'ananya-rao',
    name: 'Dr. Ananya Rao',
    department: 'cardiology',
    specialty: 'Cardiology',
    subspecialties: ['Interventional cardiology', 'Heart failure'],
    experienceYears: 18,
    languages: ['English', 'Hindi', 'Kannada'],
    rating: 4.9,
    reviewCount: 412,
    consultationFee: 900,
    nextAvailable: 'Tomorrow, 09:30',
    photo:
      'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80',
    bio: 'Ananya has run the cardiac catheterisation lab at MediCare Plus since 2016. She takes a deliberately conservative line on stenting, and will tell you plainly when medication and a walking plan will do more than a procedure.',
    qualifications: [
      { year: '2006', title: 'MBBS', detail: 'Bangalore Medical College' },
      { year: '2010', title: 'MD, Internal Medicine', detail: 'AIIMS New Delhi' },
      {
        year: '2013',
        title: 'DM, Cardiology',
        detail: 'Sri Jayadeva Institute of Cardiovascular Sciences',
      },
      { year: '2016', title: 'Head of Cardiology', detail: 'MediCare Plus, Bengaluru' },
    ],
    availability: [
      { day: 1, start: '09:00', end: '13:00', label: 'OPD clinic', tone: 'accent' },
      { day: 2, start: '09:00', end: '12:00', label: 'Cath lab', tone: 'warning' },
      { day: 3, start: '09:00', end: '13:00', label: 'OPD clinic', tone: 'accent' },
      { day: 4, start: '15:00', end: '18:00', label: 'Follow-up clinic', tone: 'success' },
      { day: 5, start: '09:00', end: '13:00', label: 'OPD clinic', tone: 'accent' },
    ],
  },
  {
    slug: 'vikram-desai',
    name: 'Dr. Vikram Desai',
    department: 'orthopaedics',
    specialty: 'Orthopaedics',
    subspecialties: ['Joint replacement', 'Sports injury'],
    experienceYears: 22,
    languages: ['English', 'Hindi', 'Marathi'],
    rating: 4.8,
    reviewCount: 538,
    consultationFee: 850,
    nextAvailable: 'Today, 16:00',
    photo:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80',
    bio: 'Vikram has performed over 3,000 joint replacements and still insists on seeing every patient himself at the six-week review. He is the surgeon colleagues send their own parents to.',
    qualifications: [
      { year: '2002', title: 'MBBS', detail: 'Grant Medical College, Mumbai' },
      { year: '2006', title: 'MS, Orthopaedics', detail: 'KEM Hospital, Mumbai' },
      {
        year: '2008',
        title: 'Fellowship, Arthroplasty',
        detail: 'Royal Orthopaedic Hospital, Birmingham',
      },
      { year: '2014', title: 'Head of Orthopaedics', detail: 'MediCare Plus, Bengaluru' },
    ],
    availability: [
      { day: 1, start: '10:00', end: '13:00', label: 'OPD clinic', tone: 'accent' },
      { day: 2, start: '08:00', end: '13:00', label: 'Theatre list', tone: 'warning' },
      { day: 4, start: '10:00', end: '13:00', label: 'OPD clinic', tone: 'accent' },
      { day: 5, start: '14:00', end: '18:00', label: 'Sports injury clinic', tone: 'success' },
      { day: 6, start: '09:00', end: '12:00', label: 'Review clinic', tone: 'success' },
    ],
  },
  {
    slug: 'meera-krishnan',
    name: 'Dr. Meera Krishnan',
    department: 'paediatrics',
    specialty: 'Paediatrics',
    subspecialties: ['Neonatology', 'Paediatric allergy'],
    experienceYears: 14,
    languages: ['English', 'Tamil', 'Kannada'],
    rating: 5,
    reviewCount: 621,
    consultationFee: 700,
    nextAvailable: 'Today, 11:15',
    photo:
      'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=800&q=80',
    bio: 'Meera is the reason the paediatric wing has a reading corner instead of a queue. She books longer slots for first visits on principle, because a frightened four-year-old cannot be examined in ten minutes.',
    qualifications: [
      { year: '2010', title: 'MBBS', detail: 'Madras Medical College' },
      { year: '2014', title: 'MD, Paediatrics', detail: 'CMC Vellore' },
      {
        year: '2016',
        title: 'Fellowship, Neonatology',
        detail: 'Great Ormond Street Hospital, London',
      },
      { year: '2019', title: 'Head of Paediatrics', detail: 'MediCare Plus, Bengaluru' },
    ],
    availability: [
      { day: 1, start: '09:00', end: '12:00', label: 'Immunisation clinic', tone: 'success' },
      { day: 2, start: '09:00', end: '13:00', label: 'OPD clinic', tone: 'accent' },
      { day: 3, start: '09:00', end: '12:00', label: 'Immunisation clinic', tone: 'success' },
      { day: 4, start: '09:00', end: '13:00', label: 'OPD clinic', tone: 'accent' },
      { day: 5, start: '14:00', end: '17:00', label: 'Allergy clinic', tone: 'warning' },
    ],
  },
  {
    slug: 'farhan-qureshi',
    name: 'Dr. Farhan Qureshi',
    department: 'neurology',
    specialty: 'Neurology',
    subspecialties: ['Epilepsy', 'Headache medicine'],
    experienceYears: 16,
    languages: ['English', 'Hindi', 'Urdu'],
    rating: 4.7,
    reviewCount: 289,
    consultationFee: 950,
    nextAvailable: 'Thursday, 10:00',
    photo:
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    bio: 'Farhan runs both the epilepsy service and the headache clinic, and has an unusual tolerance for long histories — he would rather spend forty minutes listening than order a scan that answers nothing.',
    qualifications: [
      { year: '2008', title: 'MBBS', detail: 'Osmania Medical College, Hyderabad' },
      { year: '2012', title: 'MD, General Medicine', detail: 'PGIMER Chandigarh' },
      { year: '2015', title: 'DM, Neurology', detail: 'NIMHANS Bengaluru' },
      { year: '2020', title: 'Consultant Neurologist', detail: 'MediCare Plus, Bengaluru' },
    ],
    availability: [
      { day: 2, start: '10:00', end: '13:00', label: 'OPD clinic', tone: 'accent' },
      { day: 3, start: '10:00', end: '13:00', label: 'Epilepsy clinic', tone: 'warning' },
      { day: 4, start: '10:00', end: '13:00', label: 'OPD clinic', tone: 'accent' },
      { day: 5, start: '15:00', end: '18:00', label: 'Headache clinic', tone: 'success' },
    ],
  },
  {
    slug: 'neha-bhatt',
    name: 'Dr. Neha Bhatt',
    department: 'dermatology',
    specialty: 'Dermatology',
    subspecialties: ['Paediatric dermatology', 'Dermato-surgery'],
    experienceYears: 11,
    languages: ['English', 'Hindi', 'Gujarati'],
    rating: 4.8,
    reviewCount: 347,
    consultationFee: 800,
    nextAvailable: 'Tomorrow, 15:00',
    photo:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    bio: 'Neha built the patch-testing service from nothing and keeps a photographic record of every mole she reviews, so a change over two years is measured rather than remembered.',
    qualifications: [
      { year: '2013', title: 'MBBS', detail: 'B. J. Medical College, Ahmedabad' },
      { year: '2017', title: 'MD, Dermatology', detail: 'Seth GS Medical College, Mumbai' },
      {
        year: '2019',
        title: 'Fellowship, Dermato-surgery',
        detail: 'National Skin Centre, Singapore',
      },
      { year: '2021', title: 'Consultant Dermatologist', detail: 'MediCare Plus, Bengaluru' },
    ],
    availability: [
      { day: 1, start: '14:00', end: '18:00', label: 'OPD clinic', tone: 'accent' },
      { day: 2, start: '10:00', end: '13:00', label: 'Patch testing', tone: 'warning' },
      { day: 3, start: '14:00', end: '18:00', label: 'OPD clinic', tone: 'accent' },
      { day: 4, start: '10:00', end: '13:00', label: 'Patch testing', tone: 'warning' },
      { day: 6, start: '09:00', end: '12:00', label: 'Minor procedures', tone: 'success' },
    ],
  },
  {
    slug: 'rohan-mehta',
    name: 'Dr. Rohan Mehta',
    department: 'ent',
    specialty: 'ENT',
    subspecialties: ['Otology', 'Voice disorders'],
    experienceYears: 13,
    languages: ['English', 'Hindi', 'Kannada'],
    rating: 4.6,
    reviewCount: 198,
    consultationFee: 750,
    nextAvailable: 'Wednesday, 12:30',
    photo:
      'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80',
    bio: 'Rohan looks after the cochlear implant programme and a steady stream of teachers and singers whose living depends on their voice. He does the endoscopy while you watch the screen.',
    qualifications: [
      { year: '2011', title: 'MBBS', detail: 'St. Johns Medical College, Bengaluru' },
      { year: '2015', title: 'MS, ENT', detail: 'Maulana Azad Medical College, New Delhi' },
      { year: '2017', title: 'Fellowship, Otology', detail: 'Royal National ENT Hospital, London' },
      { year: '2020', title: 'Consultant ENT Surgeon', detail: 'MediCare Plus, Bengaluru' },
    ],
    availability: [
      { day: 1, start: '09:00', end: '12:00', label: 'OPD clinic', tone: 'accent' },
      { day: 3, start: '09:00', end: '12:00', label: 'Audiology clinic', tone: 'success' },
      { day: 3, start: '14:00', end: '17:00', label: 'OPD clinic', tone: 'accent' },
      { day: 5, start: '08:00', end: '13:00', label: 'Theatre list', tone: 'warning' },
    ],
  },
  {
    slug: 'kavita-iyer',
    name: 'Dr. Kavita Iyer',
    department: 'gynaecology',
    specialty: 'Gynaecology',
    subspecialties: ['High-risk obstetrics', 'Fertility'],
    experienceYears: 20,
    languages: ['English', 'Tamil', 'Hindi'],
    rating: 4.9,
    reviewCount: 704,
    consultationFee: 900,
    nextAvailable: 'Tomorrow, 10:45',
    photo:
      'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80',
    bio: 'Kavita has delivered more than four thousand babies and still answers her own follow-up calls. She leads the high-risk antenatal service and the fertility counselling clinic.',
    qualifications: [
      { year: '2004', title: 'MBBS', detail: 'Kasturba Medical College, Manipal' },
      { year: '2008', title: 'MS, Obstetrics & Gynaecology', detail: 'JIPMER Puducherry' },
      {
        year: '2011',
        title: 'Fellowship, Maternal-Fetal Medicine',
        detail: 'Royal Womens Hospital, Melbourne',
      },
      { year: '2015', title: 'Head of Gynaecology', detail: 'MediCare Plus, Bengaluru' },
    ],
    availability: [
      { day: 1, start: '09:00', end: '13:00', label: 'Antenatal clinic', tone: 'success' },
      { day: 2, start: '14:00', end: '18:00', label: 'OPD clinic', tone: 'accent' },
      { day: 4, start: '09:00', end: '13:00', label: 'Antenatal clinic', tone: 'success' },
      { day: 5, start: '10:00', end: '13:00', label: 'Fertility clinic', tone: 'warning' },
      { day: 6, start: '09:00', end: '12:00', label: 'OPD clinic', tone: 'accent' },
    ],
  },
  {
    slug: 'sanjay-nair',
    name: 'Dr. Sanjay Nair',
    department: 'general-medicine',
    specialty: 'General Medicine',
    subspecialties: ['Diabetes care', 'Preventive health'],
    experienceYears: 25,
    languages: ['English', 'Malayalam', 'Hindi'],
    rating: 4.7,
    reviewCount: 892,
    consultationFee: 600,
    nextAvailable: 'Today, 09:45',
    photo:
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80',
    bio: 'Sanjay has been the first doctor most of our long-standing patients ever saw here. He holds back six slots every morning for people who woke up unwell and cannot wait a week.',
    qualifications: [
      { year: '1999', title: 'MBBS', detail: 'Government Medical College, Thiruvananthapuram' },
      { year: '2003', title: 'MD, General Medicine', detail: 'CMC Vellore' },
      { year: '2009', title: 'Diploma, Diabetology', detail: 'Royal College of Physicians, London' },
      { year: '2012', title: 'Head of General Medicine', detail: 'MediCare Plus, Bengaluru' },
    ],
    availability: [
      { day: 1, start: '08:00', end: '13:00', label: 'OPD clinic', tone: 'accent' },
      { day: 2, start: '08:00', end: '13:00', label: 'OPD clinic', tone: 'accent' },
      { day: 3, start: '08:00', end: '13:00', label: 'Diabetes clinic', tone: 'success' },
      { day: 4, start: '08:00', end: '13:00', label: 'OPD clinic', tone: 'accent' },
      { day: 5, start: '08:00', end: '13:00', label: 'OPD clinic', tone: 'accent' },
      { day: 6, start: '09:00', end: '12:00', label: 'Health check clinic', tone: 'warning' },
    ],
  },
];

export function getDoctor(slug: string): Doctor | undefined {
  return doctors.find((d) => d.slug === slug);
}

export function doctorsByDepartment(departmentSlug: string): Doctor[] {
  return doctors.filter((d) => d.department === departmentSlug);
}

/**
 * The shape the booking Combobox consumes. Kept as plain data so it can cross
 * the server/client boundary without a serialisation warning.
 */
export interface DoctorOption {
  value: string;
  label: string;
  department: string;
  fee: number;
  name: string;
  specialty: string;
}

export const doctorOptions: DoctorOption[] = doctors.map((d) => ({
  value: d.slug,
  label: d.name + ' — ' + d.specialty,
  department: d.department,
  fee: d.consultationFee,
  name: d.name,
  specialty: d.specialty,
}));
