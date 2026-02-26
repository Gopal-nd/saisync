export type Subject = {
    name: string
    placeholder: string
    credits: number
  }
  
  export type SemesterData = {
    title: string
    subjects: Subject[]
    totalCredits: number
  }
  
  export const semesterData: Record<number, SemesterData> = {
    1: {
      title: "1st Sem SGPA",
      subjects: [
        { name: "Maths", placeholder: "Maths Credits - 4x", credits: 4 },
        { name: "Applied Physics for CSE stream", placeholder: "Physics Credits - 4x", credits: 4 },
        { name: "Principles of Programming Using C", placeholder: "C Program Credits - 3x", credits: 3 },
        { name: "Introduction to Electronics", placeholder: "Electronics Credits - 3x", credits: 3 },
        { name: "Introduction to Cyber Security", placeholder: "Cyber Security Credits - 3x", credits: 3 },
        { name: "Communicative English", placeholder: "English Credits - 1x", credits: 1 },
        { name: "Samskrutika Kannada/ Balake Kannada", placeholder: "Kannada Credits - 1x", credits: 1 },
        { name: "Innovation and Design Thinking", placeholder: "IDT Credits - 1x", credits: 1 },
      ],
      totalCredits: 20,
    },
    2: {
      title: "2nd Sem SGPA",
      subjects: [
        { name: "Maths", placeholder: "Maths Credits - 4x", credits: 4 },
        { name: "Applied Chemistry for CSE Stream", placeholder: "Chemistry Credits - 4x", credits: 4 },
        { name: "Computer-Aided Engineering Drawing", placeholder: "CAD Credits - 3x", credits: 3 },
        { name: "Introduction to Mechanical Engineering", placeholder: "Mechanical Credits - 3x", credits: 3 },
        { name: "Introduction to Web Programming", placeholder: "WEB Credits - 3x", credits: 3 },
        { name: "Professional Writing Skills in English", placeholder: "English Credits - 1x", credits: 1 },
        { name: "Indian Constitution", placeholder: "IC Credits - 1x", credits: 1 },
        { name: "Scientific Foundations of Health", placeholder: "SFH Credits - 1x", credits: 1 },
      ],
      totalCredits: 20,
    },
    3: {
      title: "3rd Sem SGPA",
      subjects: [
        { name: "Maths", placeholder: "Maths Credits - 4x", credits: 4 },
        { name: "Digital Design And Computer Organization", placeholder: "DDCO Credits - 4x", credits: 4 },
        { name: "Operating System", placeholder: "OS Credits - 4x", credits: 4 },
        { name: "Data Structures and Applications", placeholder: "DSA Credits - 3x", credits: 3 },
        { name: "Python / JAVA / R", placeholder: "Python Credits - 3x", credits: 3 },
        { name: "Data Structures LAB", placeholder: "DSA-L Credits - 1x", credits: 1 },
        { name: "Social Connect & Responsibility", placeholder: "Social Credits - 1x", credits: 1 },
        { name: "Excel / Ethics / Git", placeholder: "Excel Credits - 1x", credits: 1 },
      ],
      totalCredits: 21,
    },
    4: {
      title: "4th Sem SGPA",
      subjects: [
        { name: "Analysis & Design of Algorithms", placeholder: "Credits - 3x", credits: 3 },
        { name: "Artificial Intelligence", placeholder: "Credits - 4x", credits: 4 },
        { name: "Database Management System", placeholder: "Credits - 4x", credits: 4 },
        { name: "Analysis & Design of Algorithms Lab", placeholder: "Credits - 1x", credits: 1 },
        { name: "Engineering Science Course (ESC/ETC/PLC)", placeholder: "Credits - 3x", credits: 3 },
        { name: "Scala /MERN /MangoDB /julia", placeholder: "Credits - 1x", credits: 1 },
        { name: "Biology For Engineers", placeholder: "Credits - 2x", credits: 2 },
        { name: "Universal human values course", placeholder: "Credits - 1x", credits: 1 },
      ],
      totalCredits: 19,
    },
    5: {
      title: "5th Sem SGPA",
      subjects: [
        { name: "Software Engineering & Project Management", placeholder: "Credits - 3x", credits: 3 },
        { name: "Computer Networks", placeholder: "Credits - 4x", credits: 4 },
        { name: "Theory of Computation", placeholder: "Credits - 4x", credits: 4 },
        { name: "Data Visualization Lab", placeholder: "Credits - 1x", credits: 1 },
        { name: "Professional Elective Course", placeholder: "Credits - 3x", credits: 3 },
        { name: "Mini Project", placeholder: "Credits - 2x", credits: 2 },
        { name: "Research Methodology and IPR", placeholder: "Credits - 3x", credits: 3 },
        { name: "Environmental Studies", placeholder: "Credits - 2x", credits: 2 },
      ],
      totalCredits: 22,
    },
    6: {
      title: "6th Sem SGPA",
      subjects: [
        { name: "Natural Language Processing", placeholder: "Credits - 4x", credits: 4 },
        { name: "Machine Learning -I", placeholder: "Credits - 4x", credits: 4 },
        { name: "Professional Elective Course", placeholder: "Credits - 3x", credits: 3 },
        { name: "Professional Elective Course", placeholder: "Credits - 3x", credits: 3 },
        { name: "Project Phase I", placeholder: "Credits - 2x", credits: 2 },
        { name: "Machine Learning lab", placeholder: "Credits - 1x", credits: 1 },
        { name: "Ability Enhancement Course/Skill Development Course V", placeholder: "Credits - 1x", credits: 1 },
      ],
      totalCredits: 18,
    },
    7: {
      title: "7th Sem SGPA",
      subjects: [
        { name: "Deep Learning & Reinforcement Learning", placeholder: "Credits - 4x", credits: 4 },
        { name: "Machine Learning -II", placeholder: "Credits - 4x", credits: 4 },
        { name: "Data Security & Privacy", placeholder: "Credits - 4x", credits: 4 },
        { name: "Professional Elective Course", placeholder: "Credits - 3x", credits: 3 },
        { name: "Open Elective Course", placeholder: "Credits - 3x", credits: 3 },
        { name: "Major Project Phase-II", placeholder: "Credits - 6x", credits: 6 },
      ],
      totalCredits: 24,
    },
    8: {
      title: "8th Sem SGPA",
      subjects: [
        { name: "Professional Elective (Online Courses) Only through NPTEL", placeholder: "Credits - 3x", credits: 3 },
        { name: "Open Elective (Online Courses) Only through NPTEL", placeholder: "Credits - 3x", credits: 3 },
        { name: "Internship (Industry/Research) (14 - 20 weeks)", placeholder: "Credits - 10x", credits: 10 },
      ],
      totalCredits: 16,
    },
  }
  