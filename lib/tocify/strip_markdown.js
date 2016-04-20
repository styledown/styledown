'use strict'

/**
 * Private: lol, not implemneted yet
 */

module.exports = function stripMarkdown (original) {
  let text = original

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
