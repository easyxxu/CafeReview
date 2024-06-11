import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import SearchInput from "../Search/SearchInput";
import Button from "@mui/material/Button";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";

export default function Header(props) {
  return (
    <HeaderWrap>
      <h1>
        <Link to="/">Java Buzz</Link>
      </h1>
      <SearchInput />
      <Button variant="contained" color="brown" size="large" type="button">
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
`;
