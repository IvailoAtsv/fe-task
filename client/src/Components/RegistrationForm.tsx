import React, { useState } from 'react';
import {  Button, Checkbox, CheckboxGroup, FormControl, FormErrorMessage, FormLabel, Input, Stack, VStack } from '@chakra-ui/react';
import { useForm, SubmitHandler, useFieldArray, Control } from "react-hook-form";

import { interests } from '../constants/interests';
import { FormData } from '../App';
import toast from 'react-hot-toast';

interface RegistrationFormProps {
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleNextStep: () => void;
}
const RegistrationForm: React.FC<RegistrationFormProps> = ({setFormData, handleNextStep}) => {
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const { register, handleSubmit, formState: { errors }, control } = useForm<FormData>();
  const { fields, append, remove } = useFieldArray<FormData>({
    control: control as Control<FormData>,
    name: 'interests' as never,
  });

   const handleInterestsChange = (values: string[]) => {
    // Limit the selection to a maximum of two interests
    const updatedValues = values.slice(0, 2);
    setSelectedInterests(updatedValues);

  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if(data.password !== data.confirmPassword){
        toast.error('Passwords do not match');
        return
    }
    if(selectedInterests.length == 0){
        toast.error('Please select at least one interest');
        return
    }
    setFormData({...data, interests:selectedInterests});
    handleNextStep();
  };

const validateName = (value: string) => {
    if (/\d/.test(value)) {
      return "Name must not contain numbers";
    }
    return true;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4} maxWidth="800px" padding="8" align="stretch">
        <FormControl isInvalid={!!errors.firstName}>
          <FormLabel htmlFor="firstName">First Name</FormLabel>
          <Input id="firstName" {...register('firstName', { required: 'First name is required', validate:validateName })} />
          <FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.lastName}>
          <FormLabel htmlFor="lastName">Last Name</FormLabel>
          <Input id="lastName" {...register('lastName', { required: 'Last name is required', validate:validateName })} />
          <FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input id="password" type="password" {...register('password', { required: 'Password is required' })} />
          <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.confirmPassword}>
          <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
          <Input id="confirmPassword" type="password" {...register('confirmPassword', { required: 'Confirm password is required' })} />
          <FormErrorMessage>{errors.confirmPassword && errors.confirmPassword.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.interests}>
          <FormLabel>Interests</FormLabel>
          <CheckboxGroup colorScheme="green" value={selectedInterests}  onChange={handleInterestsChange}>
            <Stack direction="row">
              {interests.map((interest) => (
                  <Checkbox value={interest.value} key={Math.random()}
                  >{interest.label}</Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
          <FormErrorMessage>{errors.interests && 'Select at most 2 interests'}</FormErrorMessage>
        </FormControl>

        <Button type="submit" colorScheme="blue">Next</Button>
      </VStack>
    </form>
  );
};

export default RegistrationForm;
