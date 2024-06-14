import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getSearchReviews } from "../apis/apis";
import ReviewItem from "../components/Review/ReviewItem";
import ReviewList from "../components/Review/ReviewList";

import { ListTitle } from "./HomePage";

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
      <Box
        sx={{
          bgcolor: (theme) => `${theme.palette.common.brown200}`,
          p: "5px 10px",
          color: "white",
        }}
      >
        <ListTitle>"{searchKeyword}"의 검색 결과</ListTitle>
      </Box>
      <Box
        sx={{
          border: (theme) => `1px solid ${theme.palette.common.brown100}`,
          borderRadius: "3px",
          bgcolor: (theme) => `${theme.palette.common.brown50}`,
        }}
      >
        <ReviewList reviews={reviews}>
          {reviews.map((review) => (
            <ReviewItem review={review} />
          ))}
        </ReviewList>
      </Box>
    </>
  );
}
