const app = require('./app');
const { syncDatabase } = require('./config/database');

const PORT = process.env.PORT || 3001;

// Graceful shutdown function
const gracefulShutdown = (signal) => {
    console.log(`\n${signal} received. Starting graceful shutdown...`);
    
    server.close((err) => {
        if (err) {
            console.error('❌ Error during graceful shutdown:', err);
            process.exit(1);
        }
        
        console.log('✅ Server closed successfully');
        process.exit(0);
    });
    
    // Force shutdown after 30 seconds
    setTimeout(() => {
        console.log('⚠️  Forced shutdown after 30 seconds');
        process.exit(1);
    }, 30000);
};

// Start server
const server = app.listen(PORT, async () => {
    console.log('🚀 Server starting...');
    console.log(`📡 Server is running on http://localhost:${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📚 API Documentation: http://localhost:${PORT}/api`);
    
    // Sync database in development
    if (process.env.NODE_ENV === 'development') {
        await syncDatabase();
    }
    
    console.log('✅ Server is ready to accept connections');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Promise Rejection:', err);
    gracefulShutdown('UNHANDLED_REJECTION');
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception:', err);
    gracefulShutdown('UNCAUGHT_EXCEPTION');
});

// Handle termination signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

module.exports = server;
