import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  {
    id: "hello-world",
    triggers: [{ event: "test/hello.world" }],
  },
  async ({ event, step }) => {
    console.log("Received event:", event.name);
    console.log("Received event data:", event.data);

    // Step 1 Greetings
    const greeting = await step.run("create-greeting", async () => {
      const message = `Hello, ${event.data.name}! Welcome to Inngest`;
      console.log("Created greeting");
      return message;
    });

    console.log("Waiting for 2 seconds");
    await step.sleep("short-delay", "2s");

    console.log("Generated greeting:", greeting);
    await step.run("log-completion", async () => {
      console.log("Function completed successfully after delay");
      return { completed: true };
    });

    return {
      message: greeting,
      timestamp: new Date().toISOString(),
      eventId: event.id,
    };
  },
);

export const multiStepDemo = inngest.createFunction(
  { id: "multi-step-dragunwf", triggers: [{ event: "test/multistep" }] },
  async ({ event, step }) => {
    const step1Result = await step.run("fetch-data", async () => {
      console.log("Fetching data...");
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async work
      return { data: "Important DragunWF Data", userId: event.data.userId };
    });
    console.log("Step 1 completed", step1Result);

    await step.sleep("await-before-step-2", "5s");

    const step2Result = await step.run("process-data", async () => {
      console.log("Processing data...");
      return {
        processed: true,
        originalData: step1Result.data,
        processedAt: Date.now(),
      };
    });
    console.log("Step 2 completed", step2Result);

    await step.sleep("await-before-final", "5s");

    const step3Result = await step.run("save-result", async () => {
      console.log("Saving result...");
      return {
        saved: true,
        location: "database",
      };
    });
    console.log("Step 3 completed", step3Result);

    return {
      message: "Multi-step workflow completed!",
      results: {
        step1: step1Result,
        step2: step2Result,
        step3: step3Result,
      },
    };
  },
);
