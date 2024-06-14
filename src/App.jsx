import { GlobalStyle } from "./styles/GlobalStyles";
import "./styles/font.css";
import Router from "./routes/Router";
import { theme } from "./styles/theme";
import { ThemeProvider } from "@mui/material";
import Layout from "./components/common/Layout";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <GlobalStyle theme={theme} />
          <Layout>
            <Router />
          </Layout>
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
}

export default App;
