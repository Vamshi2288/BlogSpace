import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify, decode, jwt } from "hono/jwt";
import { SigninInput, SignupInput } from "@dev-zod/medium-commons";
export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL, ///->gets the env variable from toml file
  }).$extends(withAccelerate());

  const body = await c.req.json(); //getting the body *req.body*
  try {
    const response = SignupInput.safeParse(body);
    if (!response.success) {
      c.status(403);

      return Response.json({ msg: "Enter valid Details" });
    }
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });
    const token = await sign(
      { id: user.id, name: user.name ? user.name : null },
      c.env.JWT_SECRET
    );
    return c.json(token);
  } catch (e) {
    c.status(411);
    return c.json({ msg: "Email is taken" });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    if (!user) {
      c.status(403);
      return c.json({ msg: "User not found" });
    }
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    c.status(200);
    return c.json(token);
  } catch (e) {
    c.status(411);
    return c.json("Invalid");
  }
});
