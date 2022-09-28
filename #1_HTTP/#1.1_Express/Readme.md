# Task 1

Create the same server as it is in previous Exercises from node using Express JS
Additionally servers should start serve HTML files from pages directory.
For example when user visits /contact page - server should serve contact.html file

result: inside <a>01-alex--create-basic-server.patch</a> file


# Task 2

Create a server using Express.js which will serve a couple of HTML and JS files.  All HTML files should be served as static files - read about it documentation (Serving static files in Express link )
Application should have also routes:
/  - main page that serve login_form.html
/login - handle request with credentials
/app  - page that will be accessible after login
/error - page that serve error.html when user provide wrong credentials

Simulate behavior of server illustrated on attached image

On client side to send request to /login with axios.
When user provide wrong credentials  response with error message like: "Wrong credentials"

result: inside <a>01-alex-base-auth-server.patch</a> file
