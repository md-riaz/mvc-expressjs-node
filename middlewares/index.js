module.exports = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  const currentDate = new Date();
  console.log(`${currentDate.toLocaleString()}: ${req.method} ${req.url}`);
  next();
};
