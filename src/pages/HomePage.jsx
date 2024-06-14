import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ViewHeadlineRoundedIcon from "@mui/icons-material/ViewHeadlineRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { getReviews } from "../apis/apis";
import ReviewList from "../components/Review/ReviewList";
import SideMenu from "../components/SideMenu/SideMenu";
import { filterListAtom, listViewAtom } from "../atoms/review";

const options = ["정렬 방식", "최신순", "평점 높은순"];

export default function HomePage(props) {
  const [allReviews, setAllReviews] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [listView, setListView] = useRecoilState(listViewAtom);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [filterList, setFilterList] = useRecoilState(filterListAtom);
  const open = Boolean(anchorEl);

  const loadReviews = async () => {
    const res = await getReviews();
    setReviews(res.data);
    setAllReviews(res.data);
  };

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggleButton = (event, listView) => {
    if (listView !== null) setListView(listView);
  };

  const sortReviews = () => {
    let sortedReviews;
    switch (selectedIndex) {
      case 1: // 최신순
        sortedReviews = [...reviews].sort(
          (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
        );
        break;
      case 2: // 평점 높은순
        sortedReviews = [...reviews].sort((a, b) => b.rating - a.rating);
        break;
      default:
        sortedReviews = reviews;
    }
    setReviews(sortedReviews);
  };

  const filteringReviews = () => {
    const filteredReviews = allReviews.filter((review) =>
      filterList.every((tag) => review.tag.includes(tag))
    );
    setReviews(filteredReviews);
    setSelectedIndex(1);
  };

  useEffect(() => {
    loadReviews();
    setFilterList([]);
  }, []);

  useEffect(() => {
    filteringReviews();
  }, [filterList]);

  useEffect(() => {
    sortReviews();
  }, [selectedIndex]);
  return (
    <>
      <Box display="flex" gap={10}>
        <Box sx={{ width: "100%" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              bgcolor: (theme) => `${theme.palette.common.brown200}`,
              p: "4px 8px",
              borderRadius: "3px",
              color: "white",
            }}
          >
            <ListTitle>리뷰 목록</ListTitle>
            <Box display="flex" justifyContent="flex-end" alignItems="center">
              <List aria-label="Sort List">
                <ListItemButton
                  id="sort-button"
                  aria-haspopup="listbox"
                  aria-controls="sort-menu"
                  aria-label="sort-button"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClickListItem}
                >
                  <ListItemText primary={options[selectedIndex]} />
                  <KeyboardArrowDownRoundedIcon />
                </ListItemButton>
              </List>
              <Menu
                id="sort-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "sort-button",
                  role: "listbox",
                }}
              >
                {options.map((option, index) => (
                  <MenuItem
                    key={option}
                    disabled={index === 0}
                    selected={index === selectedIndex}
                    onClick={() => handleMenuItemClick(index)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
              <ToggleButtonGroup
                sx={{
                  bgcolor: (theme) => `${theme.palette.common.brown300}`,
                }}
                exclusive
                value={listView}
                onChange={handleToggleButton}
              >
                <ToggleButton value="LIST">
                  <ViewHeadlineRoundedIcon sx={{ color: "white" }} />
                </ToggleButton>
                <ToggleButton value="GRID">
                  <GridViewRoundedIcon sx={{ color: "white" }} />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>
          <Box
            sx={{
              border: (theme) => `1px solid ${theme.palette.common.brown100}`,
              borderRadius: "3px",
              bgcolor: (theme) => `${theme.palette.common.brown50}`,
            }}
          >
            <Box display="flex" justifyContent="center">
              <SideMenu />
            </Box>
            <ReviewList reviews={reviews} />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export const ListTitle = styled.h2`
  font-size: 32px;
`;
