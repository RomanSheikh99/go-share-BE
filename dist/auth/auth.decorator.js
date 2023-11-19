"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = require("@nestjs/common");
const auth_constants_1 = require("./auth.constants");
exports.IS_PUBLIC_KEY = auth_constants_1.jwtConstants.secret;
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;
//# sourceMappingURL=auth.decorator.js.map