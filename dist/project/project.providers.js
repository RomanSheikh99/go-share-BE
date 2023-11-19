"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectProviders = void 0;
const project_schema_1 = require("./project.schema");
exports.projectProviders = [
    {
        provide: 'PROJECT_MODEL',
        useFactory: (connection) => connection.model('Project', project_schema_1.ProjectSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=project.providers.js.map