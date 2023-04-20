const checkCookie = async () => {
    const response = await fetch('http://localhost:4200/check-cookie', {
        credentials: 'include'
    });
    const json = await response.json();
    if (!json.isLoggedIn) {
        return false
    } else {
        return json
    }
};

export default checkCookie;
