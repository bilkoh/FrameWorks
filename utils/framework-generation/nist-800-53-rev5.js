const https = require("https");
const fs = require("fs");

// source for initial list of controls
// we'll have to populate the rest of the needed later
const sourceUrl =
  "https://csrc.nist.gov/CSRC/media/Projects/risk-management/800-53%20Downloads/800-53r5/NIST_SP-800-53_rev5_catalog_load.csv";

// trying to have a consisting schema for these frameworks
// key = what source file column/key is
// value = what we want the new key to be after processing
const keySchema = {
  identifier: "controlId",
  name: "title",
  control_text: "description",
  discussion: "description2",
  related: "related",
};

// ripped from stackoverflow
function parseCSV(str) {
  var arr = [];
  var quote = false;
  for (var row = (col = c = 0); c < str.length; c++) {
    var cc = str[c],
      nc = str[c + 1];
    arr[row] = arr[row] || [];
    arr[row][col] = arr[row][col] || "";

    if (cc == '"' && quote && nc == '"') {
      arr[row][col] += cc;
      ++c;
      continue;
    }
    if (cc == '"') {
      quote = !quote;
      continue;
    }
    if (cc == "," && !quote) {
      ++col;
      continue;
    }
    if (cc == "\n" && !quote) {
      ++row;
      col = 0;
      continue;
    }

    arr[row][col] += cc;
  }
  return arr;
}

// when we want to map the headers (first row) of csv to the keys
function addHeadersAsKeys(parsedCsvArray, schema = false) {
  const headers = parsedCsvArray.shift();

  const newCsvArray = [];
  parsedCsvArray.forEach((element, index) => {
    const rowObject = {};
    headers.forEach((e, i) => {
      if (e && e !== "\r") {
        let key;
        if (schema) {
          key = schema[e];
        } else {
          key = e;
        }
        rowObject[key] = element[i];
      }
    });

    newCsvArray.push(rowObject);
  });

  return newCsvArray;
}

// get request -> process -> save
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
      const array = addHeadersAsKeys(parseCSV(output), keySchema);
      console.log(array);
      fs.writeFileSync(
        "json-output/nist-800-53-rev5.json",
        JSON.stringify(array)
      );
    });
  })
  .on("error", function (e) {
    console.error(e);
  });
