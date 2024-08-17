import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Modal,
  Button,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

const StyledCard = styled(Card)({
  width: "250px",
  height: "300px",
  margin: "20px",
  perspective: "1000px",
  boxShadow: "none",
  borderRadius: "10px",
});

const CardInner = styled("div")(({ isFlipped }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
  transformStyle: "preserve-3d",
  transition: "transform 0.6s ease-in-out",
  borderRadius: "10px",
}));

const CardFace = styled(CardContent)({
  position: "absolute",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backfaceVisibility: "hidden",
  backgroundColor: "#f5f5f5",
  border: "1px solid #ccc",
  borderRadius: "10px",
  boxShadow: "none",
});

const CardFront = styled(CardFace)({
  background:
    "linear-gradient(245.59deg,#a7a6cb 0%,#8989ba 28.53%,#8989ba 75.52%)",
});

const CardBack = styled(CardFace)({
  backgroundColor: "#e0e0e0",
  transform: "rotateY(180deg)",
});

const StyledButton = styled(Button)({
  padding: "10px 20px",
  color: "black",
  fontSize: "12px",
  fontWeight: "bold",
  borderRadius: "30px",
  backgroundColor: "#cccccc",
  "&:hover": {
    backgroundColor: "#bfbfbf",
  },
});

const QuestionCard = ({
  question,
  handleUpdateQuestion,
  handleDeleteQuestion,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(question.question);
  const role = sessionStorage.getItem("role");
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const openEditModal = (e) => {
    e.stopPropagation(); // Prevent flip on icon click
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openDeleteDialog = (e) => {
    e.stopPropagation(); // Prevent flip on icon click
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleEditSubmit = () => {
    handleUpdateQuestion(question.id, {
      ...question,
      question: editedQuestion,
    });
    closeEditModal();
  };

  const handleDeleteSubmit = () => {
    handleDeleteQuestion(question.id);
    closeDeleteDialog();
  };

  const handleCardClick = () => {
    if (!isEditModalOpen && !isDeleteDialogOpen) {
      handleFlip();
    }
  };

  return (
    <StyledCard onClick={handleCardClick}>
      <CardInner isFlipped={isFlipped}>
        <CardFront>
          <Typography variant="h6" component="div">
            {question.question}
          </Typography>
          <Box
            display="flex"
            justifyContent="flex-end"
            position="absolute"
            bottom="10px"
            right="10px"
          >
            <IconButton size="small" onClick={openEditModal}>
              <EditIcon />
            </IconButton>
            <IconButton size="small" onClick={openDeleteDialog}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </CardFront>
        <CardBack>
          <Typography variant="body1" color="text.secondary">
            {question.answer}
          </Typography>
        </CardBack>
      </CardInner>
      {role === "user" && (
        <>
          {/* Edit Question Modal */}
          <Modal
            open={isEditModalOpen}
            onClose={closeEditModal}
            aria-labelledby="edit-question-title"
            aria-describedby="edit-question-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 1,
              }}
            >
              <h2 id="edit-question-title">Edit Question</h2>
              <TextField
                fullWidth
                variant="outlined"
                value={editedQuestion}
                onChange={(e) => setEditedQuestion(e.target.value)}
                multiline
                rows={4}
                sx={{ mb: 2 }}
              />
              <Box display="flex" justifyContent="center">
                <StyledButton onClick={handleEditSubmit}>Submit</StyledButton>
              </Box>
            </Box>
          </Modal>

          {/* Delete Confirmation Dialog */}
          <Modal
            open={isDeleteDialogOpen}
            onClose={closeDeleteDialog}
            aria-labelledby="delete-confirmation-title"
            aria-describedby="delete-confirmation-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 1,
              }}
            >
              <h2 id="delete-confirmation-title">Delete Confirmation</h2>
              <Typography
                id="delete-confirmation-description"
                sx={{ textAlign: "center", mb: 2 }}
              >
                Are you sure you want to delete this question?
              </Typography>
              <Box display="flex" justifyContent="center">
                <StyledButton onClick={handleDeleteSubmit}>Delete</StyledButton>
              </Box>
            </Box>
          </Modal>
        </>
      )}
    </StyledCard>
  );
};

export default QuestionCard;
