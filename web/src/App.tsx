import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
import CreateTriangleForm from "./components/CreateTriangleForm";
const App = () => {
  return (
    <Box className="app" bgcolor={"primary.main"}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainContainer />}>
            <Route path="/form" element={<CreateTriangleForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default App;
