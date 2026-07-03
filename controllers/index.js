const getData = (req, res) => {
  res.json({
    success: true,
    message: "Hello from the controller!"
  });
};

module.exports = {
  getData
};