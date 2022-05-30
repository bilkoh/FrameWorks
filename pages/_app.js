import "../styles/globals.css";
import { ChakraProvider, theme, CSSReset } from "@chakra-ui/react";
import { customTheme } from "../styles/customTheme";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={customTheme}>
      <CSSReset />
      <Component {...pageProps} />;
    </ChakraProvider>
  );
};

export default MyApp;
