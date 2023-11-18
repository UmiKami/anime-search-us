import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Maintenance from "./Components/Maintenance";
import AnimeDetailsPage from "./View/AnimeDetailsPage";
import NoPage from "./View/NoPage";

const Layout = () => {
  return (
      <BrowserRouter>
          <Routes>
            <Route index element={<App />} />
            <Route path="/home" element={<App />} />
            <Route path="/anime/:animeId" element={<AnimeDetailsPage />} />
            <Route path="/search/:animeTitle" element={<App />} />
            <Route path="/page/:pageId" element={<App />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
      </BrowserRouter>
  );
}

export default Layout;