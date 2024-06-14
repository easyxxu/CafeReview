import {
  Box,
  Button,
  Container,
  IconButton,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

import { useState } from "react";
import { deleteReview, likeReview } from "../../apis/apis";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ReviewDetail(props) {
  const navigate = useNavigate();
  const { review } = props;

  const [like, setLike] = useState(review.isLiked);
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [rating, setRating] = useState(0);
  const [modifyisActive, setModifyIsActive] = useState(false);

  const handleLike = async () => {
    const updatedLike = !like;
    setLike(updatedLike);
    const res = await likeReview(review.id, updatedLike);
  };

  const handleModifyButton = () => {
    setModifyIsActive(true);
  };

  const handleModifyCancelButton = () => {
    setModifyIsActive(false);
  };

  const handleDelete = async () => {
    const res = await deleteReview(review.id, password);
    if (res.status === 200) {
      navigate("/");
    } else {
      setError(true);
      setPasswordMsg(res.data.message);
      return;
    }
  };

  useEffect(() => {
    setLike(review.isLiked);
  }, [review]);

  return (
    <Container
      sx={{
        backgroundColor: "common.brown50",
        borderRadius: 1,
        marginBottom: 2,
        padding: "10px 0",
        "& p": {
          m: "7px",
        },
        "& p:nth-of-type(2)": {
          display: "flex",
          alignItems: "flex-end",
        },
        "& strong": {
          fontWeight: "bold",
          color: (theme) => `${theme.palette.common.brown400}`,
        },
      }}
    >
      <Typography
        variant="h2"
        sx={{
          borderBottom: "1px solid black",
          color: (theme) => `${theme.palette.common.brown900}`,
        }}
      >
        {review.title}
      </Typography>
      <p>
        <strong>작성 날짜 : </strong>
        {review.createdDate && review.createdDate.split("T", 1)}
      </p>
      <p>
        <strong>별점 : </strong>
        {review.rating && <Rating value={review.rating} readOnly />}
      </p>
      <p>
        <strong>위치 : </strong>
        {review.address}
      </p>
      <p>
        <strong>작성자 : </strong>
        {review.author}
      </p>
      <p>{review.content}</p>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {
          <IconButton onClick={handleLike} color="brown">
            {like ? (
              <FavoriteRoundedIcon fontSize="large" />
            ) : (
              <FavoriteBorderRoundedIcon fontSize="large" />
            )}
          </IconButton>
        }
        {/* <Rating
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          size="large"
        /> */}
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        mt="20px"
      >
        {!modifyisActive && (
          <Button
            onClick={handleModifyButton}
            variant="contained"
            color="brown"
            size="large"
            sx={{ mr: "4px" }}
          >
            수정
          </Button>
        )}
        {modifyisActive && (
          <>
            <TextField
              required
              error={error}
              id="reviewPassword"
              type="password"
              variant="filled"
              label="비밀번호"
              color="brown"
              helperText={passwordMsg}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              sx={{ mr: "5px" }}
            />
            <Button
              onClick={handleModifyCancelButton}
              variant="contained"
              color="brown"
              size="large"
              sx={{ mr: "5px" }}
            >
              취소
            </Button>
            <Button
              variant="contained"
              size="large"
              color="brown"
              onClick={handleDelete}
            >
              삭제
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
}
