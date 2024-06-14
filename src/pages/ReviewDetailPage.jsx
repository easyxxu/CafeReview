import { Container } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewById } from "../apis/apis";
import CommentForm from "../components/Comment/CommentForm";
import CommentList from "../components/Comment/CommentList";
import ReviewDetail from "../components/Review/ReviewDetail";

export default function ReviewDetailPage(props) {
  const { reviewId } = useParams();
  const [review, setReview] = useState({});

  useEffect(() => {
    const loadReviewById = async () => {
      const res = await getReviewById(parseInt(reviewId));
      setReview(res.data);
    };
    loadReviewById();
  }, [reviewId]);

  return (
    <>
      <ReviewDetail review={review} />
      <CommentList reviewId={reviewId} />
      <CommentForm reviewId={reviewId} />
    </>
  );
}
