import { VStack } from "@chakra-ui/react";
import { Heading, Text } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  Flex,
} from "@chakra-ui/react";

import { Formik, Field, Form, useFormikContext } from "formik";
import { useEffect } from "react";

const options = {
  controlFilter: "",
  frameworkFilter: "ALL",
  mappings: true,
  minified: false,
};

const OptionsPanel = ({ setOptions }) => {
  // needed to observe for changes in Formik state
  const FormObserver = () => {
    const { values } = useFormikContext();
    useEffect(() => {
      setOptions(values);

      console.log("FormObserver::onChange", values);
    }, [values]);

    return null;
  };

  return (
    <Flex top="0" pos="sticky" left="5" h="full" flexDir="column">
      <Formik initialValues={options}>
        {({ handleSubmit, errors, touched }) => (
          <Form>
            <FormObserver />
            <VStack
              w={300}
              h="full"
              p={10}
              spacing={10}
              alignItems="flex-start"
            >
              <VStack spacing={3} alignItems="flex-start">
                <Heading as="h2" size="2xl">
                  Options
                </Heading>
                <Text>Use the options below</Text>
              </VStack>

              <VStack spacing={3} alignItems="flex-start">
                <Heading size="xl">Filter</Heading>
                <FormControl>
                  <FormLabel>By Control ID</FormLabel>
                  <Field
                    as={Input}
                    name="controlFilter"
                    placeholder="PR.AC-1"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Framework</FormLabel>
                  <Field as={Select} name="frameworkFilter">
                    <option value="ALL" selected>
                      ALL
                    </option>
                    <option value="SP">NIST 800-53</option>
                    <option value="CSF">NIST CSF</option>
                    <option value="MPA">MPA</option>
                  </Field>
                </FormControl>
                <FormControl>
                  <FormLabel>Catch-all Regex Search</FormLabel>
                  <Field
                    as={Input}
                    name="searchAll"
                    placeholder="risk management"
                  />
                </FormControl>
              </VStack>

              <VStack spacing={3} alignItems="flex-start">
                <Heading size="xl">Display</Heading>
                <FormLabel>Show/Hide</FormLabel>
                <Field as={Checkbox} name="mappings" defaultChecked>
                  Show Mappings
                </Field>
                <Field as={Checkbox} name="minified">
                  Minified Control Cards
                </Field>
              </VStack>
            </VStack>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default OptionsPanel;
