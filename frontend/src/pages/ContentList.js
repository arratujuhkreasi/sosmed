import React, { useState, useEffect } from 'react';
import { contentService } from '../services/contentService';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/Content.css';

const ContentList = () => {
  const [contents, setContents] = useState([]);
  const [filteredContents, setFilteredContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchContents();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [contents, filter, searchTerm, sortBy]);

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

  const applyFiltersAndSort = () => {
    let filtered = [...contents];

    // Apply status filter
    if (filter !== 'all') {
      filtered = filtered.filter((content) => content.status === filter);
    }

    // Apply search
    if (searchTerm.trim()) {
      filtered = filtered.filter((content) =>
        content.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.tag.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (content.niche && content.niche.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'title-asc':
        filtered.sort((a, b) => a.judul.localeCompare(b.judul));
        break;
      case 'title-desc':
        filtered.sort((a, b) => b.judul.localeCompare(a.judul));
        break;
      default:
        break;
    }

    setFilteredContents(filtered);
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

  const clearFilters = () => {
    setFilter('all');
    setSearchTerm('');
    setSortBy('newest');
  };

  if (loading) {
    return <div className="loading">Loading contents...</div>;
  }

  return (
    <div className="content-container">
      <div className="content-header">
        <h1>My Content</h1>
        <Link to="/content/new" className="btn-primary">Create New Content</Link>
      </div>

      <div className="content-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by title, description, tags, or niche..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm('')}>
              ✕
            </button>
          )}
        </div>

        <div className="filter-sort-row">
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

          <div className="sort-controls">
            <label>Sort by:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
            </select>
          </div>

          {(filter !== 'all' || searchTerm || sortBy !== 'newest') && (
            <button className="btn-clear-filters" onClick={clearFilters}>
              Clear Filters
            </button>
          )}
        </div>
      </div>

      <div className="results-info">
        <p>Showing {filteredContents.length} of {contents.length} content(s)</p>
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
                  <p className="content-hook"><strong>Hook:</strong> {content.hook.substring(0, 80)}...</p>
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
            {searchTerm || filter !== 'all' ? (
              <p>No content found matching your filters. <button onClick={clearFilters} className="link-button">Clear filters</button></p>
            ) : (
              <p>No content yet. <Link to="/content/new">Create your first content</Link></p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentList;
