import { Descendant, Node } from "slate";

export const serializePlainText = (nodes: Descendant[]) => {
    return nodes.map(n => Node.string(n)).join('\n')
}