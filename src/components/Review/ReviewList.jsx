import { List } from "@mui/material";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { listViewAtom } from "../../atoms/review";
import ReviewCard from "./ReviewCard";
import ReviewItem from "./ReviewItem";

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "12px",
  padding: "12px",
};
export default function ReviewList(props) {
  const { reviews } = props;
  const listView = useRecoilValue(listViewAtom);
  return (
    <>
      <List sx={{ width: "100%", ...(listView === "GRID" && gridStyle) }}>
        {reviews.map((review) => (
          <Link to={`/review/${review.id}`} key={review.id}>
            {listView === "LIST" ? (
              <ReviewItem review={review} />
            ) : (
              <ReviewCard review={review} />
            )}
          </Link>
        ))}
      </List>
    </>
  );
}
