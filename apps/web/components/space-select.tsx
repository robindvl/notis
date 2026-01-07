"use client"

import * as React from "react"
import { Globe, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { trpc } from "@/shared/api"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export function SpaceSelect({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter()
  const { data: spaces, isLoading } = useQuery(trpc.spaces.list.queryOptions())

  const handleSpaceSelect = (spaceId: string) => {
    router.push(`/spaces/${spaceId}/notes`)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Выберите пространство</CardTitle>
          <CardDescription>
            Выберите рабочее пространство для продолжения
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <ScrollArea className="h-72 w-full rounded-md border">
              <div className="p-4">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full py-10">
                    <span className="text-sm text-muted-foreground">Загрузка...</span>
                  </div>
                ) : spaces?.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 gap-2">
                    <span className="text-sm text-muted-foreground text-center">У вас пока нет пространств</span>
                  </div>
                ) : (
                  spaces?.map((space) => (
                    <React.Fragment key={space.id}>
                      <button
                        onClick={() => handleSpaceSelect(space.id)}
                        className="flex w-full items-center gap-3 rounded-md p-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground text-left"
                      >
                        <div className="flex size-8 items-center justify-center rounded-md border bg-background">
                          <Globe className="size-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium">{space.name}</span>
                          {/* Можно добавить описание, если оно есть в сущности */}
                        </div>
                      </button>
                      <Separator className="my-2" />
                    </React.Fragment>
                  ))
                )}
              </div>
            </ScrollArea>
            <Button variant="outline" className="w-full gap-2">
              <Plus className="size-4" />
              Создать пространство
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        Нужна помощь? <a href="#">Свяжитесь с поддержкой</a>
      </div>
    </div>
  )
}

