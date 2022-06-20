import React, { useContext, useEffect } from "react";
import { FormControl, Input, Flex } from "@chakra-ui/react";
import { Formik, Field, Form, useFormikContext } from "formik";
import { Context } from "./context";
import { FormLabel, Select, Checkbox, Box, Stack } from "@chakra-ui/react";

// TODO: add checkbox to exclude enhancedments
const options = {
  controlFilter: "",
  frameworkFilter: "ALL",
  mappings: true,
  minified: false,
};

export const Filter = () => {
  const ctx = useContext(Context);
  const [, setFilter] = ctx.filter;
  const FormObserver = () => {
    const { values } = useFormikContext();
    useEffect(() => {
      // setOptions(values);
      setFilter(values);

      console.log("FormObserver::onChange", values);
    }, [values]);

    return null;
  };

  return (
    <Flex>
      <Formik initialValues={options}>
        {({ handleSubmit, errors, touched }) => (
          <Form>
            <FormObserver />
            <Flex
              direction="row"
              flexWrap="wrap"
              // spacing={1}
              alignItems="flex-start"
              justifyContent={["flex-start", "flex-start", "space-around"]}
            >
              <Box m={3}>
                <FormControl>
                  <FormLabel>By Control ID</FormLabel>
                  <Field
                    as={Input}
                    name="controlFilter"
                    placeholder="PR.AC-1"
                  />
                </FormControl>
              </Box>
              <Box m={3}>
                <FormControl>
                  <FormLabel>Framework</FormLabel>
                  <Field as={Select} name="frameworkFilter">
                    <option value="ALL" selected>
                      ALL
                    </option>
                    <option value="SP">NIST 800-53</option>
                    <option value="CSF">NIST CSF</option>
                  </Field>
                </FormControl>
              </Box>
              <Box m={3}>
                <FormControl>
                  <FormLabel>Catch-all Regex Search</FormLabel>
                  <Field
                    as={Input}
                    name="searchAll"
                    placeholder="risk management"
                  />
                </FormControl>
              </Box>
              <Stack direction="row" spacing={3} alignItems="flex-start">
                <FormLabel>Show/Hide:</FormLabel>
                <Field as={Checkbox} name="mappings" defaultChecked>
                  Show Mappings
                </Field>
                <Field as={Checkbox} name="minified">
                  Minified Control Cards
                </Field>
              </Stack>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};
