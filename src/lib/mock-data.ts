export type Role = "admin" | "receptionist" | "doctor" | "billing";

export const ROLE_LABEL: Record<Role, string> = {
  admin: "Administrator",
  receptionist: "Receptionist / Front Desk",
  doctor: "Doctor",
  billing: "Billing / Cashier",
};

export const CURRENT_USERS: Record<Role, { name: string; initials: string; dept: string }> = {
  admin: { name: "Nadia Karim", initials: "NK", dept: "IT & Operations" },
  receptionist: { name: "Sana Iqbal", initials: "SI", dept: "Front Desk — Block A" },
  doctor: { name: "Dr. Imran Sheikh", initials: "IS", dept: "Internal Medicine" },
  billing: { name: "Faraz Ali", initials: "FA", dept: "Cashier — Counter 2" },
};

export type Patient = {
  id: string;
  mrn: string;
  name: string;
  gender: "Male" | "Female";
  dob: string;
  age: number;
  phone: string;
  cnic: string;
  address: string;
  city: string;
  bloodGroup: string;
  allergies: string[];
  conditions: string[];
  registered: string;
  lastVisit: string;
  insurance: string;
  balance: number;
};

export const patients: Patient[] = [
  {
    id: "p1",
    mrn: "MRN-100412",
    name: "Ayesha Rahman",
    gender: "Female",
    dob: "1991-04-12",
    age: 35,
    phone: "+92 300 1234567",
    cnic: "42101-8823419-4",
    address: "House 24, Street 7, Gulshan-e-Iqbal",
    city: "Karachi",
    bloodGroup: "O+",
    allergies: ["Penicillin"],
    conditions: ["Hypertension"],
    registered: "2023-02-11",
    lastVisit: "2026-09-08",
    insurance: "State Life — Group Plan",
    balance: 3200,
  },
  {
    id: "p2",
    mrn: "MRN-100518",
    name: "Bilal Ahmed Khan",
    gender: "Male",
    dob: "1978-11-02",
    age: 47,
    phone: "+92 321 9988771",
    cnic: "42201-1120983-1",
    address: "Flat 6B, Askari Heights",
    city: "Karachi",
    bloodGroup: "B+",
    allergies: [],
    conditions: ["Type 2 Diabetes", "Dyslipidemia"],
    registered: "2021-07-30",
    lastVisit: "2026-09-08",
    insurance: "Self-pay",
    balance: 0,
  },
  {
    id: "p3",
    mrn: "MRN-100733",
    name: "Fatima Noor",
    gender: "Female",
    dob: "2019-01-22",
    age: 7,
    phone: "+92 333 4455667",
    cnic: "B-Form 42101-9911002",
    address: "12 Sunset Lane, DHA Phase 5",
    city: "Karachi",
    bloodGroup: "A+",
    allergies: ["Peanuts", "Dust mite"],
    conditions: ["Asthma"],
    registered: "2024-05-18",
    lastVisit: "2026-08-27",
    insurance: "Jubilee Health",
    balance: 1450,
  },
  {
    id: "p4",
    mrn: "MRN-100901",
    name: "Hassan Raza",
    gender: "Male",
    dob: "1955-06-09",
    age: 71,
    phone: "+92 345 7788990",
    cnic: "42000-3345567-9",
    address: "House 9, Model Colony",
    city: "Karachi",
    bloodGroup: "AB-",
    allergies: ["Sulfa drugs"],
    conditions: ["CAD", "CKD Stage 3"],
    registered: "2019-03-04",
    lastVisit: "2026-09-07",
    insurance: "EFU Health",
    balance: 18750,
  },
  {
    id: "p5",
    mrn: "MRN-101044",
    name: "Zainab Yousuf",
    gender: "Female",
    dob: "1998-09-30",
    age: 27,
    phone: "+92 302 1122334",
    cnic: "42301-5567788-2",
    address: "Apartment 301, Clifton Block 2",
    city: "Karachi",
    bloodGroup: "O-",
    allergies: [],
    conditions: [],
    registered: "2026-01-19",
    lastVisit: "2026-09-08",
    insurance: "Self-pay",
    balance: 0,
  },
  {
    id: "p6",
    mrn: "MRN-101190",
    name: "Usman Tariq",
    gender: "Male",
    dob: "1986-12-14",
    age: 39,
    phone: "+92 311 6677889",
    cnic: "42101-2233445-7",
    address: "Plot 45, PECHS Block 6",
    city: "Karachi",
    bloodGroup: "B-",
    allergies: ["Iodine contrast"],
    conditions: ["Lumbar disc prolapse"],
    registered: "2022-10-08",
    lastVisit: "2026-09-05",
    insurance: "Adamjee Health",
    balance: 6400,
  },
  {
    id: "p7",
    mrn: "MRN-101322",
    name: "Mariam Shah",
    gender: "Female",
    dob: "1967-03-25",
    age: 59,
    phone: "+92 300 5544332",
    cnic: "42201-7788991-6",
    address: "House 3, North Nazimabad",
    city: "Karachi",
    bloodGroup: "A-",
    allergies: [],
    conditions: ["Hypothyroidism"],
    registered: "2020-09-12",
    lastVisit: "2026-09-08",
    insurance: "State Life — Group Plan",
    balance: 900,
  },
  {
    id: "p8",
    mrn: "MRN-101487",
    name: "Danish Iqbal",
    gender: "Male",
    dob: "2002-08-03",
    age: 24,
    phone: "+92 314 3344556",
    cnic: "42101-6677889-3",
    address: "Hostel Block C, University Road",
    city: "Karachi",
    bloodGroup: "O+",
    allergies: [],
    conditions: [],
    registered: "2026-06-02",
    lastVisit: "2026-09-08",
    insurance: "Self-pay",
    balance: 2500,
  },
];

