const display = cica => `
    <div id="${cica.id}">${cica.nev}
    <span onclick="del(${cica.id})">X</x>
    </div>
`

const del = async id => {
    let answ = await fetch(`http://localhost:3000/cica/${id}`, {
        method: 'DELETE'
    })
    if (answ) 
        document.getElementById(id).remove()
}
window.onload = async () => {
    data = await fetch('http://localhost:3000/cica')
    data = await data.json()
    document.getElementById('container').innerHTML = 
        data
            .map(display)
            .join('')
    let element = document.getElementById('keplet')
    katex.render("c = \\int _0^1\\int _0^1\\frac{x^2}{1+y^2}dydx", element, {
        throwOnError: false
    })
    hljs.highlightAll();
}
async function sendtoserver() {
    let i1 = document.querySelector('input')
    value = i1.value
    answ = await fetch(`http://localhost:3000/post`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nev: value })
    })
    answ = await answ.json()
    document.getElementById('container').innerHTML = 
        answ
            .map(display)
            .join('')
    i1.value = ''
}