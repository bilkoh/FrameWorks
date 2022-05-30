import {
  getAllSP,
  getAllCSF,
  getAllFrameworks,
} from "../../../utils/framework-data";

export default function handler(req, res) {
  const { slug } = req.query;

  switch (slug[0].toUpperCase()) {
    case "SP":
      res.status(200).json(getAllSP());
      break;
    case "CSF":
      res.status(200).json(getAllCSF());
      break;
    case "ALL":
      res.status(200).json(getAllFrameworks());
      break;
    default:
      res.status(406).end("Invalid Query.");
  }
}
