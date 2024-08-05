'use client'

import { ChatAI } from "@/dashboard/components/ChatAI"
import { SlateApp } from "@/dashboard/components/SlateApp"
import { useMythoStore } from "@/dashboard/store/mythoStore"
import { NextPage } from "next"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Props {
  params: { id: string }
}

const NewMythoPage:NextPage<Props> = ({ params }) => {
  const setCurrentMytho = useMythoStore(store => store.setCurrentMytho)
  const mythos = useMythoStore(store => store.mythos)

  const router = useRouter();

  useEffect(() => {
    const isValid = mythos.find(mytho => mytho.id === params.id)
  
    if(!isValid){
      router.push("/dashboard");
    }   

    setCurrentMytho(params.id);

    return () => {
      setCurrentMytho() // se limpia en caso de que salgamos de esta pantalla
    }
  }, [mythos, params.id, router, setCurrentMytho])

  return (
    <div className="mt-4">

      <div className="grid grid-cols-12 gap-4">

        <div className="col-span-12 md:col-span-8 shadow-sm border border-black/10 rounded-md p-2">
          <SlateApp />
        </div>

        <div className="hidden md:block md:col-span-4 shadow-sm border border-black/10 rounded-md p-2">
          <ChatAI />
        </div>

      </div>
    </div>
  )
}


export default NewMythoPage