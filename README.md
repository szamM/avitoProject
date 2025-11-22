# avitoProject
реализация задания для 3 этапа отбора на стажировку в авито Frontend-trainee-assignment-autumn-2025


## Технологии

**Клиент:**

- React 18 + TypeScript  
- Vite (сборка и dev-сервер)  
- React Router v6 (роутинг: `/list`, `/item/:id`, `/stats`)  
- Axios (HTTP-запросы к API `/api/v1`)  
- Recharts (графики на странице `/stats`)  
- Context API (хранение фильтров между переходами)

**Сервер:**

- Node.js + Express (готовый API из задания, лежит в папке `server`)

---

## Структура проекта (упрощённо)

```text
project-root/
├── src/
│   ├── App.tsx
│   ├── main.tsx / index.tsx
│   ├── pages/
│   │   ├── ListPage.tsx        # /list
│   │   ├── ItemPage.tsx        # /item/:id
│   │   └── StatsPage.tsx       # /stats
│   ├── shared/
│   │   ├── api/
│   │   │   └── functionsForRequests.ts   # все запросы к API
│   │   ├── components/
│   │   │   ├── lp/             # компоненты для ListPage
│   │   │   └── SP/             # компоненты для StatsPage (charts, metrics)
│   │   ├── context/
│   │   │   └── FiltersContext.tsx
│   │   └── types/              # типы TS (ads, stats, pagination и т.д.)
│   └── assets/                 # логотип и др.
├── server/                     # готовый backend из задания Авито
│   ├── package.json
│   └── ...
├── package.json
└── README.md
```

## Установка и запуск сервера:

```bash
# Переход в директорию сервера
cd tech-int3-server

# Установка зависимостей
npm install

# Запуск сервера
npm start

# Или запуск в режиме разработки с автоматической перезагрузкой
npm run dev
```

Сервер будет доступен по адресу: `http://localhost:3001`

## Установка и запуск клиента:

```bash
# из корня репозитория
npm install   # установка зависимостей фронтенда

# запуск dev-сервера Vite
npm run dev
```
По умолчанию фронтенд будет доступен по адресу: `http://localhost:5173`
