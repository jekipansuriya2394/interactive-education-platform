export const menuData = {
  mainNav: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { 
      name: "Courses", 
      href: "/courses",
      submenu: [
        { name: "8th to 10th", href: "/courses#school-8-10" },
        { name: "11th-12th Science", href: "/courses#science-11-12" },
        { name: "NEET Prep", href: "/courses#neet" },
        { name: "JEE Prep", href: "/courses#jee" },
        { name: "GUJCET Prep", href: "/courses#gujcet" },
        { name: "Diploma Classes", href: "/courses#diploma" },
        { name: "Degree Engineering", href: "/courses#degree" },
        { name: "DDCET Prep", href: "/courses#ddcet" },
        { name: "Career Guidance", href: "/courses#career-guidance" },
        { name: "Projects & Training", href: "/courses#projects-training" }
      ]
    },
    { name: "Admission Guidance", href: "/admission-guidance" },
    { name: "Results", href: "/results" },
    { name: "Gallery", href: "/gallery" },
    { 
      name: "Student Corner", 
      href: "/student-corner",
      submenu: [
        { name: "Student Login", href: "/student-corner#login" },
        { name: "Online Test", href: "/online-test" },
        { name: "Feedback Form", href: "/student-corner#feedback" },
        { name: "Results History", href: "/results" }
      ]
    },
    { name: "Contact", href: "/contact" }
  ]
};
