import React, { useState } from 'react';
import { toast } from 'react-toastify';
import '../styles/HookGenerator.css';

const HookGenerator = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [customHook, setCustomHook] = useState('');
  const [savedHooks, setSavedHooks] = useState([]);

  const hookExamples = [
    {
      id: 1,
      category: 'question',
      hook: 'Apa yang terjadi ketika seorang pria memasuki rumah yang ditinggalkan selama 50 tahun?',
      engagement: 'High',
      views: '1.2M',
    },
    {
      id: 2,
      category: 'shocking',
      hook: 'Saya tidak percaya apa yang saya temukan di basement rumah tua ini...',
      engagement: 'Very High',
      views: '2.5M',
    },
    {
      id: 3,
      category: 'mystery',
      hook: 'Misteri yang belum terpecahkan selama 30 tahun akhirnya terungkap',
      engagement: 'High',
      views: '980K',
    },
    {
      id: 4,
      category: 'warning',
      hook: 'Jangan pernah melakukan ini di kuburan pada tengah malam...',
      engagement: 'Very High',
      views: '3.1M',
    },
    {
      id: 5,
      category: 'personal',
      hook: 'Pengalaman paling menakutkan dalam hidup saya yang tidak akan pernah saya lupakan',
      engagement: 'High',
      views: '1.8M',
    },
    {
      id: 6,
      category: 'question',
      hook: 'Kenapa hantu selalu muncul di jam 3 pagi? Ini penjelasan ilmiahnya',
      engagement: 'Medium',
      views: '750K',
    },
    {
      id: 7,
      category: 'shocking',
      hook: 'Video CCTV ini merekam sesuatu yang tidak seharusnya ada...',
      engagement: 'Very High',
      views: '4.2M',
    },
    {
      id: 8,
      category: 'mystery',
      hook: 'Rahasia di balik hilangnya 7 orang di hutan ini akhirnya terbongkar',
      engagement: 'High',
      views: '1.5M',
    },
    {
      id: 9,
      category: 'warning',
      hook: 'Ini yang terjadi jika kamu menjawab telepon dari nomor tidak dikenal jam 12 malam',
      engagement: 'High',
      views: '2.1M',
    },
    {
      id: 10,
      category: 'personal',
      hook: 'Saya tinggal di rumah berhantu selama 1 tahun, ini yang saya alami',
      engagement: 'Very High',
      views: '3.8M',
    },
    {
      id: 11,
      category: 'question',
      hook: 'Apakah pocong benar-benar ada? Ini bukti yang mengejutkan',
      engagement: 'High',
      views: '1.9M',
    },
    {
      id: 12,
      category: 'shocking',
      hook: 'Detik-detik penampakan yang terekam kamera ini bikin merinding',
      engagement: 'Very High',
      views: '5.3M',
    },
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'question', label: 'Question' },
    { value: 'shocking', label: 'Shocking' },
    { value: 'mystery', label: 'Mystery' },
    { value: 'warning', label: 'Warning' },
    { value: 'personal', label: 'Personal Story' },
  ];

  const hookTemplates = [
    'Apa yang terjadi ketika [situasi menakutkan]?',
    'Jangan pernah [aksi] di [tempat] pada [waktu]...',
    'Saya tidak percaya apa yang saya [temukan/lihat/dengar] di [tempat]',
    'Misteri [subjek] yang belum terpecahkan selama [waktu]',
    'Ini yang terjadi jika kamu [aksi] di [tempat/waktu]',
    '[Jumlah] hal menakutkan tentang [subjek] yang tidak kamu ketahui',
    'Pengalaman [adjektif] saya di [tempat] yang tidak akan pernah saya lupakan',
    'Rahasia di balik [kejadian misterius] akhirnya terungkap',
  ];

  const filteredHooks = hookExamples.filter((hook) => {
    const matchesCategory = selectedCategory === 'all' || hook.category === selectedCategory;
    const matchesSearch = hook.hook.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSaveHook = (hook) => {
    if (!savedHooks.find((h) => h.id === hook.id)) {
      setSavedHooks([...savedHooks, hook]);
      toast.success('Hook saved to your collection!');
    } else {
      toast.info('Hook already in your collection');
    }
  };

  const handleRemoveSavedHook = (hookId) => {
    setSavedHooks(savedHooks.filter((h) => h.id !== hookId));
    toast.success('Hook removed from collection');
  };

  const handleCopyHook = (hookText) => {
    navigator.clipboard.writeText(hookText);
    toast.success('Hook copied to clipboard!');
  };

  const handleSaveCustomHook = () => {
    if (customHook.trim()) {
      const newHook = {
        id: Date.now(),
        category: 'custom',
        hook: customHook,
        engagement: 'N/A',
        views: 'N/A',
      };
      setSavedHooks([...savedHooks, newHook]);
      setCustomHook('');
      toast.success('Custom hook saved!');
    }
  };

  return (
    <div className="hook-generator-container">
      <div className="hook-header">
        <h1>Hook Generator & Examples</h1>
        <p>Discover and create compelling hooks for your horror content</p>
      </div>

      <div className="hook-content">
        <div className="main-section">
          <div className="search-filter-section">
            <input
              type="text"
              placeholder="Search hooks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <div className="category-filters">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  className={`category-btn ${selectedCategory === cat.value ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.value)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="hooks-grid">
            {filteredHooks.map((hook) => (
              <div key={hook.id} className="hook-card">
                <div className="hook-category-badge">{hook.category}</div>
                <p className="hook-text">{hook.hook}</p>
                <div className="hook-stats">
                  <span className="stat">
                    <strong>Engagement:</strong> {hook.engagement}
                  </span>
                  <span className="stat">
                    <strong>Views:</strong> {hook.views}
                  </span>
                </div>
                <div className="hook-actions">
                  <button
                    className="btn-icon"
                    onClick={() => handleCopyHook(hook.hook)}
                    title="Copy hook"
                  >
                    📋 Copy
                  </button>
                  <button
                    className="btn-icon"
                    onClick={() => handleSaveHook(hook)}
                    title="Save hook"
                  >
                    ⭐ Save
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sidebar-section">
          <div className="templates-card">
            <h3>Hook Templates</h3>
            <p className="templates-description">
              Use these templates to create your own hooks
            </p>
            <div className="templates-list">
              {hookTemplates.map((template, idx) => (
                <div key={idx} className="template-item">
                  <p>{template}</p>
                  <button
                    className="btn-copy-small"
                    onClick={() => handleCopyHook(template)}
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="custom-hook-card">
            <h3>Create Custom Hook</h3>
            <textarea
              placeholder="Write your own hook here..."
              value={customHook}
              onChange={(e) => setCustomHook(e.target.value)}
              rows="4"
            />
            <button className="btn-primary" onClick={handleSaveCustomHook}>
              Save Custom Hook
            </button>
          </div>

          {savedHooks.length > 0 && (
            <div className="saved-hooks-card">
              <h3>Saved Hooks ({savedHooks.length})</h3>
              <div className="saved-hooks-list">
                {savedHooks.map((hook) => (
                  <div key={hook.id} className="saved-hook-item">
                    <p>{hook.hook}</p>
                    <div className="saved-hook-actions">
                      <button
                        className="btn-icon-small"
                        onClick={() => handleCopyHook(hook.hook)}
                      >
                        📋
                      </button>
                      <button
                        className="btn-icon-small remove"
                        onClick={() => handleRemoveSavedHook(hook.id)}
                      >
                        ❌
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HookGenerator;
