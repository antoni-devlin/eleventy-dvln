// Filters
const dateFilter = require('./src/filters/date-filter.js');


module.exports = config => {
  // Add filters
  config.addFilter('dateFilter', dateFilter);

  // Shortcodes
  config.addShortcode("youtube", (videoURL, title) => {
    const url = new URL(videoURL);
    const id = url.searchParams.get("v");
    return `
<iframe class="yt-shortcode" src="https://www.youtube-nocookie.com/embed/${id}" title="YouTube video player${title ? ` for ${title}` : ""
      }" frameborder="0" allowfullscreen></iframe>
`;
  });

  config.addShortcode("image", (imagePath, altText, caption, source) => {
    return `
<img class="inline-image" src="${imagePath}" alt="${altText}">
<figcaption>${caption} (Source: ${source}) </figcaption>
`;
  });

  config.addShortcode("video", (videoPath, options) => {
    return `
<video class="video-embed" ${options}>
<source src="${videoPath}" type="video/mp4">
Your browser does not support the video tag.
</video>
`;
  });

  config.addShortcode('readingTime', function (text) {
    // Get entire post element
    let wordCount = `${text}`.match(/\b[-?(\w+)?]+\b/gi).length;
    // calculate time in minutes based on average reading time
    let timeInMinutes = (wordCount / 225)
    // Validation as we don't want to show 0 if time is under 30s
    let output;
    if (timeInMinutes <= 0.5) {
      output = 1;
    } else {
      // round to nearest minute
      output = Math.round(timeInMinutes);
    }
    return `${output}`
  });

  // Feathericons shortcode
  const feather = require('feather-icons');

  // You'll need to pass more arguments, but this is the general idea
  const iconShortcode = (icon) => feather.icons[icon].toSvg();
  config.addShortcode('icon', iconShortcode);


  // Set directories to pass through to the dist folder
  config.addPassthroughCopy('./src/images/');
  config.addPassthroughCopy('./src/styles/');
  config.addPassthroughCopy('./src/scripts/');

  // Returns work items, sorted by display order
  config.addCollection('blogPosts', collection => {
    return collection
      .getFilteredByGlob('./src/posts/*.md').reverse()
  });

  config.addCollection('workPosts', collection => {
    return collection
      .getFilteredByGlob('./src/work/*.md').reverse()
  });

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist'
    }
  };
};
