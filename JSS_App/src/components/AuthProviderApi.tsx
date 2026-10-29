import React, { ReactNode, useContext, useState } from "react";

//defining what the context will hold
interface ContextProps {
  children: ReactNode;
  //setSelectedRole:()=>void
}
interface contextType {
  selectedRole: string | null;
  schoolName: string | null;
  admissionNumber: string | null;
  studentName: string | null;
  studentGrade: string | null;
  setSelectedRole: (role: string | null) => void;
  setSchoolName: (school: string | null) => void;
  setAdmissionNumber: (admNumber: string | null) => void;
  setStudentName: (Studentname: string | null) => void;
  setStudentGrade: (StudentGrade: string | null) => void;
}

//empty context box
const appContext = React.createContext<contextType | undefined>(undefined);

export function AppContextProvider({ children }: ContextProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [schoolName, setSchoolName] = useState<string | null>(null);
  const [admissionNumber, setAdmissionNumber] = useState<string | null>(null);
  const [studentName, setStudentName] = useState<string | null>(null);
  const [studentGrade, setStudentGrade] = useState<string | null>(null);

  console.log("student" + studentName);

  const globalProperties = {
    selectedRole,
    schoolName,
    admissionNumber,
    studentName,
    studentGrade,
    setSchoolName,
    setAdmissionNumber,
    setStudentName,
    setSelectedRole,
    setStudentGrade,
  };

  return (
    <appContext.Provider value={globalProperties}>
      {children}
    </appContext.Provider>
  );
}
//a custom hook to easily use it anywhere
export function useAppContext() {
  const context = useContext(appContext);

  if (!context) {
    throw new Error(" useAppContext must be used within a SimpleProvider");
  }
  return context;
}
