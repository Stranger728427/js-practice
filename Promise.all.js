Promise.myPromiseAll = function (promises) {
    return new Promise((resolve,reject)=>{
        const ans = [];
        let completed=0;

       if(promises.length===0){
        resolve([]);
        return;
       }

        promises.forEach((p,idx)=>{
            Promise.resolve(p).then((val)=> {
                ans[idx]=val;
                completed++;

                if(completed===promises.length){
                    resolve(ans);
                }
            })
            .catch(reject)
        })
    })
}

const p1 = 12;
const p2 = Promise.resolve(13);
const p3 = new Promise((resolve, reject)=>{
    
    setTimeout(resolve,100,"foo");
    resolve('222')
    // reject()
    console.log('hello')
})

Promise.myPromiseAll([p1,p2,p3]).then((p)=> console.log(p)).catch(console.error('Error aa gya'));