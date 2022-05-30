import { Box, Heading, Text, Grid, GridItem } from "@chakra-ui/react";

const ControlCard = ({ control, options }) => {
  // determine whether we load this card based on filter options
  if (
    control.FRAMEWORK !== options.frameworkFilter &&
    options.frameworkFilter !== "ALL"
  ) {
    return null;
  }

  // filter by Control ID
  if (options.controlFilter) {
    const regex = new RegExp(options.controlFilter, "i");
    const controlID = control["NAME"];
    const found = controlID.match(regex);

    console.log("filter by Control ID", controlID, regex, found);
    if (!found) {
      return null;
    }
  }

  // search entire control for a match
  if (options.searchAll) {
    const regex = new RegExp(options.searchAll, "i");
    const controlString = JSON.stringify(control);
    const found = controlString.match(regex);
    if (!found) {
      return null;
    }
  }

  // determine to filter out based on framework selection
  let card;
  if (control.FRAMEWORK == "SP") {
    card = <SpCard control={control} />;
  } else if (control.FRAMEWORK == "CSF") {
    card = <CsfCard control={control} />;
  }

  return (
    <Box
      // as="a"
      w="full"
      // borderWidth="2px"
      // borderColor="black"
      rounded="lg"
      flexBasis={["auto", "45%"]}
      borderWidth="2px"
      borderColor="primary"
    >
      {card}
    </Box>
  );
};

const ControlField = ({ label, value }) => {
  if (value) {
    return (
      <>
        <GridItem colSpan={1} p="2" textAlign="right">
          <b>{label}:</b>
        </GridItem>
        <GridItem colSpan={4} p="2">
          {value}
        </GridItem>
      </>
    );
  }
  return null;
};

const SpCard = ({ control }) => {
  return (
    <>
      <Heading as="h3" size="2xl" p="4" bg="secondary" roundedTop="lg">
        {control["NAME"]}
        <Box float="right">800-53</Box>
      </Heading>
      <Grid templateColumns="repeat(5, 1fr)">
        <ControlField label="Title" value={control["TITLE"]} />
        <ControlField label="Family" value={control["FAMILY"]} />
        <ControlField label="Priority" value={control["PRIORITY"]} />
        <ControlField label="Impact" value={control["BASELINE-IMPACT"]} />
        <ControlField label="Description" value={control["DESCRIPTION"]} />
        <ControlField
          label="Supplemental Guidance"
          value={control["SUPPLEMENTAL GUIDANCE"]}
        />
        <ControlField
          label="Related Controls"
          value={control["RELATED"].join(", ")}
        />
      </Grid>
    </>
  );
};

const CsfCard = ({ control }) => {
  return (
    <>
      <Heading as="h3" size="2xl" p="4" bg="secondary" roundedTop="lg">
        {control["NAME"]}
        <Box float="right">CSF</Box>
      </Heading>
      <Grid templateColumns="repeat(5, 1fr)">
        <ControlField
          label="Function"
          value={control["FUNCTION_CODE"] + " - " + control["FUNCTION"]}
        />
        <ControlField label="Category" value={control["CATEGORY"]} />
        <ControlField
          label="Category Description"
          value={control["CATEGORY_DESCRIPTION"]}
        />
        <ControlField label="Description" value={control["DESCRIPTION"]} />
      </Grid>
    </>
  );
};

export default ControlCard;
