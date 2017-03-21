const getSlug = require('speakingurl');

const slug = getSlug('Schöner Titel läßt grüßen!? Bel été !',{
    separator:' ',
    lang:'en'
});
console.log(slug);