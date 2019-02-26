# Ethereum Image Exchange
An app which allows users to upload images and set prices for those images in Ethereum. Other users then see the images they would like to purchase and use metamask to buy rights to download them.

## Motivation
This project was created as a proof-of-concept for storefront webapps using Metamask and ethereum

## Project structure
The project is divided into three separate direcories, backend, frontend and eth-contracts. Backend is a [Node.js](https://nodejs.org/en/) and [express](https://expressjs.com/) server serving images and performing storage of user and image information using [MongoDB](https://www.mongodb.com/). The frontend is a React app scaffolded using [create-react-app](https://github.com/facebook/create-react-app) and design with [antd](https://ant.design/). The app is also using [cloudinary](https://cloudinary.com) for image storage and manipulation, while mongo only stores information relating the image to each metamask account.