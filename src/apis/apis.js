import { axiosInstance } from "./axiosInstance";

export const getReviews = async () => {
  const res = await axiosInstance.get("/reviews");
  return res;
};

export const getReviewById = async (reviewId) => {
  const res = await axiosInstance.get(`/reviews/${reviewId}`);
  return res;
};

export const addReview = async (reviewForm) => {
  const res = await axiosInstance.post("/reviews", reviewForm);
  return res;
};

export const modifyReview = async (reviewId, modifiedForm) => {
  const res = await axiosInstance.patch(`/reviews/${reviewId}`, modifiedForm);
  return res.data;
};

export const deleteReview = async (password, reviewId) => {
  const res = await axiosInstance.delete(`/reviews/${reviewId}`);
  return res;
};

export const getSearchReviews = async (searchKeyword) => {
  const res = await axiosInstance.get(`/search?searchKeyword=${searchKeyword}`);
  return res;
};

export const getSortedReviews = async (category, method) => {
  // Category: commentsCount || modifiedDate || likes || rating
  // Method : asc || desc

  const res = await axiosInstance.get(
    `/reviews?_sort=${category}&_order=${method}`
  );
  return res;
};

export const getFilterdReviews = async (timePeriod, rating) => {
  let res;
  const today = new Date();
  const params = {};

  if (timePeriod === "1개월") {
    const period = today.getTime() - 30 * 24 * 60 * 60 * 1000;
    const periodDate = new Date(period);
    params.modifiedDate_gte = periodDate.toISOString();
    params.modifiedDate_lte = today.toISOString();
  } else if (timePeriod === "3개월") {
    const period = today.getTime() - 90 * 24 * 60 * 60 * 1000;
    const periodDate = new Date(period);
    params.modifiedDate_gte = periodDate.toISOString();
    params.modifiedDate_lte = today.toISOString();
  } else if (timePeriod === "6개월 이상") {
    const period = today.getTime() - 180 * 24 * 60 * 60 * 1000;
    const periodDate = new Date(period);
    params.modifiedDate_lte = periodDate.toISOString();
  }

  if (rating) {
    params.rating_gte = rating;
  }

  res = await axiosInstance.get(`/reviews`, { params });
  return res.data;
};

// 댓글 API
export const addComment = async (commentForm) => {
  const res = await axiosInstance.post(`/comments`, commentForm);
  return res;
};

// const getCommentById = async (commentId) => {
//   const res = await axiosInstance.get(`/comments/${commentId}`);
//   return res.data;
// };

export const modifyComment = async (commentId, modifiedForm) => {
  const res = await axiosInstance.patch(`/comments/${commentId}`, modifiedForm);
  return res;
};

export const deleteComment = async (commentId, password) => {
  try {
    const response = await axiosInstance.post(`/comments/${commentId}`, {
      password: password,
    });

    console.log(response.data.message); // 서버로부터 받은 메시지 출력
  } catch (error) {
    console.error(error);
  }
};
