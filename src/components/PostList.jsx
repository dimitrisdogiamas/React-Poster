import { useState } from 'react';
import Modal from './Modal'
import NewPost from './NewPost'
import Post from './Post'
import classes from './PostList.module.css'
import { useEffect } from 'react';
function PostList({ isPosting, onStopPosting }) {

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
     async function fetchPosts() {
         setIsLoading(true);
         setError(null);
         try {

             const response = await fetch('http://localhost:8080/posts');
             if (!response.ok) {
                 throw new Error('Something went wrong!');
             }
             const resData = await response.json();
             setPosts(resData.posts);

         } catch
             (error) {
             setError(error.message);
         } finally {
             setIsLoading(false);
         }
     }

        fetchPosts();
    }, []);
// this function should be triggered when we submit the form in NewPost component
  function addPostHandler(postData) {
    fetch('http://localhost:8080/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    setPosts((existingPosts) => [postData, ...existingPosts]);
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
      {!isLoading && posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => <Post key={post.body} author={post.author} body={post.body} />
          )}
        </ul>
      )}
      {!isLoading && posts.length === 0 && <div style={{
        textAlign: 'center',
        color: 'white',
      }}>
        <h2>There are no posts yet!</h2>
        <p>Click on New post to add Some!</p>
      </div>
      }

        {isLoading && (
            <div style={{textAlign: 'center', color: 'white'}}>
                <p>Loading...</p>
            </div>
        )}

        {error && (
            <div style={{textAlign: 'center', color: 'red'}}>
                <p>Error: {error}</p>
            </div>
        )}
    </>
  )
}


export default PostList;