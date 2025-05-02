# Apollo 24/7 Clone

A modern web application cloning the Apollo 24/7 doctor consultation platform, built with Next.js, TypeScript, Tailwind CSS, and MongoDB.



![Screenshot from 2025-05-02 17-40-52](https://github.com/user-attachments/assets/75afd728-dc43-46fc-a84d-39e2c70b77e0)




![Screenshot from 2025-05-02 17-41-00](https://github.com/user-attachments/assets/cb1c517c-e6ef-4a7c-8995-cfe370ed9665)




## Tech Stack

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **UI Components:** Lucide React for icons
- **Backend:** Next.js API Routes
- **Database:** MongoDB with Mongoose
- **Styling:** Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- MongoDB installation or MongoDB Atlas account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Shu12388y/apolloweb.git
   cd apolloweb
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   DB=your_mongodb_connection_string
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Database Setup

### Doctor Schema

The application uses the following MongoDB schema for doctors:

```typescript
// models/Doctor.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface DoctorType extends Document {
  name: string;
  profile: string;
  specialization: string;
  experience: string;
  qualifications: string;
  biography: string;
  consultationFee: number;
  location: string;
  clinicName: string;
  rating?: string;
  patients?: string;
  timeSlots?: string;
  availableDays?: boolean;
  isOnline?: boolean;
  isHospitalVisit?: boolean;
  experienceYears?: number;
  languages?: string[];
  facility?: string;
}

const doctorSchema = new Schema({
  name: { type: String, required: true },
  profile: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: String, required: true },
  qualifications: { type: String, required: true },
  biography: { type: String, required: true },
  consultationFee: { type: Number, required: true },
  location: { type: String, required: true },
  clinicName: { type: String, required: true },
  rating: { type: String },
  patients: { type: String },
  timeSlots: { type: String },
  availableDays: { type: Boolean },
  isOnline: { type: Boolean },
  isHospitalVisit: { type: Boolean },
  experienceYears: { type: Number },
  languages: { type: [String] },
  facility: { type: String }
});

const DoctorModel: Model<DoctorType> = 
  mongoose.models.Doctor || mongoose.model<DoctorType>('Doctor', doctorSchema);

export default DoctorModel;
```

### Sample Data

You can use the following command to add sample data to your database:

```bash
npm run seed
# or
yarn seed
```

## API Routes

### GET /api/doctors

Fetches all doctors from the database.

```typescript
// src/app/api/doctors/route.ts
import { NextResponse } from 'next/server';
import DoctorModel from '@/models/Doctor';

export async function GET() {
  try {
    // Using the proper approach to avoid TypeScript errors
    const doctors = await DoctorModel.find().lean();
    return NextResponse.json(doctors, { status: 200 });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
  }
}
```

## Troubleshooting TypeScript Errors

If you encounter TypeScript errors with Mongoose queries during development or build:

### Option 1: Type Assertion (Quick Fix)

```typescript
const doctors = await (Doctor as any).find({});
```

### Option 2: Use @ts-ignore (Quick Fix)

```typescript
// @ts-ignore: Bypassing TypeScript error for find method
const doctors = await Doctor.find({});
```

### Option 3: Properly Typed Model (Best Practice)

Follow the model setup instructions in the "Database Setup" section.

## Filtering System

The application includes a comprehensive filtering system for doctors:

- **Mode of Consult:** Hospital visit or online consultation
- **Experience:** Filter by years of experience
- **Fees:** Filter by consultation fee ranges
- **Language:** Filter by languages spoken
- **Facility:** Filter by hospital/clinic type

## Project Structure

```
apollo-clone/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── doctors/
│   │   │       └── route.ts
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── components/
│   │   └── ApolloClone.tsx
│   └── models/
│       └── Doctor.ts
├── public/
├── .env.local
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md
```


## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Mongoose](https://mongoosejs.com/)
- [Lucide React](https://lucide.dev/)
