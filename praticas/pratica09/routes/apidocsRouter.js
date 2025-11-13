const express = require('express');
const swaggerUI = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yaml');
const path = require('path');

const router = express.Router();

const swaggerPath = path.join(__dirname, '..', 'swagger.yaml');

const file = fs.readFileSync(swaggerPath, 'utf8');

const swaggerDocument = YAML.parse(file);

router.use('/', swaggerUI.serve);

router.get('/', swaggerUI.setup(swaggerDocument));

module.exports = router;
