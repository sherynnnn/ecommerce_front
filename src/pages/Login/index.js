import { Container, Typography, TextField, Box, Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Header from "../../components/Header";
import { toast } from "sonner";
import { authLogin, Login } from "../../utils/api_auth";

function Login() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    getUser(id).then((userData) => {
      setLoading(false);
      setEmail(userData.email);
      setPassword(userData.password);
    });
  }, [id]);

  const handleFormLogin = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error("Please fill out all the required fields");
    } else {
      const updatedUser = await authLogin(id, email, password);

      if (updatedUser) {
        toast.success("Login Sucessfully");
        navigate("/");
      }
    }
  };

  return (
    <>
      <Container>
        <Header title="Login to Your Account" />
        <Card>
          <CardContent>
            <Typography variant="h4" align="center" mb={4}>
              Login
            </Typography>
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
                required
                fullWidth
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleFormLogin}
            >
              Login
            </Button>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default Login;