export const patientById = (id: string) => patients.find((p) => p.id === id);

export const departments = [
  { id: "d1", name: "Internal Medicine", code: "IM", location: "Block A — Floor 2", doctors: 6, rooms: 8 },
  { id: "d2", name: "Cardiology", code: "CARD", location: "Block B — Floor 1", doctors: 4, rooms: 5 },
  { id: "d3", name: "Pediatrics", code: "PED", location: "Block A — Floor 1", doctors: 5, rooms: 6 },
  { id: "d4", name: "Orthopedics", code: "ORTH", location: "Block C — Floor 3", doctors: 3, rooms: 4 },
  { id: "d5", name: "Radiology", code: "RAD", location: "Block B — Basement", doctors: 3, rooms: 4 },
  { id: "d6", name: "Laboratory", code: "LAB", location: "Block B — Floor 0", doctors: 2, rooms: 3 },
];

export const doctors = [
  { id: "dr1", name: "Dr. Imran Sheikh", dept: "Internal Medicine", room: "A-214", fee: 3000, status: "Available" },
  { id: "dr2", name: "Dr. Sadia Malik", dept: "Cardiology", room: "B-108", fee: 5000, status: "In consultation" },
  { id: "dr3", name: "Dr. Kamran Baig", dept: "Pediatrics", room: "A-112", fee: 2500, status: "Available" },
  { id: "dr4", name: "Dr. Rabia Nasir", dept: "Orthopedics", room: "C-306", fee: 4000, status: "On leave" },
  { id: "dr5", name: "Dr. Waleed Anjum", dept: "Radiology", room: "B-B04", fee: 3500, status: "Available" },
];

export type ApptStatus = "Scheduled" | "Checked in" | "In consultation" | "Completed" | "Cancelled" | "No show";

export type Appointment = {
  id: string;
  time: string;
  patientId: string;
  patient: string;
  mrn: string;
  doctor: string;
  dept: string;
  type: string;
  status: ApptStatus;
  date: string;
  room: string;
};

