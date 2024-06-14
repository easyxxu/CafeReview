import { Box, List } from "@mui/material";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";

import styled from "@emotion/styled";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { getComment } from "../../apis/apis";
import CommentItem from "./CommentItem";
import { commentsAtom } from "../../atoms/comment";

export default function CommentList(props) {
  const { reviewId } = props;
  const [comments, setComments] = useRecoilState(commentsAtom);

  useEffect(() => {
    const loadComment = async () => {
      const data = await getComment(parseInt(reviewId));
      setComments(data);
    };
    loadComment();
  }, []);

  return (
    <Box
      sx={{
        borderTop: (theme) => `1px solid ${theme.palette.common.brown800}`,
        pt: "10px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <ForumRoundedIcon fontSize="large" sx={{ m: "0 5px" }} />
        <ListTitle>댓글 목록 ({comments.length})</ListTitle>
      </Box>
      <List>
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </List>
    </Box>
  );
}

const ListTitle = styled.span`
  font-size: 24px;
`;
