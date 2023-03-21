import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography, CircularProgress, Grid, Divider, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import Post from '../Posts/Post/Post';
import { getPostsByCreator, getPostsBySearch } from '../../actions/posts';
import Navbar from '../Navbar/Navbar';

const CreatorOrTag = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/tags')) {
      dispatch(getPostsBySearch({ tags: name }));
    } else {
      dispatch(getPostsByCreator(name));
    }
  }, []);

  // useEffect(() => {
  //   if (location.pathname.startsWith('/name')) {
  //     dispatch(getPostsByCreator({ name:name} ));
  //   } else {
  //     dispatch(getPostsBySearch({ tags: name }));
  //   }
  // }, []);

  if (!posts.length && !isLoading) return 'No posts';

  return (
    <div>
        <Navbar/>
        <Paper>
        <Typography variant="h3" color='primary' align='center'>{name}</Typography>
        </Paper>
      
      <Divider style={{ margin: '20px 0 50px 0' }} />
      {isLoading ? <CircularProgress /> : (
        <Grid container alignItems="stretch" spacing={3}>
          {posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
              <Post post={post} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default CreatorOrTag;
