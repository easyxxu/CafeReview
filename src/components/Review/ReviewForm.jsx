import { Box, Paper } from "@mui/material";

export default function ReviewForm(props) {
  return (
    <>
      <h2>리뷰 작성하기</h2>
      <Box component="form">
        <Paper>
          <InputBase required />
        </Paper>
      </Box>
    </>
  );
}
