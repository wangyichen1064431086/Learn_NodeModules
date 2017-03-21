function createFunctions(){
    var result = new Array();
    for(var i=0;i<10;i++){
    
        result[i] = (function(num){
                return num;
        })(i);
    }
    return result;

}

const myObj ={
    a:'lalala',
    b:""
};

let k = myObj.c;

console.log(myObj.a);
console.log(myObj.b);
console.log(myObj.c);
console.log(k);

if(myObj.b){
    console.log("b exists");
}