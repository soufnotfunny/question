import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import axios from "axios";
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  Container,
  Button,
  Grid,
} from "@mui/material";

const QUESTIONS_PER_PAGE = 5;

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [questionHistory, setQuestionHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      setUser({
        username: currentUser.displayName || "Anonymous",
        email: currentUser.email,
      });

      //API Test: https://66931ef7c6be000fa079c642.mockapi.io/KhangLPSE161421/Test
      //API Real:
      axios
        .get("https://66931ef7c6be000fa079c642.mockapi.io/KhangLPSE161421/Test")
        .then((response) => {
          const questions = response.data;
          const userQuestions = questions.filter(
            (question) => question.uid === currentUser.uid
          );
          const sortedQuestions = userQuestions.sort((a, b) =>
            a.uid.localeCompare(b.uid)
          );
          setQuestionHistory(sortedQuestions);
        })
        .catch((error) => {
          console.error("Error fetching question history:", error);
        });
    }
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(questionHistory.length / QUESTIONS_PER_PAGE);
  const startIndex = (currentPage - 1) * QUESTIONS_PER_PAGE;
  const currentQuestions = questionHistory.slice(
    startIndex,
    startIndex + QUESTIONS_PER_PAGE
  );

  return (
    <Container maxWidth="md">
      <Box
        sx={{ margin: "0 auto", p: 3, display: "flex", flexDirection: "row" }}
      >
        {user && (
          <>
            <Container>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar sx={{ mr: 2 }}>{user.username[0]}</Avatar>
                <Typography variant="h5">{user.username}</Typography>
              </Box>
              <Typography variant="body1" color="textSecondary">
                {user.email}
              </Typography>
            </Container>

            <Divider sx={{ my: 2 }} />
            <Container>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Question Post History
                </Typography>
              </Box>
              <List>
                {currentQuestions.length > 0 ? (
                  currentQuestions.map((question) => (
                    <ListItem key={question.id}>
                      <ListItemText
                        primary={question.question}
                        secondary={question.answer}
                      />
                    </ListItem>
                  ))
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    No questions posted yet.
                  </Typography>
                )}
              </List>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button
                    variant="contained"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                  >
                    Previous
                  </Button>
                </Grid>
                <Grid item>
                  <Typography variant="body2">{`Page ${currentPage} of ${totalPages}`}</Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </>
        )}
      </Box>
    </Container>
  );
};

export default UserProfile;
