//domain/.netlify/functions/hello

const test = [
    { id: 1, name: 'prabhneet' },
    { id: 2, name: 'john' },
    { id: 3, name: 'hozho' },
    { id: 4, name: 'henal' },
    { id: 5, name: 'shrishti' },
]

exports.handler = async function (event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify(test)
    }
}