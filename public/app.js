const quoteHeader=document.getElementById('quoteHeader')
const quoteAuthor=document.getElementById('quoteAuthor')
var newDom = '';
var animationDelay = 25;

for(let i = 0; i < quoteHeader.innerText.length; i++)
{
    newDom += '<span class="char">' + (quoteHeader.innerText[i] == ' ' ? '&nbsp;' : quoteHeader.innerText[i])+ '</span>';
}

quoteHeader.innerHTML = newDom;
var length = quoteHeader.children.length;

for(let i = 0; i < length; i++)
{
    quoteHeader.children[i].style['animation-delay'] = animationDelay * i + 'ms';
}