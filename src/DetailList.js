import React, { useContext, useRef } from "react";
import { Box, VStack, Stack, StackDivider } from "@chakra-ui/react";
import { Context } from "./context";

import {
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Badge,
} from "@chakra-ui/react";

// Framework Badge color
const badgeColor = {
  SP: "green",
  CSF: "purple",
};

const TitleSection = ({ label, content, framework, ...props }) => {
  //   if (!content) return null;
  return (
    <Box {...props}>
      <Heading>{label}</Heading>
      <Text color="gray.600">{content}</Text>
      <Badge variant="subtle" colorScheme={badgeColor[framework]}>
        {framework}
      </Badge>
    </Box>
  );
};

const DescriptionSection = ({ label, content, ...props }) => {
  if (!content) return <Box {...props}></Box>;
  return (
    <Box {...props}>
      <Heading>{label}</Heading>
      <Text color="gray.600">{content}</Text>
    </Box>
  );
};

const SupplementalSection = ({ label, content, ...props }) => {
  if (!content) return <Box {...props}></Box>;
  return (
    <Box {...props}>
      <Heading>{label}</Heading>
      <Text color="gray.600">{content}</Text>
    </Box>
  );
};

const LinksSection = ({ control, ...props }) => {
  let family, id, csfFunction, category, enhancement;

  // might be less performant, but cleaner code if I did this with regexs
  [family, id] = control.controlId.split("-");
  //   console.log(family, id);
  if (control.framework == "CSF") {
    [csfFunction, category] = family.split(".");
  } else if (control.framework == "SP") {
    // let idWithEnhancement = [];
    let idWithEnhancement = id.split("(");

    if (idWithEnhancement.length > 1) {
      //   console.log(idWithEnhancement);
      [id, enhancement] = idWithEnhancement;
      enhancement = enhancement.substring(0, enhancement.length - 1);
    }
  }

  const controlIdObj = {
    family: family,
    id: id,
    csfFunction: csfFunction,
    category: category,
    enhancement: enhancement,
  };

  const links = {};

  if (control.framework == "SP") {
    const nistUrl =
      "https://csrc.nist.gov/Projects/risk-management/sp800-53-controls/release-search#/control?version=5.1&number=" +
      controlIdObj.family +
      "-" +
      controlIdObj.id +
      (enhancement ? "#enhancement-" + controlIdObj.enhancement : "");

    const csftoolsUrl =
      "https://csf.tools/reference/nist-sp-800-53/r5/" +
      controlIdObj.family +
      "/" +
      controlIdObj.family +
      "-" +
      controlIdObj.id +
      "/" +
      controlIdObj.family +
      "-" +
      controlIdObj.id +
      (enhancement ? "-" + controlIdObj.enhancement : "");

    links.nistUrl = nistUrl;
    links.csftoolsUrl = csftoolsUrl;
  } else if (control.framework == "CSF") {
    links.nistUrl = "#";
    links.csftoolsUrl = "#";
  }

  return (
    <Box {...props}>
      <Heading>Links</Heading>
      <UnorderedList>
        <ListItem>
          <a href={links.nistUrl} target="_blank" rel="noreferrer">
            NIST (Official)
          </a>
        </ListItem>
        <ListItem>
          <a href={links.csftoolsUrl} target="_blank" rel="noreferrer">
            csf.tools
          </a>
        </ListItem>
      </UnorderedList>
    </Box>
  );
};

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
      {/* <div>{JSON.stringify(control)}</div> */}
      <Stack
        direction={["column", "column", "row", "row"]}
        divider={<StackDivider borderColor="gray.200" />}
      >
        <TitleSection
          label={control.controlId}
          content={control.title}
          framework={control.framework}
          p={6}
          w={["auto", "auto", "30%", "30%"]}
        />
        <DescriptionSection
          label="Control Description"
          content={control.description}
          p={6}
          w={["auto", "auto", "70%", "70%"]}
        />
      </Stack>
      <Stack
        direction={["column", "column", "row", "row"]}
        divider={<StackDivider borderColor="gray.200" />}
      >
        <LinksSection
          control={control}
          w={["auto", "auto", "30%", "30%"]}
          p={6}
        />
        <SupplementalSection
          label="Supplemental Description"
          content={control.description2}
          rounded="lg"
          p={6}
          w={["auto", "auto", "70%", "70%"]}
        />
      </Stack>
    </Box>
  );
};

export const DetailList = ({ controls, refCb }) => {
  return (
    <VStack w="full" h="full" p={5} spacing={5} alignItems="flex-start">
      {controls?.map((e, i) => (
        <Detail control={e} key={"detail" + e.controlId} refCb={refCb} />
      ))}
    </VStack>
  );
};
