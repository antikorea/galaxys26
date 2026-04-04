import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { generateUiIconImage } from "./generateImage.js";
import { removeBg } from "./removeBg.js";

// Ensure API key is provided via Environment Variable.
const REMOVE_BG_API_KEY = process.env.REMOVE_BG_API_KEY;

if (!REMOVE_BG_API_KEY) {
  console.error("Warning: REMOVE_BG_API_KEY environment variable is not set. remove.bg step will fail if executed.");
}

const server = new Server(
  {
    name: "ui-icon-generator-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "generate_transparent_ui_icon",
        description: "Generates a 3D UI icon for a specific symbol using an advanced styling prompt, and automatically removes its background.",
        inputSchema: {
          type: "object",
          properties: {
            symbol: {
              type: "string",
              description: "The core object or concept to be generated (e.g., 'combat helmet', 'walkie talkie radio', 'money pouch').",
            },
          },
          required: ["symbol"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "generate_transparent_ui_icon") {
    const symbol = String(request.params.arguments?.symbol);
    if (!symbol) {
      throw new Error("Missing symbol argument");
    }

    try {
      // Step 1: Generate the raw image (with white background)
      const rawImageBuffer = await generateUiIconImage(symbol);

      // Step 2: Remove the background if API key is present
      if (!REMOVE_BG_API_KEY) {
          throw new Error("REMOVE_BG_API_KEY is not defined in environment variables.");
      }
      const transparentImageBuffer = await removeBg(rawImageBuffer, REMOVE_BG_API_KEY);

      // Here you would typically save or return the base64 output
      return {
        content: [
          {
            type: "text",
            text: `Successfully generated and processed UI icon for '${symbol}'! Size: ${transparentImageBuffer.length} bytes.`,
          },
        ],
      };
    } catch (error: any) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Failed to generate or process icon: ${error.message}`,
          },
        ],
      };
    }
  }

  throw new Error("Tool not found");
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("UI Icon Generator MCP Server is running and waiting for requests on stdio.");
}

main().catch(console.error);
