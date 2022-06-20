import { useState } from "react";
import { Flex, Box, Heading, Link, Text, Image } from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";

import { Filter } from "../Filter";

export const Header = () => {
  const [showFilterMenu, toggleFilterMenu] = useState(false);

  return (
    <Box bg="white" boxShadow="sm">
      <Flex
        flexDir={["column", "column", "column", "row"]}
        alignItems="stretch"
      >
        <Box flexGrow={1} boxShadow="xs" p={2}>
          <Heading as="h1" size="lg">
            FrameWorks
          </Heading>
        </Box>
        <Box flexGrow={[1, 1, 1, 5]} p={2} boxShadow="xs">
          <Link
            onClick={() => {
              if (showFilterMenu) toggleFilterMenu(false);
              else toggleFilterMenu(true);
            }}
          >
            <SearchIcon mr={3} />
            Filter/Display Options
            {showFilterMenu ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </Link>
          <Box p={2} display={showFilterMenu ? "auto" : "none"}>
            <Filter />
          </Box>
        </Box>
        <Flex p={3} boxShadow="xs" alignItems={"center"}>
          Repo:
          <a
            href="https://github.com/bilkoh/FrameWorks"
            target="_blank"
            rel="noreferrer"
          >
            <Image p={2} src={["GitHub-Mark-32px.png"]} alt="GitHub" />
          </a>
        </Flex>
      </Flex>
    </Box>
  );
};
