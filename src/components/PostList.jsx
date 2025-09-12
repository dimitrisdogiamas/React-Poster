import { useState } from 'react';
import Modal from './Modal'
import NewPost from './NewPost'
import Post from './Post'
import classes from './PostList.module.css'

function PostList({ isPosting, onStopPosting }) {

  const [posts, setPosts] = useState([]);

// this function should be triggered when we submit the form in NewPost component
  function addPostHandler(postData) {
    setPosts((prevPosts) => [postData, ...prevPosts]);
  }
  return (
    <>
      {isPosting ? (
        <Modal onClose={onStopPosting} >
          <NewPost
            onAddPost={addPostHandler}
            onCancel={onStopPosting}
          />
        </Modal>
      ) : false}
      <ul className={classes.posts}>
        <Post />
      </ul>
    </>
  )
}


export default PostList;