module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("photos");
    eleventyConfig.addPassthroughCopy("*.pdf");
    eleventyConfig.addPassthroughCopy("CNAME");
    eleventyConfig.addPassthroughCopy("_redirects");
    return {};
  };