const moment = require("moment");
moment.locale("es");

exports.vardump = (obj) => JSON.stringify(obj);

exports.formatDate = (date) => moment(date).fromNow();

exports.redirectPrevious = (document) => {
  return "/categories";
};

exports.getRandomColor = () => {
  const colors = [
    "gray",
    "red",
    "orange",
    "yellow",
    "green",
    "teal",
    "blue",
    "indigo",
    "purple",
    "pink",
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};
