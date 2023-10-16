
const request = async (requestData) => {
    try {
        const { url, verb, payload } = requestData;
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }

        let response;
        switch (verb) {
            case 'GET':
                response = await fetch(url, {
                    method: 'GET',
                    headers: headers
                })
                if (response && response.status) {
                    const responseJSON = await response.json();
                    response = { data: responseJSON };
                }
                break;

            case 'POST':
                response = await fetch(url, {
                    method: 'POST',
                    headers: headers,
                    body: payload
                })

                if (response && response.status) {
                    const responseJSON = await response.json();
                    response = { data: responseJSON };
                }
                break;
            default:
                break;

        }


        return response;
    } catch (error) {
        console.log(error);
        return {
            data: 'error'
        }
    }

}

export default request;