import mongoose,{Document} from 'mongoose';



export interface DoctorType extends Document {
    name: string;
    languages: string[];
    availableDays: string[];
    timeSlots: string[];
    email: string;
    profile?: string;
    gender?: string;
    specialization?: string;
    experience?: string;
    biography?: string;
    location?: string;
    consultationFee?: string;
    qualifications?: string;
    clinicName?: string;
    contactNumber?: string;
  }

const doctorSchema = new mongoose.Schema<DoctorType>({
  name: { type: String, required: true },
  profile:{type:String},
  gender: { type: String },
  specialization: { type: String },
  experience: { type: String },
  qualifications: { type: String },
  languages: [{ type: String }],
  biography: { type: String },
  consultationFee: { type: String },
  availableDays: [{ type: String }],
  timeSlots: [{ type: String }],
  location: { type: String },
  clinicName: { type: String },
  contactNumber: { type: String },
  email: { type: String, required: true, unique: true }
});

export default mongoose.models.Doctor || mongoose.model<DoctorType>('Doctor', doctorSchema);
