import { KeyboardEvent, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { HiPlus } from 'react-icons/hi2'

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { Textarea } from '@/shared/components/ui/textarea'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/shared/components/ui/select'
import { MYTHO_TYPES } from '../data/mythoTypes'
import { Button } from '@/shared/components/ui/button'
import { BadgeForm } from './BadgeForm'
import { useMythoStore } from '../store/mythoStore'
import { Mytho } from '@/shared/interfaces/mytho'
import { useUIStore } from '../store/uiStore'
import { useRouter } from 'next/navigation'
import { createMythoWithTitle } from '../utils/myho'

const formSchema = z.object({
    title: z.string().min(4, "El titulo debe tener mínimo 4 letras"),
    description: z.string().min(20, "La descripción debe contar con al menos 20 caracteres"),
    type: z.string().min(4, "El tipo de la obra es obligatorio"),
    genders: z.array(z.string()).min(1, "Debe contar con al menos un género")
})

type FormState = z.infer<typeof formSchema>

export const MythoForm = () => {
    const { addMytho, setCurrentMytho } = useMythoStore()
    const { setOpen } = useUIStore();
    const router = useRouter()
    const inputRef = useRef<HTMLInputElement | null>(null)

    const form = useForm<FormState>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            type: '',
            genders: []
        }
    })

    const handleSubmit = (values: FormState) => {
        const newMytho:Mytho = {
            ...values,
            id: crypto.randomUUID(),
            createdAt: Date.now(),
            content: createMythoWithTitle(values.title)
        }

        router.push(`/dashboard/mytho/new/${newMytho.id}`)

        form.reset();
        setOpen(false);
        addMytho(newMytho);

        setCurrentMytho(newMytho.id)
    }

    const handleAddGender = (e: KeyboardEvent<HTMLInputElement>, genders: string[]) => {

        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();

            addGender(genders)
        }
    }

    const addGender = (genders: string[]) => {
        if (inputRef.current === null) return;

            const value = inputRef.current.value

            const duplicated = !!genders.find(g => g.toLowerCase().trim() === value.toLowerCase().trim())

            if (duplicated) {
                return alert("Categoría ya existe") // TODO: Cambiar por un alert más bonito
            }

            inputRef.current.value = ''

            form.setValue("genders", [...genders, value])
    }

    const removeGender = (genders: string[], currentGender: string) => {
        const newGenders = genders.filter(g => g !== currentGender);        
        form.setValue("genders", newGenders);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pl-1 py-1 pr-4" id="create-mytho">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="El castillo encantado..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripción</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Trata sobre un castillo de hace 2000 años..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tipo de obra</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona el tipo de obra" />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-56">
                                        {
                                            MYTHO_TYPES.map(item => (
                                                <SelectItem value={item.toLowerCase()} key={item}>{item}</SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="genders"
                    render={({ field: { value } }) => {
                        return (
                            <FormItem>
                                <FormLabel>Géneros</FormLabel>
                                <FormControl>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex w-full max-w-sm items-center space-x-2">
                                            <Input
                                                onKeyDown={(e) => handleAddGender(e, [...value])}
                                                type="text"
                                                placeholder="Terror..."
                                                ref={inputRef}
                                            />
                                            <Button 
                                                type="button" 
                                                variant="outline" 
                                                size="icon"
                                                onClick={() => addGender(value)}
                                            >
                                                <HiPlus size={16} />
                                            </Button>
                                        </div>

                                        {
                                            value.length > 0 && (
                                                <div className="flex gap-1 flex-wrap">
                                                    {
                                                        value.map(gender => (
                                                            <BadgeForm
                                                                gender={gender}
                                                                removeGender={() => removeGender(value, gender)}
                                                                className="py-1"
                                                                key={gender.toLocaleLowerCase().trim()}
                                                            />
                                                        ))
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                    }}
                />


            </form>
        </Form>
    )
}
