import { useState } from 'react'

// import Post from './components/Post.jsx'
import PostList from './components/PostList.jsx'
import MainHeader from './components/MainHeader.jsx'

function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false)

  function showModalHandler() {
    setModalIsVisible(true);
  }

  function hideModalHandler() {
    setModalIsVisible(false);
  }
  

  return (
    <>
      <MainHeader onCreatePost={showModalHandler} />
      <main>
        <PostList
          isPosting={modalIsVisible}
          onStopPosting={hideModalHandler}
        />
      </main>
    </>
  )
}

export default App;
