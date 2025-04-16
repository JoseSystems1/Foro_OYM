// App.js - Componente principal de nuestra aplicación
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Importamos nuestros componentes
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import NewPost from './pages/NewPost';
import About from './pages/About';

function App() {
  // Estado para almacenar los posts (en una aplicación real, esto vendría de una base de datos)
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Sugerencia para la biblioteca',
      content: 'Sería bueno tener más horarios disponibles en la biblioteca durante época de exámenes.',
      author: 'Carlos Mendez',
      date: '2025-03-29',
      category: 'Sugerencias',
      comments: [
        { 
          id: 1, 
          text: 'Totalmente de acuerdo!', 
          author: 'Ana Ruiz', 
          date: '2025-03-29',
          replies: [] 
        }
      ]
    },
    {
      id: 2,
      title: 'Opinión sobre el profesor Martínez',
      content: 'El profesor Martínez de Matemáticas explica muy bien y siempre está disponible para consultas.',
      author: 'Laura Gómez',
      date: '2025-03-29',
      category: 'Profesores',
      comments: []
    }
  ]);

  // Función para añadir un nuevo post
  const addPost = (newPost) => {
    newPost.id = posts.length + 1;
    newPost.comments = [];
    newPost.date = new Date().toISOString().slice(0, 10);
    setPosts([...posts, newPost]);
  };

  // Función para añadir un comentario a un post
  const addComment = (postId, comment) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: post.comments.length + 1,
          text: comment.text,
          author: comment.author,
          date: new Date().toISOString().slice(0, 10),
          replies: [] // Agregamos un array para almacenar las respuestas
        };
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  // Nueva función para añadir una respuesta a un comentario específico
  const addReplyToComment = (postId, commentId, reply) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const updatedComments = post.comments.map(comment => {
          if (comment.id === commentId) {
            const newReply = {
              id: comment.replies ? comment.replies.length + 1 : 1,
              text: reply.text,
              author: reply.author,
              date: new Date().toISOString().slice(0, 10)
            };
            return {
              ...comment,
              replies: [...(comment.replies || []), newReply]
            };
          }
          return comment;
        });
        return {
          ...post,
          comments: updatedComments
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home posts={posts} />} />
            <Route 
              path="/post/:id" 
              element={
                <PostDetail 
                  posts={posts} 
                  addComment={addComment} 
                  addReplyToComment={addReplyToComment}
                />
              } 
            />
            <Route 
              path="/new-post" 
              element={<NewPost addPost={addPost} />} 
            />
            <Route 
              path="/about" 
              element={<About />} 
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;