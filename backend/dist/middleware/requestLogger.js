"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = requestLogger;

function requestLogger() {
  return (req, res, next) => {
    console.log(req.method, req.body, req.url);
    next();
  };
}