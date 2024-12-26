import { HTTPException } from "hono/http-exception";
import { z } from "zod";

export const uploadFormSchema = z.object({
    file: z.instanceof(File).refine(value => {
        if (value.type !== 'text/html') {
            throw new HTTPException(400, {
                message: 'Invalid file type, file type should be text/html'
            })
        }
        return value;
    })
})