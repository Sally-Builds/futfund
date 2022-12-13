Running the project

NB: before running these command make sure you have NODE.Js ^16.4.2 installed on you computer and also make sure npm is installed

1)	run the command – npm install -g truffle
2)	verify that the truffle installed by running this command – truffle version
3)	Download ganache from https://trufflesuite.com/ganache/
4)	Install Metamask extension in your browser(chrome)
5)	Setup metamask and ganache - https://www.geeksforgeeks.org/how-to-set-up-ganche-with-metamask/#:~:text=Ganache%20CLI,on%20the%20ganache%20blockchain%20successfully
	Tip: Try to add 2 accounts to the metamask so that one can be an admin while the other will be a regular user.
6)	Open the migrations/2_deploy_contract.js file.
6)	Copy the account address you want as admin and replace with the admin_address variable's value.
7)	open command prompt
8)	cd into the project directory
9) 	run the command – truffle deploy
10)	run the command – node copy.js
11)	cd into client folder
12)	run npm install
13)	run the command to start the project – npm run start
