export function LogOut(): any {
    localStorage.setItem('jwtToken', '');
    window.location.href = '/api/login';
}

export function LogIn(email: string, password: string, evt: React.FormEvent): string {
    evt.preventDefault();
    let jwtToken = '';
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwtToken}` },
        body: JSON.stringify({ email, password }),
    };

    fetch('http://localhost:5000/api/login', requestOptions)
        .then((response) => {
            alert(response);
            return response.json();
        })
        .then((data) => {
            jwtToken = data.token;
        })
        .catch((error) => {
            alert(error);
        });
    // alert(jwtToken);
    return jwtToken;
}
