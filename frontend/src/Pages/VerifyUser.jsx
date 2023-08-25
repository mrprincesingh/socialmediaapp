import React, { useState } from 'react';
import { Box, Input, Button,Text, FormControl, FormLabel, Textarea, Heading, Container } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import { useDispatch, useSelector } from 'react-redux';
import { loginfunc } from '../redux/action';

const VerifyUser = () => {
  const {isAuth} = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
   const [password, setPass] = useState("");
   const navigate = useNavigate();
   const dispatch = useDispatch()
   const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please provide both Email and Password.");
      return;
    }

    dispatch(loginfunc(email ,password ))
 if(isAuth){
    toast.success("Login successful!");
        setTimeout(() => {
            navigate("/");
          }, 5000); 
 }else{
    toast.error("Invalid Email or Password. Please try again.");
 }

 setEmail("")
 setPass("")
   
  };

   const handlegotologinup = ()=>{
    navigate("/create")
  }
  return (
    <>
    <Container bgColor={"black.100"} mt="100px" p="10" lineHeight={"10"}>
     <Heading>VERIFY USER</Heading>
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
     <Button mt="10px" colorScheme="blue" onClick={handleSignup}>
       Submit
     </Button>
     <Box onClick={handlegotologinup}>
<h1>Don't have an account click here to Create</h1>
<Button colorScheme="red">Create Account</Button>
</Box>
   </Container>

   <ToastContainer position="top-right" /></>
  )
}

export default VerifyUser