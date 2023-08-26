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
   
   const [bio , setBio] = useState("")
   const navigate = useNavigate();
   const {createAccount ,isError} = useSelector((state) => state.user);
   console.log(createAccount)
  
   const dispatch = useDispatch();
 
   useEffect(() => {
   
     if (createAccount === true) {
     
       toast.success("User created Success!");
       setTimeout(() => {
         navigate("/create");
       
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
  
        bio:bio
      })
    );

    SetName("")
    setEmail("");
   
    setBio("")
  };
  const handlegotologinup = ()=>{
    navigate("/create")
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
       
      </Container>

      <ToastContainer position="top-right" /></>
  )
}

export default Create