# Frontend for URL Shortener

## Запуск в dev-режиме

1) Установите зависимости:

```bash
cd frontend
npm i
```

2) Запустите dev-сервер (прокси на http://localhost:8080 настроен):

```bash
npm run dev
```

Приложение откроется на `http://localhost:5173`.

Вставьте JWT токен в поле "JWT токен" для авторизованных запросов.

## Продакшен сборка

```bash
npm run build
npm run preview
```

## Переменные
- Бэкенд ожидается на `http://localhost:8080` (см. vite proxy в `vite.config.ts`).
- Авторизация через Bearer JWT.
