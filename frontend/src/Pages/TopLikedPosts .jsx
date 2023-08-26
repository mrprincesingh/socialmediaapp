import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  List,
  ListItem,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';

const TopLikedPosts = () => {
  const [topLikedPosts, setTopLikedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the top 5 most liked posts from the server
    axios.get('https://socialbackend.vercel.app/api/analytics/posts/top-liked')
      .then((response) => {
        setTopLikedPosts(response.data); // Assuming the response is an array of posts
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching top liked posts:', error);
        setLoading(false);
      });
  }, []);

  return (
    <Box p={4}>
      <Heading as="h2" size="xl" mb={4}>
        Top Liked Posts
      </Heading>
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <VStack spacing={4} align="center">
          {topLikedPosts.map((post) => (
            <Box
              key={post._id}
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="md"
              p={4}
            >
              <Heading as="h3" size="lg" mb={2}>
                {post.title}
              </Heading>
              <Text fontSize="sm" color="gray.500">
                Posted on: {new Date(post.created_at).toLocaleDateString()}
              </Text>
              <Text mt={2}>{post.content}</Text>
              <Text mt={2} fontWeight="bold">
                Likes: {post.likes}
              </Text>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default TopLikedPosts;
