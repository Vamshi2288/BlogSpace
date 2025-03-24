import { z } from "zod";

export const SignupInput = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
  name: z.string().optional(),
});
export const SigninInput = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
});
export const Blogpost = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  published: z.boolean().optional(),
});
export const Blogupdate = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  id: z.string().optional(),
});
export type Signup = z.infer<typeof SignupInput>;
export type Signin = z.infer<typeof SigninInput>;
export type Blog = z.infer<typeof Blogpost>;
export type Update = z.infer<typeof Blogupdate>;
