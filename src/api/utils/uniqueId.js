const uniqueId = () => {
  const id = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return id() + id() + '-' + id();
};


module.exports = uniqueId