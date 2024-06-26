import { Container } from "@mui/material";
import Header from "./Header";

export default function Layout(props) {
  const { children } = props;
  return (
    <Container sx={{ mb: "30px" }}>
      <Header />
      <main>{children}</main>
    </Container>
  );
}
