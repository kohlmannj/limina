/* eslint-disable @typescript-eslint/no-unused-vars */
exports.text = (label, value) => value;
exports.boolean = (label, value) => value;
exports.number = (label, value, options) => value;
exports.color = (label, value) => value;
exports.object = (label, value) => value;
exports.array = (label, value, separator = ',') => value;
exports.select = (label, options, value) => value;
exports.date = (label, value) => value;
