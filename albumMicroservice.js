const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const albumProtoPath = 'album.proto';
const albumProtoDefinition = protoLoader.loadSync(albumProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const albumProto = grpc.loadPackageDefinition(albumProtoDefinition).album;

const albumService = {
  searchAlbums: async (call, callback) => {
    const { query } = call.request;
    try {
      const albums = await prisma.album.findMany();
      callback(null, { albums: albums });
    } catch (error) {
      console.error('Error while retrieving albums:', error);
      callback(error);
    }
  },
  createAlbum: async (call, callback) => {
    const { title, description } = call.request;

    try {
      const createAlbum = await prisma.album.create({
        data: {
          title,
          description,
        },
      });

      callback(null, { album: [createAlbum] });
    } catch (error) {
      callback({ code: 500, message: "Internal server error" });
    }
  },
};

const server = new grpc.Server();
server.addService(albumProto.AlbumService.service, albumService);
const port = 50052;
server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('Failed to bind server:', err);
    return;
  }

  console.log(`Server is running on port ${port}`);
  server.start();
});
console.log(`Album microservice running on port ${port}`);
