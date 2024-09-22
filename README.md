# Информация

Этот проект представляет собой тестовый фреймворк на основе Playwright для автоматизации end-to-end.
Тестовый сценарий реализует попытку сделать пожертвование (через специальную форму) с использованием кредитной карты, которая должна быть отклонена.

## Структура проекта

- **`pages/`**: Содержит Page Object Model (POM) для страниц.
- **`data/`**: Содержит данные пользователя и платежные данные для тестирования.
- **`tests/`**: Содержит тесты.
- **`allure-results/`**: Папка для хранения результатов тестов (создается после генерации allure-отчетов).

## Установка

```bash
npm install
```

```bash
npx playwright install
```

```bash
npm install -g allure-commandline
```

## Запуск тестов

### Запуск тестов с allure-отчетами

```bash
npx playwright test --reporter=allure-playwright
```

## Работа с allure-отчетами

### Генерация отчетов

```bash
npx allure generate allure-results --clean
```

### Открытие отчета в браузере

```bash
npx allure open
```

### Удаление отчетов

```bash
npm run clean:allure
```
