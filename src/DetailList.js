import React, { useContext, useRef } from "react";
import { Box, VStack } from "@chakra-ui/react";
import { Context } from "./context";

const Detail = ({ control, refCb }) => {
  const myRef = useRef(null);
  const ctx = useContext(Context);
  const [filter, setFilter] = ctx.filter;
  const [detailRefs, setDetailRefs] = ctx.detailRefs;

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

  detailRefs[control.controlId] = myRef;
  setDetailRefs(detailRefs);

  return (
    <Box
      ref={myRef}
      p="6"
      w="full"
      rounded="lg"
      bg="white"
      boxShadow="sm"
      border="1px"
      borderColor="gray.50"
    >
      {/* <div>{JSON.stringify(this.control)}</div> */}
      <Box>{control.title}</Box>
      <Box>{control.controlId}</Box>
      <Box>{control.description}</Box>
      <Box>{control.description2}</Box>
    </Box>
  );
};

export const DetailList = ({ controls, refCb }) => {
  return (
    <VStack w="full" h="full" p={5} spacing={5} alignItems="flex-start">
      {controls &&
        controls.map((e, i) => (
          <Detail control={e} key={"detail" + e.controlId} refCb={refCb} />
        ))}
    </VStack>
  );
};
