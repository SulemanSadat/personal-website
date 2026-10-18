"use client";
import React, { useState } from 'react';
import Image from "next/image";
import toast from 'react-hot-toast';

interface Article {
  id: number; title: string; description: string; date: string; readTime: string;
  category: string; categoryColor: string; categoryBg: string; image: string; featured: boolean;
}

function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedArticles, setLikedArticles] = useState<number[]>([]);
  const [failedImages, setFailedImages] = useState<number[]>([]);

  const categories = [
    { id: 'all', label: 'All Posts', count: 6 },
    { id: 'programming', label: 'Programming', count: 2 },
    { id: 'ai-ml', label: 'AI & ML', count: 1 },
    { id: 'design', label: 'Design', count: 1 },
    { id: 'cloud', label: 'Cloud', count: 1 },
    { id: 'writing', label: 'Writing', count: 1 }
  ];

  const articles: Article[] = [
    {
      id: 1,
      title: 'Building Scalable Web Applications with Modern JavaScript',
      description: 'Explore the latest techniques and best practices for creating robust, scalable web applications using modern JavaScript frameworks and tools.',
      date: 'January 15, 2024',
      readTime: '8 min read',
      category: 'programming',
      categoryColor: '#A358FF',
      categoryBg: 'rgba(163, 88, 255, 0.20)',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/7b5e35e3ca21be16056c82bf19833a3c4eef13c5?width=266',
      featured: true
    },
    {
      id: 2,
      title: 'The Future of AI in Software Development',
      description: 'How artificial intelligence is revolutionizing the way we write, test, and deploy code in the modern development landscape.',
      date: 'January 12, 2024',
      readTime: '6 min read',
      category: 'ai-ml',
      categoryColor: '#2B9E44',
      categoryBg: 'rgba(43, 158, 68, 0.20)',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/872f6a04c45694b4134a9af48dd62d36c2d9e3f9?width=1118',
      featured: false
    },
    {
      id: 3,
      title: 'Mastering React Performance Optimization',
      description: 'Deep dive into advanced React optimization techniques that will make your applications faster and more efficient.',
      date: 'January 10, 2024',
      readTime: '12 min read',
      category: 'programming',
      categoryColor: '#A358FF',
      categoryBg: 'rgba(163, 88, 255, 0.20)',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/ba291b66d445548d677d5f42ad297ff324cc366a?width=266',
      featured: true
    },

  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const handleComingSoon = () => toast('Coming Soon!', { duration: 1800 });
  const shareArticle = async (article: Article): Promise<void> => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#article-${article.id}`);
      toast.success('Article link copied.');
    } catch { toast('Copy the page address from your browser to share this article.'); }
  };
  return (
    <div className="blog-page">
      <div className="blog-container">
        <div className="blog-header">
          <span className="section-eyebrow">Notes on engineering & building products</span>
          <h1 className="blog-title section-heading">Software Engineering &amp; AI Articles</h1>
          <p className="blog-subtitle">
            Notes on full-stack development, React performance, AI automation and lessons learned while building digital products.
          </p>
        </div>

        <div className="blog-filters">
          <div className="category-filters" role="group" aria-label="Filter articles">
            {categories.map(category => (
              <button
                key={category.id}
                type="button"
                aria-pressed={selectedCategory === category.id}
                className={`category-filter ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-label">{category.label}</span>
                <span className="category-count">({articles.filter(article => category.id === 'all' || article.category === category.id).length})</span>
              </button>
            ))}
          </div>

          <div className="search-container">
            <input
              type="search"
              aria-label="Search articles"
              placeholder="Search articles..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5 17.5L12.5 12.5M14.1667 8.33333C14.1667 9.09938 14.0158 9.85792 13.7226 10.5657C13.4295 11.2734 12.9998 11.9164 12.4581 12.4581C11.9164 12.9998 11.2734 13.4295 10.5657 13.7226C9.85792 14.0158 9.09938 14.1667 8.33333 14.1667C7.56729 14.1667 6.80875 14.0158 6.10101 13.7226C5.39328 13.4295 4.75022 12.9998 4.20854 12.4581C3.66687 11.9164 3.23719 11.2734 2.94404 10.5657C2.65088 9.85792 2.5 9.09938 2.5 8.33333C2.5 6.78624 3.11458 5.30251 4.20854 4.20854C5.30251 3.11458 6.78624 2.5 8.33333 2.5C9.88043 2.5 11.3642 3.11458 12.4581 4.20854C13.5521 5.30251 14.1667 6.78624 14.1667 8.33333Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <p className="sr-only" role="status">{filteredArticles.length} articles shown</p>
        {filteredArticles.length === 0 && <div className="articles-empty"><h2>No articles found</h2><p>Try another search or explore all posts.</p><button type="button" className="button-secondary" onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}>Clear filters</button></div>}
        <div className="articles-grid">
          {filteredArticles.map(article => (
            <article key={article.id} className="article-card" id={`article-${article.id}`}>
              <div className="article-image-container">
                <div className="article-image">
                  <span className="article-art" aria-hidden="true">{article.category === 'ai-ml' ? 'AI' : '</>'}<small>ENGINEERING NOTES / 0{article.id}</small></span>
                  {!failedImages.includes(article.id) && <Image className="article-cover" src={article.image} alt={`${article.title} article cover`} loading="lazy" decoding="async" width={560} height={315} unoptimized onError={() => setFailedImages(previous => [...previous, article.id])} />}
                  <div className="article-badges">
                    {article.featured && (
                      <span className="badge badge-featured">Featured</span>
                    )}
                    <span 
                      className="badge badge-category" 
                    >
                      {article.category.charAt(0).toUpperCase() + article.category.slice(1).replace('-', ' & ')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="article-content">
                <div className="article-meta">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                <h2 className="article-title">{article.title}</h2>
                <p className="article-description">{article.description}</p>

                <div className="article-footer">
                  <button type="button" className="read-more-link" onClick={handleComingSoon} aria-label={`Read more: ${article.title}`}>Read More →</button>
                  <div className="article-actions">
                    <button type="button" className="action-button" aria-label={`Like article: ${article.title}`} aria-pressed={likedArticles.includes(article.id)} onClick={() => setLikedArticles(previous => previous.includes(article.id) ? previous.filter(id => id !== article.id) : [...previous, article.id])}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.87869 4.21219C2.60011 4.49076 2.37913 4.82148 2.22836 5.18546C2.0776 5.54944 2 5.93955 2 6.33352C2 6.72749 2.0776 7.1176 2.22836 7.48158C2.37913 7.84556 2.60011 8.17628 2.87869 8.45486L8.00003 13.5762L13.1214 8.45486C13.684 7.89224 14 7.12918 14 6.33352C14 5.53787 13.684 4.7748 13.1214 4.21219C12.5587 3.64958 11.7957 3.3335 11 3.3335C10.2044 3.3335 9.4413 3.64958 8.87869 4.21219L8.00003 5.09086L7.12136 4.21219C6.84278 3.93361 6.51206 3.71263 6.14808 3.56186C5.78411 3.41109 5.39399 3.3335 5.00003 3.3335C4.60606 3.3335 4.21595 3.41109 3.85197 3.56186C3.48799 3.71263 3.15727 3.93361 2.87869 4.21219Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button type="button" className="action-button" aria-label={`Share article: ${article.title}`} onClick={() => shareArticle(article)}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.78971 8.89491C5.92438 8.62557 6.00038 8.32157 6.00038 8.00024C6.00038 7.67891 5.92438 7.37491 5.78971 7.10557M5.78971 8.89491C5.58818 9.29783 5.25651 9.62092 4.84844 9.81181C4.44037 10.0027 3.9798 10.0502 3.54134 9.94671C3.10288 9.84317 2.71222 9.59463 2.43265 9.24135C2.15308 8.88808 2.00098 8.45076 2.00098 8.00024C2.00098 7.54972 2.15308 7.1124 2.43265 6.75913C2.71222 6.40585 3.10288 6.15731 3.54134 6.05377C3.9798 5.95024 4.44037 5.99777 4.84844 6.18866C5.25651 6.37956 5.58818 6.70265 5.78971 7.10557M5.78971 8.89491L10.211 11.1056M5.78971 7.10557L10.211 4.89491M10.211 11.1056C10.0936 11.3405 10.0235 11.5963 10.0048 11.8583C9.98621 12.1203 10.0194 12.3834 10.1024 12.6326C10.1855 12.8818 10.3168 13.1122 10.4889 13.3107C10.6609 13.5091 10.8704 13.6718 11.1054 13.7892C11.3403 13.9067 11.5961 13.9768 11.8581 13.9954C12.1201 14.0141 12.3832 13.9809 12.6324 13.8979C12.8816 13.8148 13.112 13.6835 13.3105 13.5114C13.5089 13.3393 13.6716 13.1298 13.789 12.8949C14.0263 12.4204 14.0654 11.8711 13.8977 11.3679C13.73 10.8646 13.3692 10.4485 12.8947 10.2112C12.4202 9.97396 11.8709 9.93488 11.3677 10.1026C10.8644 10.2703 10.4483 10.6311 10.211 11.1056ZM10.211 4.89491C10.3285 5.12984 10.4911 5.33933 10.6896 5.51142C10.888 5.68351 11.1185 5.81483 11.3677 5.89788C11.6169 5.98092 11.88 6.01407 12.142 5.99543C12.404 5.97679 12.6598 5.90673 12.8947 5.78924C13.1296 5.67175 13.3391 5.50914 13.5112 5.31069C13.6833 5.11223 13.8146 4.88183 13.8977 4.63263C13.9807 4.38343 14.0139 4.12031 13.9952 3.8583C13.9766 3.59628 13.9065 3.34051 13.789 3.10557C13.5518 2.6311 13.1357 2.27032 12.6324 2.1026C12.1291 1.93488 11.5798 1.97396 11.1054 2.21124C10.6309 2.44852 10.2701 2.86456 10.1024 3.36785C9.93469 3.87114 9.97376 4.42043 10.211 4.89491Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="newsletter-section">
          <h2 className="newsletter-title">Stay Updated</h2>
          <p className="newsletter-description">
            Get notified when I publish new articles about software development and technology
          </p>
          <form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); handleComingSoon(); }}>
            <input
              type="email"
              aria-label="Email for article updates"
              autoComplete="email"
              required
              placeholder="Enter your email"
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-button button-primary">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Blog;

