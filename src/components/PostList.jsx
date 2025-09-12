import { useState } from 'react';
import Modal from './Modal'
import NewPost from './NewPost'
import Post from './Post'
import classes from './PostList.module.css'

function PostList({ isPosting, onStopPosting }) {

  const [posts, setPosts] = useState([]);

// this function should be triggered when we submit the form in NewPost component
  function addPostHandler(postData) {
    fetch('https://localhost:8080/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      }
    })
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
      {posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => <Post key={post.body} author={post.author} body={post.body} />
          )}
        </ul>
      )}
      {posts.length === 0 && <div style={{
        textAlign: 'center',
        color: 'white',
      }}>
        <p><em>No posts yet</em></p>
        <p>Click on New post to add Some!</p>
      </div>
      }
    </>
  )
}


export default PostList;