export const COURSES_ARRAY = [
  { id: "xxxxxx1", title: "Introduction", duration: 1 },
  { id: "xxxxxx2", title: "KJDKKS", duration: 1 },
  { id: "xxxxxx3", title: "UWUTOQUEWRIQ", duration: 1 },
  { id: "xxxxxx4", title: "KHAJBSDVHJASKVBHJAKSD", duration: 1 },
];

export const APPLICATION_DETAILS = {
  applicant: {
    name: "Lego Applicant",
    photoUrl: "https://i.pravatar.cc",
    id: 1,
  },
  nationalID: "XXXXX-XXXX-XXX",
  driverLicenseNumber: "XXXXX-XXXX-XXX",
  createdAt: new Date(),
  status: "pending",
  documents: [
    {
      name: "national id",
      type: "jpeg",
      url: "https://picsum.photos/400/500.jpg",
    },
    {
      name: "Proof of ownership",
      type: "jpeg",
      url: "https://picsum.photos/400/500.jpg",
    },
    {
      name: "Certificate of Good Conduct",
      type: "jpeg",
      url: "https://picsum.photos/400/500.jpg",
    },
    {
      name: "Last car checkup",
      type: "jpeg",
      url: "https://picsum.photos/400/500.jpg",
    },
  ],
  onboardingPlan: [
    { title: "Introduction", duration: 1 },
    { title: "[HowTo] - Driver Tool Kit", duration: 1.5 },
    { title: "Road Safety", duration: 0.5 },
  ],
};

export const OFFICER = {
  photoUrl: "https://i.pravatar.cc",
  name: "YEGO Officer",
  role: "officer",
};

export const ADMIN = {
  photoUrl: "https://i.pravatar.cc",
  name: "YEGO Admin",
  role: "admin",
};

export const LECTURE = {
  photoUrl: "https://i.pravatar.cc",
  name: "YEGO Lecture",
  role: "lecture",
};

export const APPLICANT = {
  photoUrl: "https://i.pravatar.cc",
  name: `YEGO Applicant - ${Math.round(Math.random() * 1000)}`,
  role: "driver",
  id: `${Math.round(Math.random() * 1000)}-driver`,
};

export const generateApplicant = () => ({
  photoUrl: "https://i.pravatar.cc",
  name: `YEGO Applicant - ${Math.round(Math.random() * 1000)}`,
  role: "driver",
  id: `${Math.round(Math.random() * 1000)}-driver`,
  progress: Math.round(Math.random() * 100),
});



export const ONBOARDING_PLAN_DETAILS = {
  title: "Training on how to use driver tool Kit",
  description:
    "lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum",
  createdAt: new Date(),
  students: 450,
  courses: [
    { title: "Introduction", duration: 1, id: "xxxx1" },
    { title: "Welcome to Yego", duration: 1.5, id: "xxxx2" },
    { title: "Road Safety", duration: 0.5, id: "xxxx3" },
  ],
};

export const APPLICANT_COURSES = [
  { title: "Introduction", duration: 1, id: "xxxx1", progress: 100 },
  {
    title: "Welcome to Yego",
    duration: 1.5,
    id: "xxxx2",
    progress: 50,
  },
  {
    title: "Road Safety",
    duration: 0.5,
    id: "xxxx3",
    progress: 1,
  },
];

export const USER_DOC_ID = `STAFF-${Math.round(Math.random() * 100)}`;
export const DEFAULT_PASSWORD = "officer123";

export const MAIL_APP_PSWRD = "aekyakvlfumtpcvh";
export const SENDER_EMAIL = "driverhub.rw@gmail.com";

export const PLACEHOLDER_IMG =
  "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png";

  export const DEFAULT_USER = {
    photoUrl: "https://i.pravatar.cc",
    firstName: "Karake",
    lastName: "Murenzi",
    role: "renter",
  };

  export const RENTAL_PROPERTIES = [
  {
    id:1,
    propertyId: 'xxxx01',
    title: "Imbonera on how to use driver tool Kit",
    description:
      "lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum",
    status:'available',
    price: '15000',
    rooms: 3,
    address: 'Kicukiro, Kanombe, Bibare',
    furnished: true,
    images:['https://picsum.photos/400', 'https://picsum.photos/300', 'https://picsum.photos/500', 'https://picsum.photos/400', 'https://picsum.photos/300', 'https://picsum.photos/500']
  },
  {
    id:2,
    propertyId: 'xxxx02',
    title: "Training on how to use driver tool Kit",
    description:
      "lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum",
    status:'available',
    price: '15000',
    rooms: 4,
    address: 'Kicukiro, Kanombe, Bibare',
    furnished: true
  },
  {
    id:3,
    propertyId: 'xxxx03',
    title: "Training on how to use driver tool Kit",
    description:
      "lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum",
    status:'pending',
    price: '15000',
    rooms: 3,
    address: 'Kicukiro, Kanombe, Bibare',
    furnished: false
  },
  {
    id:4,
    propertyId: 'xxxx04',
    title: "Training on how to use driver tool Kit",
    description:
      "lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum",
    status:'confirmed',
    price: '15000',
    rooms: 3,
    address: 'Kicukiro, Kanombe, Bibare',
    furnished: false
  },
  {
    id:5,
    propertyId: 'xxxx05',
    title: "on how to use driver tool Kit",
    description:
      "lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum",
    status:'available',
    price: '15000',
    rooms: 3,
    address: 'Kicukiro, Kanombe, Bibare',
    furnished: false
  },
];