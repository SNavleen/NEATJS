function randFloat () {
  return Math.random();
}
function randRangeFloat (min, max) {
  return Math.random() * (max - min) + min;
}

function randRangeInt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function randBool () {
  return Math.random() >= 0.5;
}


module.exports = {
  randFloat,
  randRangeFloat,
  randRangeInt,
  randBool
};