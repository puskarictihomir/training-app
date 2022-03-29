const createToken = () => {
  const rand = function () {
    return Math.random().toString(36).substring(2);
  };

  return rand() + rand();
};

module.exports = { createToken };
