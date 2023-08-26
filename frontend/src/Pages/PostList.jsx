import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Spacer,
  IconButton,
} from "@chakra-ui/react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import axios from "axios";

const PostList = ({ posts }) => {
  const [likes, setLikes] = useState({});
  const [dislikes, setDislikes] = useState(0);

  const handleLike = (postId, event) => {
    event.preventDefault(); 
    axios.post(`https://socialbackend.vercel.app/api/posts/${postId}/like`)
      .then((response) => {
        setLikes({ ...likes, [postId]: response.data.likes });
      })
      .catch((error) => {
        console.error("Error liking post:", error);
      });
  };

  const handleDislike = (postId, event) => {
    event.preventDefault();
    axios
      .post(`https://socialbackend.vercel.app/api/posts/${postId}/unlike`) // Updated API endpoint
      .then((response) => {
        // Update the dislikes state to reflect the new dislike count
        setDislikes({ ...dislikes, [postId]: response.data.dislikes }); // Use response.data.dislikes
        window.location.reload()
      })
      .catch((error) => {
        console.error("Error disliking post:", error);
      });
  };

  return (
    <Box w="full" maxW="100%" margin="auto">
      <Stack w="full" spacing={4} p={["5", "10", "10"]} mt={4} align="center">
        {posts?.map((post) => (
          <div key={post._id}>
            {/* Remove the Link component wrapping the post */}
            <Box
              p={10}
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="md"
              w="100%"
              h="auto"
            >
              <Flex flexWrap="wrap">
                <Heading fontSize={["lg", "xl", "xl"]} mb={["2", "0"]} mr="auto">
                  {post.user?.name}
                </Heading>
                <Text color="gray.500" fontSize="sm" mt={["2", "0"]} mr="auto">
                  Posted on: {new Date(post.created_at).toLocaleDateString()}
                </Text>
              </Flex>
              <Link to={`/posts/${post._id}`} key={post._id}>
              <Text mt={2}>ClickMe:-  {post.content}</Text>
              </Link>
              <Flex mt={2}>
                <IconButton
                  icon={<FaThumbsUp />}
                  colorScheme="teal"
                  aria-label="Like"
                  size="sm"
                  mr={2}
                  onClick={(event) => handleLike(post._id, event)} 
                />
                <Text>{likes[post._id] || post.likes} Likes</Text>
                <Spacer />
                <IconButton
                  icon={<FaThumbsDown />}
                  colorScheme="red"
                  aria-label="Dislike"
                  size="sm"
                  mr={2}
                  onClick={(event) => handleDislike(post._id, event)} 
                />
                <Text>{dislikes[post._id] || post.dislikes} Dislikes</Text>
              </Flex>
            </Box>
          </div>
        ))}
      </Stack>
    </Box>
  );
};

export default PostList;
