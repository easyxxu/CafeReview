import { axiosInstance } from "./axiosInstance";

export const getReviews = async () => {
  const res = await axiosInstance.get("/reviews");
  return res;
};

export const getReviewById = async (reviewId) => {
  try {
    const res = await axiosInstance.get(`/reviews/${reviewId}`);
    return res;
  } catch (error) {
    console.error("리뷰를 가져올 수 없습니다", error);
  }
};

export const addReview = async (reviewForm) => {
  const res = await axiosInstance.post("/reviews", reviewForm);
  return res;
};

export const modifyReview = async (reviewId, modifiedForm) => {
  const res = await axiosInstance.patch(`/reviews/${reviewId}`, modifiedForm);
  return res.data;
};

export const deleteReview = async (reviewId, password) => {
  try {
    const res = await axiosInstance.post(`/reviews/${reviewId}`, {
      password: password,
    });
    return res;
  } catch (err) {
    return err.response;
  }
};

export const likeReview = async (reviewId, updatedLike) => {
  const res = await axiosInstance.patch(`/reviews/${reviewId}`, {
    isLiked: updatedLike,
  });
  return res;
};

export const getSearchReviews = async (searchKeyword) => {
  const res = await axiosInstance.get(`/search?searchKeyword=${searchKeyword}`);
  return res;
};

// 댓글 API
export const getComment = async (reviewId) => {
  try {
    const res = await axiosInstance.get("/comments");
    const comment = res.data.filter((item) => item.reviewId === reviewId);
    return comment;
  } catch (err) {
    console.error("댓글을 불러오는 데 실패했습니다: ", err.message);
  }
};

export const addComment = async (commentForm) => {
  const res = await axiosInstance.post(`/comments`, commentForm);
  return res;
};

export const getCommentById = async (commentId) => {
  const res = await axiosInstance.get(`/comments/${commentId}`);
  return res;
};

export const modifyComment = async (commentId, modifiedForm) => {
  const res = await axiosInstance.patch(`/comments/${commentId}`, modifiedForm);
  return res;
};

export const deleteComment = async (commentId, password) => {
  try {
    const res = await axiosInstance.post(`/comments/${commentId}`, {
      password: password,
    });
    return res;
  } catch (error) {
    console.error("삭제 에러: ", error);
    return error.response;
  }
};
