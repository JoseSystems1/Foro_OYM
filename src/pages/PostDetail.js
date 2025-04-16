// PostDetail.js - Componente para ver un post y sus comentarios
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './PostDetail.css';

function PostDetail({ posts, addComment, addReplyToComment }) {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState({ text: '', author: '' });
  const [replyingTo, setReplyingTo] = useState(null); // Guardar el comentario al que se responde

  useEffect(() => {
    // Encontrar el post correspondiente al ID de la URL
    const currentPost = posts.find(p => p.id === parseInt(id));
    setPost(currentPost);
  }, [id, posts]);

  if (!post) {
    return <div className="loading">Cargando...</div>;
  }

  // Manejar el envío de un comentario o respuesta
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (comment.text.trim() === '' || comment.author.trim() === '') {
      alert('Por favor completa todos los campos');
      return;
    }

    // Si estamos respondiendo a un comentario específico
    if (replyingTo) {
      addReplyToComment(post.id, replyingTo.id, comment);
      setComment({ text: '', author: '' });
      setReplyingTo(null);
    } else {
      // Comentario normal al post
      addComment(post.id, comment);
      setComment({ text: '', author: '' });
    }
  };

  // Iniciar respuesta a un comentario
  const handleReply = (commentToReply) => {
    setReplyingTo(commentToReply);
    // Hacer scroll al formulario de comentario
    document.getElementById('comment-form').scrollIntoView({ behavior: 'smooth' });
  };

  // Cancelar respuesta
  const handleCancelReply = () => {
    setReplyingTo(null);
  };

  return (
    <div className="post-detail">
      <div className="post-header">
        <span className="post-category">{post.category}</span>
        <h1>{post.title}</h1>
        <div className="post-meta">
          Por: {post.author} | Fecha: {post.date}
        </div>
      </div>
      
      <div className="post-content">
        <p>{post.content}</p>
      </div>
      
      <div className="comments-section">
        <h2>Comentarios ({post.comments.length})</h2>
        
        {post.comments.map(comment => (
          <div className="comment" key={comment.id}>
            <div className="comment-header">
              <strong>{comment.author}</strong> <span className="comment-date">{comment.date}</span>
            </div>
            <p>{comment.text}</p>
            <button 
              className="reply-button" 
              onClick={() => handleReply(comment)}
            >
              Responder
            </button>
            
            {/* Mostrar respuestas si existen */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="comment-replies">
                {comment.replies.map(reply => (
                  <div className="reply" key={reply.id}>
                    <div className="reply-header">
                      <strong>{reply.author}</strong> <span className="reply-date">{reply.date}</span>
                    </div>
                    <p>{reply.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="add-comment">
        <h3 id="comment-form">
          {replyingTo 
            ? `Responder a ${replyingTo.author}` 
            : 'Añadir un comentario'}
        </h3>
        
        {replyingTo && (
          <div className="replying-to">
            <p>
              <em>Respondiendo a: "{replyingTo.text}"</em>
              <button 
                className="cancel-reply" 
                onClick={handleCancelReply}
              >
                Cancelar
              </button>
            </p>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tu nombre:</label>
            <input
              type="text"
              placeholder="Ej: Juan Pérez"
              value={comment.author}
              onChange={(e) => setComment({...comment, author: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Tu comentario:</label>
            <textarea
              placeholder="Escribe tu comentario aquí..."
              value={comment.text}
              onChange={(e) => setComment({...comment, text: e.target.value})}
              required
              rows="4"
            ></textarea>
          </div>
          
          <button type="submit" className="publish-button">
            {replyingTo ? 'Publicar respuesta' : 'Publicar comentario'}
          </button>
        </form>
      </div>
      
      <div className="back-link">
        <Link to="/">← Volver a la lista de posts</Link>
      </div>
    </div>
  );
}

export default PostDetail;