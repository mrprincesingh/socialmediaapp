import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Heading,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from '@chakra-ui/react';

const EditPost = () => {
  const { id } = useParams();

  const [post, setPost] = useState({
    content: '',
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch the post data from the API
    axios.get(`https://socialbackend.vercel.app/api/posts/${id}/edit`)
      .then((response) => {
        setPost(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching post:', error);
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const handleEditSubmit = () => {
    
    axios.put(`https://socialbackend.vercel.app/api/posts/${id}`, post)
      .then(() => {
        setIsEditing(false);
        navigate("/create")
      })
      .catch((error) => {
        console.error('Error editing post:', error);
      });
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
      {loading ? (
        <Text>Loading...</Text>
      ) : isEditing ? (
        <VStack align="start" spacing={4}>
          <Heading as="h2" size="lg">
            Edit Post
          </Heading>
          <FormControl>
            <FormLabel>Content</FormLabel>
            <Textarea
              name="content"
              value={post.content}
              onChange={handleInputChange}
            />
          </FormControl>
          <Button colorScheme="teal" onClick={handleEditSubmit}>
            Save
          </Button>
        </VStack>
      ) : (
        <VStack align="start" spacing={4}>
          <Text>{post.content}</Text>
          <Button colorScheme="teal" onClick={() => setIsEditing(true)}>
            Edit Post
          </Button>
          <Link to={`/posts/${id}`}><Button>Back to Post</Button></Link>
          <Link to={`/create`}><Button>Home</Button></Link>
        </VStack>
      )}
    </Box>
  );
};

export default EditPost;
