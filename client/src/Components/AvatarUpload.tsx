import React, { useState } from 'react';
import { VStack, Button, FormControl, FormLabel, Input, Image } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormData } from '../App';
interface AvatarData {
  avatar: FileList;
}

interface AvatarUploadProps {
 updateFields: (fields: Partial<FormData>) => void;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ updateFields }) => {
  const { register, handleSubmit } = useForm<AvatarData>();
  const [preview, setPreview] = useState<string | null>(null);

const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

  if (event.target.files && event.target.files[0]) {
    const file = event.target.files[0]
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
    };
    reader.readAsDataURL(file);
    updateFields({ avatar: file });

    
  }
};

  const onSubmit: SubmitHandler<AvatarData> = (data) => {
    // You can send the image data to your backend here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4} maxWidth="800px" padding="4" align="stretch">
        <FormControl>
          <FormLabel htmlFor="avatar">Upload Avatar</FormLabel>
          <Input
            id="avatar"
            type="file"
            accept="image/*"
            required
            onChange={handleFileChange}
          />
          {preview && <Image padding={4} src={preview} alt="Avatar Preview" maxWidth="200px" />}
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Submit
        </Button>
      </VStack>
    </form>
  );
};

export default AvatarUpload;
