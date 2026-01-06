"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { trpc } from "@/shared/api";
import type { Task, User as DomainUser } from "@repo/domain";

import {
    KanbanBoard,
    KanbanCard,
    KanbanCards,
    KanbanHeader,
    KanbanProvider,
} from '@/components/ui/shadcn-io/kanban';
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from "@/components/ui/skeleton";

// Расширяем тип пользователя для фронтенда
type User = Partial<DomainUser> & {
    id: string;
    name: string;
    image?: string;
};

// Тип для колонки Kanban
type Column = {
    id: string;
    name: string;
    color: string;
};

// Тип для элемента Kanban, расширяющий базовый тип из компонента
type KanbanTaskItem = {
    id: string;
    name: string;
    column: string;
    description?: string;
    startAt: Date;
    endAt: Date;
    owner: User | null;
    taskData: Task;
};

// Три колонки
const columns: Column[] = [
    { id: 'planned', name: 'Planned', color: '#6B7280' },
    { id: 'in-progress', name: 'In Progress', color: '#F59E0B' },
    { id: 'done', name: 'Done', color: '#10B981' },
];

const dateFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
});

const shortDateFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
});

// Функция для маппинга statusId в ID колонки
const mapStatusToColumn = (statusId: string): string => {
    if (statusId.includes('done') || statusId.includes('completed') || statusId === '3') {
        return 'done';
    }
    if (statusId.includes('progress') || statusId.includes('in-progress') || statusId === '2') {
        return 'in-progress';
    }
    return 'planned'; // по умолчанию
};

// Функция для получения аватара пользователя
const getUserAvatar = (assigneeId?: string, projectData?: any): User | null => {
    if (!assigneeId) return null;

    // Если в projectData есть информация о пользователях
    if (projectData?.users) {
        const user = projectData.users.find((u: User) => u.id === assigneeId);
        if (user) {
            return {
                id: user.id,
                name: user.name || 'Unknown',
                image: user.image,
            };
        }
    }

    // Заглушка если пользователь не найден
    return {
        id: assigneeId,
        name: 'User',
        image: undefined,
    };
};

