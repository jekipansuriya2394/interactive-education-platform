// Admin Panel LocalStorage state management and sync utility

import { contactData } from '../data/contactData';
import { statsData } from '../data/statsData';
import { featuresData } from '../data/featuresData';
import { coursesData } from '../data/coursesData';
import { getFirebaseUrl } from './firebaseConfig';
import { commitContent } from '../services/gitSyncService';

const PREFIX = 'noble_admin_';

const DEFAULTS = {
  blogPosts: [],
  siteLogo: null,
  announcements: [

    { emoji: "🚀", text: "11th Science Admission Open for 2026 Batch" },
    { emoji: "🔥", text: "JEE & NEET 2-Year Integrated Batches Started" },
    { emoji: "🎓", text: "Scholarship Exam Registration is now Open" },
    { emoji: "⚡", text: "Diploma Engineering & DDCET Classes Commenced" },
    { emoji: "📍", text: "Visit Waghodia Road Campus (Above Bank of India) or Call 9104206999" }
  ],
  results: [
    { name: "Shital Kumavat", score: "99.60 PR", exam: "SSC Board 2025", branch: "10th Standard Topper", status: "A1-Grade Performer", school: "Royal School, Vadodara", image: "/images/shital-result.png" },
    { name: "Dhairya Darji", score: "97.14 PR", exam: "SSC Board 2025", branch: "10th Standard Topper", status: "Outstanding Score", school: "Royal School, Vadodara", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80" },
    { name: "Dave Raj", score: "95% Score", exam: "Std 10 Boards", branch: "Foundation Batch", status: "Perfect Score in Maths", school: "Royal School, Vadodara", image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80" },
    { name: "Prachi Parmar", score: "99.22 PR", exam: "SSC Board 2025", branch: "10th Standard Topper", status: "A1-Grade Performer", school: "Raghukul Vidyalay, Vadodara", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80" },
    { name: "Patel Harsh", score: "99.4 PR", exam: "12th Science Board", branch: "A-Group", status: "Admitted in LD College", school: "Raghukul Vidyalay, Vadodara", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80" },
    { name: "Rana Dev", score: "98.8 PR", exam: "GUJCET Exam", branch: "Maths Stream", status: "Top Merit Ranker", school: "Raghukul Vidyalay, Vadodara", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80" },
    { name: "Pratiksha Pandey", score: "97.52 PR", exam: "SSC Board 2025", branch: "10th Standard Topper", status: "Outstanding Score", school: "New Heaven Vidyalaya, Vadodara", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&auto=format&fit=crop&q=80" },
    { name: "Jethi Suthar", score: "97.27 PR", exam: "SSC Board 2025", branch: "10th Standard Topper", status: "Outstanding Score", school: "New Heaven Vidyalaya, Vadodara", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80" },
    { name: "Mehta Keyur", score: "Rank 12", exam: "DDCET Entrance", branch: "IT Branch Target", status: "Admission in VGEC", school: "New Heaven Vidyalaya, Vadodara", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&auto=format&fit=crop&q=80" },
    { name: "Shah Miti", score: "10.0 SPI", exam: "Diploma Sem-4 Computer", branch: "Computer Engineering", status: "Class First Rank", school: "New Heaven Vidyalaya, Vadodara", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80" },
    { name: "Panchal Diya", score: "9.80 CPI", exam: "Degree Sem-6 IT", branch: "Information Technology", status: "Outstanding Project grade", school: "Royal School, Vadodara", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80" }
  ],
  gallery: [
    {
      title: "Noble Education Campus Tour (Official Video)",
      category: "Videos",
      mediaType: "video",
      videoUrl: "/images/campus-tour.mp4",
      image: "",
      aspectRatio: "16/9"
    },
    {
      title: "Campus Tour & Interactive Smart Classrooms",
      category: "Videos",
      mediaType: "video",
      videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
      image: "https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg"
    },
    {
      title: "Student Felicitation & Annual Celebrations",
      category: "Videos",
      mediaType: "video",
      videoUrl: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
      image: "https://img.youtube.com/vi/2Vv-BfVoq4g/hqdefault.jpg"
    },
    { title: "Smart Learning Interactive Boards", category: "Classrooms", image: "/images/bg-gallery-hero.png" },
    { title: "Parent Counseling Career Seminar", category: "Seminars", image: "/images/bg-about-hero.png" },
    { title: "Mock Exam Practice Hall", category: "Activities", image: "/images/bg-results-hero.png" },
    { title: "DDCET Preparation Class Orientation", category: "Seminars", image: "/images/bg-contact-hero.png" },
    { title: "Science Lab Experiments Orientation", category: "Activities", image: "/images/bg-courses-hero.png" },
    { title: "ACPC Online Choice Filling Workshop", category: "Seminars", image: "/images/bg-admission-hero.png" },
    { title: "Event Welcome Reception Desk", category: "Events", image: "/images/gallery-event-welcome.jpg" },
    { title: "Student Felicitation Ceremony", category: "Events", image: "/images/gallery-event-student1.jpg" },
    { title: "Class Toppers Celebration Group", category: "Events", image: "/images/gallery-event-students.jpg" },
    { title: "Academic Achiever Portrait", category: "Events", image: "/images/gallery-event-student2.jpg" },
    { title: "Parent & Student Audience Hall", category: "Events", image: "/images/gallery-event-audience.jpg" },
    { title: "VIP Dignitaries & Guests", category: "Events", image: "/images/gallery-event-vips.jpg" },
    { title: "Inaugural Lamp Lighting Ceremony", category: "Events", image: "/images/gallery-event-lamp.jpg" },
    { title: "Felicitation Group Photo (Boys)", category: "Events", image: "/images/gallery-event-boys.jpg" },
    { title: "Felicitation Group Photo (Girls)", category: "Events", image: "/images/gallery-event-girls.jpg" },
    { title: "VIP Felicitation & Award Stage", category: "Events", image: "/images/gallery-event-felicitation.jpg" },
    { title: "Staff Coordinator Recognition", category: "Events", image: "/images/gallery-event-felicitation-staff.jpg" },
    { title: "Topper Felicitation (Saree)", category: "Events", image: "/images/gallery-event-felicitation-girl1.jpg" },
    { title: "Student Podium Speech", category: "Events", image: "/images/gallery-event-speech.jpg" },
    { title: "Students Stage Dance Performance", category: "Events", image: "/images/gallery-event-dance.jpg" },
    { title: "Topper Felicitation (Dress)", category: "Events", image: "/images/gallery-event-felicitation-girl2.jpg" }
  ],
  testimonials: [
    {
      name: "Rohan Patel",
      program: "DDCET Course",
      stars: 5,
      quote: "Noble Education provided the exact roadmap I needed for DDCET. The mock test series and engineering syllabus support helped me secure direct second-year degree admission in my dream branch."
    },
    {
      name: "Sneha Shah",
      program: "12th Science (PCM)",
      stars: 5,
      quote: "The teachers here simplify complex physics and maths equations like no other. Personal attention and doubt-solving desks after classes are truly exceptional."
    },
    {
      name: "Aman Verma",
      program: "Diploma IT Engineering",
      stars: 5,
      quote: "Balancing coding projects, practicals, and university exams was tough until I joined Noble. Their subject coaching and practical support made it look easy!"
    },
    {
      name: "Pooja Mehta",
      program: "Parent (10th Standard)",
      stars: 5,
      quote: "We were very confused about branch and stream choices after 10th. The detailed career counseling session here cleared all our worries. Truly a trusted institute."
    },
    {
      name: "Jayesh Parmar",
      program: "NEET Medical Prep",
      stars: 5,
      quote: "Noble's intensive question practice sessions and constant revision schedule helped boost my confidence for competitive tests. High-quality study material!"
    },
    {
      name: "Dhairya Darji",
      program: "10th Board (97.14 PR)",
      stars: 5,
      quote: "The mock exam series before board exams helped me manage time perfectly during final exams. Royal School partner batch faculty support was amazing!"
    },
    {
      name: "Bhavik Suthar",
      program: "JEE Mains (98.6 PR)",
      stars: 5,
      quote: "Short tricks for Physics and Chemistry numericals saved crucial minutes in JEE Mains. Top guidance and study atmosphere!"
    },
    {
      name: "Nidhi Solanki",
      program: "Parent (12th Science)",
      stars: 5,
      quote: "Noble Education provides weekly progress updates to parents. Regular unit tests and transparent guidance gave us 100% peace of mind."
    },
    {
      name: "Karan Trivedi",
      program: "DDCET Computer Branch",
      stars: 5,
      quote: "Secured Top 50 DDCET rank thanks to formula sheets, marathon revision sessions, and dedicated engineering test series!"
    },
    {
      name: "Megha Joshi",
      program: "Std 10 Board A1 Grade",
      stars: 5,
      quote: "Personal mentor feedback helped me identify weak chapters early. I went from 75% in preliminaries to A1 Grade in final SSC boards!"
    }
  ],
  stats: statsData,
  features: featuresData,
  contactInfo: contactData,
  courses: coursesData,
  popupConfig: {
    enabled: true,
    autoSlide: true,
    interval: 4000,
    link: '#inquiry-form',
    images: [
      { id: '1', url: '/images/jagannath_rath_yatra.jpg', title: 'Admissions Open 2026 Batch', link: '#inquiry-form' },
      { id: '2', url: '/images/shital-result.png', title: 'Record Breaking 99.60 PR in SSC Board', link: '/results' }
    ]
  },
  pageImages: {
    homeInfrastructure: [
      { id: "hi1", title: "Institute Campus Premises", category: "Premises", image: "/images/hero-classroom.png", desc: "State-of-the-art coaching facilities on Waghodia Road" },
      { id: "hi2", title: "Dedicated Study & Doubt Desks", category: "Faculty", image: "/images/hero-counseling.png", desc: "1-on-1 personal guidance and doubt resolution" },
      { id: "hi3", title: "Interactive Board Setup", category: "Technology", image: "/images/bg-gallery-hero.png", desc: "Modern visual learning tools for maximum retention" }
    ],
    homeClassrooms: [
      { id: "hc1", title: "School Foundation Classroom (8th-10th)", category: "School", image: "/images/hero-classroom.png", desc: "Interactive board coaching for Std 8 to 10" },
      { id: "hc2", title: "11th & 12th Science Theory & Lab Desk", category: "Science", image: "/images/bg-courses-hero.png", desc: "Comprehensive Physics, Chemistry & Biology coaching" },
      { id: "hc3", title: "NEET & JEE Competitive Batch Hall", category: "Competitive", image: "/images/bg-results-hero.png", desc: "Rigorous test series and PYQ practice halls" },
      { id: "hc4", title: "Diploma & Degree Engineering Tutorials", category: "Engineering", image: "/images/hero-engineering.png", desc: "Semester subject coaching & GTU exam guidance" }
    ],
    homeHighlights: [
      { id: "hh1", title: "Class Toppers Celebration", category: "Events", image: "/images/gallery-event-students.jpg", desc: "Celebrating academic toppers in Vadodara" },
      { id: "hh2", title: "Student Speech at Podium", category: "Seminars", image: "/images/gallery-event-speech.jpg", desc: "Orientation & student speeches" },
      { id: "hh3", title: "Memento Stage Felicitation", category: "Events", image: "/images/gallery-event-felicitation.jpg", desc: "Annual award felicitation ceremony" },
      { id: "hh4", title: "Event Entrance Welcome Desk", category: "Campus", image: "/images/gallery-event-welcome.jpg", desc: "Waghodia Road campus event welcome" }
    ],
    home: [
      { id: "h1", title: "Class Toppers Celebration", category: "Events", image: "/images/gallery-event-students.jpg", desc: "Celebrating academic toppers in Vadodara" },
      { id: "h2", title: "Student Speech at Podium", category: "Seminars", image: "/images/gallery-event-speech.jpg", desc: "Orientation & student speeches" },
      { id: "h3", title: "Memento Stage Felicitation", category: "Events", image: "/images/gallery-event-felicitation.jpg", desc: "Annual award felicitation ceremony" },
      { id: "h4", title: "Event Entrance Welcome Desk", category: "Campus", image: "/images/gallery-event-welcome.jpg", desc: "Waghodia Road campus event welcome" }
    ],
    about: [
      { id: "a1", title: "Institute Campus Premises", category: "Premises", image: "/images/hero-classroom.png", desc: "State-of-the-art coaching facilities on Waghodia Road" },
      { id: "a2", title: "Dedicated Study & Doubt Desks", category: "Faculty", image: "/images/hero-counseling.png", desc: "1-on-1 personal guidance and doubt resolution" },
      { id: "a3", title: "Interactive Board Setup", category: "Technology", image: "/images/bg-gallery-hero.png", desc: "Modern visual learning tools for maximum retention" }
    ],
    courses: [
      { id: "c1", title: "School Foundation Classroom (8th-10th)", category: "School", image: "/images/hero-classroom.png", desc: "Interactive board coaching for Std 8 to 10" },
      { id: "c2", title: "11th & 12th Science Theory & Lab Desk", category: "Science", image: "/images/bg-courses-hero.png", desc: "Comprehensive Physics, Chemistry & Biology coaching" },
      { id: "c3", title: "NEET & JEE Competitive Batch Hall", category: "Competitive", image: "/images/neet_repeater_banner.jpg", desc: "Rigorous test series and PYQ practice halls" },
      { id: "c4", title: "Diploma & Degree Engineering Tutorials", category: "Engineering", image: "/images/hero-engineering.png", desc: "Semester subject coaching & GTU exam guidance" }
    ],
    admission: [
      { id: "ad1", title: "1-on-1 Career Stream Counseling Desk", category: "Counseling", image: "/images/hero-counseling.png", desc: "Personalized stream guidance for Std 10 & 12 students" },
      { id: "ad2", title: "ACPC Online Choice Filling Workshop", category: "Registration", image: "/images/bg-admission-hero.png", desc: "Step-by-step assistance for engineering college admissions" },
      { id: "ad3", title: "Parent Information & Guidance Sessions", category: "Seminars", image: "/images/bg-about-hero.png", desc: "Clear roadmap updates for parents and guardians" }
    ],
    studentCorner: [
      { id: "sc1", title: "Quiet Self-Study Lounge & Revision Desk", category: "Study", image: "/images/bg-student-hero.png", desc: "Dedicated space for daily revision and practice" },
      { id: "sc2", title: "Weekly Mock Test Examination Hall", category: "Exams", image: "/images/bg-results-hero.png", desc: "Simulated exam hall environment for time management" },
      { id: "sc3", title: "Question Bank & Study Notes Library", category: "Resources", image: "/images/jee_mains_pyq_banner.jpg", desc: "Access 10+ years of previous year solved questions" }
    ],
    contact: [
      { id: "ct1", title: "Waghodia Road Main Reception Desk", category: "Campus", image: "/images/gallery-event-welcome.jpg", desc: "Above Bank of India, Waghodia Road, Vadodara" },
      { id: "ct2", title: "Counseling & Help Desk Office", category: "Helpline", image: "/images/bg-contact-hero.png", desc: "Call 9104206999 for instant admission inquiries" }
    ]
  },
  videoLectures: [
    {
      id: "1",
      title: "Std 12 Biology - Apomixis & Polyembryony (Part 5)",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      category: "Std 12 Biology",
      description: "In-depth concept explanation of seed development without fertilization & polyembryony for NEET 2026."
    },
    {
      id: "2",
      title: "NEET & JEE Physics - Laws of Motion PYQ Revision",
      youtubeUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
      category: "NEET/JEE Physics",
      description: "Solve top 20 previous year questions with short tricks and speed formulas."
    },
    {
      id: "3",
      title: "Class 10 Board Exam Science & Maths Strategy",
      youtubeUrl: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
      category: "Class 10 Board",
      description: "Complete chapter-wise weightage analysis and high-scoring study roadmap."
    }
  ],
  heroBanners: [
    {
      id: "hb1",
      title: "SSC Board 2025 Toppers",
      highlightWord: "SSC Board 2025",
      subtitle: "Record-Breaking 99.60 PR in Vadodara",
      desc: "Our student Shital Kumavat secures A1-grade with 99.60 Percentile Rank. Noble Education delivers top board ranks consistently.",
      image: "/images/bg-results-banner.png",
      cardImage: "/images/shital-result.png",
      buttonText: "Book Free Counselling",
      buttonLink: "#inquiry-form"
    },
    {
      id: "hb2",
      title: "Admissions Open 2026-27",
      highlightWord: "Admissions Open",
      subtitle: "Std 8th to 12th Science (GSEB / CBSE)",
      desc: "Enroll in Vadodara's elite concept-based coaching. Expert faculty, personal attention, and rigorous test series to secure top board ranks.",
      image: "/images/hero-counseling.png",
      buttonText: "Book Free Counselling",
      buttonLink: "#inquiry-form"
    },
    {
      id: "hb3",
      title: "NEET & JEE Intensive Batches",
      highlightWord: "NEET & JEE",
      subtitle: "Dedicated Competitive Exam Preparation",
      desc: "Comprehensive study material, chapter-wise mock tests, and personalized doubt sessions by top competitive faculties.",
      image: "/images/hero-classroom.png",
      buttonText: "Book Free Counselling",
      buttonLink: "#inquiry-form"
    },
    {
      id: "hb4",
      title: "Diploma & Degree Engineering Coaching",
      highlightWord: "Engineering",
      subtitle: "GTU Semester & Competitive Entrance Prep",
      desc: "Expert engineering faculties guiding students with subject concept mastery and high scoring techniques.",
      image: "/images/hero-engineering.png",
      buttonText: "Book Free Counselling",
      buttonLink: "#inquiry-form"
    }
  ],
  partnerSchools: [
    {
      id: "ps1",
      name: "Royal School",
      medium: "English Medium",
      standards: "Standards 8th, 9th, 10th, 11th and 12th Science",
      address: "Kamla Nagar Lake Road, Ajwa Road, Vadodara",
      mapUrl: "https://maps.google.com/?q=Royal+School+Kamla+Nagar+Lake+Road+Ajwa+Road+Vadodara",
      contact: "96382 56222",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&auto=format&fit=crop&q=80",
      description: "Premier integrated English Medium partner offering complete 8th to 12th Science preparation."
    },
    {
      id: "ps2",
      name: "Raghukul Vidyalay",
      medium: "Gujarati Medium",
      standards: "Standards 8th, 9th and 10th",
      address: "Opposite Balaji Township, New VIP Road, Vadodara",
      mapUrl: "https://maps.google.com/?q=Raghukul+Vidyalay+Opposite+Balaji+Township+New+VIP+Road+Vadodara",
      contact: "96382 56246",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=80",
      description: "Dedicated Gujarati Medium school foundation coaching for secondary board toppers."
    },
    {
      id: "ps3",
      name: "New Heaven Vidyalaya",
      medium: "Gujarati Medium",
      standards: "Standards 11th and 12th Science",
      address: "Vrundavan Char Rasta, Waghodia Road, Vadodara",
      mapUrl: "https://maps.google.com/?q=New+Heaven+Vidyalay+Vrundavan+Char+Rasta+Waghodia+Road+Vadodara",
      contact: "91042 06555",
      image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=600&auto=format&fit=crop&q=80",
      description: "Specialized 11th & 12th Science Gujarati Medium board, GUJCET and NEET integrated coaching campus."
    }
  ],
  schoolPhotos: [
    { id: "sp1", schoolName: "Royal School", title: "Royal School Main Campus Premises", category: "Premises", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&auto=format&fit=crop&q=80", desc: "Main campus premises on Kamla Nagar Lake Road" },
    { id: "sp2", schoolName: "Royal School", title: "Smart Interactive Learning Classrooms", category: "Classrooms", image: "/images/bg-gallery-hero.png", desc: "Digital visual learning setup for maximum retention" },
    { id: "sp3", schoolName: "Royal School", title: "Dedicated Doubt & Self Study Lounge", category: "Classrooms", image: "/images/hero-counseling.png", desc: "1-on-1 daily personal doubt resolution desks" },
    { id: "sp4", schoolName: "Royal School", title: "Royal School Academic Toppers Felicitation", category: "Events", image: "/images/gallery-event-students.jpg", desc: "Celebrating 10th & 12th board rankers" },

    { id: "sp5", schoolName: "Raghukul Vidyalay", title: "Raghukul Vidyalay Campus Building", category: "Premises", image: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=80", desc: "Gujarati Medium 8th to 10th standard campus premises" },
    { id: "sp6", schoolName: "Raghukul Vidyalay", title: "Interactive Board Classroom Coaching", category: "Classrooms", image: "/images/hero-classroom.png", desc: "Foundation concept learning for Std 8, 9 & 10" },
    { id: "sp7", schoolName: "Raghukul Vidyalay", title: "Parent Career Guidance & Counseling Seminar", category: "Seminars", image: "/images/bg-about-hero.png", desc: "Board exam preparation roadmap for parents" },

    { id: "sp8", schoolName: "New Heaven Vidyalaya", title: "New Heaven Vidyalaya Campus Premises", category: "Premises", image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=600&auto=format&fit=crop&q=80", desc: "Gujarati Medium 11th & 12th Science campus premises" },
    { id: "sp9", schoolName: "New Heaven Vidyalaya", title: "Physics & Chemistry Practical Laboratory Desk", category: "Classrooms", image: "/images/bg-courses-hero.png", desc: "Equipped practical desks for GSEB 11th & 12th Science" },
    { id: "sp10", schoolName: "New Heaven Vidyalaya", title: "GUJCET & NEET Practice Test Hall", category: "Classrooms", image: "/images/bg-results-hero.png", desc: "Simulated exam hall practice for competitive students" }
  ]
};

export const adminData = {
  // runtime sync control
  syncEnabled: true,
  _lastSyncSuccess: 0,
  _lastFetchSuccess: 0,
  // ─── Role-Based Authentication & User Management ──────────────────
  getUsers() {
    try {
      const usersStr = localStorage.getItem(PREFIX + 'users');
      if (usersStr) {
        const parsed = JSON.parse(usersStr);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Auto-migrate default admin credentials to new requested email/password
          let updated = false;
          const migrated = parsed.map(u => {
            if (u.id === '1' || u.role === 'superadmin' || u.username === 'admin') {
              if (u.username !== 'nobleedudigital@gmail.com' || u.password !== 'Noble2026@') {
                updated = true;
                return {
                  ...u,
                  username: 'nobleedudigital@gmail.com',
                  password: 'Noble2026@'
                };
              }
            }
            return u;
          });
          if (updated) {
            localStorage.setItem(PREFIX + 'users', JSON.stringify(migrated));
            this.syncKeyToServer('users', migrated).catch(() => {});
          }
          return migrated;
        }
      }
    } catch (e) {
      console.error('Error loading users', e);
    }
    // Default superadmin user
    const defaultUsers = [
      {
        id: '1',
        username: 'nobleedudigital@gmail.com',
        password: 'Noble2026@',
        role: 'superadmin',
        permissions: [
          'dashboard', 'announcements', 'results', 'gallery', 
          'testimonials', 'courses', 'stats', 'features', 
          'contactInfo', 'inquiries', 'settings', 'popup',
          'videos', 'pagePhotos'
        ]
      },
      {
        id: '1784639129255',
        username: 'manshi123',
        password: '123',
        role: 'staff',
        permissions: ['dashboard', 'inquiries:view']
      }
    ];
    localStorage.setItem(PREFIX + 'users', JSON.stringify(defaultUsers));
    this.syncKeyToServer('users', defaultUsers).catch(() => {});
    return defaultUsers;
  },


  saveUsers(users) {
    return this.setData('users', users);
  },

  isLoggedIn() {
    try {
      if (sessionStorage.getItem(PREFIX + 'session') !== 'true') return false;
      const expireTimeStr = sessionStorage.getItem(PREFIX + 'session_expire');
      if (expireTimeStr) {
        const expireTime = parseInt(expireTimeStr, 10);
        if (isNaN(expireTime) || Date.now() > expireTime) {
          this.logout();
          return false;
        }
      }
      const user = this.getCurrentUser();
      return !!user;
    } catch (e) {
      return false;
    }
  },

  getSessionRemainingSeconds() {
    try {
      if (sessionStorage.getItem(PREFIX + 'session') !== 'true') return 0;
      const expireTimeStr = sessionStorage.getItem(PREFIX + 'session_expire');
      if (!expireTimeStr) return 0;
      const expireTime = parseInt(expireTimeStr, 10);
      if (isNaN(expireTime)) return 0;
      const remaining = Math.max(0, Math.floor((expireTime - Date.now()) / 1000));
      if (remaining === 0) {
        this.logout();
      }
      return remaining;
    } catch (e) {
      return 0;
    }
  },

  extendSession() {
    try {
      const newExpire = Date.now() + 30 * 60 * 1000;
      sessionStorage.setItem(PREFIX + 'session_expire', newExpire.toString());
      return true;
    } catch {}
    return false;
  },

  getCurrentUser() {
    try {
      const userStr = sessionStorage.getItem(PREFIX + 'currentUser');
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user && user.username) return user;
      }
    } catch {}
    return null;
  },


  login(username, password) {
    try {
      const users = this.getUsers();
      const input = (username || '').trim().toLowerCase();
      const cleanDigits = input.replace(/[\s\-\+\(\)]/g, '');
      const user = users.find(
        u => u && u.username && (
          u.username.toLowerCase() === input ||
          (input === 'admin' && (u.username === 'nobleedudigital@gmail.com' || u.role === 'superadmin')) ||
          ((cleanDigits === '9638256246' || cleanDigits === '919638256246' || cleanDigits === '9104206999' || cleanDigits === '919104206999') && (u.username === 'nobleedudigital@gmail.com' || u.role === 'superadmin'))
        ) && u.password === password
      );
      if (user) {
        const expireTime = Date.now() + 30 * 60 * 1000;
        sessionStorage.setItem(PREFIX + 'session', 'true');
        sessionStorage.setItem(PREFIX + 'session_expire', expireTime.toString());
        sessionStorage.setItem(PREFIX + 'currentUser', JSON.stringify(user));
        return { success: true, user };
      }
    } catch (e) {}
    return { success: false, error: 'Invalid username or password' };
  },

  logout() {
    try {
      sessionStorage.removeItem(PREFIX + 'session');
      sessionStorage.removeItem(PREFIX + 'session_expire');
      sessionStorage.removeItem(PREFIX + 'currentUser');
    } catch {}
    // Also clear any stale localStorage session data
    try {
      localStorage.removeItem(PREFIX + 'session');
      localStorage.removeItem(PREFIX + 'session_expire');
      localStorage.removeItem(PREFIX + 'currentUser');
    } catch {}
  },


  hasPermission(permission, action = 'view') {
    try {
      const user = this.getCurrentUser();
      if (!user) return false;
      if (user.role === 'superadmin') return true;
      
      const perms = Array.isArray(user.permissions) ? user.permissions : [];
      if (permission === 'allPhotos') {
        const photoKeys = ['allPhotos', 'schoolPhotos', 'gallery', 'pagePhotos', 'heroBanners', 'popup'];
        return photoKeys.some(k => perms.includes(k) || perms.includes(`${k}:view`));
      }
      
      if (perms.includes(permission)) return true;
      const key = `${permission}:${action}`;
      return perms.includes(key);
    } catch {
      return false;
    }
  },

  async updateUserPassword(userId, newPassword) {
    try {
      const users = this.getUsers();
      let updated = false;
      const newUsers = users.map(u => {
        if (String(u.id) === String(userId) || u.role === 'superadmin' || u.username === 'nobleedudigital@gmail.com') {
          updated = true;
          return { ...u, password: newPassword };
        }
        return u;
      });

      if (!updated && newUsers.length > 0) {
        newUsers[0].password = newPassword;
      }

      this.saveUsers(newUsers);
      await this.syncKeyToServer('users', newUsers);

      const currentUser = this.getCurrentUser();
      if (currentUser) {
        currentUser.password = newPassword;
        sessionStorage.setItem(PREFIX + 'currentUser', JSON.stringify(currentUser));
      }
      return true;
    } catch (e) {
      console.error('Failed to update user password', e);
      return false;
    }
  },

  // Key operations
  getAllKeys() {
    return Object.keys(DEFAULTS);
  },

  // Sync control helpers
  getSyncEnabled() {
    try {
      const stored = localStorage.getItem(PREFIX + 'syncEnabled');
      if (stored !== null) return JSON.parse(stored);
    } catch {}
    return this.syncEnabled;
  },

  setSyncEnabled(value) {
    try {
      this.syncEnabled = !!value;
      localStorage.setItem(PREFIX + 'syncEnabled', JSON.stringify(this.syncEnabled));
    } catch {}
  },

  getLastSyncTime() { return this._lastSyncSuccess || 0; },
  getLastFetchTime() { return this._lastFetchSuccess || 0; },

  getSyncApiUrls() {
    const firebaseUrl = getFirebaseUrl();
    const urls = [];
    if (firebaseUrl && firebaseUrl.trim()) {
      urls.push(`${firebaseUrl}/data.json`);
    }
    if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      const base = window.location.pathname.startsWith('/interactive-education-platform') ? '/interactive-education-platform' : '';
      urls.push(`${base}/api/sync-data`);
    }
    return urls;
  },

  // Force operations (return promises)
  async forceSync() { try { return await this.syncToServer(); } catch { return false; } },
  async forceFetch() { try { return await this.fetchFromServer(); } catch { return null; } },

  _memoryCache: {},

  getData(key) {
    if (this._memoryCache && this._memoryCache[key] !== undefined) {
      return this._memoryCache[key];
    }
    try {
      const data = localStorage.getItem(PREFIX + key);
      if (data !== null) {
        const parsed = JSON.parse(data);
        if (key === 'partnerSchools' && Array.isArray(parsed) && parsed.length > 0) {
          const defaults = DEFAULTS.partnerSchools || [];
          return parsed.map((item, idx) => {
            const def = defaults[idx] || {};
            return {
              ...def,
              ...item,
              address: item?.address || def.address || 'Waghodia Road, Vadodara',
              medium: item?.medium || def.medium || 'English Medium',
              contact: item?.contact || def.contact || '91042 06999',
            };
          });
        }
        return parsed;
      }
    } catch (e) {
      console.error(`Error loading data for ${key}`, e);
      try { localStorage.removeItem(PREFIX + key); } catch {}
    }
    return DEFAULTS[key] !== undefined ? DEFAULTS[key] : [];
  },

  _syncListeners: new Set(),
  _lastKnownHashes: {},
  _isPollingActive: false,
  _globalPollTimer: null,
  _storageListenerBound: false,

  subscribe(key, callback) {
    if (typeof callback !== 'function') return () => {};
    const listener = { key: key || null, callback };
    this._syncListeners.add(listener);

    // Ensure single shared background poller is running
    this._ensureGlobalPoller();

    return () => {
      this._syncListeners.delete(listener);
    };
  },

  notifySubscribers(key, value) {
    try {
      window.dispatchEvent(new CustomEvent('noble_admin_data_change', { detail: { key, value } }));
    } catch {}

    if (this._syncListeners && this._syncListeners.size > 0) {
      this._syncListeners.forEach(listener => {
        try {
          if (!listener.key || listener.key === key) {
            listener.callback(value, key);
          }
        } catch (e) {
          console.error('[adminData] Listener callback error:', e);
        }
      });
    }
  },

  setData(key, value) {
    if (!this._memoryCache) this._memoryCache = {};
    this._memoryCache[key] = value;

    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.warn(`[adminData] localStorage write skipped for ${key} (quota limit):`, e);
    }

    try {
      this.notifySubscribers(key, value);
    } catch {}

    // 1. Instantly push this specific section to Cloud Database
    this.syncKeyToServer(key, value).catch(err => {
      console.error(`[adminData] Error syncing ${key} to cloud:`, err);
    });

    // 2. Commit & push changes to Git Repository via Worker API (non-blocking)
    try {
      commitContent(`content/${key}.json`, value, `chore(cms): update ${key} content`).catch(() => {});
    } catch (e) {}
    return true;
  },

  async setDataAsync(key, value) {
    if (!this._memoryCache) this._memoryCache = {};
    this._memoryCache[key] = value;

    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.warn(`[adminData] localStorage write skipped for ${key} (quota limit):`, e);
    }

    try {
      this.notifySubscribers(key, value);
    } catch {}

    // Instantly push this specific section to Cloud Database and return status
    const cloudOk = await this.syncKeyToServer(key, value);

    // Commit & push changes to Git Repository via Worker API (non-blocking)
    try {
      commitContent(`content/${key}.json`, value, `chore(cms): update ${key} content`).catch(() => {});
    } catch (e) {}

    return cloudOk;
  },

  resetData(key) {
    if (DEFAULTS[key] !== undefined) {
      this.setData(key, DEFAULTS[key]);
    }
  },

  // ─── Real-Time Cloud Network Synchronisation Engine ──────────────────────────
  _lastSyncTime: 0,
  _lastFetchAttempt: 0,
  minSyncInterval: 2000,

  async syncKeyToServer(key, value) {
    if (!this.getSyncEnabled()) return false;
    const firebaseUrl = getFirebaseUrl();
    if (!firebaseUrl) return false;

    try {
      const url = `${firebaseUrl}/data/${key}.json`;
      const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value)
      });
      if (res.ok) {
        this._lastSyncSuccess = Date.now();
        console.log(`[CloudSync] Section "${key}" saved live to cloud database.`);
        return true;
      } else {
        console.error(`[CloudSync] HTTP ${res.status} saving "${key}".`);
      }
    } catch (err) {
      console.error(`[CloudSync] Network error saving "${key}":`, err);
    }
    return false;
  },

  async fetchKeyFromServer(key) {
    if (!this.getSyncEnabled()) return null;
    const firebaseUrl = getFirebaseUrl();
    if (!firebaseUrl) return null;

    try {
      const url = `${firebaseUrl}/data/${key}.json?_t=${Date.now()}`;
      const res = await fetch(url, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
      });
      if (res.ok) {
        const json = await res.json();
        if (json !== null && json !== undefined) {
          const jsonStr = JSON.stringify(json);
          if (this._lastKnownHashes && this._lastKnownHashes[key] === jsonStr) {
            return json;
          }
          if (!this._lastKnownHashes) this._lastKnownHashes = {};
          this._lastKnownHashes[key] = jsonStr;
          if (!this._memoryCache) this._memoryCache = {};
          this._memoryCache[key] = json;
          try {
            localStorage.setItem(PREFIX + key, jsonStr);
          } catch {}
          try {
            this.notifySubscribers(key, json);
          } catch {}
          return json;
        }
      }
    } catch (e) {
      console.warn(`[adminData] Error fetching ${key} from server:`, e);
    }
    return null;
  },

  async syncToServer() {
    try {
      if (!this.getSyncEnabled()) return;
      const now = Date.now();
      this._lastSyncTime = now;

      const allKeys = Array.from(new Set([
        ...Object.keys(DEFAULTS),
        'siteLogo', 'announcements', 'results', 'gallery', 'testimonials',
        'stats', 'features', 'contactInfo', 'courses', 'users', 'popupConfig',
        'videoLectures', 'pageImages', 'heroBanners', 'partnerSchools', 'schoolPhotos',
        'blogPosts', 'seoConfig'
      ]));

      const payload = {};
      allKeys.forEach(k => {
        if (this._memoryCache && this._memoryCache[k] !== undefined) {
          payload[k] = this._memoryCache[k];
        } else {
          const val = localStorage.getItem(PREFIX + k);
          if (val !== null) {
            try {
              payload[k] = JSON.parse(val);
            } catch {
              payload[k] = val;
            }
          } else if (DEFAULTS[k] !== undefined) {
            payload[k] = DEFAULTS[k];
          }
        }
      });

      const urls = this.getSyncApiUrls();
      for (const url of urls) {
        try {
          const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (response.ok) {
            this._lastSyncSuccess = Date.now();
            return true;
          }
        } catch (e) {}
      }
    } catch (e) {}
    return false;
  },

  async fetchFromServer() {
    try {
      if (!this.getSyncEnabled()) return null;
      const now = Date.now();
      this._lastFetchAttempt = now;

      const urls = this.getSyncApiUrls();
      for (const url of urls) {
        try {
          const sep = url.includes('?') ? '&' : '?';
          const freshUrl = `${url}${sep}_t=${now}`;
          const res = await fetch(freshUrl, {
            cache: 'no-store',
            headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
          });
          if (res.ok) {
            this._lastFetchSuccess = Date.now();
            const json = await res.json();
            return json;
          }
        } catch (e) {}
      }
      return null;
    } catch {
      return null;
    }
  },

  async syncFromServer() {
    const data = await this.fetchFromServer();
    if (data && typeof data === 'object' && Object.keys(data).length > 0) {
      let changed = false;
      const allKeys = Array.from(new Set([
        ...Object.keys(DEFAULTS),
        'siteLogo', 'announcements', 'results', 'gallery', 'testimonials',
        'stats', 'features', 'contactInfo', 'courses', 'users', 'popupConfig',
        'videoLectures', 'pageImages', 'heroBanners', 'partnerSchools', 'schoolPhotos',
        'blogPosts', 'seoConfig'
      ]));

      if (!this._lastKnownHashes) this._lastKnownHashes = {};
      if (!this._memoryCache) this._memoryCache = {};

      allKeys.forEach(k => {
        const serverVal = data[k];
        if (serverVal !== undefined) {
          const serverValStr = typeof serverVal === 'string' ? serverVal : JSON.stringify(serverVal);

          // If the server data matches our last known hash, do not notify!
          if (this._lastKnownHashes[k] === serverValStr) {
            return;
          }

          this._lastKnownHashes[k] = serverValStr;

          // Always sync to memory cache
          try {
            this._memoryCache[k] = typeof serverVal === 'string' ? JSON.parse(serverVal) : serverVal;
          } catch {
            this._memoryCache[k] = serverVal;
          }

          try {
            localStorage.setItem(PREFIX + k, serverValStr);
          } catch (e) {
            // Ignore quota limit, memory cache has the fresh data
          }

          try {
            this.notifySubscribers(k, this._memoryCache[k]);
          } catch {}
          changed = true;
        }
      });
      return changed;
    }
    return false;
  },

  _ensureGlobalPoller() {
    if (this._isPollingActive) return;
    this._isPollingActive = true;

    // Cross-tab storage listener
    if (typeof window !== 'undefined' && !this._storageListenerBound) {
      this._storageListenerBound = true;
      window.addEventListener('storage', (e) => {
        if (!e.key || e.key.startsWith(PREFIX)) {
          const changedKey = e.key ? e.key.replace(PREFIX, '') : null;
          this.notifySubscribers(changedKey);
        }
      });
    }

    const self = this;
    const runPoll = async () => {
      if (!self._isPollingActive) return;
      if (typeof document !== 'undefined' && document.hidden) {
        // Tab is backgrounded, check in 45 seconds
        self._globalPollTimer = setTimeout(runPoll, 45000);
        return;
      }
      try {
        await self.syncFromServer();
      } catch (err) {}

      // Relaxed, calm background sync every 30 seconds
      const nextDelay = 30000 + Math.floor(Math.random() * 5000);
      self._globalPollTimer = setTimeout(runPoll, nextDelay);
    };

    // Initial sync after 3 seconds so page load is instant
    self._globalPollTimer = setTimeout(runPoll, 3000);
  },

  initSync(onUpdate) {
    return this.subscribe(null, onUpdate);
  },

  // Import / Export backup utilities
  exportAll() {
    const data = {};
    Object.keys(DEFAULTS).forEach(key => {
      data[key] = this.getData(key);
    });
    return JSON.stringify(data, null, 2);
  },

  importAll(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      Object.keys(DEFAULTS).forEach(key => {
        if (parsed[key] !== undefined) {
          this.setData(key, parsed[key]);
        }
      });
      return true;
    } catch (e) {
      console.error("Failed to parse import JSON", e);
      return false;
    }
  }
};
