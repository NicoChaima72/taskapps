require("dotenv").config();

const express = require("express");
const server = require("./server/server");

const app = server(express());

app.listen(process.env.PORT, () => console.log(`Server on port ${app.get("port")}`));
