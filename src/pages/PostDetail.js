// PostDetail.js - Página para ver un post individual y sus comentarios
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './PostDetail.css';

function PostDetail({ posts, addComment }) {
  const { id } = useParams(); // Obtener el ID del post de la URL
  const navigate = useNavigate();
  
  // Buscar el post por ID
  const post = posts.find(p => p.id === parseInt(id));
  
  // Estado para el formulario de comentarios
  const [commentData, setCommentData] = useState({
    author: '',
    text: ''
  });
  
  // Si el post no existe, mostrar mensaje y opción para volver
  if (!post) {
    return (
      <div className="post-not-found">
        <h2>Post no encontrado</h2>
        <p>El post que estás buscando no existe o ha sido eliminado.</p>
        <button onClick={() => navigate('/')} className="back-button">
          Volver al inicio
        </button>
      </div>
    );
  }
  
  // Manejar cambios en el formulario de comentarios
  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setCommentData({
      ...commentData,
      [name]: value
    });
  };
  
  // Manejar envío del formulario de comentarios
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    
    // Validar que se han completado los campos
    if (!commentData.author.trim() || !commentData.text.trim()) {
      alert('Por favor completa todos los campos');
      return;
    }
    
    // Añadir el comentario
    addComment(post.id, commentData);
    
    // Limpiar el formulario
    setCommentData({
      author: '',
      text: ''
    });
  };
  
  return (
    <div className="post-detail">
      <div className="post-header">
        <span className="post-category">{post.category}</span>
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span>Por: {post.author}</span>
          <span>Fecha: {post.date}</span>
        </div>
      </div>
      
      <div className="post-content">
        <p>{post.content}</p>
      </div>
      
      <div className="comments-section">
        <h3>Comentarios ({post.comments.length})</h3>
        
        {post.comments.length === 0 ? (
          <p className="no-comments">No hay comentarios aún. ¡Sé el primero en comentar!</p>
        ) : (
          <div className="comments-list">
            {post.comments.map(comment => (
              <div className="comment" key={comment.id}>
                <div className="comment-header">
                  <span className="comment-author">{comment.author}</span>
                  <span className="comment-date">{comment.date}</span>
                </div>
                <p className="comment-text">{comment.text}</p>
              </div>
            ))}
          </div>
        )}
        
        <div className="add-comment">
          <h4>Añadir un comentario</h4>
          <form onSubmit={handleCommentSubmit}>
            <div className="form-group">
              <label htmlFor="author">Tu nombre:</label>
              <input
                type="text"
                id="author"
                name="author"
                value={commentData.author}
                onChange={handleCommentChange}
                placeholder="Ej. Juan Pérez"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="text">Tu comentario:</label>
              <textarea
                id="text"
                name="text"
                value={commentData.text}
                onChange={handleCommentChange}
                placeholder="Escribe tu comentario aquí..."
                rows="4"
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-comment">
              Publicar comentario
            </button>
          </form>
        </div>
      </div>
      
      <div className="post-actions">
        <Link to="/" className="back-link">
          ← Volver a la lista de posts
        </Link>
      </div>
    </div>
  );
}

export default PostDetail;