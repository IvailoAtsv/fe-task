import React, { useState } from 'react';
import { Box, ChakraProvider, Image, Text } from '@chakra-ui/react';
import axios, { AxiosError } from 'axios'
import RegistrationForm from './Components/RegistrationForm';
import AvatarUpload from './Components/AvatarUpload';
import toast, { Toaster } from 'react-hot-toast';

export interface FormData {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  interests: string[];
  avatar:string;
}

const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({} as FormData);

  const [hasRegistered, setHasRegistered] = useState<boolean>(false);

  const handleNextStep = () => {
    setStep(step + 1);
  };
  console.log(formData);
    function updateFields(fields: Partial<FormData>) {
        setFormData((prev) => {
            return { ...prev, ...fields };
        });
    }    
    
    const registerUser = async () => {
      try{

        const response = await axios.post('http://localhost:5001/user/register', formData)
        toast.success(response.data.message)
        setHasRegistered(true)
      } catch (e: any) {
  if (axios.isAxiosError(e)) {
    // Handle Axios error that may occur
    const axiosError = e as AxiosError;
    console.error('Axios error:', axiosError);
    toast.error('An error occurred while making the request');
  } else {
    // Handle other types of errors
    console.error('Unexpected error:', e);
    toast.error('An unexpected error occurred');
  }
      }
    }

  return (
    <ChakraProvider >
      <Box width={'100%'} height={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>

      <Toaster />
      {hasRegistered ?
     <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p="4"
          boxShadow="md"
          w={720}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'space-evenly'} 
          alignItems={'center'}
          h={480}
          maxW="sm"
        >
          <Image src={`data:image;base64,${formData.avatar}`} alt="Avatar" borderRadius="full" boxSize="280px" m="auto" />
          <Text fontSize="xl" fontWeight="bold" mt="4" textAlign="center">
            {formData.firstName} {formData.lastName}
          </Text>
          <Text fontSize="md" color="gray.500" mt="2" textAlign="center">
            Interests: {formData.interests.join(', ')}
          </Text>
        </Box>
     : 
      
      <div>
        {step === 1 && <RegistrationForm setFormData={setFormData} handleNextStep={handleNextStep} />}
        {step === 2 && <AvatarUpload updateFields={updateFields} registerUser={registerUser}/>}
      </div>}
      </Box>

    </ChakraProvider>
  );
};

export default App;
