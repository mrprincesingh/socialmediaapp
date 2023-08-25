import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import { Box, Input, Button,Text, FormControl, FormLabel, Textarea, Heading, Container } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { signupfunc } from '../redux/action';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
const Create = () => {
   const [name , SetName] = useState("")
   const [email, setEmail] = useState("");
   const [password, setPass] = useState("");
   const [bio , setBio] = useState("")
   const navigate = useNavigate();
   const {createAccount ,isError} = useSelector((state) => state.user);
   console.log(createAccount)
  
   const dispatch = useDispatch();
 
   useEffect(() => {
   
     if (createAccount === true) {
     
       toast.success("Signup Success!");
       setTimeout(() => {
         navigate("/verifyuser");
       
       }, 5000);
     }
   }, [createAccount]);
 
   useEffect(() => {
     if (isError === true) {
       toast.error("Something went wrong");
     }
   }, [isError]);

  
   const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(
      signupfunc({
        name:name,
        email: email,
        password: password,
        bio:bio
      })
    );

    SetName("")
    setEmail("");
    setPass("");
    setBio("")
  };
  const handlegotologinup = ()=>{
    navigate("/verifyuser")
  }
    
  return (
    <>
       <Container bgColor={"black.100"} mt="100px" p="10" lineHeight={"10"}>
        <Heading>CREATE USER</Heading>
        <FormControl mt="10px" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Name"
            value={name}
            type="text"
            onChange={(e) => SetName(e.target.value)}
          />
        </FormControl>
        <FormControl mt="10px" isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            placeholder="Email Address"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl mt="10px" isRequired>
          <FormLabel>Create Password</FormLabel>
          <Input
            placeholder="Create Password"
            value={password}
            type="password"
            onChange={(e) => setPass(e.target.value)}
          />
          <Text fontSize="xs">
            Password must have more than 6 characters.
          </Text>
        </FormControl>
       
        <FormControl mt="10px">
          <FormLabel>Bio</FormLabel>
          <Textarea
            placeholder="Address"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </FormControl>
        <Button mt="10px" colorScheme="blue" onClick={handleSignup}>
          Submit
        </Button>
        <Box onClick={handlegotologinup}>
  <h1>Already have an account click here to Verify</h1>
<Button colorScheme="red">Verify User</Button>
</Box>
      </Container>

      <ToastContainer position="top-right" /></>
  )
}

export default Create