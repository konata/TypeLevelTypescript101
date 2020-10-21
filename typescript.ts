//#region Why-Type-System-Matters
module WhyTypeSystemMatters {
    declare namespace wx {
        function login(options: {
            timeout: number,
            success?: (_: { ticket: string }) => void,
            fail?: (code: number) => void,
            complete?: () => void,
        }): void

        function checkSession(options: {
            currentSession: string,
            success?: () => void,
            fail?: () => void,
            complete?: () => void,
        }): void

        function getWerunData(options: {
            timespan: number,
            success?: (_: { data: string, iv: string, cloudId: string }) => void,
            fail?: (code: number) => void,
            complete?: () => void,
        }): void
    }


    wx.login({
        timeout: 100,
        success: ({ ticket }) => {
            wx.checkSession({
                currentSession: ticket,
                success: () => {
                    wx.getWerunData({
                        timespan: 1000 * 60 * 60 * 24,
                        success: ({ data, iv }) => {
                            console.log(iv)
                        }
                    })
                }
            })
        }
    })


    interface Cont<R> {
        fail?: (_: any) => void
        success?: (_: R) => void
    }

    interface Suspendable<O> {
        (option: O): any
    }

    let suspend = <O extends Cont<any>>(src: Suspendable<O>) => (opt: Omit<O, "success" | "fail">) => new Promise<Parameters<Exclude<O["success"], undefined>>[0]>((resolve, _) => src({
        ...opt,
        success: right => resolve(right),
        fail: (_) => resolve(undefined)
    } as O))


    const login = suspend(wx.login)
    const checkSession = suspend(wx.checkSession)
    const getWerunData = suspend(wx.getWerunData)

    async function main() {
        // const { ticket }  = await login({ timeout: 1000 })
        // await checkSession({ currentSession: ticket}) 
        // await getWerunData({  timespan: 1000})
        const foo = await login({ timeout: 1000 })
    }
}
//#endregion


//#region Structural-Type
module StructuralType {
    class A {
        public name!: string
        // public foo!: string
    }
    class B {
        public name!: string
        public pass!: string
    }
    const duck: A = new B() // it compiles!


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
}
//#endregion


//#region Type-Construct
module TypeConstruct {
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

    type AuthenticateType = Authentication

    type A = 1 | 2 | 3

    interface Interface {
        [_: number]: string;
        (arg: string): string;
        interval: number;
        reset(): void
    }

    //* usage
    // {
    //     const a : Interface = <any>null
    //     const index = a[100]
    //     const fun = a("foo")
    //     const c = a.interval
    //     a.reset()
    // }


    type Mapped = {
        [_ in 'a' | 'b' | 'c']: string
    }

    //* usage
    // {
    //     const a: Mapped = <any>null
    //     a.
    // }
}
//#endregion


//#region Literal-Type
module LiteralType {
    type Color = "red" | "green"
    type View = 'Button' | 'TextView' | 'ImageView'
    type ViewParent = 'LinearLayout' | 'ConstraintLayout' | 'RelativeLayout'

    //* usage
    // declare function addView(toAdd: View | ViewParent, parent: ViewParent, bg: Color) 
    // addView('', '', )

    type ResourceId = number
    type Drawable = {
        draw: () => void
    }
    type Background = ResourceId | Drawable | Color
}
//#endregion


//#region Union-Type
module UnionType {
    type Color = "red" | "green"
    type ResourceId = number
    type Drawable = {
        draw: () => void
    }
    type Background = ResourceId | Drawable | Color

    //* usage
    // declare function inflateBackground(bg: Background): void
    // inflateBackground({ draw: () => { } })
    // inflateBackground(1)
    // inflateBackground("red")

    // Discriminated Union
    type PlayMessage = {
        command: 1
        payload: { songName: string, artist: string }
    }

    type PauseMessage = {
        command: 2
        payload: number
    }

    type QuitMessage = {
        command: 3
        payload: { reason: string }
    }

    type ShuffleMessage = {
        command: 'a'
        shuffleRate: 100
    }

    type Message = PlayMessage | PauseMessage | ShuffleMessage | QuitMessage

    // usage:  narrow ->  control-flow-analysis (if/switch) / type guard
    // function onReceive(message: Message): any {
    //     switch(message.command) {
    //         case 'a' :  return message.shuffleRate
    //         case 1 : return message.payload.artist
    //         case 2 : return message.command
    //         case 3: return message.payload.reason
    //     }
    // }
}
//#endregion

//#region Intersection-Type
module IntersectionType {
    type User = {
        name: string
        pass: string
    }

    type Authenticate = {
        permission: string[]
    }

    type Admin = User & Authenticate

    // usage 
    // function mixin<F, S>(first: F, second: S): F & S {
    //     return { ...first, ...second }
    // }

    // function mixin2<F, S>(first: F, second: S) {
    //     return Object.assign(first, second)
    // }
}
//#endregion

//#region Generic-Type
module GenericType {

    class Kotlin {
        coroutine!: string
        extension!: number
    }

    class Scala {
        implicits!: boolean
        functional!: boolean
    }

    class Swift {
        nameArguments!: string
        unionType!: boolean
    }

    class Platform {
        IO!: string
    }

    class Android extends Platform {
        dalvik!: Kotlin
    }

    class Actor extends Platform {
        messagePassing!: Scala
    }

    class Cocoa extends Platform {
        interop!: Swift
    }


    function of<A extends Platform>(c: new () => A): A {
        return new c();
    }

    of(Android).dalvik.coroutine
    of(Actor).messagePassing.functional
    of(Cocoa).interop.nameArguments
}
//#endregion

//#region Index-Type

module IndexType {

    type Pick<T, K extends keyof T> = Array<T[K]>
    // type A = Pick<{ a: number, b: boolean }, 'a' | 'b'>

    function pick<T, K extends keyof T>(o: T, keys: K[]): T[K][] {
        return keys.map((n) => o[n]);
    }

    // const foo = pick({ name: 'alger', pass: 123, done: false }, ['', ''])
}


//#endregion

//#region Mapped-Type
module MappedType {
    type TextView = {
        width: number
        height: number
        text: string
    }

    type AutoSizedButton = {
        [K in keyof TextView]?: TextView[K]
    }

    // just for 4.1
    // type ComputedTextView = TextView & {
    //     [K in keyof TextView as `measured${capitalize K}`]: TextView[K]
    // }
}

//#endregion

//#region Conditional-Type & Infer Type
module Conditional {
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
}
//#endregion








