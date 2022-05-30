import { VStack } from "@chakra-ui/react";
import { Heading, Text } from "@chakra-ui/react";
import {
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";

import { useFormik } from "formik";
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

  // remove this
  const handleOnChange = (event) => {
    // const name = event.target.name;
    // const value = event.target.value;
    // options[name] = value;
    // console.log("Form::onChange", name, value, options[name]);
    // console.log(options);
    // setOptions(options);
  };

  return (
    <Formik initialValues={options}>
      {({ handleSubmit, errors, touched }) => (
        <Form onChange={handleOnChange}>
          <FormObserver />
          <VStack
            w={300}
            h="full"
            p={10}
            spacing={10}
            alignItems="flex-start"
            // bg="primary"
            borderRight="2px"
            borderColor="primary"
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
                <Field as={Input} name="controlFilter" placeholder="PR.AC-1" />
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

            <VStack spacing={3} alignItems="flex-start">
              {/* <ButtonGroup>
                <Button
                  colorScheme="teal"
                  // isLoading={props.isSubmitting}
                  type="submit"
                >
                  Submit
                </Button>
                <Button>Reset</Button>
              </ButtonGroup> */}
            </VStack>
          </VStack>
        </Form>
      )}
    </Formik>
  );
  //   const formik = useFormik({
  //     initialValues: {
  //       controlFilter: "AC-1",
  //     },
  //     onSubmit: (values) => {
  //       alert(JSON.stringify(values, null, 2));
  //     },
  //   });

  //   return (
  //     <form onSubmit={formik.handleSubmit}>
  //       <VStack
  //         w="container.sm"
  //         h="full"
  //         p={10}
  //         spacing={10}
  //         alignItems="flex-start"
  //         bg="gray.50"
  //       >
  //         <VStack spacing={3} alignItems="flex-start">
  //           <Heading size="2xl">Options</Heading>
  //           <Text>Use the options below</Text>
  //         </VStack>

  //         <VStack spacing={3} alignItems="flex-start">
  //           <Heading size="xl">Filter</Heading>
  //           <FormControl>
  //             <FormLabel>By Control ID</FormLabel>
  //             <Input
  //               name="controlFilter"
  //               onChange={formik.handleChange}
  //               value={formik.values.controlFilter}
  //               placeholder="PR.AC-1"
  //             />
  //           </FormControl>
  //           <FormControl>
  //             <FormLabel>Framework</FormLabel>
  //             <Select placeholder="Select option">
  //               <option value="SP">NIST 800-53</option>
  //               <option value="CSF">NIST CSF</option>
  //               <option value="MPA">MPA</option>
  //             </Select>
  //           </FormControl>
  //         </VStack>

  //         <VStack spacing={3} alignItems="flex-start">
  //           <Heading size="xl">Display</Heading>
  //           <FormLabel>Show/Hide</FormLabel>
  //           <Checkbox name="mappings" defaultChecked>
  //             Mappings
  //           </Checkbox>
  //           <Checkbox name="minified">Minified Control Cards</Checkbox>
  //         </VStack>

  //         <VStack spacing={3} alignItems="flex-start">
  //           <ButtonGroup>
  //             <Button
  //               colorScheme="teal"
  //               // isLoading={props.isSubmitting}
  //               type="submit"
  //             >
  //               Submit
  //             </Button>
  //             <Button>Reset</Button>
  //           </ButtonGroup>
  //         </VStack>
  //       </VStack>
  //     </form>
  //   );
};

export default OptionsPanel;
