import { Box, Button, ListItem } from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

import { useSetRecoilState } from "recoil";
import { commentFormInfoAtom } from "../../atoms/comment";

export default function CommentItem(props) {
  const { comment } = props;
  const setCommentFormInfo = useSetRecoilState(commentFormInfoAtom);
  const handleModify = () => {
    setCommentFormInfo({ type: "MODIFY", commentId: comment.id });
  };
  return (
    <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <PersonRoundedIcon sx={{ mr: "4px" }} />
        <span>{comment.content}</span>
      </Box>
      <Box>
        <Button variant="contained" color="brown" onClick={handleModify}>
          수정
        </Button>
      </Box>
    </ListItem>
  );
}
