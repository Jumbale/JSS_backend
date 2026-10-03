import React, {
    ReactNode,
    useContext,
    useState
} from "react";

//defining what the context will hold
interface ContextProps {
  children: ReactNode;
  //setSelectedRole:()=>void
}
interface contextType {
  selectedRole: string | null;
  setSelectedRole: (role: string | null) => void;
}

//empty context box
const appContext = React.createContext<contextType | undefined>(undefined);

export function AppContextProvider({ children }: ContextProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const globalProperties = {
    selectedRole,
    setSelectedRole,
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
