// Setup required for running the tests.
const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

enzyme.configure({adapter: new Adapter()});

const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

require("ts-node").register();

require.extensions['.css'] = () => {
};

require.extensions['.svg'] = () => {
};

var jsdom = require('jsdom');
const {JSDOM} = jsdom;

const {document} = (new JSDOM('')).window;
global.document = document;