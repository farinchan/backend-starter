@echo off
REM ====================================
REM Backend Development Helper Script
REM ====================================

if "%1"=="" (
    echo.
    echo Usage: make [command]
    echo.
    echo Available commands:
    echo   install       - Install all dependencies
    echo   dev           - Start development server
    echo   start         - Start production server
    echo   test          - Run tests
    echo   test:watch    - Run tests in watch mode
    echo   migration     - Generate new migration
    echo   migrate       - Run pending migrations
    echo   migrate:undo  - Undo last migration
    echo   seed          - Generate new seed file
    echo   db:seed       - Run all seeders
    echo   db:seed:undo  - Undo all seeders
    echo   db:reset      - Reset database (undo migrations and seeds)
    echo   lint          - Run linter
    echo   format        - Format code
    echo   clean         - Clean node_modules and package-lock.json
    echo   logs          - Show application logs
    echo   build         - Build for production
    echo   docker:build  - Build docker image
    echo   docker:up     - Start docker containers
    echo   docker:down   - Stop docker containers
    echo   help          - Show this help
    echo.
    goto :eof
)

if "%1"=="install" (
    echo Installing dependencies...
    npm install
    goto :eof
)

if "%1"=="dev" (
    echo Starting development server...
    npm run dev
    goto :eof
)

if "%1"=="start" (
    echo Starting production server...
    npm start
    goto :eof
)

if "%1"=="test" (
    echo Running tests...
    npm test
    goto :eof
)

if "%1"=="test:watch" (
    echo Running tests in watch mode...
    npm run test:watch
    goto :eof
)

if "%1"=="migration" (
    if "%2"=="" (
        set /p migration_name="Enter migration name: "
    ) else (
        set migration_name=%2
    )
    echo Generating migration: !migration_name!
    npx sequelize-cli migration:generate --name !migration_name!
    goto :eof
)

if "%1"=="migrate" (
    echo Running pending migrations...
    npx sequelize-cli db:migrate
    goto :eof
)

if "%1"=="migrate:undo" (
    echo Undoing last migration...
    npx sequelize-cli db:migrate:undo
    goto :eof
)

if "%1"=="seed" (
    if "%2"=="" (
        set /p seed_name="Enter seed name: "
    ) else (
        set seed_name=%2
    )
    echo Generating seed: !seed_name!
    npx sequelize-cli seed:generate --name !seed_name!
    goto :eof
)

if "%1"=="db:seed" (
    echo Running all seeders...
    npx sequelize-cli db:seed:all
    goto :eof
)

if "%1"=="db:seed:undo" (
    echo Undoing all seeders...
    npx sequelize-cli db:seed:undo:all
    goto :eof
)

if "%1"=="db:reset" (
    echo Resetting database...
    npx sequelize-cli db:seed:undo:all
    npx sequelize-cli db:migrate:undo:all
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all
    goto :eof
)

if "%1"=="lint" (
    echo Running linter...
    npm run lint
    goto :eof
)

if "%1"=="format" (
    echo Formatting code...
    npm run format
    goto :eof
)

if "%1"=="clean" (
    echo Cleaning project...
    if exist node_modules rmdir /s /q node_modules
    if exist package-lock.json del package-lock.json
    echo Clean completed!
    goto :eof
)

if "%1"=="logs" (
    echo Showing application logs...
    if exist logs\app.log (
        type logs\app.log
    ) else (
        echo No log file found!
    )
    goto :eof
)

if "%1"=="build" (
    echo Building for production...
    npm run build
    goto :eof
)

if "%1"=="docker:build" (
    echo Building docker image...
    docker build -t whatsapp-gateway-backend .
    goto :eof
)

if "%1"=="docker:up" (
    echo Starting docker containers...
    docker-compose up -d
    goto :eof
)

if "%1"=="docker:down" (
    echo Stopping docker containers...
    docker-compose down
    goto :eof
)

if "%1"=="help" (
    echo.
    echo Backend Development Helper Commands:
    echo.
    echo Basic Commands:
    echo   make install       - Install all dependencies
    echo   make dev           - Start development server with nodemon
    echo   make start         - Start production server
    echo   make test          - Run all tests
    echo   make test:watch    - Run tests in watch mode
    echo.
    echo Database Commands:
    echo   make migration [name]     - Generate new migration file
    echo   make migrate              - Run pending migrations
    echo   make migrate:undo         - Undo last migration
    echo   make seed [name]          - Generate new seed file
    echo   make db:seed              - Run all seeders
    echo   make db:seed:undo         - Undo all seeders
    echo   make db:reset             - Reset database completely
    echo.
    echo Code Quality:
    echo   make lint          - Run ESLint
    echo   make format        - Format code with Prettier
    echo.
    echo Utilities:
    echo   make clean         - Remove node_modules and package-lock.json
    echo   make logs          - Show application logs
    echo   make build         - Build for production
    echo.
    echo Docker Commands:
    echo   make docker:build  - Build docker image
    echo   make docker:up     - Start docker containers
    echo   make docker:down   - Stop docker containers
    echo.
    echo Examples:
    echo   make migration create-products
    echo   make seed demo-users
    echo.
    goto :eof
)

echo Unknown command: %1
echo Run "make help" to see available commands.
