import {
	FunctionDeclaration,
	Program,
	VarDeclaration,
} from "../../frontend/ast.ts"
import Environment from "../environment.ts"
import { evaluate } from "../interpreter.ts"
import { FunctionValue, MK_NIL, RuntimeVal } from "../values.ts"

export function eval_program(program: Program, env: Environment): RuntimeVal {
	let lastEvaluated: RuntimeVal = MK_NIL()
	for (const statement of program.body) {
		lastEvaluated = evaluate(statement, env)
	}
	return lastEvaluated
}

export function eval_var_declaration(
	declaration: VarDeclaration,
	env: Environment
): RuntimeVal {
	const value = declaration.value
		? evaluate(declaration.value, env)
		: MK_NIL()

	return env.declareVar(declaration.identifier, value)
}

export function eval_function_declaration(
	declaration: FunctionDeclaration,
	env: Environment
): RuntimeVal {
	// Create new function scope
	const fn = {
		type: "function",
		name: declaration.name,
		parameters: declaration.parameters,
		declarationEnv: env,
		body: declaration.body,
	} as FunctionValue

	return env.declareVar(declaration.name, fn)
}
