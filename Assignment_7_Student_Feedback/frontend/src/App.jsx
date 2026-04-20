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
  
  const fetchFeedbacks = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/feedback');
      const data = await res.json();
      setFeedbacks(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchFeedbacks, 30000);
    return () => clearInterval(interval);
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
      }
    } catch (error) {
      alert("Failed to submit. Is the backend running?");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredFeedbacks = feedbacks.filter(item => 
    item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <form onSubmit={handleSubmit} className="feedback-form">
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
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
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

          {filteredFeedbacks.length === 0 ? (
            <div className="glass-card" style={{textAlign: 'center', color: 'var(--text-muted)'}}>
              <p>No matching reviews found.</p>
            </div>
          ) : (
            <div className="feedback-grid">
              {filteredFeedbacks.map((item) => (
                <div key={item._id} className="feedback-card">
                  <div className="card-header">
                    <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                      <div className="student-initial">
                        {item.studentName.charAt(0).toUpperCase()}
                      </div>
                      <span style={{fontWeight: '600'}}>{item.studentName}</span>
                    </div>
                    <div className="rating-stars">
                      {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                    </div>
                  </div>
                  <span className="course-badge">{item.course}</span>
                  <p className="comment-text">"{item.comments}"</p>
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
