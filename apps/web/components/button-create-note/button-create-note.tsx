// components/notes/create-note-button.tsx
"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { trpcClient } from "@/shared/api"
import { useParams, useRouter } from "next/navigation"

interface ButtonCreateNoteProps {
    sectionId?: string
    variant?: "default" | "icon" | "text"
    className?: string
}

export function ButtonCreateNote({
     sectionId,
     variant = "icon",
     className = ""
 }: ButtonCreateNoteProps) {
    const params = useParams()
    const router = useRouter()
    const queryClient = useQueryClient()
    const spaceId = params?.id as string

    // Простая мутация для создания заметки
    const createNoteMutation = useMutation({
        mutationFn: async () => {
            return trpcClient.notes.create.mutate({
                spaceId,
                title: "Новая заметка",
                type: "note",
                sectionId,
            })
        },
        onSuccess: (newNote) => {
            // Обновляем кэш списка заметок
            queryClient.invalidateQueries({
                queryKey: ["notes", "list", { spaceId }]
            })

            // Переходим к новой заметке
            if (newNote) {
                router.push(`/spaces/${spaceId}/notes/${newNote.id}`)
            }
        },
    })

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        createNoteMutation.mutate()
    }

    // Вариант с иконкой
    if (variant === "icon") {
        return (
            <Button
                size="icon"
                variant="ghost"
                className={`h-8 w-8 shrink-0 hover:bg-accent ${className}`}
                onClick={handleClick}
                title="Создать заметку"
                disabled={createNoteMutation.isPending}
            >
                <Plus className="size-4" />
                <span className="sr-only">Создать заметку</span>
            </Button>
        )
    }

    // Вариант с текстом
    return (
        <Button
            variant={variant === "text" ? "ghost" : "default"}
            size="sm"
            onClick={handleClick}
            className={`flex items-center gap-2 ${className}`}
            disabled={createNoteMutation.isPending}
        >
            <Plus className="size-4" />
            <span>Создать заметку</span>
        </Button>
    )
}
