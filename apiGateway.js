const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require ('@apollo/server/express4');
const bodyParser = require('body-parser');
const cors = require('cors');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const singerProtoPath = 'singer.proto';
const albumProtoPath = 'album.proto';

const resolvers = require('./resolvers');
const typeDefs = require('./schema');

const app = express();
app.use(bodyParser.json());

const singerProtoDefinition = protoLoader.loadSync(singerProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const singerProto = grpc.loadPackageDefinition(singerProtoDefinition).singer;
const clientSingers = new singerProto.SingerService('localhost:50051', grpc.credentials.createInsecure());

const albumProtoDefinition = protoLoader.loadSync(albumProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const albumProto = grpc.loadPackageDefinition(albumProtoDefinition).album;
const clientAlbums = new albumProto.AlbumService('localhost:50052', grpc.credentials.createInsecure());

const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {
  app.use(
    cors(),
    bodyParser.json(),
    expressMiddleware(server),
  );
});

app.get('/singers', (req, res) => {
  clientSingers.searchSingers({}, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(response.singers);
    }
  });
});



app.post('/singers', (req, res) => {
  const {  name, description } = req.query;
  clientSingers.createSinger({ name: name, description: description }, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send("created")
    }
  });
});

app.get('/albums', (req, res) => {
  clientAlbums.searchAlbums({}, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(response.albums);
    }
  });
});


app.post('/albums', (req, res) => {
  const {  title, description } = req.query;
  clientAlbums.createAlbum({  title: title, description: description }, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send("created ")
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});
