import { VStack } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";

import { ControlCard } from "../cards";

const ResultsPanel = ({ controlContext, options }) => {
  const sp = controlContext.sp;
  const csf = controlContext.csf;
  const all = controlContext.all;
  console.log("ResultPanel: ", options);

  return (
    <VStack
      w="full"
      h="full"
      p={10}
      spacing={10}
      alignItems="flex-start"
      bg="white"
    >
      <Heading as="h2" size="2xl"></Heading>
      {all &&
        all.map((i, index) => (
          <ControlCard
            key={i.controlId || i.NAME}
            control={i}
            options={options}
            datakey={i.controlId || i.NAME}
          />
        ))}
    </VStack>
  );
};

export default ResultsPanel;
