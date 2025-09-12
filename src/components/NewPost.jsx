import classes from './NewPost.module.css'
import { useState } from 'react';
function NewPost({ onCancel, onAddPost }) {


  const [enteredBody, setEnteredBody] = useState('');
  const [enteredAuthor, setEnteredAuthor] = useState('');

  function handleBodyChange(event) {
    setEnteredBody(event.target.value);
  }

  function authorChangeHandler(event) {
    setEnteredAuthor(event.target.value);
  }

    function submitHandler(event) {
    event.preventDefault();
    const postData = {
      author: enteredAuthor,
      body: enteredBody
    }
      onAddPost(postData);
      // this will execute the function from the postlist so the addPostHandler
    onCancel();
  }

  return (
    <>
      <form className={classes.form} onSubmit={submitHandler}>
        <p>
          <label htmlFor="body">Text</label>
          <textarea id="body" rows={3} onChange={handleBodyChange} />
        </p>

        <p> 
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" required onChange={authorChangeHandler} />
        </p>

        <p className={classes.actions}>
          <button type='button' onClick={onCancel}>Cancel</button>
          <button>Add Post</button>
        </p>
      </form>
    </>
  )
}

export default NewPost;