export default function Page() {
    const params = useParams<{ projectId: string }>();
    const [kanbanItems, setKanbanItems] = useState<KanbanTaskItem[]>([]);

    // Получаем данные проекта
    const projectQuery = useQuery(
        trpc.projects.show.queryOptions({ id: params?.projectId || "" })
    );

    const projectId = params?.projectId || "";

    const taskQuery = useQuery(
        // trpc.tasks.show.queryOptions({ id: params?.projectId || "" })
        trpc.tasks.list.queryOptions({ projectId })
    );

    console.log('projectQuery', projectQuery);
    console.log('taskQuery', taskQuery);

    // Преобразуем данные проекта в формат для Kanban при их получении
    useEffect(() => {
        if (projectQuery.data) {
            const projectData = projectQuery.data;

            // Предполагаем, что задачи находятся в projectData.tasks
            // Если структура другая, нужно будет адаптировать
            const tasks = projectData.tasks || [];

            // Преобразуем задачи в формат для Kanban
            const items = tasks.map((task: Task) => {
                const columnId = mapStatusToColumn(task.statusId);
                const user = getUserAvatar(task.assigneeId, projectData);

                return {
                    id: task.id,
                    name: task.title,
                    description: task.description,
                    startAt: task.createdAt,
                    endAt: new Date(task.createdAt.getTime() + 7 * 24 * 60 * 60 * 1000), // +7 дней
                    column: columnId,
                    owner: user,
                    taskData: task, // сохраняем исходные данные задачи
                };
            });

            setKanbanItems(items);
        }
    }, [projectQuery.data]);

    // Пока данные загружаются
    if (projectQuery.isLoading) {
        return (
            <div className="flex flex-col gap-6 p-8 max-w-6xl mx-auto">
                <div className="space-y-3">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-4 w-32" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {columns.map((column) => (
                        <div key={column.id} className="space-y-4">
                            <div className="flex items-center gap-2 p-3 border rounded-lg">
                                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: column.color }} />
                                <Skeleton className="h-4 w-24" />
                            </div>
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="p-4 border rounded-lg space-y-3">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-3 w-3/4" />
                                    <div className="flex justify-between items-center">
                                        <Skeleton className="h-3 w-20" />
                                        <Skeleton className="h-6 w-6 rounded-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Если произошла ошибка
    if (projectQuery.error) {
        return (
            <div className="flex flex-col gap-4 p-8 max-w-6xl mx-auto">
                <div className="text-center py-8 text-red-500">
                    Error loading project data
                </div>
            </div>
        );
    }

    // Если нет данных
    if (!projectQuery.data) {
        return (
            <div className="flex flex-col gap-4 p-8 max-w-6xl mx-auto">
                <div className="text-center py-8">
                    No project data available
                </div>
            </div>
        );
    }

    const projectData = projectQuery.data;
    const tasks: Task[] = projectData.tasks || [];

    return (
        <div className="flex flex-col gap-6 p-8 max-w-6xl mx-auto">
            {/* Заголовок проекта */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold">{projectData.name || 'Project Board'}</h1>
                {projectData.description && (
                    <p className="text-muted-foreground mt-2">{projectData.description}</p>
                )}
                <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                    <span>Total tasks: {tasks.length}</span>
                    <span>•</span>
                    <span>Created: {projectData.createdAt.toLocaleDateString()}</span>
                </div>
            </div>

            {/* Kanban доска */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tasks.length === 0 ? (
                    <div className="col-span-3 text-center py-12 border rounded-lg">
                        <p className="text-muted-foreground">No tasks found in this project</p>
                    </div>
                ) : (
                    <KanbanProvider<KanbanTaskItem, Column>
                        columns={columns}
                        data={kanbanItems}
                        onDataChange={setKanbanItems}
                    >
                        {(column) => (
                            <KanbanBoard id={column.id} key={column.id}>
                                <KanbanHeader>
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="h-2 w-2 rounded-full"
                                            style={{ backgroundColor: column.color }}
                                        />
                                        <span className="font-medium">{column.name}</span>
                                        <span className="text-muted-foreground text-sm ml-auto">
                      {kanbanItems.filter(item => item.column === column.id).length}
                    </span>
                                    </div>
                                </KanbanHeader>
                                <KanbanCards<KanbanTaskItem> id={column.id}>
                                    {(item) => (
                                        <KanbanCard<KanbanTaskItem>
                                            {...item}
                                            key={item.id}
                                        >
                                            <div className="flex items-start justify-between gap-2 mb-2">
                                                <div className="flex flex-col gap-1 flex-1">
                                                    <p className="m-0 font-medium text-sm line-clamp-2">
                                                        {item.name}
                                                    </p>
                                                    {item.description && (
                                                        <p className="m-0 text-muted-foreground text-xs line-clamp-2">
                                                            {item.description}
                                                        </p>
                                                    )}
                                                </div>
                                                {item.owner && (
                                                    <Avatar className="h-6 w-6 shrink-0">
                                                        {item.owner.image ? (
                                                            <AvatarImage src={item.owner.image} alt={item.owner.name} />
                                                        ) : (
                                                            <AvatarFallback className="text-xs">
                                                                {item.owner.name?.slice(0, 2).toUpperCase()}
                                                            </AvatarFallback>
                                                        )}
                                                    </Avatar>
                                                )}
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <p className="m-0 text-muted-foreground text-xs">
                                                    Created: {shortDateFormatter.format(item.startAt)}
                                                </p>
                                                <div className="flex items-center gap-1">
                          <span className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">
                            Task
                          </span>
                                                    {item.taskData?.assigneeId && !item.owner && (
                                                        <div className="h-5 w-5 rounded-full bg-gray-300 flex items-center justify-center">
                                                            <span className="text-[10px]">?</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </KanbanCard>
                                    )}
                                </KanbanCards>
                            </KanbanBoard>
                        )}
                    </KanbanProvider>
                )}
            </div>

            {/* Статистика */}
            <div className="mt-8 pt-6 border-t">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {columns.map((column) => {
                        const count = kanbanItems.filter(item => item.column === column.id).length;
                        const percentage = tasks.length > 0
                            ? Math.round((count / tasks.length) * 100)
                            : 0;

                        return (
                            <div key={column.id} className="flex items-center gap-3 p-4 rounded-lg border">
                                <div
                                    className="h-4 w-4 rounded-full"
                                    style={{ backgroundColor: column.color }}
                                />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="font-medium">{column.name}</p>
                                        <p className="font-bold">{count}</p>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                                        <div
                                            className="h-2 rounded-full"
                                            style={{
                                                backgroundColor: column.color,
                                                width: `${percentage}%`
                                            }}
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {percentage}% of total
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
