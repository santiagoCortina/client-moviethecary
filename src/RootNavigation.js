import { Routes, Route } from "react-router-dom";
import { Home, LogIn, Signup, Feed, MovieDetail, Profile } from "./pages";

function RootNavigation(props) {
  return (
    <Routes>
      <Route path="/" element={<Home {...props} />} />
      <Route path="/signup" element={<Signup {...props} />} />
      <Route path="/login" element={<LogIn {...props} />} />
      <Route path="/feed" element={<Feed {...props} />} />
      <Route path="/movieDetail" element={<MovieDetail {...props} />} />
      <Route path="/profile" element={<Profile {...props} />} />
    </Routes>
  );
}

export default RootNavigation;
