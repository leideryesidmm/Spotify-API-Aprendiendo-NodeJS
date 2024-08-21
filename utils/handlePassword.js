const bcryptjs = require("bcryptjs");
const encrypt = async (password) => {
  return await bcryptjs.hash(password, 10);
};

const compare = async (password, passwordcrypt) => {
  return await bcryptjs.compare(password, passwordcrypt);
};
module.exports = { encrypt, compare };
