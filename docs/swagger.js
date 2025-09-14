const swaggerJsdoc = require("swagger-jsdoc");

module.exports = swaggerJsdoc({
  definition: {
    openapi: "3.0.3",
    info: {
      title: "API Port de plaisance",
      version: "1.0.0",
      description: "CRUD CatWays, Réservations, Utilisateurs + Auth",
    },
    servers: [{ url: "http://localhost:3000" }],
    components: {
      schemas: {
        Catway: {
          type: "object",
          properties: {
            _id: { type: "string" },
            catwayNumber: { type: "integer" },
            catwayType: { type: "string" },
            catwayState: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
          required: ["catwayNumber", "catwayType", "catwayState"],
        },
        CatwayInput: {
          type: "object",
          properties: {
            catwayNumber: { type: "integer" },
            catwayType: { type: "string" },
            catwayState: { type: "string" },
          },
          required: ["catwayNumber", "catwayType", "catwayState"],
        },

        Reservation: {
          type: "object",
          properties: {
            _id: { type: "string" },
            catwayNumber: { type: "integer" },
            clientName: { type: "string" },
            boatName: { type: "string" },
            startDate: { type: "string", format: "date-time" },
            endDate: { type: "string", format: "date-time" },
          },
          required: [
            "catwayNumber",
            "clientName",
            "boatName",
            "startDate",
            "endDate",
          ],
        },
        ReservationInput: {
          type: "object",
          properties: {
            catwayNumber: { type: "integer" },
            clientName: { type: "string" },
            boatName: { type: "string" },
            startDate: { type: "string", format: "date-time" },
            endDate: { type: "string", format: "date-time" },
          },
          required: [
            "catwayNumber",
            "clientName",
            "boatName",
            "startDate",
            "endDate",
          ],
        },

        User: {
          type: "object",
          properties: {
            _id: { type: "string" },
            email: { type: "string", format: "email" },
            name: { type: "string" },
          },
          required: ["email", "name"],
        },
        UserCreateInput: {
          type: "object",
          properties: {
            email: { type: "string", format: "email" },
            name: { type: "string" },
            password: { type: "string" },
          },
          required: ["email", "name", "password"],
        },
        UserUpdateInput: {
          type: "object",
          properties: {
            name: { type: "string" },
            password: { type: "string" },
          },
        },

        LoginInput: {
          type: "object",
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string" },
          },
          required: ["email", "password"],
        },
      },
    },
  },
  apis: ["./routes/*.js"],
});
