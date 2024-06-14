import {
  Box,
  Card,
  CardContent,
  Chip,
  ListItem,
  ListItemText,
} from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

import { TAG } from "../SideMenu/SideMenu";
import { getIconByTagType } from "./ReviewItem";

export default function ReviewCard(props) {
  const { review } = props;
  return (
    <ListItem sx={{ p: 0 }}>
      <Card
        sx={{
          width: "100%",
          "& p": {
            mb: "7px",
          },
        }}
      >
        <CardContent>
          <ListItemText primary={review.title} secondary={review.address} />
          {review.tag
            .sort((a, b) => {
              return TAG[a].localeCompare(TAG[b]);
            })
            .map((item, idx) => (
              <Chip
                key={idx}
                icon={getIconByTagType(item)}
                sx={{ m: "3px", pl: "12px" }}
              />
            ))}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            mt="10px"
          >
            <StarRoundedIcon sx={{ mr: "1px" }} />
            <span>{review.rating}</span>
          </Box>
        </CardContent>
      </Card>
    </ListItem>
  );
}
