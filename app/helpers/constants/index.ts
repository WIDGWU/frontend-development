export const colleges: { [key: string]: { name: string; aliases: string[] } } =
  {
    CCAS: { name: "CCAS", aliases: ["CCAS", "Columbian Coll of Arts & Sci"] },
    SEAS: { name: "SEAS", aliases: ["SEAS", "School of Engin & App Sc"] },
    GWSB: { name: "GWSB", aliases: ["GWSB", "School of Business"] },
    ESIA: { name: "ESIA", aliases: ["ESIA", "Elliott Schl of Intl Affairs"] },
    MISPH: {
      name: "MISPH",
      aliases: ["MISPH", "GWSPH", "Milken Inst Sch of Public Hlth"],
    },
    SON: { name: "SON", aliases: ["SON", "School of Nursing"] },
    CPS: { name: "CPS", aliases: ["CPS", "Coll of Professional Studies"] },
    GSEHD: {
      name: "GSEHD",
      aliases: ["GSEHD", "GSHED", "Grad Sch of Ed and Human Devel"],
    },
    SMHS: {
      name: "SMHS",
      aliases: ["SMHS", "HCL", "HSCI", "MLS", "School of Med & Health Sc"],
    },
    NA: {
      name: "No College Designated",
      aliases: ["NA", "NSC", "No College Designated"],
    },
  };

export const PAGES: { name: string; rootLink: string }[] = [
  { name: "Dashboard", rootLink: "/admin" },
  { name: "Course Approval", rootLink: "/admin/course-approval" },
  { name: "Departments", rootLink: "/admin/departments" },
  { name: "Courses", rootLink: "/admin/courses" },
  { name: "Graduate Assistants", rootLink: "/admin/graduate-assistants" },
  { name: "Annual Report", rootLink: "/admin/annual-report" },
  { name: "Upload Items", rootLink: "/admin/upload-items" },
];
