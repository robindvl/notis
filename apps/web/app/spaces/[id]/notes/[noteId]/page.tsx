"use client";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { trpc, trpcClient } from "@/shared/api";
import { Editor } from "@/components/blocks/editor-x/editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import { SerializedEditorState } from "lexical";

export default function Page() {
    const params = useParams<{ noteId: string }>();
    const queryClient = useQueryClient();

    const note = useQuery(
        trpc.notes.show.queryOptions({ id: params?.noteId || "" })
    );

    const [title, setTitle] = useState("");
    const [editorState, setEditorState] = useState<SerializedEditorState | null>(null);

    // Преобразуем строку в SerializedEditorState
    useEffect(() => {
        if (note.data) {
            setTitle(note.data.title || "");

            // Теперь в редактор превращаем только body
            const transformedState = {
                root: {
                    children: [
                        {
                            children: [
                                {
                                    detail: 0,
                                    format: 0,
                                    mode: "normal",
                                    style: "",
                                    text: note.data.body || "", // Используем текст из note.data.body
                                    type: "text",
                                    version: 1,
                                },
                            ],
                            direction: "ltr",
                            format: "",
                            indent: 0,
                            type: "paragraph",
                            version: 1,
                        },
                    ],
                    direction: "ltr",
                    format: "",
                    indent: 0,
                    type: "root",
                    version: 1,
                },
            } as unknown as SerializedEditorState;

            setEditorState(transformedState);
        }
    }, [note.data?.id, note.data?.title, note.data?.body]);

    // Создаем мутацию для сохранения
    const updateNoteMutation = useMutation({
        mutationFn: async () => {
            if (!editorState) return;

            // Извлекаем текст из editorState
            let textContent = "";
            if (editorState.root.children) {
                editorState.root.children.forEach((paragraph: any) => {
                    if (paragraph.children) {
                        paragraph.children.forEach((child: any) => {
                            if (child.text) {
                                textContent += child.text;
                            }
                        });
                        textContent += '\n';
                    }
                });
            }

            // Вызываем tRPC мутацию
            return trpcClient.notes.update.mutate({
                id: params?.noteId || "",
                data: {
                    title,
                    body: textContent.trim(),
                },
            });
        },
        onSuccess: () => {
            // Инвалидируем кэш заметки
            queryClient.invalidateQueries({
                queryKey: trpc.notes.show.queryOptions({ id: params?.noteId || "" }).queryKey
            });

            // Если есть spaceId, инвалидируем список заметок
            if (note.data?.spaceId) {
                queryClient.invalidateQueries({
                    queryKey: trpc.notes.list.queryOptions({ spaceId: note.data.spaceId }).queryKey
                });
            }
        },
    });

    const handleSave = () => {
        updateNoteMutation.mutate();
    };

    // Пока данные загружаются или преобразуются
    if (!editorState || note.isLoading) {
        return <div>Данные загружаются...</div>;
    }

    return (
        <div>
            <div className="flex flex-col gap-4 p-8 max-w-4xl mx-auto">
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Заголовок заметки"
                    className="text-4xl font-bold border-none shadow-none focus-visible:ring-0 px-0 h-auto py-2"
                />
                <div>
                    <Button
                        onClick={handleSave}
                        disabled={updateNoteMutation.isPending}
                    >
                        {updateNoteMutation.isPending ? 'Сохранение...' : 'Сохранить'}
                    </Button>
                </div>
                <div className="border-t pt-4">
                    <Editor
                        editorSerializedState={editorState}
                        onSerializedChange={(value) => setEditorState(value)}
                    />
                </div>
            </div>
        </div>
    );
}
