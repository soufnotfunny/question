import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';

const QuestionForm = ({ open, handleClose, handleAddQuestion }) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = () => {
    if (question.trim() === '') {
      toast.error('Please enter a question');
      return;
    }

    handleAddQuestion({ question, answer: '' });
    toast.success('Question submitted successfully');
    setQuestion('');
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="ask-question-title"
      aria-describedby="ask-question-description"
    >
      <Box 
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}
      >
        <h2 id="ask-question-title">Ask a Question</h2>
        <TextField
          fullWidth
          label="Your Question"
          variant="outlined"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
        <Box display="flex" justifyContent="center">
          <Button 
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{
              padding: '10px 20px',
              color: 'black',
              fontSize: '12px',
              fontWeight: 'bold',
              borderRadius: '30px',
              backgroundColor: '#cccccc',
              '&:hover': {
                backgroundColor: '#bfbfbf',
              },
            }}  
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default QuestionForm;
