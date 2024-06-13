import { List, ListItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSearchReviews } from "../apis/apis";
import ReviewItem from "../components/Review/ReviewItem";
import ReviewList from "../components/Review/ReviewList";

export default function SearchResultPage(props) {
  const { searchKeyword } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadSearchReview = async () => {
      const res = await getSearchReviews(searchKeyword);
      setReviews(res.data);
    };
    loadSearchReview();
  }, [searchKeyword]);

  return (
    <>
      <h2>검색 결과</h2>
      <ReviewList reviews={reviews}>
        {reviews.map((review) => (
          <ReviewItem review={review} />
        ))}
      </ReviewList>
    </>
  );
}
