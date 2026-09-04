import React, { useState, useEffect, useMemo } from 'react';
import { adminData } from '../utils/adminData'; // Assuming named export or fallback

// Helper for formatting dates
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
};

// Icons
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const categories = ['All', 'Education Tips', 'Exam Guides', 'Results', 'Events', 'Announcements'];

const BlogPage = () => {
  const [posts, setPosts] = useState(() => adminData.getData('blogPosts') || []);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState(null);

  // Fetch posts and sync with live database
  useEffect(() => {
    const initial = adminData.getData('blogPosts') || [];
    setPosts(initial);

    const unsub = adminData.subscribe('blogPosts', (fresh) => {
      if (Array.isArray(fresh)) {
        setPosts(fresh);
      }
    });

    adminData.fetchKeyFromServer('blogPosts').then(fresh => {
      if (Array.isArray(fresh) && fresh.length > 0) {
        setPosts(fresh);
      }
    });

    return unsub;
  }, []);

  // Filter posts based on search, category and published status
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (post.status && post.status === 'draft') return false;

      const matchesSearch = 
        (post.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
        (post.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, activeCategory]);

  // Related posts (same category, excluding current)
  const getRelatedPosts = (currentPost) => {
    return posts
      .filter((p) => p.category === currentPost.category && p.slug !== currentPost.slug)
      .slice(0, 3);
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
        {/* Post Hero */}
        <div className="relative w-full h-[40vh] md:h-[50vh] bg-[#0E2146] overflow-hidden">
          {selectedPost.featuredImage ? (
            <img 
              src={selectedPost.featuredImage} 
              alt={selectedPost.title}
              className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0E2146] to-[#1a3a6e]"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
          
          <div className="absolute inset-0 flex flex-col justify-end max-w-4xl mx-auto px-6 pb-12">
            <button 
              onClick={() => setSelectedPost(null)}
              className="group flex items-center space-x-2 text-white/80 hover:text-white mb-6 w-fit transition-colors"
            >
              <ArrowLeftIcon />
              <span>Back to Blog</span>
            </button>
            
            <div className="mb-4">
              <span className="px-3 py-1 bg-amber-500/90 text-white text-sm font-semibold rounded-full shadow-sm backdrop-blur-sm">
                {selectedPost.category}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {selectedPost.title}
            </h1>
            
            <div className="flex flex-wrap items-center text-slate-300 space-x-4 md:space-x-6 text-sm md:text-base">
              <div className="flex items-center space-x-2">
                {selectedPost.authorAvatar ? (
                  <img src={selectedPost.authorAvatar} alt={selectedPost.author} className="w-8 h-8 rounded-full border border-white/20" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                    <span className="text-xs text-white">{selectedPost.author?.charAt(0) || 'A'}</span>
                  </div>
                )}
                <span>{selectedPost.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <CalendarIcon />
                <span>{formatDate(selectedPost.publishedAt)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <ClockIcon />
                <span>{selectedPost.readTimeMinutes} min read</span>
              </div>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 md:p-12 -mt-20 relative z-10">
            <div 
              className="prose prose-slate prose-lg md:prose-xl max-w-none prose-headings:text-[#0E2146] prose-a:text-amber-600 hover:prose-a:text-amber-700"
              dangerouslySetInnerHTML={{ __html: selectedPost.content }}
            />
            
            {/* Tags */}
            {selectedPost.tags && selectedPost.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap gap-2">
                <span className="text-slate-500 font-medium mr-2 self-center">Tags:</span>
                {selectedPost.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Posts */}
        {getRelatedPosts(selectedPost).length > 0 && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <h3 className="text-2xl font-bold text-[#0E2146] mb-8">Related Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getRelatedPosts(selectedPost).map(post => (
                <div 
                  key={post.slug}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setSelectedPost(post);
                  }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100 group"
                >
                  <div className="h-48 overflow-hidden relative">
                    {post.featuredImage ? (
                      <img 
                        src={post.featuredImage} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#0E2146] to-[#1a3a6e]"></div>
                    )}
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-lg text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2 mb-2">
                      {post.title}
                    </h4>
                    <p className="text-slate-500 text-sm">{formatDate(post.publishedAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#0E2146] to-[#1a3a6e] pt-32 pb-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Our Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Insights</span>
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            Stay updated with the latest education tips, exam guides, and announcements from Noble Education.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-4 pl-12 pr-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white/20 backdrop-blur-md transition-all shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 -mt-8 relative z-20">
        {/* Filter Tabs */}
        <div className="flex flex-nowrap overflow-x-auto pb-4 mb-8 gap-2 md:gap-4 scrollbar-hide snap-x">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`snap-start whitespace-nowrap px-6 py-3 rounded-full text-sm font-semibold transition-all shadow-sm ${
                activeCategory === cat
                  ? 'bg-amber-500 text-white shadow-amber-500/30'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 animate-pulse">
                <div className="w-full h-52 bg-slate-200 rounded-2xl mb-6"></div>
                <div className="w-24 h-6 bg-slate-200 rounded-full mb-4"></div>
                <div className="w-full h-6 bg-slate-200 rounded mb-2"></div>
                <div className="w-3/4 h-6 bg-slate-200 rounded mb-4"></div>
                <div className="w-full h-16 bg-slate-200 rounded mb-6"></div>
                <div className="flex justify-between items-center">
                  <div className="w-20 h-4 bg-slate-200 rounded"></div>
                  <div className="w-24 h-8 bg-slate-200 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div 
                key={post.slug}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-200/40 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 border border-slate-100 h-full"
              >
                {/* Card Image */}
                <div className="relative h-56 overflow-hidden">
                  {post.featuredImage ? (
                    <img 
                      src={post.featuredImage} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#0E2146] to-[#1a3a6e]"></div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#0E2146] text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm">
                      {post.category}
                    </span>
                  </div>
                  {post.status && (
                    <div className="absolute top-4 right-4">
                      <span className={`px-2 py-1 text-xs font-bold rounded-md text-white shadow-sm backdrop-blur-md ${
                        post.status === 'published' ? 'bg-green-500/90' : 'bg-yellow-500/90'
                      }`}>
                        {post.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="flex flex-col flex-grow p-6 md:p-8">
                  <div className="flex items-center text-slate-500 text-xs font-medium space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      <CalendarIcon />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ClockIcon />
                      <span>{post.readTimeMinutes} min read</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#0E2146] mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-6 line-clamp-2 text-sm leading-relaxed flex-grow">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                    <div className="flex items-center space-x-2">
                      {post.authorAvatar ? (
                        <img src={post.authorAvatar} alt={post.author} className="w-8 h-8 rounded-full" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                          <span className="text-xs text-slate-500 font-bold">{post.author?.charAt(0) || 'A'}</span>
                        </div>
                      )}
                      <span className="text-sm font-semibold text-slate-700">{post.author}</span>
                    </div>
                    <button 
                      onClick={() => setSelectedPost(post)}
                      className="text-amber-600 text-sm font-bold hover:text-amber-700 transition-colors flex items-center"
                    >
                      Read More
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 px-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-6">
              <SearchIcon />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No posts found</h3>
            <p className="text-slate-500 max-w-md mx-auto mb-6">
              {posts.length === 0 
                ? "We haven't published any blog posts yet. Please check back later!" 
                : "We couldn't find any articles matching your search criteria. Try adjusting your filters."}
            </p>
            {posts.length > 0 && (
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                className="px-6 py-2 bg-[#0E2146] text-white rounded-xl hover:bg-[#1a3a6e] transition-colors font-medium shadow-md shadow-[#0E2146]/20"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
