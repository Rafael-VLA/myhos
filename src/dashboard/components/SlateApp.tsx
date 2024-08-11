'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createEditor, Descendant } from 'slate'
import { Slate, Editable, withReact, RenderElementProps, RenderLeafProps } from 'slate-react'
import { withHistory } from 'slate-history'
import isHotkey from 'is-hotkey'
import { useDebouncedCallback } from 'use-debounce'

import { Toolbar } from './Toolbar'
import { RenderElement } from './RenderElement'
import { RenderLeaf } from './RenderLeaf'
import { toggleMark } from '@/shared/lib/slate'
import { HOTKEYS } from '@/shared/lib'
import { useMythoStore } from '../store/mythoStore'
import { useAIStore } from '../store/aiStore'
import { useUIStore } from '../store/uiStore'
import { ScrollArea } from '@/shared/components/ui/scroll-area'

// TODO: Move the editor value to a global state
export const SlateApp = () => {
    const [initialValue, setInitialValue] = useState<Descendant[]>()
    const containerRef = useRef<HTMLDivElement | null>(null)

    const setSelectedTextToSend = useUIStore(state => state.setSelectedTextToSend)

    const editor = useMemo(() => withHistory(withReact(createEditor())), [])
    const renderElement = useCallback((props: RenderElementProps) => <RenderElement {...props} />, [])
    const renderLeaf = useCallback((props: RenderLeafProps) => <RenderLeaf {...props} />, [])

    const currentMytho = useMythoStore(store => store.currentMytho);
    const setContentCurrentMytho = useMythoStore(store => store.setContentCurrentMytho);

    const debounceSetSelectedTextToSend = useDebouncedCallback(
        (value) => {
            setSelectedTextToSend(value);
        },
        500
    )

    const handleSelectionChange = useCallback((e: Event) => {
        if(!containerRef.current) return;

        const selection = window.getSelection();

        if (selection === null) return;

        const selectedText = selection.toString();
        const range = selection.getRangeAt(0);

        if (selectedText && containerRef.current.contains(range.commonAncestorContainer)) {
            debounceSetSelectedTextToSend(selectedText);
        }
    }, [debounceSetSelectedTextToSend]);

    useEffect(() => {
        if (currentMytho === null) return;

        const value = currentMytho ? currentMytho.content : [
            {
                type: 'paragraph',
                children: [{ text: '' }],
            },
        ] as Descendant[];

        setInitialValue(value);

    }, [currentMytho])

    useEffect(() => {

        document.addEventListener('selectionchange', handleSelectionChange);

        return () => {
            document.removeEventListener('selectionchange', handleSelectionChange);
        };
    }, [handleSelectionChange]);

    return (
        initialValue && (

            <Slate
                editor={editor}
                initialValue={initialValue}
                onChange={value => {
                    const isAstChange = editor.operations.some(
                        op => 'set_selection' !== op.type
                    )

                    if (isAstChange) {
                        setContentCurrentMytho(value)
                    }
                }}
            >
                <Toolbar />
                <hr className="my-2" />
                {/* <Divider sx={{ my: 2 }} /> */}
                <ScrollArea ref={containerRef} className="h-[calc(100vh-(64px+24px+16px+14px+24px))] pr-4">
                    <Editable
                        // onMouseUp={handleMouseUp}
                        // style={{ maxHeight: "calc(100vh - (64px + 24px + 16px + 14px + 24px))" }}
                        className="p-4 h-auto"
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        spellCheck
                        onKeyDown={event => {
                            for (const hotkey in HOTKEYS) {
                                const flag = isHotkey(hotkey, event as any)
                                if (flag) {
                                    event.preventDefault()
                                    const mark = HOTKEYS[hotkey as keyof typeof flag]
                                    toggleMark(editor, mark)
                                }
                            }
                        }}
                    />

                </ScrollArea>
            </Slate>
        )
    )
}