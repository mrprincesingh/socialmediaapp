import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  GridItem,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Spinner,
  IconButton,
} from '@chakra-ui/react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from the server
    axios.get('https://socialbackend.vercel.app/api/getuser')
      .then((response) => {
        setUsers(response.data.users);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });
  }, []);

  // Function to handle user edit
  const handleEdit = (userId) => {
    
    console.log(`Edit user with ID: ${userId}`);
  };

  // Function to handle user delete
  const handleDelete = (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      axios
        .delete(`https://socialbackend.vercel.app/api/users/${userId}`)
        .then((response) => {
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
          console.log(`User with ID ${userId} has been deleted.`);
          window.location.reload(); // Use window.location.reload() to reload the page
        })
        .catch((error) => {
          console.error(`Error deleting user with ID ${userId}:`, error);
        });
    }
  };
  
  

  return (
    <Box w="full" h="auto">
    <Grid
      p="5"
      mt="10"
      gap={5}
      templateColumns={[
        'repeat(1, 1fr)',
        'repeat(1, 1fr)',
        'repeat(2, 1fr)',
        'repeat(3, 1fr)',
      ]}
    >
      {loading ? (
        <Spinner size="xl" />
      ) : (
        users.map((user) => (
          <GridItem key={user._id}>
            <Card maxW="sm">
              <CardBody>
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/21/21104.png"
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md" cursor="pointer">
                    User Name: {user.name}
                  </Heading>
                  <Text color="black" cursor="pointer">
                    Email: {user.email}
                  </Text>
               
                  <IconButton
                    icon={<FaTrash />}
                    colorScheme="red"
                    aria-label="Delete"
                    size="sm"
                    onClick={() => handleDelete(user._id)}
                  />
                </Stack>
              </CardBody>
            </Card>
          </GridItem>
        ))
      )}
    </Grid>
  </Box>
  );
};

export default User;
