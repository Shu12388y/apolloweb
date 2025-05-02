// scripts/seed.js
import mongoose from "mongoose";
import Doctor from "../schema/schema";

const seedDoctors = [
  {
    name: "Dr. Ayesha Khan",
    gender: "Female",
    profile:
      "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    specialization: "Cardiologist",
    experience: "10 years",
    qualifications: "MBBS, MD",
    languages: ["English", "Hindi"],
    biography: "Experienced cardiologist with a patient-first approach.",
    consultationFee: "800",
    availableDays: ["Monday", "Wednesday", "Friday"],
    timeSlots: ["10:00 AM", "2:00 PM"],
    location: "Delhi",
    clinicName: "Heart Care Clinic",
    contactNumber: "9876543210",
    email: "ayesha@example.com",
  },
  {
    name: "Dr. Raj Patel",
    gender: "Male",
    profile:
      "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    specialization: "Dermatologist",
    experience: "6 years",
    qualifications: "MBBS, DVD",
    languages: ["English", "Gujarati"],
    biography: "Dermatology specialist with modern skincare solutions.",
    consultationFee: "500",
    availableDays: ["Tuesday", "Thursday"],
    timeSlots: ["11:00 AM", "4:00 PM"],
    location: "Mumbai",
    clinicName: "SkinGlow Clinic",
    contactNumber: "9876501234",
    email: "raj@example.com",
  },
  {
    name: "Dr. Sneha Verma",
    gender: "Female",
    profile:
      "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    specialization: "Pediatrician",
    experience: "8 years",
    qualifications: "MBBS, DCH",
    languages: ["English", "Hindi"],
    biography: "Loves working with children and helping them thrive.",
    consultationFee: "600",
    availableDays: ["Monday", "Thursday"],
    timeSlots: ["9:00 AM", "1:00 PM"],
    location: "Lucknow",
    clinicName: "Child First Clinic",
    contactNumber: "9876523412",
    email: "sneha@example.com",
  },
  {
    name: "Dr. Arjun Mehta",
    gender: "Male",
    profile:
      "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    specialization: "Orthopedic Surgeon",
    experience: "12 years",
    qualifications: "MBBS, MS Ortho",
    languages: ["English", "Marathi"],
    biography: "Expert in bone and joint surgeries.",
    consultationFee: "1000",
    availableDays: ["Wednesday", "Friday"],
    timeSlots: ["10:00 AM", "6:00 PM"],
    location: "Pune",
    clinicName: "OrthoPlus",
    contactNumber: "9887654321",
    email: "arjun@example.com",
  },
  {
    name: "Dr. Priya Nair",
    gender: "Female",
    profile:
      "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    specialization: "Gynecologist",
    experience: "9 years",
    qualifications: "MBBS, MS (Gynecology)",
    languages: ["English", "Malayalam"],
    biography: "Supporting women through every stage of life.",
    consultationFee: "700",
    availableDays: ["Tuesday", "Saturday"],
    timeSlots: ["11:00 AM", "3:00 PM"],
    location: "Kochi",
    clinicName: "Womens Wellness",
    contactNumber: "9876123456",
    email: "priya@example.com",
  },
  {
    name: "Dr. Aman Yadav",
    gender: "Male",
    profile:
      "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

    specialization: "ENT Specialist",
    experience: "5 years",
    qualifications: "MBBS, DLO",
    languages: ["English", "Hindi"],
    biography: "Passionate about helping patients with hearing issues.",
    consultationFee: "400",
    availableDays: ["Monday", "Wednesday"],
    timeSlots: ["9:00 AM", "12:00 PM"],
    location: "Jaipur",
    clinicName: "SoundCare",
    contactNumber: "9876540987",
    email: "aman@example.com",
  },
  {
    name: "Dr. Meera Iyer",
    gender: "Female",
    profile:
      "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

    specialization: "Psychiatrist",
    experience: "7 years",
    qualifications: "MBBS, MD Psychiatry",
    languages: ["English", "Tamil"],
    biography: "Committed to mental health awareness and treatment.",
    consultationFee: "900",
    availableDays: ["Tuesday", "Friday"],
    timeSlots: ["2:00 PM", "5:00 PM"],
    location: "Chennai",
    clinicName: "MindCare",
    contactNumber: "9876012345",
    email: "meera@example.com",
  },
  {
    name: "Dr. Kunal Sharma",
    gender: "Male",
    profile:
      "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

    specialization: "General Physician",
    experience: "3 years",
    qualifications: "MBBS",
    languages: ["English", "Hindi"],
    biography: "Treating common ailments with personalized care.",
    consultationFee: "300",
    availableDays: ["All Days"],
    timeSlots: ["9:00 AM", "6:00 PM"],
    location: "Bhopal",
    clinicName: "Sharma Clinic",
    contactNumber: "9876098765",
    email: "kunal@example.com",
  },
  {
    name: "Dr. Nisha Reddy",
    gender: "Female",
    profile:
      "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

    specialization: "Dentist",
    experience: "4 years",
    qualifications: "BDS",
    languages: ["English", "Telugu"],
    biography: "Creating healthy smiles every day.",
    consultationFee: "450",
    availableDays: ["Monday", "Thursday"],
    timeSlots: ["10:00 AM", "1:00 PM"],
    location: "Hyderabad",
    clinicName: "SmileBright",
    contactNumber: "9876546789",
    email: "nisha@example.com",
  },
  {
    name: "Dr. Vivek Singh",
    gender: "Male",
    profile:
      "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

    specialization: "Neurologist",
    experience: "11 years",
    qualifications: "MBBS, DM Neuro",
    languages: ["English", "Hindi"],
    biography: "Advanced neurological care and diagnosis.",
    consultationFee: "1200",
    availableDays: ["Wednesday", "Saturday"],
    timeSlots: ["3:00 PM", "6:00 PM"],
    location: "Delhi",
    clinicName: "NeuroCare Centre",
    contactNumber: "9876011122",
    email: "vivek@example.com",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.DB!)  
    await Doctor.collection.deleteMany({});
    const doctorInstances = seedDoctors.map((doctor) => new Doctor(doctor));
    await Doctor.insertMany(doctorInstances);

    console.log("✅ Seed data inserted!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding data:", error);
  }
};

seedDB();
