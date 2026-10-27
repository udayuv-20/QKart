import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Header = ({ hasHiddenAuthButtons }) => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="header">
      {!hasHiddenAuthButtons ? (
        username ? (
          <>
            <span>{username}</span>
            <Button onClick={handleLogout}>LOGOUT</Button>
          </>
        ) : (
          <>
            <Button onClick={() => navigate("/login")}>LOGIN</Button>
            <Button onClick={() => navigate("/register")}>REGISTER</Button>
          </>
        )
      ) : (
        <Button onClick={() => navigate("/")}>Back to explore</Button>
      )}
    </div>
  );
};

export default Header;
