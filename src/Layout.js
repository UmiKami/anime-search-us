import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";

const Layout = () => {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />}>
                  <Route index element={<App />} />
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default Layout;