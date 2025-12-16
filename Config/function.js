const ObjectId = require("mongoose").Types.ObjectId;

const isValidObjectId = function (id) {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
};
const isEmpty = (value) => {
  if (!value) return false;
  else true;
};
const isValidPassword = function (value) {
  if (
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(
      value
    ) == true
  ) {
    return true;
  } else return false;
};
const isValidEmail = function (value) {
  if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(value)) {
    return true;
  } else return false;
};

const toTitleCase = function (str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

const phonenumber = function (value) {
  if (/^\d{10}$/.test(value)) {
    return true;
  } else return false;
};

const isValidReqBody = function (value) {
  if (Object.keys(value).length == 0) {
    return false;
  } else return true;
};

const isValid = function (value) {
  if (typeof value == "undefined" || typeof value == null) {
    return false;
  }
  if (typeof value == "string" && value.trim().length == 0) {
    return false;
  }
  if (typeof value == "number" && value.toString().trim().length == 0) {
    return false;
  }
  return true;
};

const isValidString = function (value) {
  if (!/^[A-Za-z ]+$/.test(value)) {
    return false;
  }
  if (value.length < 3) {
    return false;
  }
  if (value.length > 25) {
    return false;
  } else return true;
};

const validUrl = (value) => {
  if (
    !/(ftp|http|https|FTP|HTTP|HTTPS):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(
      value.trim()
    )
  ) {
    return false;
  }
  return true;
};
// ^(1[0-2]|0?[1-9]):([0-5]?[0-9])(●?[AP]M)?$
function isValidTime(value) {
  // var regEx = /^\d{2}:\d{2}-\d{2}$/;
  var regEx =
    /(1[0-2]|0?[1-9]):([0-5]?[0-9])(●?[AP]M)-(1[0-2]|0?[1-9]):([0-5]?[0-9])(●?[AP]M)?$/;
  if (!value.match(regEx)) return false;
  return true;
}
const isValidNum = (value) => {
  if (/^[1-9]\d*(\.\d+)?$/.test(value)) {
    return true;
  } else return false;
};

module.exports = {
  isEmpty,
  isValidTime,
  isValidNum,
  isValidObjectId,
  isValidReqBody,
  phonenumber,
  validUrl,
  isValid,
  isValidString,
  isValidEmail,
  isValidPassword,
  toTitleCase,
};
