const path = document.querySelectorAll('path');

for (let i = 0; i < path.length; i++) {
    console.log(`Letter ${i} is ${path[i].getTotalLength()}`)
}