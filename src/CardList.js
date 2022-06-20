import React, { useContext } from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Badge,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Context } from "./context";

// Custom Avatar component used by Card
const Avatar = (props) => {
  return (
    <Box
      borderRadius="50%"
      boxShadow="xl"
      h="var(--chakra-sizes-16)"
      w="var(--chakra-sizes-16)"
      textAlign="center"
      lineHeight="var(--chakra-sizes-16)"
      fontWeight="bold"
      fontSize=".75rem"
      {...props}
    >
      {props.name}
    </Box>
  );
};

const Card = ({ control }) => {
  const ctx = useContext(Context);
  const [filter, setFilter] = ctx.filter;
  const [detailRefs, setDetailRefs] = ctx.detailRefs;

  // Framework Badge color
  const badgeColor = {
    SP: "green",
    CSF: "purple",
  };

  // Card click will scroll to the appropriate item in DetailList
  const handlerOnClick = () => {
    detailRefs[control.controlId].current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // filter by framework Select box
  if (
    control.framework !== filter?.frameworkFilter &&
    filter?.frameworkFilter !== "ALL"
  ) {
    return null;
  }

  // filter by Control ID
  if (filter?.controlFilter) {
    const regex = new RegExp(filter.controlFilter, "i");
    const controlId = control.controlId;
    const found = controlId.match(regex);

    if (!found) {
      return null;
    }
  }

  // search entire control for a match
  if (filter?.searchAll) {
    const regex = new RegExp(filter.searchAll, "i");
    const controlString = JSON.stringify(control);
    const found = controlString.match(regex);
    if (!found) {
      return null;
    }
  }

  // handle different output dependant on framework
  let title;
  if (control.framework == "SP") {
    title = control.title;
  } else if (control.framework == "CSF") {
    title = control.controlId;
  }

  return (
    <Box
      as="a"
      p="6"
      w="full"
      rounded="lg"
      bg="white"
      boxShadow="sm"
      border="1px"
      borderColor="gray.50"
      _hover={{ border: "1px solid #ddd" }}
      onClick={handlerOnClick}
    >
      <Grid templateColumns="min-content 1fr">
        {/* avatar */}
        <GridItem gridArea="1 / 1 / 2 / 2" pr={5}>
          <Flex flexDir="column">
            <Box>
              <Avatar size="lg" name={control.controlId} fontSize=".75em" />
            </Box>
          </Flex>
        </GridItem>
        {/* title */}
        <GridItem gridArea="1 / 2 / 2 / 3" alignSelf="center">
          <Heading size="md" as="h4">
            {title}
          </Heading>
        </GridItem>
        {/* spacer */}
        <GridItem
          m={3}
          gridArea="2 / 1 / 3 / 3"
          borderBottom="1px"
          borderColor="gray.100"
        ></GridItem>
        {/* badges */}
        <GridItem>
          <Box>
            <Badge variant="subtle" colorScheme={badgeColor[control.framework]}>
              {control.framework}
            </Badge>
          </Box>
        </GridItem>
        {/* more info */}
        <GridItem>
          <Text fontSize="xs" noOfLines={[1, 2, 2, 2, 3]}>
            {control.description}
          </Text>
        </GridItem>
      </Grid>
    </Box>
  );
};

export const CardList = ({ controls }) => {
  return (
    <VStack w="full" h="full" p={5} spacing={5} alignItems="flex-start">
      {controls &&
        controls.map((e, i) => <Card control={e} key={"card" + e.controlId} />)}
    </VStack>
  );
};
