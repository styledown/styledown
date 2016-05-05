/*
 * Parses some link text.
 *
 *     parseLinkText('[Hello](world)')
 *     => { title: 'Hello', source: 'world' }
 *
 *     parseLinkText('Hello')
 *     => { title: 'Hello' }
 */
module.exports = function parseLink (text) {
  var m
  if (m = text.match(/^\[([^\]]*)\]\((.*)\)$/)) {
    return { title: stripMarkdown(m[1]), source: m[2] }
  } else if (m = text.match(/^(?:__|\*\*)\[([^\]]*)\]\((.*)\)(?:__|\*\*)$/)) {
    return { title: stripMarkdown(m[1]), source: m[2], expand: true }
  } else {
    return { title: stripMarkdown(text) }
  }
}

/*
 * Strips inline Markdown tokens
 *
 *     stripMarkdown('__hello__')
 *     => 'hello'
 */

function stripMarkdown (original) {
  var text = original

  do {
    text = text
      // code
      .replace(/`([^`]+)`/g, '$1')
      // bold/italic
      .replace(/\*\*([^\*]+)\*\*/g, '$1')
      .replace(/\*([^\*]+)\*/g, '$1')
      .replace(/\*([^\*]+)\*/g, '$1')
      .replace(/(?:^|\s)([\(\[]?)_([^`]*)_([\)\]]?[\.\!\?]?)(?:$|\s)/g, '$1$2$3')
      // links and images
      .replace(/!?\[([^\]]*)\]\([^\)]*\)/g, '$1')
      .replace(/!?\[([^\]]*)\]\[[^\)]*\]/g, '$1')
      // html
      .replace(/<[^>]*>/g, '')
    if (text === original) break
    original = text
  } while (true)

  text = text
    .replace(/!?\[([^\]]*)\]/g, '$1')

  return text
}
