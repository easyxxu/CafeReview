import { Box, Chip, List } from "@mui/material";
import StrollerRoundedIcon from "@mui/icons-material/StrollerRounded";
import Diversity3RoundedIcon from "@mui/icons-material/Diversity3Rounded";
import BakeryDiningRoundedIcon from "@mui/icons-material/BakeryDiningRounded";
import LaptopChromebookRoundedIcon from "@mui/icons-material/LaptopChromebookRounded";
import { useRecoilState } from "recoil";
import { filterListAtom } from "../../atoms/review";

export const TAG = {
  WITH_FAMILY: "가족과 함께",
  WITH_BEST_DESSERT: "디저트가 맛있는",
  WITH_CHILD: "아이와 함께",
  WITH_WORK: "작업하기 좋은",
};

export const filterList = [
  {
    name: TAG.WITH_FAMILY,
    type: "WITH_FAMILY",
    icon: <Diversity3RoundedIcon />,
  },
  {
    name: TAG.WITH_BEST_DESSERT,
    type: "WITH_BEST_DESSERT",
    icon: <BakeryDiningRoundedIcon />,
  },
  { name: TAG.WITH_CHILD, type: "WITH_CHILD", icon: <StrollerRoundedIcon /> },
  {
    name: TAG.WITH_WORK,
    type: "WITH_WORK",
    icon: <LaptopChromebookRoundedIcon />,
  },
];
export default function SideMenu(props) {
  const [filtering, setFiltering] = useRecoilState(filterListAtom);

  const handleClick = (tag) => {
    setFiltering((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
    );
  };

  return (
    <Box>
      <List>
        {filterList.map((filter) => (
          <Chip
            key={filter.name}
            label={filter.name}
            variant={filtering.includes(filter.type) ? "filled" : "outlined"}
            color="brown"
            icon={filter.icon}
            onClick={() => handleClick(filter.type)}
            sx={{ m: "5px", p: "2px 4px" }}
          />
        ))}
      </List>
    </Box>
  );
}
