import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Box, Heading, Text, Divider, VStack, Spinner } from '@chakra-ui/react';

const SinglePost = () => {
  const { id } = useParams();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postDeleted, setPostDeleted] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`https://socialbackend.vercel.app/api/posts/${id}`)
      .then((response) => {
        setPost(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching post:', error);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    axios.delete(`https://socialbackend.vercel.app/api/posts/${id}`)
      .then(() => {
        // Set the postDeleted state to true to trigger the conditional rendering
        navigate("/create")
        setPostDeleted(true);
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
      });
  };

  return (
    <Box p={4} w="50%" bg="azure"   borderWidth="1px" m="auto" mt="100px"  borderRadius="lg" boxShadow="md">
      {loading ? (
        <Spinner size="lg" />
      ) : post ? (
        <VStack align="center" justifyContent="center"  spacing={4}>
          <Heading as="h2" size="lg">
            {post.title}
          </Heading>
          <Text>{post.content}</Text>

          {/* Add update and delete options */}
          <VStack align="start" spacing={2}>
            {/* You can use user authentication/authorization to conditionally show these options */}
            <Link to={`/posts/${id}/edit`}>
              <Button colorScheme="teal">Edit Post</Button>
            </Link>
            <Button colorScheme="red" onClick={handleDelete}>
              Delete Post
            </Button>
          </VStack>
        </VStack>
      ) : postDeleted ? (
        <Text fontSize="lg">
          Post has been deleted. <Link to="/create">Go back to homepage</Link>
        </Text>
      ) : (
        <Text fontSize="lg">Post not found.</Text>
      )}
    </Box>
  );
};

export default SinglePost;
