import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import axios from 'axios'
import RegistrationForm from './Components/RegistrationForm';
import AvatarUpload from './Components/AvatarUpload';

export interface FormData {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  interests: string[];
  avatar:File;
}

const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({} as FormData);
  const handleNextStep = () => {
    setStep(step + 1);
  };
  console.log(formData);
    function updateFields(fields: Partial<FormData>) {
        setFormData((prev) => {
            return { ...prev, ...fields };
        });
    }    
    
    const registerUser = () => {
        axios.post('/user/register', formData)
    }

  return (
    <ChakraProvider >
      <div>
        {step === 1 && <RegistrationForm setFormData={setFormData} handleNextStep={handleNextStep} />}
        {step === 2 && <AvatarUpload updateFields={updateFields}/>}
      </div>
    </ChakraProvider>
  );
};

export default App;