export const appointments: Appointment[] = [
  { id: "a1", time: "08:30", patientId: "p2", patient: "Bilal Ahmed Khan", mrn: "MRN-100518", doctor: "Dr. Imran Sheikh", dept: "Internal Medicine", type: "Follow-up", status: "Completed", date: "2026-09-08", room: "A-214" },
  { id: "a2", time: "09:00", patientId: "p1", patient: "Ayesha Rahman", mrn: "MRN-100412", doctor: "Dr. Imran Sheikh", dept: "Internal Medicine", type: "Follow-up", status: "In consultation", date: "2026-09-08", room: "A-214" },
  { id: "a3", time: "09:20", patientId: "p7", patient: "Mariam Shah", mrn: "MRN-101322", doctor: "Dr. Imran Sheikh", dept: "Internal Medicine", type: "New", status: "Checked in", date: "2026-09-08", room: "A-214" },
  { id: "a4", time: "09:40", patientId: "p8", patient: "Danish Iqbal", mrn: "MRN-101487", doctor: "Dr. Kamran Baig", dept: "Pediatrics", type: "New", status: "Checked in", date: "2026-09-08", room: "A-112" },
  { id: "a5", time: "10:00", patientId: "p5", patient: "Zainab Yousuf", mrn: "MRN-101044", doctor: "Dr. Sadia Malik", dept: "Cardiology", type: "Consultation", status: "Scheduled", date: "2026-09-08", room: "B-108" },
  { id: "a6", time: "10:30", patientId: "p4", patient: "Hassan Raza", mrn: "MRN-100901", doctor: "Dr. Sadia Malik", dept: "Cardiology", type: "Follow-up", status: "Scheduled", date: "2026-09-08", room: "B-108" },
  { id: "a7", time: "11:00", patientId: "p3", patient: "Fatima Noor", mrn: "MRN-100733", doctor: "Dr. Kamran Baig", dept: "Pediatrics", type: "Follow-up", status: "Scheduled", date: "2026-09-08", room: "A-112" },
  { id: "a8", time: "11:30", patientId: "p6", patient: "Usman Tariq", mrn: "MRN-101190", doctor: "Dr. Rabia Nasir", dept: "Orthopedics", type: "Review", status: "Cancelled", date: "2026-09-08", room: "C-306" },
  { id: "a9", time: "12:00", patientId: "p2", patient: "Bilal Ahmed Khan", mrn: "MRN-100518", doctor: "Dr. Waleed Anjum", dept: "Radiology", type: "Procedure", status: "Scheduled", date: "2026-09-08", room: "B-B04" },
  { id: "a10", time: "09:15", patientId: "p1", patient: "Ayesha Rahman", mrn: "MRN-100412", doctor: "Dr. Sadia Malik", dept: "Cardiology", type: "Referral", status: "Scheduled", date: "2026-09-09", room: "B-108" },
  { id: "a11", time: "10:45", patientId: "p6", patient: "Usman Tariq", mrn: "MRN-101190", doctor: "Dr. Rabia Nasir", dept: "Orthopedics", type: "Follow-up", status: "Scheduled", date: "2026-09-09", room: "C-306" },
  { id: "a12", time: "14:00", patientId: "p3", patient: "Fatima Noor", mrn: "MRN-100733", doctor: "Dr. Kamran Baig", dept: "Pediatrics", type: "Vaccination", status: "Scheduled", date: "2026-09-10", room: "A-112" },
];

export type VisitStatus = "Waiting" | "Vitals done" | "With doctor" | "Awaiting results" | "Ready for billing" | "Closed";

export type Visit = {
  id: string;
  visitNo: string;
  patientId: string;
  patient: string;
  mrn: string;
  doctor: string;
  dept: string;
  type: "OPD" | "Emergency" | "Day care";
  startedAt: string;
  waited: string;
  status: VisitStatus;
  appointmentId?: string;
  token: string;
};

