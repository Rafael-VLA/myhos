import { FC } from 'react'
import { RenderLeafProps } from 'slate-react'

interface Props extends RenderLeafProps { }

export const RenderLeaf: FC<Props> = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong {...attributes}>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}