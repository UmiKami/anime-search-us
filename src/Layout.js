import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import AnimeDetailsPage from "./Components/AnimeDetailsPage";
import NoPage from "./Components/NoPage";

const Layout = () => {
  return (
      <BrowserRouter>
          <Routes>
            <Route index element={<App />} />
            <Route path="/home" element={<App />} />
            <Route path="/anime/:animeId" element={<AnimeDetailsPage />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
      </BrowserRouter>
  );
}

export default Layout;