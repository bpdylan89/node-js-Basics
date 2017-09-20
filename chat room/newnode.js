exports.DateTime = function () {
    var dateFormat = require('dateformat');
    var time = new Date();
    return dateFormat(time, 'longTime');
};
