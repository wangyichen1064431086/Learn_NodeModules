const fs = require('fs');
const got = require('got');

got(
    'http://www.ftchinese.com/index.php/jsapi/related/001068131'
,{
   method:'Post',
})
.then(res => {
    console.log(res.body);
})
.catch(err => {
    console.log("Err:"+err.response.body);
});
