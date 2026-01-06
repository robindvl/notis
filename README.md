# Система умных заметок

Названия: `notis`, `reminder`

## О системе
Платформа для ведения своих личных или рабочих заметок на подобии `notion`.

Функционал:
- Создавать разделы для заметок
- Пользователи могут создавать заметки, редактировать их
- Отслеживать историю изменения контента
- Делиться доступом к своим заметкам с другими пользователями
- Возможность оставлять комментарии, редактировать и удалять свои комментарии
- Видеть комментарии других людей
- Могут вести свои задачи, редактировать, менять статус

Приложение ДОЛЖНО:
- Предоставлять возможность `signin` и `signout`
- Содержать REST API для управления ресурсами приложения
- Просмотр контента только автором или если дали доступ (read, write или delete)

Приложение МОЖЕТ:
- Быть построено на `Express`, `Fastify` или `Nest`
- Использовать `PostgreSQL` или `MongoDB`
- Иметь дополнительные функции, такие как поиск по сайту по запросу, загрузка файлов и т.д.

## Планируемая итоговая дизайн система

Цель разработать микросервисную систему, с разным набором технологий, и научиться связывать это вместе.

Нужно сделать монорепу, разместить там следующие подсистемы:

#### Сервер:
| Название | База данных | Фреймворк | ORM | Описание |
| - | - | - | - | - |
| `services/gateway` | - | `NestJS` + `tRPC` | - | Центральный API Gateway, объединяющий микросервисы и предоставляющий единый типизированный tRPC интерфейс для клиентских приложений |
| `microservices/auth` | `MongoDB` | `Express` | `Mongoose ODM` | Модуль для аутентификации и авторизации |
| `microservices/core` | `MongoDB` | `Nest`, `FirstAPI` (с генерацией контроллеров на основе `OpenAPI`) | `TypeORM` | Отвечает за работы пространств и заметок |
| `microservices/tasks` | `PostgreSQL` | `Nest` с `NestJS tRPC` | `PrismaORM` | Управление задачами. |
| `microservices/communication` | `MongoDB` | `Express`, `GraphQL` | `Mongoose` | Хранит в себе комментарии от заметок и задач, использовать `WebSocket` для обновления комментариев. Сам модуль может использовать не только для комментариев, но и для написания чата |
| `microservices/calendar` | `PostgreSQL` | `Nest Microservice` писать котроллеры вручную, и генерировать из них `OpenAPI` | ? | Управление событиями, написать с использованием `WebSocket`. Сами события можно привязывать к задачам, например когда нужно выполнить |

<!-- Не хватает проекта Nest GraphQL -->

#### Клиент:
| Название | Фреймворк | Описание |
| - | - | - |
| `apps/landing` | `nextjs` | Будут обычные две страница главная и вход, вход будет использовать микросервис `auth` |
| `apps/app` | `react` and `vite` | Сама система для создания заметок |

## Основные сущности и их связи
Разбито по базам сервисов и расписанно в условном синтоксисе:

База `auth`:
```
users {
  id: int;
  name: string;
  nikname: string;
  email: string;
}
```

База `content`:
```
spaces {
  id: int;
  name: string;
  owner_user_id: int;
}
sections {
  id: int;
  space_id: int;
  block_id: int;
}
blocks {
  id: int;
  name: string;
  type: 'section' || 'page' || 'page_task' || 'paragraph';
  body: string;
}
related_blocks {
  id: int;
  parent_id: int;
  child_id: int;
  order: float;
}
access_blocks {
  id: int;
  block_id: int;
  user_id: int;
}
```
- Добавить версионирование контента

База `tasks`:
```
tasks {
  id: int;
  name: string;
  responsible_id: int;
  block_id: int;
}
statuses {
  id: int;
  name: string;
  type: 'backlog' || 'todo' || 'progress' || 'done' || 'delete' || 'archive';
  space_id: int;
}
tasks_statuses {
  id: int;
  order: float;
  task_id: int;
  status_id: int;
} 
boards {
  id: int;
  name: string;
  space_id: int;
}
boards_statuses {
  id: int;
  board_id: int;
  status_id: int;
  order: float;
}
```
- Продумать наследование от блоков `content`

База `messages`:
```
rooms {
  id: int;
}
members {
  id: int;
  room_id: int;
  user_id: int;
}
messages {
  id: int;
  body: int;
  room_id: int;
  member_id: int;
}
```

База `calendar`:
```
calendars {
  id: int;
  name: string;
  user_id: int;
}
events {
  id: int;
  calendar_id: int;
}
```

- Интегрировать с задачами

## API и тестирование
Начну разработку с `microservices/content`, по этому приведу пример тестирования API.

Условнное API.