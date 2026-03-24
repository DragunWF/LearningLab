import { Inngest } from "inngest";

const inngest = new Inngest({ id: "dragunwf" });

const helloFunction = inngest.createFunction(
  // Argument 1: Configuration (Trigger is now inside here!)
  {
    id: "dragunwf-hello",
    triggers: [{ event: "test/hello" }], // Note the "triggers" key and array
  },
  // Argument 2: Handler
  async ({ event, step }) => {
    console.log("Hello from Inngest!");

    return {
      message: `Hello ${event.data.name || "DragunWF!"}`,
      receivedAt: new Date().toISOString(),
    };
  },
);

console.log("Function has been created!", helloFunction.id());

const multiStepFunction = inngest.createFunction(
  { id: "dragunwf-multi-step", triggers: [{ event: "test/multi-step" }] },
  async ({ event, step }) => {
    // Step 1: Wrap logic in step.run()
    const step1Result = await step.run("starting-step", async () => {
      console.log("Step 1: Starting multi-step function");
      return { step1Data: `Hello ${event.data.name || "DragunWF!"}` };
    });

    // Step 2: Use the result from the previous step naturally
    const step2Result = await step.run("second-step", async () => {
      console.log("Step 2: Received data from Step 1:", step1Result);
      return { step2Data: `${step1Result.step1Data} - This is Step 2!` };
    });

    // Step 3: Final step
    return await step.run("final-step", async () => {
      console.log("Step 3: Received data from Step 2:", step2Result);
      return {
        finalMessage: `${step2Result.step2Data} - This is the final step!`,
      };
    });
  },
);

console.log("Multi-step function has been created!", multiStepFunction.id());
