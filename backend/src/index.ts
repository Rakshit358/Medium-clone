import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'

type Variables = {
	message: String
}

const app = new Hono<{Bindings: {
	DATABASE_URL: string,
	JWT_SECRET: string
},
Variables:{
	userId:string
}}>();

app.use('/*',cors());

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog",blogRouter);





export default app; 