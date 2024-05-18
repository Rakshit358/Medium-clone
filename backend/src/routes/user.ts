import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
// import { cors } from 'hono/cors'

type Variables = {
	message: String
}

export const userRouter = new Hono<{Bindings: {
	DATABASE_URL: string,
	JWT_SECRET: string
},
Variables:{
	userId:string
}}>();


// userRouter.use('/api/*',cors());

userRouter.post('/signup', async (c) => {
    console.log("jere");
	const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate());

 const body = await c.req.json();
 console.log(body)
 try {
	const user = await prisma.user.create({
		data:{
			email: body.email,
			password: body.password,	
		}
	})
	const secret = c.env.JWT_SECRET;
    const token = await sign({id: user.id}, secret);
	return c.json({"message":"Success", "token": token});
 } catch (error) {
	c.status(403)
	console.log(error);
	return c.json({"message":"Failed"});
 }
})

userRouter.post('/signin',async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
	
	const body = await c.req.json();
	try {
		const user = await prisma.user.findUnique({
			where: {
				email: body.email,
				password: body.password
			}
		})
		if(user == null)
			{
				c.status(403);
				return c.json({"message":"User with email not found"})
			}
		const secret = c.env.JWT_SECRET;
		const token = await sign({id: user.id},secret);
		return c.json({ token })
	} catch (error) {
		c.status(403)
		console.log(error);
		return c.json({"message":"Failed"});
	}
})