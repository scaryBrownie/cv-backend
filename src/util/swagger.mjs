import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export const swagger = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CV Api",
      version: "1.0",
      description: "fatih acan cv api doc.",
    },
    tags: [{ name: "data", description: "Data endpoints" }],
    components: {
      schemas: {
        Skill: {
          type: "object",
          properties: {
            name: { type: "string" },
            icon: { type: "string" },
          },
        },
        Education: {
          type: "object",
          properties: {
            institution: { type: "string" },
            degree: { type: "string" },
            period: { type: "string" },
            description: { type: "string" },
          },
        },
        Work: {
          type: "object",
          properties: {
            company: { type: "string" },
            position: { type: "string" },
            period: { type: "string" },
            description: { type: "string" },
          },
        },
        Project: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            image: { type: "string" },
            technologies: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  color: { type: "string" },
                },
              },
            },
            githubUrl: { type: "string" },
            demoUrl: { type: "string" },
            isVideo: { type: "boolean" },
            videoId: { type: "string" },
          },
        },
      },
    },
  },

  apis: ["./src/route/*.mjs", "./src/controller/*.mjs"],
});

export { swaggerUi };
