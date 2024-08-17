import React, { useState } from "react";
import { Card, CardContent, Typography, CardActionArea } from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)({
  width: "200px",
  height: "150px",
  margin: "20px",
  perspective: "1000px", // Perspective to give the 3D effect
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
  backfaceVisibility: "hidden", // Hide the back face when the front is visible
  backgroundColor: "#f5f5f5",
  border: "1px solid #ccc",
  borderRadius: "10px",
  boxShadow: "none",
});

const CardFront = styled(CardFace)({
  backgroundColor: "#f5f5f5",
});

const CardBack = styled(CardFace)({
  backgroundColor: "#e0e0e0",
  transform: "rotateY(180deg)", // Rotate the back face to align it correctly
});

const QuestionCard = ({ question }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <StyledCard>
      <CardActionArea onClick={handleFlip} sx={{ height: "100%" }}>
        <CardInner isFlipped={isFlipped}>
          <CardFront>
            <Typography variant="h6" component="div">
              {question.question}
            </Typography>
          </CardFront>
          <CardBack>
            <Typography variant="body1" color="text.secondary">
              Admin: {question.answer}
            </Typography>
          </CardBack>
        </CardInner>
      </CardActionArea>
    </StyledCard>
  );
};

export default QuestionCard;
