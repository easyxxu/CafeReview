import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ReviewWritePage from "../pages/ReviewWritePage";
import ReviewDetailPage from "../pages/ReviewDetailPage";
import SearchResultPage from "../pages/SearchResultPage";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/review" element={<ReviewDetailPage />} />
      <Route path="/review/write" element={<ReviewWritePage />} />
      <Route path="/search" element={<SearchResultPage />} />
    </Routes>
  );
}
