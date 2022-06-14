The source code is from https://github.com/karlhadwen/tinder.git

how the source code is modified..

1. display restaurant pictures instead of people's picture 
2. attribute of the each section of intro as description of the restaurant 
3. no super like function 
4. rewind button is gone

Person.js -> Restaurant.js 
Lonely.js -> Done.js

To download and run TheGoodPlates project on your local computer...

1. Make new directory on your local computer

Then on your terminal

2. Type the command $git clone (copied clone SSH or HTTPS link)
3. Open the directory TheGoodPlates on the editor(e.g. VS Code)
4. Go to the server directory and remove npm modules
4. Type the command $npm install on both client and server 
5. Install $npx prisma generate on both client, server, master folder
This process only applies on server
6. Type the command $npm install yelp-fusion --save
7. Type the command $npm install @material-ui/core
8. Type the command $npm install @apollo/client graphql
9. Install $npx prisma generate on both client, server, master folder
10. Open two terminal one in 'client' directory and one in 'server' and type $npm start for both

Then it'll open our website on your localhost: 3001

