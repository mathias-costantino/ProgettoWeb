"use strict";

/* ===== Libraries and Node Modules ===== */

const fs = require('fs');

const express = require('express');
const appDataRouter = express.Router();

const {check, oneOf, validationResult, checkSchema} = require('express-validator');

const AppData_DB_Manager = require('../bin/applicazioneDAO');
const appDataDAO = new AppData_DB_Manager();


appDataRouter.use(express.json());

module.exports = appDataRouter;