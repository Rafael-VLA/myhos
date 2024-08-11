import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import clsx from "clsx"
import { useForm } from "react-hook-form"
import { HiPaperAirplane, HiSparkles, HiXMark } from "react-icons/hi2"
import { serializePlainText } from "../utils/slate"
import { useMythoStore } from "../store/mythoStore"
import { submitQuestionAI } from "../services/mythoService"

import useSWRMutation from 'swr/mutation'
import { Loader2 } from "lucide-react"
import { useEffect, useMemo, useRef } from "react"
import { useAIStore } from "../store/aiStore"
import { useUIStore } from "../store/uiStore"
import { ScrollArea } from "@/shared/components/ui/scroll-area"

type FormState = {
    userMessage: string
}

export const ChatAI = () => {
    const { trigger, isMutating } = useSWRMutation('/api/gemini', submitQuestionAI);
    const userMessageRef = useRef<HTMLDivElement | null>(null)
    const scrollRef = useRef<HTMLDivElement | null>(null)

    const { selectedTextToSend, setSelectedTextToSend } = useUIStore()

    const currentMytho = useMythoStore(store => store.currentMytho)

    const { addMessageHistory, messageHistory: list } = useAIStore();

    const messageHistory = useMemo(() => list.filter(e => e.idMytho === (currentMytho ? currentMytho.id : "")), [list, currentMytho])

    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormState>({
        defaultValues: {
            userMessage: ""
        }
    })

    const currentText = watch("userMessage");

    const handleActionSubmit = async (values: FormState, addFirstMsg: boolean = true) => {
        if (!currentMytho) return;
        
        let mytho = { ...currentMytho };
        
        delete (mytho as any).id
        delete (mytho as any).createdAt
        
        const data = {
            ...mytho,
            content: selectedTextToSend.length === 0 ? serializePlainText(mytho.content): selectedTextToSend,
            ...values,
        }
        
        if (selectedTextToSend.length > 0) {
            if (!userMessageRef.current) return;
            addMessageHistory({
                id: crypto.randomUUID(),
                idMytho: currentMytho.id,
                content: userMessageRef.current.innerHTML,
                itsHTML: true,
                user: "user"
            })
        } else {

            if(addFirstMsg){
                addMessageHistory({
                    id: crypto.randomUUID(),
                    idMytho: currentMytho.id,
                    content: values.userMessage,
                    itsHTML: false,
                    user: "user"
                })
            }
        }

        setSelectedTextToSend("")

        try {
            const { message } = await trigger({ fields: data }) as { ok: boolean, message: string }

            addMessageHistory({
                id: crypto.randomUUID(),
                idMytho: currentMytho.id,
                content: message,
                itsHTML: false,
                user: "ia",
            })
            
        } catch (error) {
            alert("Algo salió mal en la petición")
        }
    }

    const onSubmit = async (values: FormState) => {
        handleActionSubmit(values);
        reset();
    }

    const actionPremisaIntegrante = async () => {
        handleActionSubmit({ userMessage: "Sugiereme una idea para que mi historia tenga un inicio con una premisa integrante" }, false);
    }

    const actionEncuentroSorprendente = async () => {
        handleActionSubmit({ userMessage: "Sugiereme una idea para que mi historia tenga un inicio con un encuentro sorprendente" }, false);
    }

    const actionEventoCatastrofico = () => {
        handleActionSubmit({ userMessage: "Sugiereme una idea para que mi historia tenga un inicio con un evento catastrófico" }, false);
    }


    // Está pendiente bajar el scroll en cuanto exista un nuevo mensaje
    useEffect(() => {
        if(messageHistory.length === 0 || !scrollRef.current) return;

        const divWithScroll = scrollRef.current.querySelector("div[data-radix-scroll-area-viewport]");

        if(!divWithScroll) return;

        divWithScroll.scrollTop = divWithScroll.scrollHeight;

    }, [messageHistory, scrollRef, selectedTextToSend])

    return (
        <div className="flex flex-col gap-3 h-full text-sm">
            {/* className="h-[calc(100vh-196px)]" */}
            <ScrollArea ref={scrollRef} className="h-[calc(100vh-(64px+24px+16px+14px+24px+32px))]">

                <div className="flex-1 pr-4">

                    <div className="flex flex-col gap-2 h-full">

                        {
                            messageHistory.length > 0 ? (
                                messageHistory.map(({ id, user, content, itsHTML }) => (
                                    user === "user" ? (
                                        <div className="flex justify-end text-sm" key={id}>
                                            {
                                                itsHTML ? (
                                                    <div dangerouslySetInnerHTML={{ __html: content }} className="bg-black/5 text-foreground rounded-2xl py-2 px-3 w-[85%]" />
                                                ) : (
                                                    <div className="bg-black/5 text-foreground rounded-2xl py-2 px-3 w-[85%]">
                                                        <p>{content}</p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    ) : (
                                        <div className="flex justify-start text-sm" key={id}>
                                            <div className="border border-black/10 text-foreground rounded-2xl py-2 px-3 w-[85%]">
                                                <p className="mb-2">
                                                    {content}
                                                </p>
                                            </div>
                                        </div>
                                    )

                                ))

                            ) : (
                                <>
                                    {
                                        (serializePlainText(currentMytho ? currentMytho.content : []).length < 100 && selectedTextToSend.length === 0)  && (
                                            <div className="flex flex-col gap-2 mt-24">

                                                <div className="text-center text-gray-500">
                                                    <p>¿No sabes por donde empezar?</p>
                                                    <p>¡Solicita ayuda con el inicio de tu historia!</p>
                                                </div>

                                                <div className="flex flex-col gap-2 px-4">
                                                    <Button disabled={isMutating} onClick={actionPremisaIntegrante} variant="outline" size="sm" className="text-xs">
                                                        <HiSparkles size={12} className="text-[#ff5f6d] mr-2" /> Premisa Integrante
                                                    </Button>
                                                    <Button disabled={isMutating} onClick={actionEncuentroSorprendente} variant="outline" size="sm" className="text-xs">
                                                        <HiSparkles size={12} className="text-[#ff5f6d] mr-2" /> Encuentro Sorprendente
                                                    </Button>
                                                    <Button disabled={isMutating} onClick={actionEventoCatastrofico} variant="outline" size="sm" className="text-xs">
                                                        <HiSparkles size={12} className="text-[#ff5f6d] mr-2" /> Evento Catastrófico
                                                    </Button>
                                                </div>

                                            </div>
                                        )
                                    }
                                </>
                            )
                        }


                        {
                            selectedTextToSend.length > 0 && (
                                <div className="flex justify-end text-sm">
                                    <div className="bg-black/5 text-foreground rounded-2xl py-2 px-3 w-[85%]">

                                        <div ref={userMessageRef} className="" >
                                            <p className="font-semibold">Texto seleccionado</p>
                                            <p>{selectedTextToSend}</p>

                                            <p className="font-semibold">¿Qué deseas hacer?</p>
                                            <p>{currentText.length > 0 ? currentText : '...'}</p>
                                        </div>

                                        <div className="mt-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1 text-xs"
                                                onClick={() => setSelectedTextToSend("")}
                                            >
                                                <HiXMark size={14} className="mr-2 text-destructive" />
                                                Cancelar
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>

            </ScrollArea>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex w-full max-w-sm items-center space-x-2"
            >
                <Input
                    type="text"
                    placeholder="Pide ayuda a la IA..."
                    {...register("userMessage", {
                        required: "Valor es requerido"
                    })}
                    className={clsx("!ring-offset-0 !ring-0", {
                        "focus:border-[#00d2ff]": !errors.userMessage,
                        "border-destructive": !!errors.userMessage
                    })}
                />

                <Button type="submit" variant="default" size="icon" disabled={isMutating}>
                    {
                        isMutating ? (
                            <Loader2 size={14} className="animate-spin" />
                        ) : (
                            <HiPaperAirplane size={14} />
                        )
                    }
                </Button>
            </form>
        </div>
    )
}
