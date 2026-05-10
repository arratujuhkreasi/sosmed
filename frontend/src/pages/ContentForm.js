import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { contentService } from '../services/contentService';
import { toast } from 'react-toastify';
import '../styles/Content.css';

const ContentForm = () => {
  const [formData, setFormData] = useState({
    judul: '',
    deskripsi: '',
    tag: '',
    niche: '',
    hook: '',
    duration: '',
    status: 'draft',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const contentData = {
        ...formData,
        tag: formData.tag.split(',').map(t => t.trim()).filter(t => t),
        duration: formData.duration ? parseInt(formData.duration) : undefined,
      };

      await contentService.createContent(contentData);
      toast.success('Content created successfully!');
      navigate('/content');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create content');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Create New Content</h1>
      </div>

      <form onSubmit={handleSubmit} className="content-form">
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            placeholder="Enter content title"
            required
          />
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            placeholder="Describe your content"
            rows="5"
            required
          />
        </div>

        <div className="form-group">
          <label>Tags * (comma separated)</label>
          <input
            type="text"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            placeholder="horror, scary, ghost, haunted"
            required
          />
        </div>

        <div className="form-group">
          <label>Niche</label>
          <input
            type="text"
            name="niche"
            value={formData.niche}
            onChange={handleChange}
            placeholder="e.g., Japanese Horror, Urban Legends"
          />
        </div>

        <div className="form-group">
          <label>Hook</label>
          <textarea
            name="hook"
            value={formData.hook}
            onChange={handleChange}
            placeholder="Write a compelling hook for your content"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Duration (seconds)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="30-120 seconds"
            min="30"
            max="120"
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Creating...' : 'Create Content'}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate('/content')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContentForm;
