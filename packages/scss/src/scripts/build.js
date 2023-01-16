const fs = require("fs");
const nodeSaas = require("node-sass");
const path = require("path");
const getComponents = require("./getComponents");

const compileCssSync = (origin, outDir, outFileName) => {
  const scssData = fs.readFileSync(path.resolve(origin)).toString();
  const includedPaths = [path.resolve("src")];

  const compiledCss = nodeSaas
    .renderSync({
      data: scssData,
      outputStyle: "expanded",
      outFile: outFileName,
      includePaths: includedPaths,
    })
    .css.toString();

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }

  fs.writeFileSync(path.resolve(`${outDir}/${outFileName}`), compiledCss);
};

const outDir = "lib";

// Generate global.css
compileCssSync("src/global.scss", outDir, "global.css");

const components = getComponents({ dirs: ["atoms", "molecules"] });

// Generate css for components
if (components.length) {
  components.forEach((component) => {
    compileCssSync(component.input, outDir, component.output);
  });
}
