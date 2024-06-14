import { Box, Button } from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import SearchInput from "../Search/SearchInput";

export default function Header(props) {
  const navigate = useNavigate();

  return (
    <HeaderWrap>
      <h1>
        <Link to="/">
          <Box display="flex" alignItems="center">
            Cafe
            <FavoriteRoundedIcon sx={{ fontSize: "40px" }} />
          </Box>
        </Link>
      </h1>
      <SearchInput />
      <Button
        variant="contained"
        color="brown"
        size="large"
        type="button"
        onClick={() => navigate("/review/write")}
      >
        <CreateOutlinedIcon sx={{ mr: "10px" }} fontSize="small" />
        리뷰 작성하기
      </Button>
    </HeaderWrap>
  );
}

const HeaderWrap = styled.header`
  display: flex;
  justify-content: space-between;
  margin: 24px 0;
  align-items: center;
`;
