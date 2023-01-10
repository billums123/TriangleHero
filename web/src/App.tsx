import { Box, Typography } from "@mui/material";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
const App = () => {
  return (
    <Box className="app" bgcolor={"primary.main"}>
      <Header />
      <MainContainer />
    </Box>
  );
};

export default App;
