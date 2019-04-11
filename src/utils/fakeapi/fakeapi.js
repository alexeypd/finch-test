class FakeApi {
  get() {
    return fetch('https://jsonplaceholder.typicode.com/comments/');
  }

  post(body) {
    return fetch('https://neto-api.herokuapp.com/bosa-noga/cart/', {
      body: JSON.stringify(body),
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }
}

const fakeapi = new FakeApi();

export default fakeapi;
