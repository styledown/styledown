var version = require('../index').version;

module.exports = [
    "# Styleguide options",
    "",
    "### Head",
    "",
    "    <meta name='viewport' content='width=device-width, initial-scale=1' />",
    "    <script src='https://cdn.rawgit.com/styledown/styledown/v"+version+"/data/styledown.js'></script>",
    "    <link rel='stylesheet' href='https://cdn.rawgit.com/styledown/styledown/v"+version+"/data/styledown.css' />",
    "    <link rel='stylesheet' href='your-stylesheet-here.css' />",
    "",
    "### Body",
    "",
    "    <div class='sg-container' sg-content></div>",
].join("\n")+"\n";
