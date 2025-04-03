import { useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { Button, TextField, Typography, Box } from "@mui/material";

interface AuthFormProps {
  isLogin: boolean;
  toggleIsLogin: () => void;
}

const AuthFormMUI = ({ isLogin, toggleIsLogin }: AuthFormProps) => {
  const { loading, loginUser, registerUser } = useAuthContext();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      loginUser(formData.email, formData.password);
    } else {
      registerUser(formData.userName, formData.email, formData.password);
    }
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "75%", md: "50%" },
        padding: "24px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "0 auto",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          mb={4}
          fontWeight={600}
        >
          {isLogin ? "Login now" : "Register now"}
        </Typography>

        {!isLogin && (
          <Box marginBottom={2}>
            <TextField
              fullWidth
              variant="outlined"
              label="Username*"
              name="userName"
              type="text"
              size="small"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, userName: e.target.value }))
              }
              value={formData.userName}
            />
          </Box>
        )}

        <Box marginBottom={2}>
          <TextField
            fullWidth
            autoFocus={isLogin}
            variant="outlined"
            label="Email address*"
            name="email"
            type="email"
            size="small"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            value={formData.email}
          />
        </Box>

        <Box marginBottom={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Password*"
            name="password"
            type="password"
            size="small"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            value={formData.password}
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          loading={loading}
        >
          {isLogin ? "Login" : "Register"}
        </Button>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop={2}
        >
          <Typography variant="body2" color="textSecondary">
            {isLogin ? "Not a member yet?" : "Already a member?"}
          </Typography>

          <Typography
            variant="body2"
            color="primary"
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              marginLeft: 8,
            }}
            onClick={toggleIsLogin}
            fontWeight={600}
          >
            {isLogin ? "Register now" : "Login now"}
          </Typography>
        </Box>
      </form>
    </Box>
  );
};

export default AuthFormMUI;
