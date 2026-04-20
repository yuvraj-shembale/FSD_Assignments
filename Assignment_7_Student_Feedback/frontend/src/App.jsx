import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    course: '',
    rating: 5,
    comments: ''
  });
  const [error, setError] = useState(null);
  
  const fetchFeedbacks = async () => {
    try {
      setError(null);
      const res = await fetch('http://localhost:5000/api/feedback');
      const data = await res.json();
      if (Array.isArray(data)) {
        setFeedbacks(data);
      } else {
        setFeedbacks([]);
        setError("Unable to load feedbacks. Please check database connection.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Server unreachable. Make sure backend is running.");
      setFeedbacks([]);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setFormData({ studentName: '', course: '', rating: 5, comments: '' });
        await fetchFeedbacks();
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      alert("Submission failed. Please check if the backend is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ADDED SAFETY CHECKS HERE
  const filteredFeedbacks = Array.isArray(feedbacks) ? feedbacks.filter(item => {
    const name = item.studentName ? String(item.studentName).toLowerCase() : '';
    const course = item.course ? String(item.course).toLowerCase() : '';
    const search = searchTerm.toLowerCase();
    return name.includes(search) || course.includes(search);
  }) : [];

  return (
    <div className="container">
      <header>
        <h1>Student<span style={{color: '#a855f7'}}>Feedback</span>Hub</h1>
        <p>A premium platform for academic transparency and course reviews.</p>
      </header>

      <main className="main-content">
        {/* Left: Submission Form */}
        <section className="glass-card">
          <h2><span style={{fontSize: '1.2rem'}}>✍️</span> Submit Review</h2>
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }} 
            className="feedback-form" 
            autoComplete="off"
          >
            <div className="form-group">
              <label>Student Name</label>
              <input 
                type="text" 
                name="studentName" 
                placeholder="Ex: Yuvraj Shembale"
                value={formData.studentName} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Course Name</label>
              <input 
                type="text" 
                name="course" 
                placeholder="Ex: Web Development"
                value={formData.course} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Rating</label>
              <select name="rating" value={formData.rating} onChange={handleChange}>
                <option value="5">⭐⭐⭐⭐⭐ (Excellent)</option>
                <option value="4">⭐⭐⭐⭐ (Very Good)</option>
                <option value="3">⭐⭐⭐ (Average)</option>
                <option value="2">⭐⭐ (Poor)</option>
                <option value="1">⭐ (Terrible)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Detailed Comments</label>
              <textarea 
                name="comments" 
                placeholder="Share your experience with this course..."
                value={formData.comments} 
                onChange={handleChange} 
                rows="5" 
                required 
              />
            </div>
            <button 
              type="submit" 
              className="submit-btn" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Post Feedback'}
            </button>
          </form>
        </section>

        {/* Right: Review Feed */}
        <section>
          <div className="list-header">
            <h2><span style={{fontSize: '1.2rem'}}>💬</span> Recent Feed</h2>
            <input 
              type="text" 
              placeholder="Search by student or course..." 
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {error && (
            <div className="glass-card" style={{borderColor: '#ef4444', animation: 'pulse 2s infinite'}}>
              <p style={{color: '#ef4444', textAlign: 'center'}}>⚠️ {error}</p>
            </div>
          )}

          {filteredFeedbacks.length === 0 && !error ? (
            <div className="glass-card" style={{textAlign: 'center', color: 'var(--text-muted)'}}>
              <p>No matching reviews found.</p>
            </div>
          ) : (
            <div className="feedback-grid">
              {filteredFeedbacks.map((item, index) => (
                <div key={item._id || `fb-${index}`} className="feedback-card">
                  <div className="card-header">
                    <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                      <div className="student-initial">
                        {item.studentName ? String(item.studentName).charAt(0).toUpperCase() : '?'}
                      </div>
                      <span style={{fontWeight: '600'}}>{item.studentName || 'Anonymous'}</span>
                    </div>
                    <div className="rating-stars">
                      {'★'.repeat(Number(item.rating) || 0)}{'☆'.repeat(5 - (Number(item.rating) || 0))}
                    </div>
                  </div>
                  <span className="course-badge">{item.course || 'N/A'}</span>
                  <p className="comment-text">"{item.comments || 'No comment'}"</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
