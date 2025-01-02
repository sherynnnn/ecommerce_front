import { Container, Typography, TextField, Box, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Header from "../../components/Header";
import { toast } from "sonner";
import { authSignup, Signup } from "../../utils/api_auth";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleFormSignup = async (event) => {
    event.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill out all the required fields");
      return;
    }
    try {   
      const newUser = await authSignup({ email, password });
      console.log("Returned Data:", newUser);
      if (newUser) {
        toast.success("Signup Successful");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <>
      <Container>
        <Header title="Create a New Account" />
        <Card>
          <CardContent>
            <Typography variant="h4" align="center" mb={4}>
              Signup
            </Typography>
            <Box mb={2}>
              <TextField
                label="Name"
                required
                fullWidth
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Email"
                required
                fullWidth
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Password"
                type="password"
                required
                fullWidth
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Confirm Password"
                type="password"
                required
                fullWidth
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleFormSignup}
            >
              Signup
            </Button>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default Signup;
