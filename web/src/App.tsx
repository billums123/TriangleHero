import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
import CreateTriangleForm from "./components/CreateTriangleForm";
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import NavBar from "./components/NavBar";
const App = () => {
  return (
    <Box className="app" bgcolor={"primary.main"}>
      <BrowserRouter>
        <Header />
        <NavBar />
        <Routes>
          <Route path="/" element={<MainContainer />}>
            <Route index element={<CreateTriangleForm />} />
            <Route path="signup" element={<Register type="createAccount" />} />
            <Route path="login" element={<Register type="login" />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default App;
