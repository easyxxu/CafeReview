import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SearchInput(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const [searchInput, setSearchInput] = useState("");

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    navigate(`/search/${searchInput}`);
  };

  useEffect(() => {
    if (!path.includes("search")) {
      setSearchInput("");
    }
  }, [path]);

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
        value={searchInput}
      />
      <IconButton aria-label="search" type="submit">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
