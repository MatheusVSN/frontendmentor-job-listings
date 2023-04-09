import path from "path"
import {promises as fs} from "fs"

export default async function handler(request, response) {
    const jsonDirectory = path.join(process.cwd(), "json")
    const fileContent = await fs.readFile(jsonDirectory + "/data.json", "utf8")
    response.status(200).json(fileContent)
}