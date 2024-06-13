import {
  Button,
  Container,
  IconButton,
  InputBase,
  Paper,
  TextField,
  Box,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useState } from "react";
import styled from "@emotion/styled";
import {
  addComment,
  deleteComment,
  getCommentById,
  modifyComment,
} from "../../apis/apis";
import { commentFormInfoAtom, commentsAtom } from "../../atoms/comment";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";

export const PWREGEX = /^\d{4,8}$/;
const MESSAGE = {
  PW_VALIDATION: "4~8자리로 구성된 숫자",
  PW_INVALID_ERROR: "잘못된 비밀번호",
  PW_INCORRECT_ERROR: "일치하지 않는 비밀번호",
};

export default function CommentForm(props) {
  const { reviewId } = props;
  const [commentInput, setCommentInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState(MESSAGE.PW_VALIDATION);
  const [commentFormInfo, setCommentFormInfo] =
    useRecoilState(commentFormInfoAtom);
  const [modifyValue, setModifyValue] = useState("");
  const setComments = useSetRecoilState(commentsAtom);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let commentForm;

    if (!commentInput) return;

    if (!checkValidation(password)) {
      setError(true);
      setPasswordMsg(MESSAGE.PW_INVALID_ERROR);
      return;
    }

    const now = new Date().toISOString();

    if (commentFormInfo.type === "ADD") {
      commentForm = {
        content: commentInput,
        author: "익명의 작성자",
        createdDate: now,
        password: parseInt(password),
        reviewId: parseInt(reviewId),
      };
      const res = await addComment(commentForm);
      const data = res.data;
      setComments((prev) => [...prev, data]);
      console.log("Add Comment: ", res);
    } else if (commentFormInfo.type === "MODIFY") {
      commentForm = {
        content: commentInput,
        modifiedDate: now,
      };
      const res = await modifyComment(commentFormInfo.commentId, commentForm);
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentFormInfo.commentId ? res.data : comment
        )
      );
      setCommentFormInfo({ ...commentForm, type: "ADD" });
      console.log("Modify Comment: ", res.data);
    }
    setPassword("");
    setCommentInput("");
    setError(false);
    setPasswordMsg(MESSAGE.PW_VALIDATION);
  };

  const checkValidation = (password) => {
    const result = PWREGEX.test(password);
    console.log("validation result: ", result);
    return result;
  };

  const handleDelete = async () => {
    setCommentFormInfo((prev) => ({ ...prev, type: "DELETE" }));
    const res = await deleteComment(commentFormInfo.commentId, password);

    if (res.status === 200) {
      setComments((prev) =>
        prev.filter((comment) => comment.id !== commentFormInfo.commentId)
      );
      setPasswordMsg(MESSAGE.PW_VALIDATION);
      setPassword("");
      setError(false);
      setCommentInput("");
      console.log("Deleted Comment");
    } else if (res.status === 403) {
      // 비밀번호 일치 X
      setError(true);
      setPasswordMsg(MESSAGE.PW_INCORRECT_ERROR);
      return;
    } else {
      setError(true);
      setPasswordMsg(res.data.message);
      return;
    }
    setCommentFormInfo((prev) => ({ ...prev, type: "ADD" }));
  };
  const handleCancel = () => {
    setCommentFormInfo((prev) => ({ ...prev, type: "ADD" }));
    setCommentInput("");
    setError(false);
    setPassword("");
    setPasswordMsg(MESSAGE.PW_VALIDATION);
  };
  useEffect(() => {
    const loadCommentById = async () => {
      const res = await getCommentById(commentFormInfo.commentId);
      setCommentInput(res.data.content);
    };
    if (commentFormInfo.type === "MODIFY") {
      loadCommentById();
    }
  }, [commentFormInfo]);

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.common.brown800}`,
          pt: "10px",
        }}
      >
        <p>댓글 작성</p>
        <Paper
          sx={{
            borderRadius: 1,
            p: "2px 4px",
          }}
        >
          <InputBase
            required
            sx={{ ml: 1, display: "flex", alignItems: "center", pt: "8px" }}
            onChange={(e) => setCommentInput(e.target.value)}
            minRows={3}
            maxRows={3}
            multiline={true}
            placeholder={
              commentFormInfo.type === "ADD" ? "댓글을 작성해보세요!" : null
            }
            value={commentInput}
          />
        </Paper>
        <Box sx={{ mt: "8px" }}>
          <TextField
            required
            error={error}
            id="password"
            type="password"
            variant="filled"
            label="비밀번호"
            color="brown"
            // margin="normal"
            helperText={passwordMsg}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {commentFormInfo.type === "MODIFY" && (
            <>
              <Button
                variant="contained"
                color="brown"
                type="submit"
                // sx={{ flex: "1 0 10px" }}
                size="large"
                onClick={handleCancel}
              >
                취소
              </Button>
              <Button
                variant="contained"
                color="brown"
                type="submit"
                // sx={{ flex: "1 0 10px" }}
                size="large"
                onClick={handleDelete}
              >
                삭제
              </Button>
            </>
          )}
          <Button
            variant="contained"
            color="brown"
            type="submit"
            // sx={{ flex: "1 0 10px" }}
            size="large"
          >
            {commentFormInfo.type === "ADD" ? "등록" : "수정"}
          </Button>
        </Box>
      </Box>
    </>
  );
}
