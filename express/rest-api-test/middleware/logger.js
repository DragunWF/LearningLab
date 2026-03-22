const logger = (req, res, next) => {
  console.log(
    `${req.method} ${req.url}://${req.get("host")}${req.originalUrl}`,
  );
  next();
};

export default logger;
