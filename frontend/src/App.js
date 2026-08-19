import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home_page/Home";
import ListingPage from "./pages/listing_page/ListingPage";
import ListingDetailsPage from "./pages/listing_page/ListingDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<ListingPage />} />
        <Route path="/listings/:id" element={<ListingDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;