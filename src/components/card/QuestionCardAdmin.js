import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Box,
  CardActionArea,
} from "@mui/material";
import { styled } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

const StyledCard = styled(Card)({
  width: "300px",
  margin: "20px",
  boxShadow: "none",
  borderRadius: "10px",
});

const CardFront = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  backgroundColor: "#f5f5f5",
  border: "1px solid #ccc",
  borderRadius: "10px",
  padding: "16px",
  boxShadow: "none",
});

const QuestionCardAdmin = ({ question, onUpdate, onDelete }) => {
  const [answer, setAnswer] = useState(question.answer || "");
  const [showAnswer, setShowAnswer] = useState(!!question.answer);
  const role = sessionStorage.getItem("role");

  const handleUpdate = () => {
    onUpdate(question.id, { ...question, answer });
    setShowAnswer(true);
    toast.success("Answered successfully");
  };

  useEffect(() => {
    setAnswer(question.answer || "");
    setShowAnswer(!!question.answer);
  }, [question.answer]);

  return (
    <StyledCard>
      <CardActionArea sx={{ height: "100%" }}>
        <CardFront>
          <Typography variant="h6" component="div" gutterBottom>
            {question.question}
          </Typography>

          {/* Hiển thị câu trả lời bên user */}
          {role === "user" && showAnswer && (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                overflow: "hidden",
                whiteSpace: "normal",
              }}
            >
              Admin: {question.answer}
            </Typography>
          )}

          {/* Hiển thị câu trả lời bên admin */}
          {role === "admin" && showAnswer && (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                overflow: "hidden",
                whiteSpace: "normal",
              }}
            >
              Admin: {answer}
            </Typography>
          )}

          {/* Nếu là admin, hiển thị ô nhập câu trả lời và các nút chức năng */}
          {role === "admin" && (
            <Box>
              <TextField
                label="Answer"
                variant="outlined"
                fullWidth
                margin="normal"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginTop="5px"
              >
                <IconButton onClick={handleUpdate} color="primary">
                  <Typography variant="body2">Reply</Typography>
                </IconButton>
                <IconButton onClick={() => onDelete(question.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          )}
        </CardFront>
      </CardActionArea>
    </StyledCard>
  );
};

export default QuestionCardAdmin;
