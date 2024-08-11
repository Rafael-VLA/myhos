import escapeHtml from 'escape-html'
import { Descendant, Text, Node } from "slate";

export const serializePlainText = (nodes: Descendant[]) => {
    return nodes.map(n => Node.string(n)).join('\n')
}

export const serializeToHTML = (node: Descendant): string => {
    if (Text.isText(node)) {
        let stringText = escapeHtml(node.text);

        if (node.bold) {
            stringText = `<strong>${stringText}</strong>`;
        }
        if (node.code) {
            stringText = `<code>${stringText}</code>`;
        }
        if (node.italic) {
            stringText = `<em>${stringText}</em>`;
        }
        if (node.underline) {
            stringText = `<u>${stringText}</u>`;
        }

        return stringText;
    }

    if ('children' in node) {
        const children = node.children.map(n => serializeToHTML(n)).join('');

        switch (node.type) {
            case 'block-quote':
                return `<blockquote><p>${children}</p></blockquote>`;
            case 'bulleted-list':
                return `<ul>${children}</ul>`;
            case 'list-item':
                return `<li>${children}</li>`;
            case 'numbered-list':
                return `<ol>${children}</ol>`;
            case 'link':
                return `<a href="${escapeHtml(node.url || '')}">${children}</a>`;
            default:
                return `<p>${children}</p>`;
        }
    }

    return ""
};