import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  Stack,
} from '@chakra-ui/react';
import axios from 'axios';

const SingleUser = () => {
  const { id } = useParams(); // Get the id parameter from the URL
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: '',
    bio: '',
  });

  useEffect(() => {
    // Fetch user data based on the id parameter
    // Replace this with your API call to retrieve user data
    // For now, we'll simulate data retrieval
    const fetchUser = async () => {
      // Simulate an API call (replace with your actual fetch)
      const response = await fetch(`https://socialbackend.vercel.app/api/users/${id}`);
      if (response.ok) {
        const userData = await response.json();
       
        setUser(userData.User);
        setEditedUser(userData.User); // Set initial values for editing
      }
    };

    fetchUser();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSave = () => {
    axios
    .put(`https://socialbackend.vercel.app/api/users/${id}`, editedUser)
    .then((response) => {
      if (response.status === 200) {
        setIsEditing(false);
        // Optionally, you can update the user state with the updated data here
        setUser(response.data.User);
      }
    })
    .catch((error) => {
      console.error('Error updating user:', error);
      // Handle the error as needed
    });
  };

  return (
    <Box border="1px solid black" m="auto" mt="100px" backgroundColor="azure"  w="30%"  p={4}  borderRadius="lg">
      {user ? (
        <>
          <Heading size="md" mb={2}>
            User Profile
          </Heading>
          <Text mb={2}>
            Name:{' '}
            {isEditing ? (
              <Input
                name="name"
                value={editedUser.name}
                onChange={handleChange}
              />
            ) : (
              user.name
            )}
          </Text>
         
          <Text mb={2}>
            Bio:{' '}
            {isEditing ? (
              <Textarea
                name="bio"
                value={editedUser.bio}
                onChange={handleChange}
              />
            ) : (
              user.bio
            )}
          </Text>
          {isEditing ? (
            <Stack spacing={2} direction="row">
              <Button colorScheme="teal" onClick={handleSave}>
                Save
              </Button>
              <Button colorScheme="red" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </Stack>
          ) : (
            <Button colorScheme="blue" onClick={handleEdit}>
              Edit
            </Button>
          )}
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </Box>
  );
};

export default SingleUser;
