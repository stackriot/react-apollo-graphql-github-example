import validator from 'validator';

const email = value => validator.isEmail(value);

const phone = value => validator.isMobilePhone(value);

const empty = value => validator.isEmpty(value);

const number = value => validator.isInt(value, {
  min: 1000,
  max: 99999
});

const url = value => validator.isURL(value);

const string = value => validator.isByteLength(value, {
  min: 1,
  max: 200
});

const textarea = (value, max) => validator.isByteLength(value, {
  min: 0,
  max: parseInt(max)
});

const hasUrl = text =>
  /(https|http|ftp|rtsp|mms)?:\/\/([a-z0-9]\.|[a-z0-9][-a-z0-9]{0,61}[a-z0-9])(com|edu|gov|int|mil|net|org|co|io|website|info|design|engineer|art|cool|xyz|biz|info|name|museum|coop|aero|[a-z][a-z])*/i.test(text);

export default {
  email,
  phone,
  url,
  string,
  number,
  textarea,
  hasUrl
};
