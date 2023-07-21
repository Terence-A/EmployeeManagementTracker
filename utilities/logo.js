const cfonts = require("cfonts");
showLogo = () => {
  cfonts.say(
    `
     -------------
      Employee
      Manager
     -------------
    `,
    {
      font: "tiny",
      lineHeight: 1,
      space: false,
    }
  );
};

module.exports = showLogo;
