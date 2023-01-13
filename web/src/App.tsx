import { useState, createContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { GetUserInfo } from "./types";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
import CreateTriangleForm from "./components/CreateTriangleForm";
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import NavBar from "./components/NavBar";
import { checkForUserSession } from "./api/usersApi";
import SavedTriangles from "./components/SavedTriangles";

interface UserContextInterface {
  user: GetUserInfo | null;
  setUser: React.Dispatch<React.SetStateAction<GetUserInfo | any>>;
}
1;
const UserContext = createContext<UserContextInterface>({
  user: null,
  setUser: () => {},
});
const App = () => {
  const [user, setUser] = useState<GetUserInfo | null>(null);

  useEffect(() => {
    (async () => {
      const userSessionResponse = await checkForUserSession();
      if (userSessionResponse.userId) {
        setUser(userSessionResponse);
      } else {
        setUser(null);
      }
    })();
  }, []);
  return (
    <Box className="app" bgcolor={"primary.main"}>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Header />
          <NavBar />
          <Routes>
            <Route path="/" element={<MainContainer />}>
              <Route index element={<CreateTriangleForm />} />
              <Route
                path="signup"
                element={<Register key="signup" type="createAccount" />}
              />
              <Route
                path="login"
                element={<Register key="login" type="login" />}
              />
              <Route path="triangles" element={<SavedTriangles />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </Box>
  );
};

export { App, UserContext };
