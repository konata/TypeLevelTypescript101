/**
 * javascript object system 
 */
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

/**
 * javascript inheritance
 */
function User() {
    this.name = "alger"
    this.password = "123456"
}
User.prototype = {
    login: function() {
        console.log(`welcome ${this.name} with ${this.password}`)
    },
    logout: function() {
     console.log(`bye ${this.name}`)
    }
}
console.log(new User)

function Admin() {
    this.permission = `select update delete`.split(/\s+/g)
}
Admin.prototype = new User()
const admin = new Admin()
console.log(admin)
console.log(`${admin.permission} ${admin.password}`)










