import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPost } from '../redux/PostRedux/action';
import { Spinner, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Stack, Icon, Heading } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import PostList from './PostList.jsx';
import CreatePost from './CreatePost.jsx';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [totalPosts, setTotalPosts] = useState(0); // State to hold the total number of posts

  const posts = useSelector((state) => state.post.post.posts);
  const loading = useSelector((state) => state.post.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPost());

    fetchTotalPosts();
  }, [dispatch]);


  const fetchTotalPosts = async () => {
    try {
      const response = await fetch('https://socialbackend.vercel.app/api/analytics/posts');
      if (response.ok) {
        const data = await response.json();
        console.log(data.totalPosts)
        setTotalPosts(data.totalPosts);
      } else {
        throw new Error('Failed to fetch total posts');
      }
    } catch (error) {
      console.error('Error fetching total posts:', error);
    }
  };

  return (
    <Stack direction="row" spacing={4}>
      <Drawer isOpen={isDrawerOpen} placement="left" onClose={() => setIsDrawerOpen(false)}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create a Post</DrawerHeader>

          <DrawerBody>
            <CreatePost />
            <Link to="/analytics/posts/top-liked">
            <Button  mt="20px">Check the Top Liked one's</Button>
            </Link>

            <Link to="/analytics/users">
            <Button  mt="20px">All User Details</Button>
            </Link>
           
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Stack flex="1" spacing={4} p={['5', '10', '10']} margin="auto" mt={4} align="center">
        <Button
          leftIcon={<Icon as={FaPlus} />}
          colorScheme="teal"
          onClick={() => setIsDrawerOpen(true)}
        >
          Click Me
        </Button>
        
        <p>Total Posts: {totalPosts}</p> {/* Display total number of posts */}

        <Heading>Click the post Title to edit , delete or view the post</Heading>
        {loading ? (
          // Loading spinner
          <Spinner size="xl" />
        ) : (
          <PostList posts={posts} />
        )}
      </Stack>
    </Stack>
  );
};

export default Home;
