import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";
import path from "path";
import * as bodyParser from "body-parser";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: "5mb" }));
app.use(cors());

app.get("/download-insta?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "download-insta.html"));
});

app.post("/get-url", (req: Request, res: Response) => {
  const URL: string = `https://snapinsta.to/api/get-url`;
  const { body } = req;
  const formData = new FormData();
  formData.append("l", body.link);
  axios({
    method: "post",
    url: URL,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  }).then((response) => {
    res.send(response.data);
  });
});

app.post("/get-data", (req: Request, res: Response) => {
  const URL: string = `https://snapinsta.to/api/ajaxSearch`;
  const { body } = req;
  const formData = new FormData();
  formData.append("q", body.q);
  formData.append("t", body.t);
  formData.append("l", body.l);
  formData.append("html", body.html);
  axios({
    method: "post",
    url: URL,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  }).then((response) => {
    res.send(response.data);
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
