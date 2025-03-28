"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blogupdate = exports.Blogpost = exports.SigninInput = exports.SignupInput = void 0;
const zod_1 = require("zod");
exports.SignupInput = zod_1.z.object({
    email: zod_1.z.string().email().min(1),
    password: zod_1.z.string().min(1),
    name: zod_1.z.string().optional(),
});
exports.SigninInput = zod_1.z.object({
    email: zod_1.z.string().email().min(1),
    password: zod_1.z.string().min(1),
});
exports.Blogpost = zod_1.z.object({
    title: zod_1.z.string().min(1),
    content: zod_1.z.string().min(1),
    published: zod_1.z.boolean().optional(),
});
exports.Blogupdate = zod_1.z.object({
    title: zod_1.z.string().min(1),
    content: zod_1.z.string().min(1),
    id: zod_1.z.string().optional(),
});
