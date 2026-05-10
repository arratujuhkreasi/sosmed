import React, { useState, useEffect } from 'react';
import { trendService } from '../services/trendService';
import { toast } from 'react-toastify';
import '../styles/NicheFinder.css';

const NicheFinder = () => {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNiche, setSelectedNiche] = useState(null);
  const [nicheAnalysis, setNicheAnalysis] = useState(null);

  const nicheCategories = [
    {
      id: 1,
      name: 'Japanese Horror',
      category: 'horror',
      description: 'Yurei, Onryo, dan cerita hantu Jepang',
      competition: 'Medium',
      potential: 'High',
      keywords: ['yurei', 'onryo', 'japanese ghost', 'j-horror', 'kaidan'],
      avgViews: '1.5M',
      trendScore: 85,
    },
    {
      id: 2,
      name: 'Indonesian Urban Legends',
      category: 'urban-legend',
      description: 'Legenda urban dan mitos lokal Indonesia',
      competition: 'Low',
      potential: 'Very High',
      keywords: ['legenda urban', 'mitos indonesia', 'cerita rakyat', 'misteri lokal'],
      avgViews: '2.1M',
      trendScore: 92,
    },
    {
      id: 3,
      name: 'True Crime Horror',
      category: 'true-crime',
      description: 'Kasus kriminal nyata dengan unsur horor',
      competition: 'High',
      potential: 'Very High',
      keywords: ['true crime', 'pembunuhan', 'kasus misteri', 'investigasi'],
      avgViews: '3.2M',
      trendScore: 95,
    },
    {
      id: 4,
      name: 'Paranormal Investigation',
      category: 'paranormal',
      description: 'Investigasi tempat-tempat berhantu',
      competition: 'Medium',
      potential: 'High',
      keywords: ['ghost hunting', 'paranormal', 'investigasi hantu', 'tempat angker'],
      avgViews: '1.8M',
      trendScore: 88,
    },
    {
      id: 5,
      name: 'Creepypasta Indonesia',
      category: 'creepypasta',
      description: 'Cerita horor internet dan creepypasta lokal',
      competition: 'Low',
      potential: 'High',
      keywords: ['creepypasta', 'cerita horor', 'internet horror', 'viral horror'],
      avgViews: '1.2M',
      trendScore: 78,
    },
    {
      id: 6,
      name: 'Hospital Horror Stories',
      category: 'horror',
      description: 'Cerita horor dari rumah sakit',
      competition: 'Low',
      potential: 'Medium',
      keywords: ['rumah sakit', 'hospital horror', 'medical horror', 'pengalaman seram'],
      avgViews: '950K',
      trendScore: 72,
    },
    {
      id: 7,
      name: 'School Horror',
      category: 'horror',
      description: 'Cerita horor di sekolah dan kampus',
      competition: 'Medium',
      potential: 'High',
      keywords: ['sekolah angker', 'kampus berhantu', 'school horror', 'hantu sekolah'],
      avgViews: '1.6M',
      trendScore: 82,
    },
    {
      id: 8,
      name: 'Forest & Nature Horror',
      category: 'horror',
      description: 'Horor di hutan dan alam liar',
      competition: 'Low',
      potential: 'Medium',
      keywords: ['hutan angker', 'misteri hutan', 'forest horror', 'alam gaib'],
      avgViews: '880K',
      trendScore: 68,
    },
    {
      id: 9,
      name: 'Haunted Objects',
      category: 'paranormal',
      description: 'Benda-benda berhantu dan terkutuk',
      competition: 'Low',
      potential: 'High',
      keywords: ['benda berhantu', 'cursed objects', 'haunted items', 'barang angker'],
      avgViews: '1.4M',
      trendScore: 80,
    },
    {
      id: 10,
      name: 'Cemetery & Graveyard',
      category: 'horror',
      description: 'Misteri kuburan dan pemakaman',
      competition: 'Medium',
      potential: 'Medium',
      keywords: ['kuburan angker', 'cemetery horror', 'graveyard', 'pemakaman'],
      avgViews: '1.1M',
      trendScore: 75,
    },
  ];

  useEffect(() => {
    fetchTrends();
  }, []);

  const fetchTrends = async () => {
    setLoading(false);
    try {
      const data = await trendService.getTrends('', 20);
      setTrends(data);
    } catch (error) {
      console.error('Failed to fetch trends:', error);
    } finally {
      setLoading(false);
    }
  };

  const analyzeNiche = (niche) => {
    setSelectedNiche(niche);
    
    const relatedTrends = trends.filter((trend) =>
      niche.keywords.some((keyword) =>
        trend.keywords.some((tk) => tk.toLowerCase().includes(keyword.toLowerCase()))
      )
    );

    const analysis = {
      competitionLevel: niche.competition,
      potentialReach: niche.potential,
      avgViews: niche.avgViews,
      trendScore: niche.trendScore,
      relatedTrends: relatedTrends.length,
      recommendedKeywords: niche.keywords,
      contentIdeas: generateContentIdeas(niche),
      tips: generateTips(niche),
    };

    setNicheAnalysis(analysis);
  };

  const generateContentIdeas = (niche) => {
    const ideas = {
      'Japanese Horror': [
        '5 Hantu Jepang Paling Menyeramkan',
        'Perbedaan Yurei dan Onryo',
        'Kisah Nyata Penampakan Hantu Jepang',
        'Ritual Jepang yang Tidak Boleh Dilakukan',
      ],
      'Indonesian Urban Legends': [
        'Legenda Urban Jakarta yang Jarang Diketahui',
        'Misteri Jembatan Ancol',
        'Cerita Rakyat yang Ternyata Nyata',
        'Urban Legend Paling Viral di Indonesia',
      ],
      'True Crime Horror': [
        'Kasus Pembunuhan yang Belum Terpecahkan',
        'Kisah Nyata Serial Killer Indonesia',
        'Investigasi Kasus Misteri',
        'True Crime yang Bikin Merinding',
      ],
    };

    return ideas[niche.name] || [
      `Top 5 ${niche.name} Stories`,
      `Pengalaman Nyata di ${niche.name}`,
      `Misteri ${niche.name} yang Belum Terpecahkan`,
      `Fakta Mengejutkan tentang ${niche.name}`,
    ];
  };

  const generateTips = (niche) => {
    return [
      `Fokus pada ${niche.keywords[0]} untuk SEO optimal`,
      `Buat konten 60-90 detik untuk engagement maksimal`,
      `Gunakan hook yang kuat di 3 detik pertama`,
      `Kombinasikan dengan trending topics untuk reach lebih luas`,
      `Upload konsisten 3-5x seminggu untuk growth optimal`,
    ];
  };

  const getCompetitionColor = (level) => {
    switch (level) {
      case 'Low':
        return '#28a745';
      case 'Medium':
        return '#ffc107';
      case 'High':
        return '#dc3545';
      default:
        return '#888';
    }
  };

  const getPotentialColor = (level) => {
    switch (level) {
      case 'Very High':
        return '#28a745';
      case 'High':
        return '#17a2b8';
      case 'Medium':
        return '#ffc107';
      default:
        return '#888';
    }
  };

  return (
    <div className="niche-finder-container">
      <div className="niche-header">
        <h1>Niche Finder Tool</h1>
        <p>Discover untapped niches and opportunities for your horror content</p>
      </div>

      <div className="niche-content">
        <div className="niches-grid">
          {nicheCategories.map((niche) => (
            <div
              key={niche.id}
              className={`niche-card ${selectedNiche?.id === niche.id ? 'selected' : ''}`}
              onClick={() => analyzeNiche(niche)}
            >
              <div className="niche-card-header">
                <h3>{niche.name}</h3>
                <span className="trend-score">{niche.trendScore}</span>
              </div>
              <p className="niche-description">{niche.description}</p>
              <div className="niche-metrics">
                <div className="metric">
                  <span className="metric-label">Competition</span>
                  <span
                    className="metric-value"
                    style={{ color: getCompetitionColor(niche.competition) }}
                  >
                    {niche.competition}
                  </span>
                </div>
                <div className="metric">
                  <span className="metric-label">Potential</span>
                  <span
                    className="metric-value"
                    style={{ color: getPotentialColor(niche.potential) }}
                  >
                    {niche.potential}
                  </span>
                </div>
                <div className="metric">
                  <span className="metric-label">Avg Views</span>
                  <span className="metric-value">{niche.avgViews}</span>
                </div>
              </div>
              <div className="niche-keywords">
                {niche.keywords.slice(0, 3).map((keyword, idx) => (
                  <span key={idx} className="keyword-tag">{keyword}</span>
                ))}
              </div>
              <button className="btn-analyze">Analyze Niche</button>
            </div>
          ))}
        </div>

        {nicheAnalysis && selectedNiche && (
          <div className="analysis-panel">
            <div className="analysis-header">
              <h2>Niche Analysis: {selectedNiche.name}</h2>
              <button className="btn-close" onClick={() => setNicheAnalysis(null)}>
                ✕
              </button>
            </div>

            <div className="analysis-content">
              <div className="analysis-section">
                <h3>Overview</h3>
                <div className="overview-grid">
                  <div className="overview-item">
                    <span className="overview-label">Competition Level</span>
                    <span
                      className="overview-value"
                      style={{ color: getCompetitionColor(nicheAnalysis.competitionLevel) }}
                    >
                      {nicheAnalysis.competitionLevel}
                    </span>
                  </div>
                  <div className="overview-item">
                    <span className="overview-label">Potential Reach</span>
                    <span
                      className="overview-value"
                      style={{ color: getPotentialColor(nicheAnalysis.potentialReach) }}
                    >
                      {nicheAnalysis.potentialReach}
                    </span>
                  </div>
                  <div className="overview-item">
                    <span className="overview-label">Average Views</span>
                    <span className="overview-value">{nicheAnalysis.avgViews}</span>
                  </div>
                  <div className="overview-item">
                    <span className="overview-label">Trend Score</span>
                    <span className="overview-value">{nicheAnalysis.trendScore}/100</span>
                  </div>
                </div>
              </div>

              <div className="analysis-section">
                <h3>Recommended Keywords</h3>
                <div className="keywords-list">
                  {nicheAnalysis.recommendedKeywords.map((keyword, idx) => (
                    <span key={idx} className="keyword-chip">{keyword}</span>
                  ))}
                </div>
              </div>

              <div className="analysis-section">
                <h3>Content Ideas</h3>
                <ul className="ideas-list">
                  {nicheAnalysis.contentIdeas.map((idea, idx) => (
                    <li key={idx}>{idea}</li>
                  ))}
                </ul>
              </div>

              <div className="analysis-section">
                <h3>Tips for Success</h3>
                <ul className="tips-list">
                  {nicheAnalysis.tips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NicheFinder;
