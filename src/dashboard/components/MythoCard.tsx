'use client'

import { Badge } from '@/shared/components/ui/badge'
import { Card } from '@/shared/components/ui/card'
import { Mytho } from '@/shared/interfaces/mytho'
import { clsx } from 'clsx'
import { FC, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MythoCardMenu } from './MythoCardMenu'

interface Props {
    mytho: Mytho
}

export const MythoCard: FC<Props> = ({ mytho }) => {
    const [show, setShow] = useState(false);
    const textContainerRef = useRef<HTMLParagraphElement | null>(null);
    const [isClamped, setIsClamped] = useState(false);

    const router = useRouter()

    const { id, title, description, type, genders, createdAt } = mytho

    useEffect(() => {
        const isTextOverflown = (element: HTMLParagraphElement, maxLines: number) => {
            const lineHeight = parseFloat(getComputedStyle(element).lineHeight);
            const maxHeight = lineHeight * maxLines;
            return element.scrollHeight > maxHeight;
        };

        if (textContainerRef.current) {
            setIsClamped(isTextOverflown(textContainerRef.current, 5));
        }
    }, [setIsClamped]);

    const redirectToPage = () => {
        router.push(`/dashboard/mytho/new/${id}`)
    }

    return (
        <Card
            onClick={redirectToPage}
            className="w-full cursor-pointer p-6 grid gap-6 shadow-sm transition-all duration-300 hover:shadow-lg"
        >
            <div className="grid gap-2">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">{title}</h2>

                    <MythoCardMenu id={ id } />
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">

                    {/* TODO: Usar una librería para mejorar el formato de fecha */}
                    <p className="text-md">{new Date(createdAt).toDateString()}</p>
                    <span>|</span>
                    <p className="capitalize">{type}</p>
                </div>
            </div>
            <div className="grid gap-4">
                <p
                    ref={textContainerRef}
                    className={clsx('text-muted-foreground text-sm', {
                        'line-clamp-5': !show
                    })}>
                    {description}
                </p>

                {
                    isClamped && (
                        <div className="flex justify-end">
                            <button
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    setShow(!show)
                                }}
                                className="text-sm underline"
                            >
                                {!show ? "Ver más" : "Ver menos"}
                            </button>
                        </div>
                    )
                }
                <div className="flex items-center gap-2 mt-4 flex-wrap">
                    {
                        genders.map(gender => (
                            <Badge variant="outline" className="px-3 py-1 rounded-full capitalize" key={gender}>
                                {gender}
                            </Badge>
                        ))
                    }
                </div>
            </div>
        </Card>
    )
}
