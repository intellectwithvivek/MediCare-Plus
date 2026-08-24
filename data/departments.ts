export interface Department {
  slug: string;
  name: string;
  /** One line for the card and the FeatureGrid. */
  summary: string;
  /** Longer copy for the /departments listing. */
  description: string;
  /** schema.org medicalSpecialty term. */
  specialty: string;
  icon: string;
  conditions: string[];
  head: {
    name: string;
    /** Doctor slug, so the department card can link to a real profile. */
    slug: string;
    avatar: string;
  };
}

export const departments: Department[] = [
  {
    slug: 'cardiology',
    name: 'Cardiology',
    summary: 'Heart rhythm, blood pressure and post-cardiac recovery.',
    description:
      'Echocardiography, stress testing and 24-hour Holter monitoring run in-house, so most cardiac workups finish in a single visit. Our post-infarction rehab programme runs twice weekly.',
    specialty: 'Cardiovascular',
    icon: '❤',
    conditions: ['Hypertension', 'Arrhythmia', 'Angina', 'Heart failure'],
    head: { name: 'Dr. Ananya Rao', slug: 'ananya-rao', avatar: 'https://i.pravatar.cc/160?img=45' },
  },
  {
    slug: 'orthopaedics',
    name: 'Orthopaedics',
    summary: 'Bones, joints, sports injuries and joint replacement.',
    description:
      'A combined surgical and physiotherapy team, which is why our knee and hip replacement patients start guided mobility on day one rather than week one.',
    specialty: 'Musculoskeletal',
    icon: '🦴',
    conditions: ['Fractures', 'Arthritis', 'ACL tears', 'Frozen shoulder'],
    head: { name: 'Dr. Vikram Desai', slug: 'vikram-desai', avatar: 'https://i.pravatar.cc/160?img=13' },
  },
  {
    slug: 'paediatrics',
    name: 'Paediatrics',
    summary: 'Newborn to eighteen — growth, vaccines and urgent care.',
    description:
      'Separate paediatric waiting and triage areas keep unwell children away from adult queues. Immunisation clinics run every weekday morning without an appointment.',
    specialty: 'Pediatric',
    icon: '🧸',
    conditions: ['Asthma', 'Allergies', 'Growth concerns', 'Routine immunisation'],
    head: { name: 'Dr. Meera Krishnan', slug: 'meera-krishnan', avatar: 'https://i.pravatar.cc/160?img=32' },
  },
  {
    slug: 'neurology',
    name: 'Neurology',
    summary: 'Headache, epilepsy, stroke follow-up and nerve pain.',
    description:
      'EEG and nerve conduction studies are read the same day. Our stroke follow-up clinic co-ordinates directly with physiotherapy and speech therapy.',
    specialty: 'Neurologic',
    icon: '🧠',
    conditions: ['Migraine', 'Epilepsy', 'Neuropathy', 'Post-stroke care'],
    head: { name: 'Dr. Farhan Qureshi', slug: 'farhan-qureshi', avatar: 'https://i.pravatar.cc/160?img=52' },
  },
  {
    slug: 'dermatology',
    name: 'Dermatology',
    summary: 'Skin, hair and nail conditions, medical and cosmetic.',
    description:
      'Dermoscopy at every consultation and a fast-track mole review for anything suspicious. Patch testing runs on Tuesdays and Thursdays.',
    specialty: 'Dermatology',
    icon: '✿',
    conditions: ['Eczema', 'Acne', 'Psoriasis', 'Hair loss'],
    head: { name: 'Dr. Neha Bhatt', slug: 'neha-bhatt', avatar: 'https://i.pravatar.cc/160?img=41' },
  },
  {
    slug: 'ent',
    name: 'ENT',
    summary: 'Ear, nose and throat — hearing, sinuses and voice.',
    description:
      'Audiometry, flexible nasal endoscopy and tympanometry are all done in the consulting room, so you rarely need a second appointment to get an answer.',
    specialty: 'Otolaryngologic',
    icon: '👂',
    conditions: ['Sinusitis', 'Hearing loss', 'Tonsillitis', 'Vertigo'],
    head: { name: 'Dr. Rohan Mehta', slug: 'rohan-mehta', avatar: 'https://i.pravatar.cc/160?img=68' },
  },
  {
    slug: 'gynaecology',
    name: 'Gynaecology',
    summary: 'Womens health, fertility support and antenatal care.',
    description:
      'Antenatal packages bundle every scan and blood test into one predictable schedule, and the same consultant sees you at each visit.',
    specialty: 'Gynecologic',
    icon: '⚕',
    conditions: ['PCOS', 'Antenatal care', 'Menopause', 'Fibroids'],
    head: { name: 'Dr. Kavita Iyer', slug: 'kavita-iyer', avatar: 'https://i.pravatar.cc/160?img=25' },
  },
  {
    slug: 'general-medicine',
    name: 'General Medicine',
    summary: 'First stop for everything — diagnosis, referral, follow-up.',
    description:
      'The department that decides where you actually need to be. Same-day slots are held back every morning for acute illness and second opinions.',
    specialty: 'PrimaryCare',
    icon: '🩺',
    conditions: ['Diabetes', 'Thyroid disorders', 'Fever workup', 'Annual health checks'],
    head: { name: 'Dr. Sanjay Nair', slug: 'sanjay-nair', avatar: 'https://i.pravatar.cc/160?img=59' },
  },
];

export function getDepartment(slug: string): Department | undefined {
  return departments.find((d) => d.slug === slug);
}

export const departmentOptions = departments.map((d) => ({ value: d.slug, label: d.name }));
