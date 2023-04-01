import Parser from "./frontend/parser.ts"
import { createGlobalEnv } from "./runtime/environment.ts"
import { evaluate } from "./runtime/interpreter.ts"

const filename = Deno.args[0]
if (!filename) {
	console.error("No file specified")
	Deno.exit(1)
}

const parser = new Parser()
const env = createGlobalEnv()

let input
try {
	input = Deno.readTextFileSync(filename)
} catch (e) {
	console.error(`Failed to read file ${filename}:\n\n`, e)
	Deno.exit(1)
}

evaluate(parser.produceAST(input), env)
