import Environment from "./environment.ts"
import { Stmt } from "../frontend/ast.ts"
export type ValueType =
	| "nil"
	| "number"
	| "boolean"
	| "object"
	| "native-fn"
	| "function"

export interface RuntimeVal {
	type: ValueType
}

/**
 * Defines a value of undefined meaning
 */
export interface NullVal extends RuntimeVal {
	type: "nil"
	value: null
}

export const MK_NIL = () => ({ type: "nil", value: null } as NullVal)

export interface BooleanVal extends RuntimeVal {
	type: "boolean"
	value: boolean
}

export const MK_BOOL = (b = true) =>
	({ type: "boolean", value: b } as BooleanVal)

/**
 * Runtime value that has access to the raw native javascript number.
 */
export interface NumberVal extends RuntimeVal {
	type: "number"
	value: number
}

export const MK_NUMBER = (n = 0) => ({ type: "number", value: n } as NumberVal)

/**
 * Runtime value that has access to the raw native javascript number.
 */
export interface ObjectVal extends RuntimeVal {
	type: "object"
	properties: Map<string, RuntimeVal>
}

export type FunctionCall = (args: RuntimeVal[], env: Environment) => RuntimeVal

export interface NativeFnValue extends RuntimeVal {
	type: "native-fn"
	call: FunctionCall
}
export const MK_NATIVE_FN = (call: FunctionCall) =>
	({ type: "native-fn", call } as NativeFnValue)

export interface FunctionValue extends RuntimeVal {
	type: "function"
	name: string
	parameters: string[]
	declarationEnv: Environment
	body: Stmt[]
}
