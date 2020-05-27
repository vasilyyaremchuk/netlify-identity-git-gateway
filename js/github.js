function getData(mypath = '') {

    let user = netlifyIdentity.currentUser()
    let token = user.token.access_token

    var url = "/.netlify/git/github/contents/" + mypath;
    var bearer = 'Bearer ' + token;
    return fetch(url, {
            method: 'GET',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json'
            }
        }).then(resp => {
            return resp.json();
        }).then(data => {
            return data

        })
        .catch(error => {
            return error
        });

}

function saveData(mypath, data) {

    getData().then(function(files) {

        let curfile = files.filter(x => x.path == mypath)

        let opts = {
            path: mypath,
            message: "initial commit",
            content: btoa(data),
            branch: "master",
            committer: { name: "Dashpilot", email: "support@dashpilot.com" },
        }

        if (typeof curfile[0] !== 'undefined') {
            opts.sha = curfile[0].sha
        }

        var url = "/.netlify/git/github/contents/" + mypath;
        var bearer = 'Bearer ' + token;
        fetch(url, {
                body: JSON.stringify(opts),
                method: 'PUT',
                withCredentials: true,
                credentials: 'include',
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                }
            }).then(resp => {
                return resp.json();
            }).then(data => {
                console.log(data)
            })
            .catch(error => this.setState({
                message: 'Error: ' + error
            }));

    });

}