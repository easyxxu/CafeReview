import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputBase, Paper } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchInput(props) {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    navigate(`/search/${searchInput}`);
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
      }}
      onSubmit={handleSearchSubmit}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="리뷰를 검색해보세요"
        inputProps={{ "aria-label": "search reviews" }}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <IconButton aria-label="search" type="submit">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
