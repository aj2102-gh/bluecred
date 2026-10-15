import React, { useState, useEffect } from 'react';
import axios from 'axios';
import fallbackData from '../assets/marketplace-fallback.json';

export default function Marketplace() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        console.log('Fetching marketplace data from API...');
        
        let data;
        try {
          // Try to fetch from backend API
          const response = await axios.get('/api/marketplace', { timeout: 3000 });
          console.log('API response:', response.data);
          
          if (response.data && Array.isArray(response.data) && response.data.length > 0) {
            data = response.data;
          } else {
            throw new Error('API returned empty data');
          }
        } catch (apiErr) {
          console.warn('API request failed, trying fallback file:', apiErr);
          try {
            const fallbackResponse = await axios.get('/marketplace-fallback.json');
            data = fallbackResponse.data;
          } catch (staticErr) {
            console.warn('Public fallback fetch failed, using imported JSON:', staticErr);
            data = fallbackData;
          }
        }
        
        setProjects(data);
        setError(null);
      } catch (err) {
        console.error('All data loading attempts failed:', err);
        setError('Failed to load projects. Please try again later.');
        // Hardcoded fallback if everything else fails
        setProjects([
          {
            id: 1,
            title: "Pichavaram Mangrove Conservation",
            image: "https://via.placeholder.com/300x180",
            location: "Tamil Nadu, India",
            organization: "Pichavaram EcoRestoration Trust",
            rating: 4.8,
            reviews: 35,
            description: "Large-scale mangrove conservation project protecting the unique Pichavaram ecosystem in Tamil Nadu.",
            tags: ["Biodiversity Protection", "Community Benefits", "Blue Carbon Certified"],
            availableCredits: 2450,
            pricePerCredit: 28.50,
            vintage: "2024",
            verifiedDate: "2024-01-20",
            totalValue: 69825,
            type: "Mangrove Conservation",
            standard: "VCS"
          },
          {
            id: 2,
            title: "Andhra Pradesh Coastal Restoration",
            image: "https://via.placeholder.com/300x180",
            location: "Andhra Pradesh, India",
            organization: "Coastal Green Alliance",
            rating: 4.6,
            reviews: 21,
            description: "Comprehensive coastal restoration protecting marine ecosystems and local communities.",
            tags: ["Flood Protection", "Blue Carbon", "Fisheries Support"],
            availableCredits: 1200,
            pricePerCredit: 32,
            vintage: "2024",
            verifiedDate: "2024-01-18",
            totalValue: 38400,
            type: "Coastal Restoration",
            standard: "Gold Standard"
          },
          {
            id: 3,
            title: "Gulf of Kachchh Coral-Mangrove Initiative",
            image: "https://via.placeholder.com/300x180",
            location: "Gujarat, India",
            organization: "Kachchh Coastal NGO Alliance",
            rating: 4.9,
            reviews: 56,
            description: "Integrated coral reef and mangrove conservation in the ecologically rich Gulf of Kachchh.",
            tags: ["Marine Biodiversity", "Coral Protection", "Community Engagement"],
            availableCredits: 3100,
            pricePerCredit: 26.75,
            vintage: "2024",
            verifiedDate: "2024-01-15",
            totalValue: 82925,
            type: "Coral-Mangrove Conservation",
            standard: "VCS"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  const [filters, setFilters] = useState({
    search: '',
    projectType: '',
    priceRange: ''
  });

  const [cart, setCart] = useState([]);

  const handleAddToCart = (project) => {
    setCart([...cart, project]);
    // Here you could also implement a toast notification
    console.log(`Added ${project.title} to cart`);
  };

  const handleSearch = (e) => {
    setFilters({
      ...filters,
      search: e.target.value
    });
  };

  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value
    });
  };

  const filteredProjects = projects.filter(project => {
    // Search filter
    if (filters.search && !project.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !project.organization.toLowerCase().includes(filters.search.toLowerCase()) &&
        !project.location.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    // Project type filter
    if (filters.projectType && project.type !== filters.projectType) {
      return false;
    }

    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (project.pricePerCredit < min || project.pricePerCredit > max) {
        return false;
      }
    }

    return true;
  });

  // Function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className="star" style={{ color: i < Math.floor(rating) ? '#f59e0b' : '#e2e8f0' }}>
          ★
        </span>
      );
    }
    return stars;
  };

  const renderTags = (tags) => {
    return tags.map((tag, index) => (
      <div key={index} className="project-tag">
        {tag}
      </div>
    ));
  };

  return (
    <div>
      <div className="welcome-header">
        <h1 className="page-title">Marketplace</h1>
        <div className="blockchain-badge">
          <span className="blockchain-badge-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
          </span>
          {cart.length} Items in Cart
        </div>
      </div>

      <div className="marketplace-filters">
        <div className="search-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder="Search projects by name, location, or type..." 
            value={filters.search}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        <div className="filters-row">
          <div className="filter-dropdown">
            <button className="filter-button">
              Project Type
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div className="dropdown-content">
              <div onClick={() => handleFilterChange('projectType', '')}>All Types</div>
              <div onClick={() => handleFilterChange('projectType', 'Mangrove Conservation')}>Mangrove Conservation</div>
              <div onClick={() => handleFilterChange('projectType', 'Coastal Restoration')}>Coastal Restoration</div>
              <div onClick={() => handleFilterChange('projectType', 'Coral-Mangrove Conservation')}>Coral-Mangrove Conservation</div>
              <div onClick={() => handleFilterChange('projectType', 'Seagrass Conservation')}>Seagrass Conservation</div>
              <div onClick={() => handleFilterChange('projectType', 'Coral Conservation')}>Coral Conservation</div>
            </div>
          </div>

          <div className="filter-dropdown">
            <button className="filter-button">
              Price Range
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div className="dropdown-content">
              <div onClick={() => handleFilterChange('priceRange', '')}>All Prices</div>
              <div onClick={() => handleFilterChange('priceRange', '0-25')}>Under $25</div>
              <div onClick={() => handleFilterChange('priceRange', '25-30')}>$25 - $30</div>
              <div onClick={() => handleFilterChange('priceRange', '30-100')}>$30+</div>
            </div>
          </div>

          <button className="more-filters-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="21" x2="4" y2="14"></line>
              <line x1="4" y1="10" x2="4" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="3"></line>
              <line x1="20" y1="21" x2="20" y2="16"></line>
              <line x1="20" y1="12" x2="20" y2="3"></line>
              <line x1="1" y1="14" x2="7" y2="14"></line>
              <line x1="9" y1="8" x2="15" y2="8"></line>
              <line x1="17" y1="16" x2="23" y2="16"></line>
            </svg>
            More Filters
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
              <line x1="12" y1="2" x2="12" y2="6"></line>
              <line x1="12" y1="18" x2="12" y2="22"></line>
              <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
              <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
              <line x1="2" y1="12" x2="6" y2="12"></line>
              <line x1="18" y1="12" x2="22" y2="12"></line>
              <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
              <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
            </svg>
            <div>Loading projects...</div>
          </div>
        </div>
      ) : error ? (
        <div className="error-container">
          <div className="error-message">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {error}
          </div>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="no-results-container">
          <div className="no-results-message">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
            No projects match your search criteria
          </div>
          <button className="clear-filters-button" onClick={() => setFilters({ search: '', projectType: '', priceRange: '' })}>
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div className="project-card" key={project.id}>
              <div className="project-image">
                {/* Always use placeholder images for now since we don't have real images */}
                <img src={`https://via.placeholder.com/300x180?text=${encodeURIComponent(project.title)}`} alt={project.title} />
                <div className="project-badge">{project.standard}</div>
                <div className="project-type-badge">{project.type}</div>
              </div>
              <div className="project-content">
                <h2 className="project-title">{project.title}</h2>
                <div className="project-location">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  {project.location} • {project.organization}
                </div>
                
                <div className="project-rating">
                  {renderStars(project.rating)}
                  <span className="rating-value">{project.rating}</span>
                  <span className="reviews-count">({project.reviews} reviews)</span>
                </div>
                
                <p className="project-description">{project.description}</p>
                
                <div className="project-tags">
                  {renderTags(project.tags)}
                </div>
                
                <div className="project-details">
                  <div className="detail-column">
                    <div className="detail-label">Available Credits</div>
                    <div className="detail-value">{project.availableCredits.toLocaleString()}</div>
                  </div>
                  <div className="detail-column">
                    <div className="detail-label">Price per Credit</div>
                    <div className="detail-value">${project.pricePerCredit.toFixed(2)}</div>
                  </div>
                </div>
                
                <div className="project-details">
                  <div className="detail-column">
                    <div className="detail-label">Vintage</div>
                    <div className="detail-value">{project.vintage}</div>
                  </div>
                  <div className="detail-column">
                    <div className="detail-label">Verified</div>
                    <div className="detail-value verified-date">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      {project.verifiedDate}
                    </div>
                  </div>
                </div>
                
                <div className="project-footer">
                  <div className="total-value">
                    <div className="detail-label">Total Value</div>
                    <div className="total-amount">${project.totalValue.toLocaleString()}</div>
                  </div>
                  
                  <div className="project-actions">
                    <button className="view-details-button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      View Details
                    </button>
                    
                    <button className="add-to-cart-button" onClick={() => handleAddToCart(project)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </svg>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}