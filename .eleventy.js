module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("photos");
    eleventyConfig.addPassthroughCopy("*.pdf");
    return {};
  };