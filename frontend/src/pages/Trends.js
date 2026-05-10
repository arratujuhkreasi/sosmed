import React, { useState, useEffect } from 'react';
import { trendService } from '../services/trendService';
import { toast } from 'react-toastify';
import '../styles/Trends.css';

const Trends = () => {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ['horror', 'creepypasta', 'urban-legend', 'paranormal', 'true-crime'];

  useEffect(() => {
    fetchTrends();
  }, [selectedCategory]);

  const fetchTrends = async () => {
    setLoading(true);
    try {
      const data = await trendService.getTrends(selectedCategory, 20);
      setTrends(data);
    } catch (error) {
      toast.error('Failed to fetch trends');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchKeyword.trim()) {
      fetchTrends();
      return;
    }

    setLoading(true);
    try {
      const data = await trendService.searchTrends(searchKeyword);
      setTrends(data);
    } catch (error) {
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchKeyword('');
  };

  if (loading) {
    return <div className="loading">Loading trends...</div>;
  }

  return (
    <div className="trends-container">
      <div className="trends-header">
        <h1>Horror Content Trends</h1>
        <p>Discover what's trending in horror content</p>
      </div>

      <div className="trends-filters">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search trends by keyword..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <button type="submit" className="btn-primary">Search</button>
        </form>

        <div className="category-filters">
          <button
            className={`category-btn ${selectedCategory === '' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('')}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="trends-grid">
        {trends.length > 0 ? (
          trends.map((trend) => (
            <div key={trend._id} className="trend-card">
              <div className="trend-header">
                <h3>{trend.topic}</h3>
                <span className="trend-score">{trend.trendingScore}</span>
              </div>
              <div className="trend-body">
                <span className="trend-category">{trend.category}</span>
                <p className="trend-popularity">Popularity: {trend.popularity}</p>
                <div className="trend-keywords">
                  {trend.keywords.map((keyword, idx) => (
                    <span key={idx} className="keyword-tag">{keyword}</span>
                  ))}
                </div>
                {trend.source && (
                  <p className="trend-source">Source: {trend.source}</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No trends found. Try a different search or category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trends;
