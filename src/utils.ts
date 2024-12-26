import { existsSync } from "node:fs"
import { mkdir } from "node:fs/promises"
import path from "node:path"

export async function getContentPath() {
    const projectPath = process.cwd()
    const contentPath = path.join(projectPath, 'static')

    if (!existsSync(contentPath)) {
        await mkdir(contentPath)
    }

    return contentPath
}

export async function checkContentIsExist(fileName: string) {
    const contentPath = await getContentPath()
    return existsSync(path.join(contentPath, `${fileName}.html`))
}