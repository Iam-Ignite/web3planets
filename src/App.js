import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import PlanetsPage from "./pages/PlanetsPage";
import AddProjectPage from "./pages/AddProjectPage";
import Admin from "./pages/Admin";
import Login from "./components/admin/Login";
import ProtectedRoute from "./components/admin/ProtectedRoute"


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new-project" element={<AddProjectPage />} />
      <Route path="/planets" element={<PlanetsPage/>}/>
      <Route path="/login" element={<Login/>}/> 

        <Route
          path="/admin"
          element={
              <ProtectedRoute component={<Admin />} />
          }
        />
    </Routes>
  );
}

export default App;
