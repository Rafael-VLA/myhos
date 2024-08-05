import { Descendant } from "slate"

export const createMythoWithTitle = (title: string):Descendant[] => {
    return [
        {
          "type": "paragraph",
          "children": [
            {
              "text": title,
              "bold": true
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "bold": true,
              "text": ""
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "bold": false,
              "text": ""
            }
          ]
        }
      ]
}