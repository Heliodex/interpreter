import {
	MK_BOOL,
	MK_NATIVE_FN,
	MK_NIL,
	MK_NUMBER,
	RuntimeVal,
} from "./values.ts"

export function createGlobalEnv() {
	const env = new Environment()
	// Create Default Global Enviornment
	env.declareVar("true", MK_BOOL(true))
	env.declareVar("false", MK_BOOL(false))
	env.declareVar("nil", MK_NIL())

	// Define a native builtin method
	env.declareVar(
		"print",
		MK_NATIVE_FN(args => {
			console.log(...args)
			return MK_NIL()
		})
	)

	function timeFunction(_args: RuntimeVal[], _env: Environment) {
		return MK_NUMBER(Date.now())
	}
	env.declareVar("time", MK_NATIVE_FN(timeFunction))

	return env
}

export default class Environment {
	private parent?: Environment
	private variables: Map<string, RuntimeVal>

	constructor(parentENV?: Environment) {
		// const global = parentENV ? true : false
		this.parent = parentENV
		this.variables = new Map()
	}

	public declareVar(varname: string, value: RuntimeVal): RuntimeVal {
		this.variables.set(varname, value)

		return value
	}

	public assignVar(varname: string, value: RuntimeVal): RuntimeVal {
		this.variables.set(varname, value)
		return value
	}

	public lookupVar(varname: string): RuntimeVal {
		const env = this.resolve(varname)
		return env.variables.get(varname) as RuntimeVal
	}

	public resolve(varname: string): Environment {
		if (this.variables.has(varname) || this.parent == undefined) return this

		return this.parent.resolve(varname)
	}
}