export const visits: Visit[] = [
  { id: "v1", visitNo: "V-2026-4471", patientId: "p1", patient: "Ayesha Rahman", mrn: "MRN-100412", doctor: "Dr. Imran Sheikh", dept: "Internal Medicine", type: "OPD", startedAt: "09:02", waited: "6 min", status: "With doctor", appointmentId: "a2", token: "A-12" },
  { id: "v2", visitNo: "V-2026-4472", patientId: "p7", patient: "Mariam Shah", mrn: "MRN-101322", doctor: "Dr. Imran Sheikh", dept: "Internal Medicine", type: "OPD", startedAt: "09:11", waited: "22 min", status: "Vitals done", appointmentId: "a3", token: "A-13" },
  { id: "v3", visitNo: "V-2026-4473", patientId: "p8", patient: "Danish Iqbal", mrn: "MRN-101487", doctor: "Dr. Kamran Baig", dept: "Pediatrics", type: "OPD", startedAt: "09:18", waited: "15 min", status: "Waiting", appointmentId: "a4", token: "P-04" },
  { id: "v4", visitNo: "V-2026-4474", patientId: "p4", patient: "Hassan Raza", mrn: "MRN-100901", doctor: "Dr. Sadia Malik", dept: "Cardiology", type: "Emergency", startedAt: "08:40", waited: "2 min", status: "Awaiting results", token: "E-02" },
  { id: "v5", visitNo: "V-2026-4470", patientId: "p2", patient: "Bilal Ahmed Khan", mrn: "MRN-100518", doctor: "Dr. Imran Sheikh", dept: "Internal Medicine", type: "OPD", startedAt: "08:31", waited: "3 min", status: "Ready for billing", appointmentId: "a1", token: "A-11" },
  { id: "v6", visitNo: "V-2026-4462", patientId: "p5", patient: "Zainab Yousuf", mrn: "MRN-101044", doctor: "Dr. Sadia Malik", dept: "Cardiology", type: "Day care", startedAt: "Yesterday 14:20", waited: "9 min", status: "Closed", token: "C-08" },
  { id: "v7", visitNo: "V-2026-4455", patientId: "p6", patient: "Usman Tariq", mrn: "MRN-101190", doctor: "Dr. Rabia Nasir", dept: "Orthopedics", type: "OPD", startedAt: "05 Sep 11:05", waited: "18 min", status: "Closed", token: "O-06" },
];

export type Order = {
  id: string;
  orderNo: string;
  patient: string;
  mrn: string;
  category: "Laboratory" | "Radiology" | "Procedure";
  item: string;
  orderedBy: string;
  placed: string;
  priority: "Routine" | "Urgent" | "STAT";
  status: "Ordered" | "Sample collected" | "In progress" | "Resulted" | "Cancelled";
  result?: string;
};

