// NewPost.js - Página para crear un nuevo post
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewPost.css';

function NewPost({ addPost }) {
  const navigate = useNavigate();
  
  // Definimos las categorías disponibles para los posts
  const categories = ['Sugerencias', 'Profesores', 'Calificaciones', 'Instalaciones', 'Eventos', 'Otros'];
  
  // Estado para el formulario
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    author: '',
    category: categories[0] // Valor por defecto
  });
  
  // Estado para indicar los errores de validación
  const [errors, setErrors] = useState({});
  
  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value
    });
    
    // Limpiar error del campo que se está editando
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  // Validar el formulario
  const validateForm = () => {
    const newErrors = {};
    
    if (!postData.title.trim()) {
      newErrors.title = 'El título es obligatorio';
    } else if (postData.title.length < 5) {
      newErrors.title = 'El título debe tener al menos 5 caracteres';
    }
    
    if (!postData.content.trim()) {
      newErrors.content = 'El contenido es obligatorio';
    } else if (postData.content.length < 10) {
      newErrors.content = 'El contenido debe tener al menos 10 caracteres';
    }
    
    if (!postData.author.trim()) {
      newErrors.author = 'El nombre del autor es obligatorio';
    }
    
    setErrors(newErrors);
    
    // Si no hay errores, el formulario es válido
    return Object.keys(newErrors).length === 0;
  };
  
  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar el formulario
    if (validateForm()) {
      // Añadir el post
      addPost(postData);
      
      // Redireccionar a la página principal
      navigate('/');
    }
  };
  
  return (
    <div className="new-post">
      <div className="page-header">
        <h1>Crear Nueva Publicación</h1>
        <p>Comparte tus ideas con la comunidad de la Universidad OyM</p>
      </div>
      
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label htmlFor="title">Título *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={postData.title}
            onChange={handleChange}
            placeholder="Escribe un título descriptivo"
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Categoría *</label>
          <select
            id="category"
            name="category"
            value={postData.category}
            onChange={handleChange}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Contenido *</label>
          <textarea
            id="content"
            name="content"
            value={postData.content}
            onChange={handleChange}
            placeholder="Detalla tu opinión, sugerencia o experiencia..."
            rows="8"
            className={errors.content ? 'error' : ''}
          ></textarea>
          {errors.content && <span className="error-text">{errors.content}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="author">Tu Nombre *</label>
          <input
            type="text"
            id="author"
            name="author"
            value={postData.author}
            onChange={handleChange}
            placeholder="¿Cómo te llamas?"
            className={errors.author ? 'error' : ''}
          />
          {errors.author && <span className="error-text">{errors.author}</span>}
        </div>
        
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={() => navigate('/')}>
            Cancelar
          </button>
          <button type="submit" className="submit-btn">
            Publicar
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewPost;