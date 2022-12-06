require("dotenv").config();

const express = require("express");
const server = require("./server/server");

const app = server(express());

app.listen(4000, () =>
  console.log(`Server on port ${app.get("port")}`)
);
