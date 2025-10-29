#!/bin/bash

echo "🚀 Запуск URL Shortener с Docker Compose..."

# Останавливаем и удаляем существующие контейнеры
echo "🛑 Останавливаем существующие контейнеры..."
docker-compose down

# Собираем и запускаем сервисы
echo "🔨 Собираем и запускаем сервисы..."
docker-compose up --build

echo "✅ Готово! Приложение доступно по адресу: http://localhost:8080"
echo "📊 Swagger UI: http://localhost:8080/swagger-ui.html"
echo "🗄️  PostgreSQL: localhost:5433"
