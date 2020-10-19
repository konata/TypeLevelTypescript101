//#region Structural-Type
let foo = 123
var bar = "bar"
const foobar = {
    foo: 'foo',
    bar: 'bar',
    baz: function () {
        console.log(`baz`)
    }
}

const foobaz = {
    foo: 'hello',
    bar: 'world',
    baz: function () {
        console.log(`foobaz`)
    }
}

type Foobar = typeof foobar
type Foobaz = typeof foobaz

type IsSame<F, T> = F extends T ? (T extends F ? true : false) : false
type BarIsBaz = IsSame<Foobaz, Foobar>

const literalStringA = 'literal-a'
const literalStringB = 'literal-b'
const falsy = false
const truly = true
const num = 11.2
type AIsB = IsSame<typeof literalStringA, typeof literalStringB>
//#endregion


//#region Type-Construct
type TypeConstructs = [
    boolean,
    number,
    string,
    symbol,
    any[],
    unknown,
    any,
    void,
    null,
    undefined,
    never
]

class Authentication {
    public name?: string
    public pass?: string
}

type A = 1 | 2 | 3

interface Interface {
    [_: number]: string;
    (arg: string): string;
    interval: number;
    reset(): void
}

type Mapped = {
    [_ in 'a' | 'b' | 'c']: string
}
//#endregion


//#region Literal-Type

//#endregion


//#region Union-Type

//#endregion

//#region Intersection-Type

//#endregion

//#region Generic-Type

//#endregion

//#region Index-Type
//#endregion

//#region Mapped-Type
//#endregion

//#region Conditional-Type & Infer Type
type Unpack<T> = T extends Promise<infer R> ? R :
    T extends Array<infer R> ? R :
    T extends (..._: any[]) => infer R ? R :
    T

type Values = [
    Unpack<number[]>,
    Unpack<Promise<string>>,
    Unpack<() => boolean>,
    Unpack<'123'>
]
//#endregion








