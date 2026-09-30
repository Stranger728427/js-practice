
Promise.myAny = function(promises){
    return new Promise((resolve, reject)=>{
        if(promises.length===0){
            reject(new AggregateError([], "All promises were rejected"));
            return;
        }

        let rejCt=0;
        const errors=[];


        promises.forEach((p,idx)=> {
            Promise.resolve(p).then((val)=>{
                 resolve(val);

            }).catch((err)=>{
                errors[idx]=err;
                rejCt++;

                if(rejCt === promises.length){
                    reject(new AggregateError(errors,"All promises were rejected"));
                }
            })
        
        })
    })

}

const p2 = Promise.reject();
const p1 = 'hello'

Promise.myAny([p1,p2])
.then((val)=>console.log(val))
.catch(console.error())

// Promise.myAny([
//     Promise.reject("err1"),
//     Promise.reject("err2"),
//     Promise.resolve("success"),
//     Promise.resolve("another")
// ])
// .then(console.log)
// .catch(console.error);