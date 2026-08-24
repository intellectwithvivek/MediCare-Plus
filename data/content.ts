export interface TestimonialEntry {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export const testimonials: TestimonialEntry[] = [
  {
    id: 't1',
    quote:
      'I booked at 11pm on a Sunday with a toddler asleep on me and had a paediatric slot for 9am Monday. No phone queue, no callback that never came.',
    author: 'Priya Sharma',
    role: 'Paediatrics · Indiranagar',
    avatar: 'https://i.pravatar.cc/120?img=47',
  },
  {
    id: 't2',
    quote:
      'Dr. Desai talked me out of surgery and onto twelve weeks of physiotherapy. He was right. I have not thought about my knee since March.',
    author: 'Arun Menon',
    role: 'Orthopaedics · Whitefield',
    avatar: 'https://i.pravatar.cc/120?img=12',
  },
  {
    id: 't3',
    quote:
      'The confirmation SMS arrived before I had closed the tab, and the reminder came the evening before. Small things, but they are the ones clinics usually get wrong.',
    author: 'Fatima Sheikh',
    role: 'General Medicine · Koramangala',
    avatar: 'https://i.pravatar.cc/120?img=31',
  },
  {
    id: 't4',
    quote:
      'Nineteen minutes from walking in to walking out with a prescription, and that included the ECG. I have waited longer for coffee.',
    author: 'Rahul Kulkarni',
    role: 'Cardiology · HSR Layout',
    avatar: 'https://i.pravatar.cc/120?img=60',
  },
  {
    id: 't5',
    quote:
      'Rescheduling took four taps. I have had airlines make that harder, and they had my money already.',
    author: 'Ananya Ghosh',
    role: 'Dermatology · Jayanagar',
    avatar: 'https://i.pravatar.cc/120?img=26',
  },
  {
    id: 't6',
    quote:
      'They sent my scan report to my GP without me having to ask twice. That is the entire review.',
    author: 'Joseph Thomas',
    role: 'Neurology · Hebbal',
    avatar: 'https://i.pravatar.cc/120?img=51',
  },
];

export interface FaqEntry {
  id: string;
  question: string;
  /** Kept as a plain string so the same copy feeds both the UI and FAQPage JSON-LD. */
  answer: string;
}

/**
 * Answers are deliberately direct and 2–3 sentences long: an answer engine
 * quoting one of these should be able to lift it whole and still be correct.
 */
export const faqs: FaqEntry[] = [
  {
    id: 'referral',
    question: 'Do I need a referral to book?',
    answer:
      'No. You can book any specialist at MediCare Plus directly, without a referral from a GP. A referral letter is still useful if you have one, because it saves the consultant re-taking a history you have already given once.',
  },
  {
    id: 'insurance',
    question: 'Which insurance providers do you accept?',
    answer:
      'We are on the cashless panel for Star Health, HDFC ERGO, ICICI Lombard, Niva Bupa, Care Health and the CGHS scheme. Bring your policy number and a photo ID to the appointment, and the front desk will pre-authorise before you see the doctor. Any other insurer can be claimed by reimbursement using the itemised invoice we issue.',
  },
  {
    id: 'reschedule',
    question: 'How do I cancel or reschedule?',
    answer:
      'Use the link in your confirmation SMS or email, up to two hours before the appointment. Cancellations made in that window are free; inside two hours the consultation fee is retained. Rescheduling is always free, however late.',
  },
  {
    id: 'online',
    question: 'Is online consultation available?',
    answer:
      'Yes, for follow-ups, report reviews and repeat prescriptions in every department except Orthopaedics theatre lists. Choose "Video consultation" at the slot step and you will receive a join link fifteen minutes before your time. First visits for a new problem still need to be in person, because an examination is usually the point.',
  },
];

export interface StatEntry {
  id: string;
  value: number;
  suffix?: string;
  label: string;
  description: string;
}

export const clinicStats: StatEntry[] = [
  {
    id: 'doctors',
    value: 84,
    label: 'Consultants',
    description: 'Full-time, across eight specialties',
  },
  {
    id: 'specialties',
    value: 8,
    label: 'Specialties',
    description: 'All under one roof in Indiranagar',
  },
  {
    id: 'patients',
    value: 246000,
    label: 'Patients treated',
    description: 'Since the clinic opened in 2009',
  },
  { id: 'years', value: 17, label: 'Years of care', description: 'Independently owned throughout' },
];

/** What happens after a booking is confirmed — Timeline on the /book success card. */
export interface NextStep {
  title: string;
  description: string;
  timestamp: string;
}

export const nextSteps: NextStep[] = [
  {
    title: 'Confirmation sent',
    description: 'An SMS and email with your booking ID land within a minute.',
    timestamp: 'Now',
  },
  {
    title: 'Pre-visit form',
    description:
      'A short medical history form arrives by email. Filling it in saves about ten minutes at the desk.',
    timestamp: 'Within an hour',
  },
  {
    title: 'Reminder',
    description: 'A reminder with directions and parking details, plus the reschedule link.',
    timestamp: 'Evening before',
  },
  {
    title: 'Your appointment',
    description:
      'Arrive ten minutes early with a photo ID and your insurance card. Ask for the front desk on the ground floor.',
    timestamp: 'On the day',
  },
];

