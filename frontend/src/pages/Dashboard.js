import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { contentService } from '../services/contentService';
import { trendService } from '../services/trendService';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [contents, setContents] = useState([]);
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalContents: 0,
    publishedContents: 0,
    draftContents: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [contentsData, trendsData] = await Promise.all([
        contentService.getContents(),
        trendService.getTrends('', 5),
      ]);

      setContents(contentsData.slice(0, 5));
      setTrends(trendsData);

      setStats({
        totalContents: contentsData.length,
        publishedContents: contentsData.filter((c) => c.status === 'published').length,
        draftContents: contentsData.filter((c) => c.status === 'draft').length,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name}!</h1>
        <p>Here's what's happening with your horror content</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Content</h3>
          <p className="stat-number">{stats.totalContents}</p>
        </div>
        <div className="stat-card">
          <h3>Published</h3>
          <p className="stat-number">{stats.publishedContents}</p>
        </div>
        <div className="stat-card">
          <h3>Drafts</h3>
          <p className="stat-number">{stats.draftContents}</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Content</h2>
            <Link to="/content" className="view-all">View All</Link>
          </div>
          {contents.length > 0 ? (
            <div className="content-list">
              {contents.map((content) => (
                <div key={content._id} className="content-item">
                  <h4>{content.judul}</h4>
                  <p>{content.deskripsi.substring(0, 100)}...</p>
                  <span className={`status ${content.status}`}>{content.status}</span>
                </div>
              ))}
            </div>
          ) : (
            <p>No content yet. <Link to="/content/new">Create your first content</Link></p>
          )}
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Trending Topics</h2>
            <Link to="/trends" className="view-all">View All</Link>
          </div>
          {trends.length > 0 ? (
            <div className="trends-list">
              {trends.map((trend) => (
                <div key={trend._id} className="trend-item">
                  <h4>{trend.topic}</h4>
                  <div className="trend-meta">
                    <span className="category">{trend.category}</span>
                    <span className="score">Score: {trend.trendingScore}</span>
                  </div>
                  <div className="keywords">
                    {trend.keywords.slice(0, 3).map((keyword, idx) => (
                      <span key={idx} className="keyword">{keyword}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No trends available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
