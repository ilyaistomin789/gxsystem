const fs = require("fs");

const getComponents = ({ dirs = [] }) => {
  if (!dirs.length) {
    return;
  }

  let components = [];

  dirs.forEach((dir) => {
    const files = fs.readdirSync(`src/${dir}`).map((file) => ({
      input: `src/${dir}/${file}`,
      output: `/${file.slice(0, -4) + "css"}`,
    }));

    components = [...components, ...files];
  });

  return components;
};

module.exports = getComponents;
