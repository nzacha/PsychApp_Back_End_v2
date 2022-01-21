# running the server
before starting please install node packages with: 'npm install'
to start the server use: 'npm start'

# not tested
to run as a process do the following:
    - sudo npm i -g pm2
    - pm2 start app.ts
    - pm2 save
    - pm2 startup systemd