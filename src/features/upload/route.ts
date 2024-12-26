import { zValidator } from "@hono/zod-validator";
import { constantCase } from "change-case"
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { checkContentIsExist } from "../../utils";
import { uploadFormSchema } from "./schema";

// Upload route implementation goes here
const uploadRoute = new Hono().basePath("/upload")
    .post("/",
        zValidator("form", uploadFormSchema),
        async (c) => {
            const body = await c.req.valid("form")

            let fileName = body.file.name.split(".")[0] || ''

            fileName = constantCase(fileName)

            const hasFile = await checkContentIsExist(fileName)

            if (!hasFile) {
                throw new HTTPException(400, { message: 'File is already exists, please use another filename.' })
            }

            return c.json({ message: "File uploaded successfully!" })
        })


export default uploadRoute