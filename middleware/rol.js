const { handleHttpError } = require("../utils/handleHttpError");

const checkRol = (roles) => (req, res, next) => {
  try {
    const { user } = req;
    const roleByUser = user.role;

    const checkValueRole = roles.some((roleSingle) =>
      roleByUser.includes(roleSingle)
    );
    if (!checkValueRole) {
      handleHttpError(res, "USER_NOT_PERMISSIONS", 403);
      return;
    }
    next();
  } catch (error) {
    handleHttpError(res, "ERROR_PERMISSIONS", 403);
  }
};
module.exports = { checkRol };