export const orders: Order[] = [
  { id: "o1", orderNo: "LAB-8841", patient: "Hassan Raza", mrn: "MRN-100901", category: "Laboratory", item: "Troponin I, Serum", orderedBy: "Dr. Sadia Malik", placed: "08:44", priority: "STAT", status: "Resulted", result: "0.42 ng/mL — High" },
  { id: "o2", orderNo: "LAB-8842", patient: "Hassan Raza", mrn: "MRN-100901", category: "Laboratory", item: "Renal Function Panel", orderedBy: "Dr. Sadia Malik", placed: "08:45", priority: "Urgent", status: "In progress" },
  { id: "o3", orderNo: "RAD-2210", patient: "Hassan Raza", mrn: "MRN-100901", category: "Radiology", item: "Chest X-Ray PA view", orderedBy: "Dr. Sadia Malik", placed: "08:50", priority: "Urgent", status: "Resulted", result: "Mild cardiomegaly, no consolidation" },
  { id: "o4", orderNo: "LAB-8845", patient: "Ayesha Rahman", mrn: "MRN-100412", category: "Laboratory", item: "HbA1c", orderedBy: "Dr. Imran Sheikh", placed: "09:12", priority: "Routine", status: "Sample collected" },
  { id: "o5", orderNo: "LAB-8846", patient: "Ayesha Rahman", mrn: "MRN-100412", category: "Laboratory", item: "Lipid Profile, Fasting", orderedBy: "Dr. Imran Sheikh", placed: "09:12", priority: "Routine", status: "Ordered" },
  { id: "o6", orderNo: "RAD-2213", patient: "Usman Tariq", mrn: "MRN-101190", category: "Radiology", item: "MRI Lumbar Spine (no contrast)", orderedBy: "Dr. Rabia Nasir", placed: "05 Sep", priority: "Routine", status: "Resulted", result: "L4-L5 disc protrusion with mild canal stenosis" },
  { id: "o7", orderNo: "PRC-0912", patient: "Bilal Ahmed Khan", mrn: "MRN-100518", category: "Procedure", item: "Diabetic foot dressing", orderedBy: "Dr. Imran Sheikh", placed: "08:55", priority: "Routine", status: "In progress" },
  { id: "o8", orderNo: "LAB-8850", patient: "Mariam Shah", mrn: "MRN-101322", category: "Laboratory", item: "TSH, Free T4", orderedBy: "Dr. Imran Sheikh", placed: "09:26", priority: "Routine", status: "Ordered" },
  { id: "o9", orderNo: "PRC-0913", patient: "Fatima Noor", mrn: "MRN-100733", category: "Procedure", item: "Nebulisation — Salbutamol", orderedBy: "Dr. Kamran Baig", placed: "27 Aug", priority: "Urgent", status: "Resulted", result: "Completed, symptoms relieved" },
];

export type Doc = {
  id: string;
  name: string;
  patient: string;
  mrn: string;
  category: "Lab report" | "Radiology" | "Consent" | "Insurance" | "Referral" | "Discharge";
  type: "PDF" | "Image" | "Scan";
  size: string;
  uploadedBy: string;
  uploaded: string;
};

export const documents: Doc[] = [
  { id: "doc1", name: "Troponin_Report_08Sep.pdf", patient: "Hassan Raza", mrn: "MRN-100901", category: "Lab report", type: "PDF", size: "212 KB", uploadedBy: "Lab — Block B", uploaded: "08 Sep 2026, 09:31" },
  { id: "doc2", name: "ChestXray_PA_08Sep.jpg", patient: "Hassan Raza", mrn: "MRN-100901", category: "Radiology", type: "Image", size: "3.4 MB", uploadedBy: "Radiology", uploaded: "08 Sep 2026, 09:12" },
  { id: "doc3", name: "Insurance_Card_EFU.png", patient: "Hassan Raza", mrn: "MRN-100901", category: "Insurance", type: "Image", size: "740 KB", uploadedBy: "Sana Iqbal", uploaded: "07 Sep 2026, 16:02" },
  { id: "doc4", name: "MRI_Lumbar_05Sep.pdf", patient: "Usman Tariq", mrn: "MRN-101190", category: "Radiology", type: "PDF", size: "8.1 MB", uploadedBy: "Radiology", uploaded: "05 Sep 2026, 13:44" },
  { id: "doc5", name: "Consent_Procedure_Signed.pdf", patient: "Bilal Ahmed Khan", mrn: "MRN-100518", category: "Consent", type: "PDF", size: "126 KB", uploadedBy: "Sana Iqbal", uploaded: "08 Sep 2026, 08:29" },
  { id: "doc6", name: "Referral_Cardiology.pdf", patient: "Ayesha Rahman", mrn: "MRN-100412", category: "Referral", type: "PDF", size: "94 KB", uploadedBy: "Dr. Imran Sheikh", uploaded: "08 Sep 2026, 09:35" },
  { id: "doc7", name: "Spirometry_27Aug.pdf", patient: "Fatima Noor", mrn: "MRN-100733", category: "Lab report", type: "PDF", size: "310 KB", uploadedBy: "Lab — Block B", uploaded: "27 Aug 2026, 11:18" },
  { id: "doc8", name: "Discharge_Summary_Jul26.pdf", patient: "Mariam Shah", mrn: "MRN-101322", category: "Discharge", type: "PDF", size: "180 KB", uploadedBy: "Ward A", uploaded: "14 Jul 2026, 18:20" },
];

