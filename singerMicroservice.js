const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const singerProtoPath = 'singer.proto';
const singerProtoDefinition = protoLoader.loadSync(singerProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const singerProto = grpc.loadPackageDefinition(singerProtoDefinition).singer;

const singerService = {
 
  searchSingers: async (call, callback) => {
    const { query } = call.request;
    try {
      const singers = await prisma.singer.findMany();
      callback(null, { singers: singers });
    } catch (error) {
      console.error('Error while retrieving albums:', error);
      callback(error);
    }
  },
  createSinger: async (call, callback) => {
    const { name, description } = call.request;

    try {
      const createSinger = await prisma.singer.create({
        data: {
          name,
          description,
        },
      });

      callback(null, { singer: [createSinger] });
    } catch (error) {
      callback({ code: 500, message: "Internal server error" });
    }
  },
};
 

const server = new grpc.Server();
server.addService(singerProto.SingerService.service, singerService);
const port = 50051;
server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('Failed to bind server:', err);
    return;
  }

  console.log(`Server is running on port ${port}`);
  server.start();
});
console.log(`Singer microservice running on port ${port}`);
