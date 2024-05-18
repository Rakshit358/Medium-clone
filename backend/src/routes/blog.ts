import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'


type Variables = {
	message: String
}

export const blogRouter = new Hono<{Bindings: {
	DATABASE_URL: string,
	JWT_SECRET: string
},
Variables:{
	userId:string
}}>();

blogRouter.use('/*',async (c,next) => {
	const token = c.req.header('Authorization');
	
	if(!token){
		c.status(403);
		return c.json({"error":"unauthorized"});
	}
    console.log(token)
	const jwt = token;
	// console.log(jwt);
	const secret = c.env.JWT_SECRET;
	const payload = await verify(jwt,secret);
    if(!payload){
		c.status(403);
		return c.json({"error":"unauthorized"});
	} 
    // console.log(payload.id);
    c.set('userId',payload.id);
	await next();
})

blogRouter.get('/bulk', async (c) => { 
    console.log("here reached");


	const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    const blogs = await prisma.post.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    });
    
    console.log(blogs);
    
    return c.json({blogs});
})

blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
     const id = c.req.param("id");
    
     try {
        const blog = await prisma.post.findFirst({
           where:{
            id: id
           },
           select: {
             id : true,
             title : true,
             content : true,
             author: {
                select : {
                    name : true
                }
             }
           }
         })
    
        return c.json({blog})
     } catch (error) {
        c.status(500);
        return c.json({'message':"Error while fetching blog post"})
     }
})


blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    

     const body = await c.req.json();
    //  console.log(body);
     const authorId  = c.get('userId'); 
    //  console.log(authorId);

     const blog = await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:authorId
        }
     })

	return c.json({id:blog.id})
    // return c.text("ok");
})

blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
     const body = await c.req.json();
     
     const blog = await prisma.post.update({
        where:{
            id: body.id
        },
        data:{
            title:body.title,
            content:body.content,
        }
     })

	return c.json({id:blog.id})
})