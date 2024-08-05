'use client'

import { Fragment } from 'react'
import { CreateSheet } from '@/dashboard/components/CreateSheet'
import { MythoCard } from '@/dashboard/components/MythoCard'
import { useMythoStore } from '@/dashboard/store/mythoStore'
import { Button } from '@/shared/components/ui/button'
import { useUIStore } from '@/dashboard/store/uiStore'
import { HiOutlineExclamationTriangle } from 'react-icons/hi2'

const DashboardHomePage = () => {
    const mythos = useMythoStore(store => store.mythos)
    const { open, setOpen } = useUIStore()

    const emptyList = mythos.length === 0

    return (
        <Fragment>

            {
                emptyList && (
                    <div className="flex flex-col items-center justify-center space-y-6 py-12 md:py-24">
                        <div className="max-w-md text-center">
                            <HiOutlineExclamationTriangle className="mx-auto h-12 w-12 text-primary" />
                            <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                                No hay Mythos disponibles
                            </h2>
                            <p className="mt-4 text-muted-foreground">
                                Parece que aún no has creado ningún mytho. Haz clic en el botón de abajo para crear uno nuevo.
                            </p>
                            <div className="mt-6">
                            <Button
                                onClick={() => setOpen(!open)}
                                variant="default"
                                size="sm"
                            >
                                Crear nuevo mytho
                            </Button>
                            </div>
                        </div>
                        </div>
                )
            }

            {

                !emptyList && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                        {
                            mythos.map(mytho => (
                                <MythoCard mytho={mytho} key={mytho.id} />
                            ))
                        }
                    </div>
                )
            }
            


            <CreateSheet />
        </Fragment>
    )
}

export default DashboardHomePage