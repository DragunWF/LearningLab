import "dotenv/config";
import express from "express";
import { serve } from "inngest/express";
import { inngest } from "./inngest/client";
import { helloWorld, multiStepDemo } from "./inngest/functions";

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  await inngest.send({
    name: "hello-world",
    data: {
      message: "Hello, Inngest!",
    },
  });

  res.send("Event sent to Inngest!");
});

app.use(express.json({ limit: "4mb" }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} ${JSON.stringify(req.body)}`);
  next();
});

app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [helloWorld, multiStepDemo],
  }),
  async (req, res) => {},
);

app.get("/", (req, res) => {
  res.json({
    status: "healthy",
    message: "Express + Inngest server running!",
    endpoints: {
      inngest: "/api/inngest",
      test: "/test",
      testmulti: "/test-multi",
    },
  });
});

app.post("/test", async (req, res) => {
  try {
    console.log("Sending test event");
    const { ids } = await inngest.send({
      name: "test/hello.world",
      data: {
        name: req.body.name || "DragunWF",
        timestamp: new Date().toISOString(),
      },
    });
    console.log("Event send with ID", ids[0]);

    res.json({
      message: "Event sent successfully!",
      eventId: ids[0],
      tip: "check http://localhost:8288 to see function execution",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to send event" });
  }
});

app.post("/test-multi", async (req, res) => {
  try {
    console.log("Sending multi-step test event");
    const { ids } = await inngest.send({
      name: "test/multistep",
      data: {
        userId: req.body.userId || "user123",
        action: "test multi-step function",
        timestamp: new Date().toISOString(),
      },
    });
    console.log("Multi-step event sent with ID", ids[0]);

    res.json({
      message: "Multi-step event sent successfully!",
      eventId: ids[0],
      tip: "check http://localhost:8288 to see function execution",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to send multi-step event" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
