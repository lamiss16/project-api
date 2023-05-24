const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const singerProtoPath = 'singer.proto';
const singerProtoDefinition = protoLoader.loadSync(singerProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const singerProto = grpc.loadPackageDefinition(singerProtoDefinition).singer;
const clientSingers = new singerProto.SingerService('localhost:50051', grpc.credentials.createInsecure());

const albumProtoPath = 'album.proto';
const albumProtoDefinition = protoLoader.loadSync(albumProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const albumProto = grpc.loadPackageDefinition(albumProtoDefinition).album;
const clientAlbums = new albumProto.AlbumService('localhost:50052', grpc.credentials.createInsecure());

const resolvers = {
  Query: {
    singer: (_, { id }) => {
      return new Promise((resolve, reject) => {
        clientSingers.getSinger({ singerId: id }, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.singer);
          }
        });
      });
    },
    singers: () => {
      return new Promise((resolve, reject) => {
        clientSingers.searchSingers({}, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.singers);
          }
        });
      });
    },
    album: (_, { id }) => {
      return new Promise((resolve, reject) => {
        clientAlbums.getAlbum({ albumId: id }, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.album);
          }
        });
      });
    },
    albums: () => {
      return new Promise((resolve, reject) => {
        clientAlbums.searchAlbums({}, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.albums);
          }
        });
      });
    },
  },
  Mutation: {
    createSinger: (_, {  name, description }) => {
      return new Promise((resolve, reject) => {
        clientSingers.createSinger({  name: name, description: description }, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.singer);
          }
        });
      });
    },
    createAlbum: (_, {  title, description }) => {
      return new Promise((resolve, reject) => {
        clientAlbums.createAlbum({  title: title, description: description }, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.album);
          }
        });
      });
    },
  },
};

module.exports = resolvers;
