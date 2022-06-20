import { Header } from "./Header";
import { CardList } from "../CardList";
import { DetailList } from "../DetailList";

import React, { useState } from "react";
import { Container, Flex, Grid, GridItem, Link } from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";

export const Main = ({ frameworkData }) => {
  // For toggling size of Details List when viewport is small
  const [showExpandedDetails, toggleExpandedDetails] = useState(false);

  // Layout variables for responsiveness
  const mainContainerMaxW = [
    "container.sm",
    "container.md",
    "container.lg",
    "container.xl",
  ];
  const gridSettings = {
    sm: {
      columns: "repeat(auto-fit, minmax(200px, 1fr))",
      rows:
        "min-content auto " + (showExpandedDetails ? "auto" : "min-content"),
      areas: `"header header header" "list list list" "viewer viewer viewer" `,
    },
    xl: {
      columns: "repeat(auto-fit, minmax(200px, 1fr))",
      rows: "min-content auto",
      areas: `"header header header" "list viewer viewer"`,
    },
  };
  const gridCols = [
    gridSettings.sm.columns,
    gridSettings.sm.columns,
    gridSettings.sm.columns,
    gridSettings.xl.columns,
  ];
  const gridRows = [
    gridSettings.sm.rows,
    gridSettings.sm.rows,
    gridSettings.sm.rows,
    gridSettings.xl.rows,
  ];
  const gridAreas = [
    gridSettings.sm.areas,
    gridSettings.sm.areas,
    gridSettings.sm.areas,
    gridSettings.xl.areas,
  ];

  return (
    <Flex justifyContent="center" bg="gray.50">
      <Container m={0} p={0} maxW={mainContainerMaxW}>
        {/* Main Grid */}
        <Grid
          height="100vh"
          templateColumns={gridCols}
          templateRows={gridRows}
          templateAreas={gridAreas}
        >
          {/* Header area */}
          <GridItem area={"header"}>
            <Header />
          </GridItem>

          {/* CardList area */}
          <GridItem area={"list"} overflow="auto">
            <CardList controls={frameworkData} />
          </GridItem>

          {/* DetailList area */}
          <GridItem
            area={"viewer"}
            overflow="auto"
            maxH={
              showExpandedDetails ? "none" : ["150px", "150px", "150px", "none"]
            }
          >
            <Flex
              display={["flex", "flex", "flex", "none"]}
              bg="gray.100"
              justifyContent="space-evenly"
              pos="sticky"
              top="0"
            >
              <Link
                onClick={() => {
                  if (showExpandedDetails) toggleExpandedDetails(false);
                  else toggleExpandedDetails(true);
                }}
              >
                {showExpandedDetails ? "Collapse" : "Expand"} View
                {showExpandedDetails ? <ChevronDownIcon /> : <ChevronUpIcon />}
              </Link>
            </Flex>
            <DetailList controls={frameworkData} />
          </GridItem>
        </Grid>
      </Container>
    </Flex>
  );
};
