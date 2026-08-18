export function processHtmlForToc(html: string) {
  const headings: { id: string; text: string; level: number }[] = [];
  let counter = 1;
  
  const processedHtml = html.replace(/<(h[23])([^>]*)>(.*?)<\/\1>/gi, (match, tag, attributes, content) => {
    // Basic text extraction without inner HTML tags
    const text = content.replace(/<[^>]+>/g, '').trim();
    if (!text) return match;

    const id = `heading-${counter++}`;
    headings.push({ id, text, level: parseInt(tag[1]) });
    
    // Check if there's already an id
    if (attributes.match(/id=/i)) {
      return match;
    }

    // Inject ID into the tag, preserving existing attributes
    return `<${tag} id="${id}"${attributes}>${content}</${tag}>`;
  });
  
  return { processedHtml, headings };
}
