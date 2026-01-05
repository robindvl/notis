"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { trpc } from "@/shared/api";
import { Editor } from "@/components/blocks/editor-x/editor";
import React, { useState, useEffect } from "react";
import { SerializedEditorState } from "lexical";

export default function Page() {
    const params = useParams<{ noteId: string }>();

    const note = useQuery(
        trpc.notes.show.queryOptions({ id: params?.noteId || "" })
    );

    const [editorState, setEditorState] = useState<SerializedEditorState | null>(null);

    // Преобразуем строку в SerializedEditorState
    useEffect(() => {
        if (note.data?.name) {
            // Если note.data.name это строка, оборачиваем ее в структуру Lexical
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
                                    text: note.data.name, // Используем текст из note.data.name
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
    }, [note.data?.name]);

    // Пока данные загружаются или преобразуются
    if (!editorState) {
        return <div>Данные загружаются...</div>;
    }

    return (
        <div>
            <Editor
                editorSerializedState={editorState}
                onSerializedChange={(value) => setEditorState(value)}
            />
        </div>
    );
}
