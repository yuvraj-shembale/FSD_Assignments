import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [formData, setFormData] = useState({
    studentName: '',
    course: '',
    rating: 5,
    comments: ''
  });
  
  // Fetch Feedbacks from Backend
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
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setFormData({ studentName: '', course: '', rating: 5, comments: '' });
        fetchFeedbacks(); // Refresh list
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Student Feedback System</h1>
      </header>

      <main className="main-content">
        <section className="form-section">
          <h2>Submit Review</h2>
          <form onSubmit={handleSubmit} className="feedback-form">
            <div className="form-group">
              <label>Name:</label>
              <input 
                type="text" 
                name="studentName" 
                value={formData.studentName} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Course:</label>
              <input 
                type="text" 
                name="course" 
                value={formData.course} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Rating (1-5):</label>
              <input 
                type="number" 
                min="1" 
                max="5" 
                name="rating" 
                value={formData.rating} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Comments:</label>
              <textarea 
                name="comments" 
                value={formData.comments} 
                onChange={handleChange} 
                rows="4" 
                required 
              />
            </div>
            <button type="submit" className="submit-btn">Submit Feedback</button>
          </form>
        </section>

        <section className="list-section">
          <h2>Recent Feedbacks</h2>
          {feedbacks.length === 0 ? (
            <p>No feedback yet.</p>
          ) : (
            <div className="feedback-list">
              {feedbacks.map((item) => (
                <div key={item._id} className="feedback-card">
                  <div className="card-header">
                    <strong>{item.studentName}</strong>
                    <span className="rating text-warning">{'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}</span>
                  </div>
                  <small className="course-text">Course: {item.course}</small>
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
