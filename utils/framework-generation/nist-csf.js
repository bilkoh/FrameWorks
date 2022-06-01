const https = require("https");
const fs = require("fs");
const xpath = require("xpath");
const dom = require("xmldom").DOMParser;

// source for initial list of controls
// we'll have to populate the rest of the needed later
const sourceUrl = "https://pages.nist.gov/sctools/bt-model/core.xml";

const functionSchema = {
  ID: "Identify",
  PR: "Protect",
  DE: "Detect",
  RS: "Respond",
  RC: "Recover",
};

function xmlControlsToJson(xmlString) {
  const controls = [];

  const doc = new dom().parseFromString(xmlString);

  // how we find all the controls we need to iterate over
  const nodes = xpath.select("//subCategory", doc);

  nodes.forEach((e, i) => {
    const controlId = e.getAttribute("id");

    const description = xpath.select(
      "string(//subCategory[@id='" + controlId + "']/description)",
      doc
    );

    const spControls = [];
    xpath
      .select("//subCategory[@id='" + controlId + "']/sp800-53/control", doc)
      .forEach((p, ii) => spControls.push(p.childNodes[0].nodeValue));

    const category = {
      name: xpath.select(
        "string(//subCategory[@id='" + controlId + "']/../name)",
        doc
      ),
      description: xpath.select(
        "string(//subCategory[@id='" + controlId + "']/../description)",
        doc
      ),
    };

    // we derive this ourselves
    const functionCode = controlId.split(".")[0];
    const functionName = functionSchema[functionCode];

    // all this goes into a tidy object
    const control = {
      controlId: controlId,
      description: description,
      spControls: spControls,
      category: category,
      functionCode: functionCode,
      functionName: functionName,
    };

    controls.push(control);
  });

  return JSON.stringify(controls);
}

https
  .get(sourceUrl, function (res) {
    let data = [];
    console.log("statusCode: ", res.statusCode);
    console.log("headers: ", res.headers);

    res.on("data", function (d) {
      //   process.stdout.write(d);
      data.push(d);
    });

    res.on("end", () => {
      const output = Buffer.concat(data).toString();
      const controlsJson = xmlControlsToJson(output);
      console.log(controlsJson);
      fs.writeFileSync("json-output/nist-csf.json", controlsJson);
    });
  })
  .on("error", function (e) {
    console.error(e);
  });
