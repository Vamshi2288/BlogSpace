import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify, decode, jwt } from "hono/jwt";
export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    UserId: any;
  };
}>();
blogRouter.use("/*", async (c, next) => {
  const token = c.req.header("Authorization");
  if (!token || !token.startsWith("Bearer ")) {
    c.status(411);
    return c.json("Invalid format");
  }
  const id = token.split(" ")[1];
  try {
    const user = await verify(id, c.env.JWT_SECRET);
    console.log(user.name);

    if (user) {
      c.set("UserId", user.id);
      await next();
    }
  } catch (e) {
    c.status(411);
    return Response.json({ msg: "User not found" });
  }
});
blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const userId = c.get("UserId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorid: userId,
        published: body.published,
      },
    });
    return c.json({
      id: blog.id,
    });
  } catch (err) {
    return c.json({
      msg: "Fields cannot be empty , please provide the required fields",
    });
  }
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const userId = c.get("UserId");
  const blog = await prisma.post.update({
    where: { id: body.id },
    data: {
      title: body.title,
      content: body.content,
      authorid: userId,
    },
  });
});
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.get("UserId");
  const blogs = await prisma.post.findMany({
    select: {
      title: true,
      id: true,

      content: true,
      published: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json({ blogs });
});
blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: Number(id),
      },
      select: {
        title: true,
        content: true,
        published: true,
        id: true,
        author: { select: { name: true } },
      },
    });
    return c.json(blog);
  } catch (e) {
    c.status(400);
    return c.json({ msg: "Error occured" });
  }
});
