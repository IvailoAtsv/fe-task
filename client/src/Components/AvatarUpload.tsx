import React, { useState } from 'react';
import { VStack, Button, FormControl, FormLabel, Input, Image } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormData } from '../App';
import toast from 'react-hot-toast';

interface AvatarData {
  avatar: FileList;
}

interface AvatarUploadProps {
 updateFields: (fields: Partial<FormData>) => void;
 registerUser: () => void
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ updateFields,registerUser }) => {
  const { register, handleSubmit } = useForm<AvatarData>();
  const [preview, setPreview] = useState<string | null>(null);

const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files && event.target.files[0]) {
    const file = event.target.files[0];
    if(file.type == 'image/png' || file.type == 'image/jpeg'){
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
      
      // Encode the file to base64
      const base64String = result.split(',')[1];
    
      // Update the form data with the base64 string
      
      updateFields({ avatar: base64String });

    };
    reader.readAsDataURL(file);
  }else{
    toast.error('Please upload a valid image file (png or jpeg)');
    event.target.files = null;
    setPreview(null);
  }
  }
};

  const onSubmit: SubmitHandler<AvatarData> = () => {
      registerUser();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4} maxWidth="800px" padding="4" align="stretch">
        <FormControl>
          <FormLabel htmlFor="avatar">Upload Avatar</FormLabel>
          <Input
            id="avatar"
            type="file"
            padding={1}
            accept="image/jpg, image/png, image/jpeg"
            required
            onChange={handleFileChange}
          />
          {preview && <Image padding={4} src={preview} alt="Avatar Preview" maxWidth="350px" />}
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Submit
        </Button>
      </VStack>
    </form>
  );
};

export default AvatarUpload;