export type Bill = {
  id: string;
  invoice: string;
  patient: string;
  mrn: string;
  visitNo: string;
  date: string;
  total: number;
  paid: number;
  method: "Cash" | "Card" | "Insurance" | "Bank transfer" | "—";
  status: "Paid" | "Partially paid" | "Unpaid" | "Draft";
};

export const bills: Bill[] = [
  { id: "b1", invoice: "INV-2026-3391", patient: "Bilal Ahmed Khan", mrn: "MRN-100518", visitNo: "V-2026-4470", date: "08 Sep 2026", total: 7800, paid: 7800, method: "Card", status: "Paid" },
  { id: "b2", invoice: "INV-2026-3392", patient: "Ayesha Rahman", mrn: "MRN-100412", visitNo: "V-2026-4471", date: "08 Sep 2026", total: 9200, paid: 6000, method: "Cash", status: "Partially paid" },
  { id: "b3", invoice: "INV-2026-3393", patient: "Hassan Raza", mrn: "MRN-100901", visitNo: "V-2026-4474", date: "08 Sep 2026", total: 18750, paid: 0, method: "—", status: "Unpaid" },
  { id: "b4", invoice: "INV-2026-3394", patient: "Mariam Shah", mrn: "MRN-101322", visitNo: "V-2026-4472", date: "08 Sep 2026", total: 3900, paid: 3000, method: "Insurance", status: "Partially paid" },
  { id: "b5", invoice: "INV-2026-3390", patient: "Zainab Yousuf", mrn: "MRN-101044", visitNo: "V-2026-4462", date: "07 Sep 2026", total: 12400, paid: 12400, method: "Insurance", status: "Paid" },
  { id: "b6", invoice: "INV-2026-3387", patient: "Usman Tariq", mrn: "MRN-101190", visitNo: "V-2026-4455", date: "05 Sep 2026", total: 22600, paid: 16200, method: "Bank transfer", status: "Partially paid" },
  { id: "b7", invoice: "INV-2026-3402", patient: "Danish Iqbal", mrn: "MRN-101487", visitNo: "V-2026-4473", date: "08 Sep 2026", total: 2500, paid: 0, method: "—", status: "Draft" },
];

export const rateCatalogue = [
  { id: "s1", code: "CONS-IM", name: "Internal Medicine Consultation", dept: "Internal Medicine", category: "Consultation", price: 3000, insurance: 2400 },
  { id: "s2", code: "CONS-CARD", name: "Cardiology Consultation", dept: "Cardiology", category: "Consultation", price: 5000, insurance: 4200 },
  { id: "s3", code: "CONS-PED", name: "Pediatrics Consultation", dept: "Pediatrics", category: "Consultation", price: 2500, insurance: 2000 },
  { id: "s4", code: "LAB-CBC", name: "Complete Blood Count", dept: "Laboratory", category: "Laboratory", price: 900, insurance: 700 },
  { id: "s5", code: "LAB-HBA1C", name: "HbA1c", dept: "Laboratory", category: "Laboratory", price: 1800, insurance: 1500 },
  { id: "s6", code: "LAB-TROP", name: "Troponin I, Serum", dept: "Laboratory", category: "Laboratory", price: 3500, insurance: 3000 },
  { id: "s7", code: "RAD-CXR", name: "Chest X-Ray (PA)", dept: "Radiology", category: "Radiology", price: 2200, insurance: 1800 },
  { id: "s8", code: "RAD-MRI-LS", name: "MRI Lumbar Spine", dept: "Radiology", category: "Radiology", price: 21000, insurance: 18000 },
  { id: "s9", code: "PRC-NEB", name: "Nebulisation Session", dept: "Pediatrics", category: "Procedure", price: 800, insurance: 650 },
  { id: "s10", code: "PRC-DRESS", name: "Wound Dressing", dept: "Internal Medicine", category: "Procedure", price: 1200, insurance: 950 },
];

