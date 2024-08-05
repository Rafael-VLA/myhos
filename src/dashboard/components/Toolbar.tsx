import { useSlate } from 'slate-react'
import { isMarkActive, toggleMark, isBlockActive, toggleBlock, TEXT_ALIGN_TYPES } from '@/shared/lib'
import { FaAlignCenter, FaAlignJustify, FaAlignLeft, FaAlignRight, FaBold, FaItalic, FaListOl, FaListUl, FaQ, FaQuoteLeft, FaUnderline } from 'react-icons/fa6'

export const Toolbar = () => {
    const editor = useSlate()

    return (
        <div className="flex gap-3 items-center flex-wrap">
            <button
                onClick={() => {
                    toggleMark(editor, "bold")
                }}
                aria-label="bold">
                <FaBold  size={14} color={isMarkActive(editor, "bold") ? "#00d2ff" : "inherit"} />
                {/* <FormatBoldOutlined fontSize="small" color={isMarkActive(editor, "bold") ? "#00d2ff" : "inherit"} /> */}
            </button>

            <button
                aria-label="italic"
                onClick={() => toggleMark(editor, "italic")}
            >

                <FaItalic size={14} color={isMarkActive(editor, "italic") ? "#00d2ff" : "inherit"} />
            </button>


            <button
                aria-label="underline"
                onClick={() => toggleMark(editor, "underline")}
            >

                <FaUnderline size={14} color={isMarkActive(editor, "underline") ? "#00d2ff" : "inherit"} />
            </button>


            <button
                aria-label="quote"
                onClick={() => toggleBlock(editor, "block-quote")}
            >

                <FaQuoteLeft
                    size={14}
                    color={
                        (isBlockActive(
                            editor,
                            "block-quote",
                            TEXT_ALIGN_TYPES.includes("block-quote") ? 'align' : 'type'
                        ))
                            ? "#00d2ff"
                            : "inherit"
                    }
                />
            </button>


            <button
                aria-label="numbered-list"
                onClick={() => toggleBlock(editor, "numbered-list")}
            >
                <FaListOl
                    size={14}
                    color={
                        (isBlockActive(
                            editor,
                            "numbered-list",
                            TEXT_ALIGN_TYPES.includes("numbered-list") ? 'align' : 'type'
                        ))
                            ? "#00d2ff"
                            : "inherit"
                    }
                />
            </button>

            <button
                aria-label="bulleted-list"
                onClick={() => toggleBlock(editor, "bulleted-list")}
            >
                <FaListUl
                    size={14}
                    color={
                        (isBlockActive(
                            editor,
                            "bulleted-list",
                            TEXT_ALIGN_TYPES.includes("bulleted-list") ? 'align' : 'type'
                        ))
                            ? "#00d2ff"
                            : "inherit"
                    }
                />
            </button>


            <button
                aria-label="align-left"
                onClick={() => toggleBlock(editor, "left")}
            >
                <FaAlignLeft
                    size={14}
                    color={
                        (isBlockActive(
                            editor,
                            "left",
                            TEXT_ALIGN_TYPES.includes("left") ? 'align' : 'type'
                        ))
                            ? "#00d2ff"
                            : "inherit"
                    }
                />
            </button>


            <button
                aria-label="align-center"
                onClick={() => toggleBlock(editor, "center")}
            >
                <FaAlignCenter
                    size={14}
                    color={
                        (isBlockActive(
                            editor,
                            "center",
                            TEXT_ALIGN_TYPES.includes("center") ? 'align' : 'type'
                        ))
                            ? "#00d2ff"
                            : "inherit"
                    }
                />
            </button>


            <button
                aria-label="align-right"
                onClick={() => toggleBlock(editor, "right")}
            >
                <FaAlignRight
                    size={14}
                    color={
                        (isBlockActive(
                            editor,
                            "right",
                            TEXT_ALIGN_TYPES.includes("right") ? 'align' : 'type'
                        ))
                            ? "#00d2ff"
                            : "inherit"
                    }
                />
            </button>

            <button
                aria-label="align-justify"
                onClick={() => toggleBlock(editor, "justify")}
            >

                <FaAlignJustify
                    size={14}
                    color={
                        (isBlockActive(
                            editor,
                            "justify",
                            TEXT_ALIGN_TYPES.includes("justify") ? 'align' : 'type'
                        ))
                            ? "#00d2ff"
                            : "inherit"
                    }
                />
            </button>
        </div>
    )
}