"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const mongoose = require("mongoose");
exports.databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: () => mongoose.connect(process.env.DB_URL)
            .then(() => {
            console.log('Database connected');
            return mongoose;
        })
    },
];
//# sourceMappingURL=database.providers.js.map