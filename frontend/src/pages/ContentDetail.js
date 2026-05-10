import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { contentService } from '../services/contentService';
import { performaService } from '../services/performaService';
import { toast } from 'react-toastify';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/ContentDetail.css';

const ContentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [performance, setPerformance] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddPerformance, setShowAddPerformance] = useState(false);
  const [performanceData, setPerformanceData] = useState({
    views: '',
    likes: '',
    comments: '',
    shares: '',
    watchTime: '',
  });

  useEffect(() => {
    fetchContentDetail();
  }, [id]);

  const fetchContentDetail = async () => {
    setLoading(true);
    try {
      const [contentData, performanceData] = await Promise.all([
        contentService.getContentById(id),
        performaService.getPerformanceByContent(id),
      ]);

      setContent(contentData);
      setPerformance(performanceData);

      if (performanceData.length > 0) {
        const analyticsData = await performaService.getPerformanceAnalytics(id);
        setAnalytics(analyticsData);
      }
    } catch (error) {
      toast.error('Failed to fetch content details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      try {
        await contentService.deleteContent(id);
        toast.success('Content deleted successfully');
        navigate('/content');
      } catch (error) {
        toast.error('Failed to delete content');
      }
    }
  };

  const handleAddPerformance = async (e) => {
    e.preventDefault();
    try {
      await performaService.createPerformance({
        contentId: id,
        views: parseInt(performanceData.views),
        likes: parseInt(performanceData.likes),
        comments: parseInt(performanceData.comments),
        shares: parseInt(performanceData.shares),
        watchTime: parseInt(performanceData.watchTime),
      });
      toast.success('Performance data added successfully');
      setShowAddPerformance(false);
      setPerformanceData({
        views: '',
        likes: '',
        comments: '',
        shares: '',
        watchTime: '',
      });
      fetchContentDetail();
    } catch (error) {
      toast.error('Failed to add performance data');
    }
  };

  const handlePerformanceChange = (e) => {
    setPerformanceData({ ...performanceData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <div className="loading">Loading content details...</div>;
  }

  if (!content) {
    return <div className="error">Content not found</div>;
  }

  const chartData = performance.map((p) => ({
    date: new Date(p.recordedAt).toLocaleDateString(),
    views: p.views,
    likes: p.likes,
    comments: p.comments,
    engagement: p.engagementRate,
  }));

  return (
    <div className="content-detail-container">
      <div className="detail-header">
        <div className="header-left">
          <Link to="/content" className="back-link">← Back to Content</Link>
          <h1>{content.judul}</h1>
          <span className={`status-badge ${content.status}`}>{content.status}</span>
        </div>
        <div className="header-actions">
          <Link to={`/content/edit/${content._id}`} className="btn-secondary">
            Edit
          </Link>
          <button onClick={handleDelete} className="btn-danger">
            Delete
          </button>
        </div>
      </div>

      <div className="detail-content">
        <div className="content-info-section">
          <div className="info-card">
            <h2>Content Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Description</span>
                <p className="info-value">{content.deskripsi}</p>
              </div>

              {content.niche && (
                <div className="info-item">
                  <span className="info-label">Niche</span>
                  <p className="info-value">{content.niche}</p>
                </div>
              )}

              {content.hook && (
                <div className="info-item">
                  <span className="info-label">Hook</span>
                  <p className="info-value hook-text">{content.hook}</p>
                </div>
              )}

              {content.duration && (
                <div className="info-item">
                  <span className="info-label">Duration</span>
                  <p className="info-value">{content.duration} seconds</p>
                </div>
              )}

              <div className="info-item">
                <span className="info-label">Tags</span>
                <div className="tags-list">
                  {content.tag.map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="info-item">
                <span className="info-label">Created</span>
                <p className="info-value">{new Date(content.createdAt).toLocaleDateString()}</p>
              </div>

              <div className="info-item">
                <span className="info-label">Last Updated</span>
                <p className="info-value">{new Date(content.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="performance-section">
          <div className="section-header">
            <h2>Performance Analytics</h2>
            <button
              className="btn-primary"
              onClick={() => setShowAddPerformance(!showAddPerformance)}
            >
              {showAddPerformance ? 'Cancel' : 'Add Performance Data'}
            </button>
          </div>

          {showAddPerformance && (
            <div className="add-performance-form">
              <form onSubmit={handleAddPerformance}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Views</label>
                    <input
                      type="number"
                      name="views"
                      value={performanceData.views}
                      onChange={handlePerformanceChange}
                      required
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label>Likes</label>
                    <input
                      type="number"
                      name="likes"
                      value={performanceData.likes}
                      onChange={handlePerformanceChange}
                      required
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label>Comments</label>
                    <input
                      type="number"
                      name="comments"
                      value={performanceData.comments}
                      onChange={handlePerformanceChange}
                      required
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label>Shares</label>
                    <input
                      type="number"
                      name="shares"
                      value={performanceData.shares}
                      onChange={handlePerformanceChange}
                      required
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label>Watch Time (seconds)</label>
                    <input
                      type="number"
                      name="watchTime"
                      value={performanceData.watchTime}
                      onChange={handlePerformanceChange}
                      required
                      min="0"
                    />
                  </div>
                </div>
                <button type="submit" className="btn-primary">
                  Save Performance Data
                </button>
              </form>
            </div>
          )}

          {analytics && (
            <div className="analytics-summary">
              <div className="summary-card">
                <span className="summary-label">Total Views</span>
                <span className="summary-value">{analytics.totalViews.toLocaleString()}</span>
              </div>
              <div className="summary-card">
                <span className="summary-label">Avg Engagement Rate</span>
                <span className="summary-value">{analytics.averageEngagementRate}%</span>
              </div>
              <div className="summary-card">
                <span className="summary-label">Total Records</span>
                <span className="summary-value">{analytics.totalRecords}</span>
              </div>
              <div className="summary-card">
                <span className="summary-label">Latest Views</span>
                <span className="summary-value">
                  {analytics.latestPerformance.views.toLocaleString()}
                </span>
              </div>
            </div>
          )}

          {chartData.length > 0 ? (
            <div className="chart-container">
              <h3>Performance Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="date" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="views" stroke="#ff4500" strokeWidth={2} />
                  <Line type="monotone" dataKey="likes" stroke="#28a745" strokeWidth={2} />
                  <Line type="monotone" dataKey="comments" stroke="#ffc107" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="no-data">
              <p>No performance data yet. Add your first performance record!</p>
            </div>
          )}

          {performance.length > 0 && (
            <div className="performance-history">
              <h3>Performance History</h3>
              <div className="history-table">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Views</th>
                      <th>Likes</th>
                      <th>Comments</th>
                      <th>Shares</th>
                      <th>Engagement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {performance.map((p) => (
                      <tr key={p._id}>
                        <td>{new Date(p.recordedAt).toLocaleDateString()}</td>
                        <td>{p.views.toLocaleString()}</td>
                        <td>{p.likes.toLocaleString()}</td>
                        <td>{p.comments.toLocaleString()}</td>
                        <td>{p.shares.toLocaleString()}</td>
                        <td>{p.engagementRate.toFixed(2)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentDetail;
