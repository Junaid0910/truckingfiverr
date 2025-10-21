async function run() {
  try {
    console.log('Registering bob@example.com');
    let res = await fetch('http://localhost:4000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'bob@example.com', password: 'BobPass123' })
    });
    console.log('register status', res.status);
    console.log(await res.text());

    console.log('\nLogging in with correct password');
    res = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'bob@example.com', password: 'BobPass123' })
    });
    console.log('login status', res.status);
    console.log(await res.text());

    console.log('\nLogging in with wrong password');
    res = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'bob@example.com', password: 'WrongPass' })
    });
    console.log('wrong login status', res.status);
    console.log(await res.text());
  } catch (err) {
    console.error('test error', err);
  }
}

run();
