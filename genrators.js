function* fetchUserWorkFlow(){
    const token = yield {
        type:"GET_TOKEN"
    }

// on first execution Get Token

    const response = yield {
        type: "FETCH_USER",
        token
    }
// on 2nd call Fetch _user and token is assigned to previous yield token = token

    if(response.status === 401){
        const newToken = yield {
            type: "REFRESH_TOKEN"
        }

        return yield {
            type: "FETCH_USER",
            newToken
        }
    }
}

async function run(generator) {
    let result = generator.next();
    console.log(result)
    while (!result.done) {
        const action = result.value;

        let response;

        if (action.type === "GET_TOKEN") {
            response = await getToken();
        }

        if (action.type === "FETCH_USER") {
            response = await fetchUser(action.token);
        }

        if (action.type === "REFRESH_TOKEN") {
            response = await refreshToken();
        }

        result = generator.next(response);
    }

    return result.value;
}

const user = run(fetchUserWorkFlow());
