export const getAllSP = () => {
  return require("../data/800-53.json");
};

export const getAllCSF = () => {
  return require("../data/csf_with_sp_mappings.json");
};

export const getAllFrameworks = () => {
  // Original json data doesn't identify each element
  // with the framework it belongs to. We're fixing that here.
  const sp = getAllSP().map((element) => {
    element.FRAMEWORK = "SP";
    return element;
  });

  const csf = getAllCSF().map((element) => {
    element.FRAMEWORK = "CSF";
    return element;
  });

  // combine all frameworks into one array
  return [...sp, ...csf];
  // return sp.concat(csf);
};
