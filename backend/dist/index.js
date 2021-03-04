"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _requestLogger = _interopRequireDefault(require("./middleware/requestLogger"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose.default.connect('mongodb://localhost:27017/keepitdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB')).catch(error => console.error('Could not connect to MongoDB', error));

const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use((0, _requestLogger.default)());
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(4000, () => console.log('Server is running on http://localhost:4000'));