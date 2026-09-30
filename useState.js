// const [intialState, setFun] = useState(args);


const outerFun = () => {
    let state = [];
    let index = 0;
    let App;
    let curRes;

   const useState = (initialState) => {
    const localIdx = index;
    if(typeof state[localIdx] === "undefined") state[localIdx] = initialState;

    index++;

    const setState = (newVal) => {
         state[localIdx] = typeof newVal === "function" ? newVal(state[localIdx]) : newVal;  // fun or val

         render();
        //  console.log("SetState: ", curRes);
    }

    return [state[localIdx], setState];
}
    const render = (component = App) => {
        index = 0;
        App = component;
        curRes = App();
        return curRes;
    }
    return {useState, render};
}

const {useState, render} = outerFun();

function App() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState("Empty");

    console.log("Rendering...", count, name);

    return {
        count,
        name,
        increment: () => setCount((prev)=>prev + 1),
        setName
    };
}


function Cpp() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState("Empty");

    console.log("Rendering...", count, name);

    return {
        count,
        name,
        increment: () => setCount((prev)=>prev + 1),
        setName
    };
}

let res = render(App);
// console.log("Before Change: ",res.count);
// console.log("Before Change: ",res.name  );
res.increment();
res.setName("Gaurav");
// res = render(App);
// console.log("After 2nd Change: ",res.count);
// console.log("After 2nd Change: ",res.name);

res.increment();
res.setName("Saurabh");
// res = render(App);
// console.log("After 3rd Change: ",res.count);
// console.log("After 3rd Change: ",res.name);

let xyz = render(Cpp);
xyz.increment();
xyz.setName("second Cpp compnent");

xyz.increment();
xyz.setName("3rd render cpp");