export const systemUsers = [
  { id: "u1", name: "Nadia Karim", email: "nadia.karim@atrium.health", role: "Admin", dept: "IT & Operations", lastActive: "Now", status: "Active" },
  { id: "u2", name: "Sana Iqbal", email: "sana.iqbal@atrium.health", role: "Receptionist", dept: "Front Desk — Block A", lastActive: "3 min ago", status: "Active" },
  { id: "u3", name: "Dr. Imran Sheikh", email: "imran.sheikh@atrium.health", role: "Doctor", dept: "Internal Medicine", lastActive: "1 min ago", status: "Active" },
  { id: "u4", name: "Dr. Sadia Malik", email: "sadia.malik@atrium.health", role: "Doctor", dept: "Cardiology", lastActive: "12 min ago", status: "Active" },
  { id: "u5", name: "Faraz Ali", email: "faraz.ali@atrium.health", role: "Billing", dept: "Cashier — Counter 2", lastActive: "8 min ago", status: "Active" },
  { id: "u6", name: "Hamza Sultan", email: "hamza.sultan@atrium.health", role: "Receptionist", dept: "Front Desk — Block B", lastActive: "2 days ago", status: "Suspended" },
  { id: "u7", name: "Dr. Rabia Nasir", email: "rabia.nasir@atrium.health", role: "Doctor", dept: "Orthopedics", lastActive: "6 days ago", status: "Inactive" },
  { id: "u8", name: "Ali Zafar", email: "ali.zafar@atrium.health", role: "Billing", dept: "Cashier — Counter 1", lastActive: "Pending first login", status: "Invited" },
];

export const permissionMatrix = [
  { module: "Dashboard", admin: "Full", receptionist: "Full", doctor: "Full", billing: "Full" },
  { module: "Patients", admin: "Full", receptionist: "Create / Edit", doctor: "View", billing: "View" },
  { module: "Appointments", admin: "Full", receptionist: "Full", doctor: "View / Own", billing: "View" },
  { module: "Visits", admin: "Full", receptionist: "Create / Edit", doctor: "Edit own", billing: "View" },
  { module: "Clinical records", admin: "View", receptionist: "None", doctor: "Full", billing: "None" },
  { module: "Orders", admin: "View", receptionist: "None", doctor: "Full", billing: "View" },
  { module: "Documents", admin: "Full", receptionist: "Upload", doctor: "Upload / View", billing: "View" },
  { module: "Billing", admin: "Full", receptionist: "Create draft", doctor: "None", billing: "Full" },
  { module: "Reports", admin: "Full", receptionist: "Limited", doctor: "Own patients", billing: "Financial" },
  { module: "Administration", admin: "Full", receptionist: "None", doctor: "None", billing: "None" },
];

export const auditLog = [
  { id: "al1", time: "09:38", user: "Dr. Imran Sheikh", action: "Signed consultation note", target: "V-2026-4471" },
  { id: "al2", time: "09:31", user: "System", action: "Lab result received", target: "LAB-8841" },
  { id: "al3", time: "09:18", user: "Sana Iqbal", action: "Started visit", target: "V-2026-4473" },
  { id: "al4", time: "09:04", user: "Faraz Ali", action: "Recorded payment PKR 7,800", target: "INV-2026-3391" },
  { id: "al5", time: "08:52", user: "Nadia Karim", action: "Updated rate card", target: "RAD-MRI-LS" },
];

