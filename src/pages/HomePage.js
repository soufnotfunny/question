import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QuestionCard from '../components/QuestionCard';
import QuestionForm from '../components/QuestionForm';
import { Button, Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem('token');
  
  console.log('Is Logged In:', isLoggedIn); // Debugging line
  
  useEffect(() => {
    axios.get('https://66938e56c6be000fa07c1307.mockapi.io/question/tamplmse182726')
      .then(response => setQuestions(response.data));
  }, []);

  const handleAddQuestion = (question) => {
    axios.post('https://66938e56c6be000fa07c1307.mockapi.io/question/tamplmse182726', question)
      .then(response => setQuestions([...questions, response.data]));
  };

  const handleUpdateQuestion = (id, updatedQuestion) => {
    axios.put(`https://66938e56c6be000fa07c1307.mockapi.io/question/tamplmse182726/${id}`, updatedQuestion)
      .then(response => setQuestions(questions.map(q => q.id === id ? response.data : q)));
  };

  const handleDeleteQuestion = (id) => {
    axios.delete(`https://66938e56c6be000fa07c1307.mockapi.io/question/tamplmse182726/${id}`)
      .then(() => setQuestions(questions.filter(q => q.id !== id)));
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div style={{ padding: '20px' }}>
       <Box display="flex" justifyContent="center" marginBottom="20px">
       <Button
        variant="contained"
        color="primary"
        onClick={handleOpenPopup}
        sx={{
          padding: '10px 20px',   
          color: 'black',    
          fontSize: '14px',
          fontWeight: 'bold',
          borderRadius: '30px',
          backgroundColor: '#cccccd',
          '&:hover': {
            backgroundColor: '#bfbfbf',
          },
        }}  
        >
          Ask Questions
        </Button>
      </Box>
      <h2>Q&A</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {questions.map(q => (
          <QuestionCard key={q.id} question={q} />
        ))}
      </div>

      <QuestionForm
        open={isPopupOpen}
        handleClose={handleClosePopup}
        handleAddQuestion={handleAddQuestion}
      />
      <ToastContainer />
    </div>
  );
};

export default HomePage;
