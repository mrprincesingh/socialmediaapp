import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, FormControl, Input, Stack } from '@chakra-ui/react';
import { createPost } from '../redux/PostRedux/action';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleCreatePost = () => {
     
    dispatch(createPost({ content }));

    
    setContent('');
  };

  return (
    <Stack spacing={4}>
      <FormControl>
        <Input
          type="text"
          placeholder="Enter your post content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </FormControl>
      <Button colorScheme="teal" onClick={handleCreatePost}>
        Create Post
      </Button>
    </Stack>
  );
};

export default CreatePost;