export const pendingTasks = [
  { id: "t1", label: "3 lab results awaiting doctor review", meta: "Internal Medicine · Cardiology", severity: "high", role: ["doctor", "admin"] },
  { id: "t2", label: "2 unsigned consultation notes from yesterday", meta: "Dr. Imran Sheikh", severity: "high", role: ["doctor", "admin"] },
  { id: "t3", label: "4 patients missing CNIC / contact number", meta: "Registration data quality", severity: "medium", role: ["receptionist", "admin"] },
  { id: "t4", label: "Insurance pre-approval pending for Hassan Raza", meta: "EFU Health · INV-2026-3393", severity: "high", role: ["billing", "receptionist", "admin"] },
  { id: "t5", label: "6 unpaid invoices older than 7 days", meta: "PKR 84,300 outstanding", severity: "medium", role: ["billing", "admin"] },
  { id: "t6", label: "1 user invitation not accepted", meta: "Ali Zafar · Cashier Counter 1", severity: "low", role: ["admin"] },
];

export const clinicalHistory = [
  {
    id: "ch1",
    date: "08 Aug 2026",
    doctor: "Dr. Imran Sheikh",
    dept: "Internal Medicine",
    diagnosis: "Essential hypertension — controlled",
    note: "BP improved on current regimen. Advised low-sodium diet, continue Amlodipine 5mg OD. Review in 4 weeks with lipid profile.",
  },
  {
    id: "ch2",
    date: "12 Jun 2026",
    doctor: "Dr. Imran Sheikh",
    dept: "Internal Medicine",
    diagnosis: "Essential hypertension",
    note: "New diagnosis. Started Amlodipine 5mg OD. Baseline labs ordered; ECG unremarkable.",
  },
  {
    id: "ch3",
    date: "03 Mar 2026",
    doctor: "Dr. Sadia Malik",
    dept: "Cardiology",
    diagnosis: "Palpitations — benign",
    note: "Holter monitoring showed occasional PACs. Reassurance given, caffeine reduction advised.",
  },
];

export const medications = [
  { id: "m1", drug: "Amlodipine 5 mg", dose: "1 tablet", freq: "Once daily", duration: "30 days", route: "Oral", note: "Morning, after breakfast" },
  { id: "m2", drug: "Atorvastatin 10 mg", dose: "1 tablet", freq: "At night", duration: "30 days", route: "Oral", note: "Recheck lipids in 6 weeks" },
  { id: "m3", drug: "Paracetamol 500 mg", dose: "1-2 tablets", freq: "As needed, max 4/day", duration: "5 days", route: "Oral", note: "For headache" },
];

export const vitalsHistory = [
  { date: "08 Sep 2026", bp: "128/82", pulse: 78, temp: "36.8", spo2: 98, weight: "68.4", bmi: "24.1" },
  { date: "08 Aug 2026", bp: "134/86", pulse: 82, temp: "36.6", spo2: 97, weight: "69.1", bmi: "24.4" },
  { date: "12 Jun 2026", bp: "148/94", pulse: 88, temp: "37.0", spo2: 98, weight: "70.2", bmi: "24.8" },
];

export const revenueByDept = [
  { dept: "Cardiology", visits: 41, revenue: 412000 },
  { dept: "Internal Medicine", visits: 88, revenue: 356000 },
  { dept: "Radiology", visits: 34, revenue: 298000 },
  { dept: "Orthopedics", visits: 27, revenue: 214000 },
  { dept: "Pediatrics", visits: 62, revenue: 168000 },
  { dept: "Laboratory", visits: 119, revenue: 141000 },
];

export const money = (n: number) => "PKR " + n.toLocaleString("en-PK");
