import { Box, Chip, ListItem, ListItemText } from "@mui/material";
import LocalCafeRoundedIcon from "@mui/icons-material/LocalCafeRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

import { filterList, TAG } from "../SideMenu/SideMenu";

export const getIconByTagType = (type) => {
  const tag = filterList.find((item) => item.type === type);
  return tag ? tag.icon : null;
};

export default function ReviewItem(props) {
  const { review } = props;
  return (
    <ListItem>
      <LocalCafeRoundedIcon fontSize="large" color="brown" sx={{ mr: "8px" }} />
      <ListItemText primary={review.title} secondary={review.address} />
      {review.tag
        .sort((a, b) => {
          return TAG[a].localeCompare(TAG[b]);
        })
        .map((item, idx) => (
          <Chip
            key={idx}
            icon={getIconByTagType(item)}
            sx={{ m: "5px", pl: "12px" }}
          />
        ))}
      <Box display="flex" alignItems="center">
        <StarRoundedIcon sx={{ mr: "1px" }} />
        <span>{review.rating}</span>
      </Box>
    </ListItem>
  );
}
