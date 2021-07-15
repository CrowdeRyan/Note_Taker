const express = require("express");
// experimenting with this a little, Let's see how it goes
const { v1: uuidv1 } = require("uuid");
const path = require("path");
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
