import React, { useState, useEffect } from 'react';
import { contentService } from '../services/contentService';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/Content.css';

const ContentList = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    setLoading(true);
    try {
      const data = await contentService.getContents();
      setContents(data);
    } catch (error) {
      toast.error('Failed to fetch contents');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      try {
        await contentService.deleteContent(id);
        toast.success('Content deleted successfully');
        fetchContents();
      } catch (error) {
        toast.error('Failed to delete content');
      }
    }
  };

  const filteredContents = contents.filter((content) => {
    if (filter === 'all') return true;
    return content.status === filter;
  });

  if (loading) {
    return <div className="loading">Loading contents...</div>;
  }

  return (
    <div className="content-container">
      <div className="content-header">
        <h1>My Content</h1>
        <Link to="/content/new" className="btn-primary">Create New Content</Link>
      </div>

      <div className="content-filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({contents.length})
        </button>
        <button
          className={`filter-btn ${filter === 'published' ? 'active' : ''}`}
          onClick={() => setFilter('published')}
        >
          Published ({contents.filter(c => c.status === 'published').length})
        </button>
        <button
          className={`filter-btn ${filter === 'draft' ? 'active' : ''}`}
          onClick={() => setFilter('draft')}
        >
          Drafts ({contents.filter(c => c.status === 'draft').length})
        </button>
        <button
          className={`filter-btn ${filter === 'archived' ? 'active' : ''}`}
          onClick={() => setFilter('archived')}
        >
          Archived ({contents.filter(c => c.status === 'archived').length})
        </button>
      </div>

      <div className="content-grid">
        {filteredContents.length > 0 ? (
          filteredContents.map((content) => (
            <div key={content._id} className="content-card">
              <div className="content-card-header">
                <h3>{content.judul}</h3>
                <span className={`status-badge ${content.status}`}>{content.status}</span>
              </div>
              <div className="content-card-body">
                <p>{content.deskripsi.substring(0, 150)}...</p>
                {content.niche && (
                  <p className="content-niche"><strong>Niche:</strong> {content.niche}</p>
                )}
                {content.hook && (
                  <p className="content-hook"><strong>Hook:</strong> {content.hook}</p>
                )}
                {content.duration && (
                  <p className="content-duration"><strong>Duration:</strong> {content.duration}s</p>
                )}
                <div className="content-tags">
                  {content.tag.map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="content-card-footer">
                <Link to={`/content/${content._id}`} className="btn-secondary">View</Link>
                <Link to={`/content/edit/${content._id}`} className="btn-secondary">Edit</Link>
                <button onClick={() => handleDelete(content._id)} className="btn-danger">
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-content">
            <p>No content found. <Link to="/content/new">Create your first content</Link></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentList;
