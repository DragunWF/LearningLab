# Get Started with Business Process Automation

## The Power of Automation

Saves a massive amount of time for users and makes sure that required tasks are being done in time. Helps ensures that things are done consistently and in the right order.

Salesforce administrators, we have use cases that automatically fall into two categories: interactive experiences and behind-the-scenes automation.

## Interactive Experiences

- Screen Flows: Use Flow Builder to create interactions that displays info and asks questions to users.
- Autolaunched Flows: Use Flow Builder to create automations that runs when a button is clicked.
- Approval Processes: Build a series of steps with assigned approvers. Those steps can automate tasks such as locking and updating records.
- Lightning Components: Use HTML and JavaScript code to build interactive components that can be embed in a page or an app.
- Visualforce Pages: Use HTML and Apex code to build interactive pages.

## Behind-the-Scences Automation

- Record-Triggered Flows: Use Flow Builder to create automations that runs when records are created, edited, or deleted.
- Schedule-Triggered Flows: Use Flow Builder to create automations that runs at a time and frequency.
- Platform Event-Triggered Flows: Use Flow Builder to create automations that runs when platform event messages is received.
- Data Cloud-Triggered Flow: Use Flow Builder to create automations that runs when a change is made to data in Data 360.
- Apex: Use Apex code to write modular blocks of automation. This code can be triggered in a variety of ways.

---

# Go with the Flow

## Salesforce Flow

It is the blanket term for everything in Salesforce that allows you to create, manage, and run automation with clicks not code.

## Flow

It is an automation configuration saved in Salesforce with the structure of a flowchart. Flow automates a business process by collecting data and using that data to make things happen. It can affect things in your Salesforce org and in external systems.

## Flow Builder

The tool for creating flows. The flow builder is where you design and build your automation with visual coding, then test and debug it before deploying it to users.

## Flownatic

It is someone who enjoys creating flows.

## Example use cases of flow

- Guide a site member through requesting a new credit card with a step-by-step walkthrough.
- When a support tech clicks an Escalate button on a case, reassign the case to a higher level tech.
- When an account is updated, update all of the contacts related to that account.
- When an opportunity stage is updated, send a custom message to an external system.
- When a platform event occurs, create a task.
- When an opportunity closes, create a renewal opportunity.
- Display all possible discounts on every open opportunity, and allow salespeople to select and apply a discount with a single click.
- Update a lead record in Salesforce after a certain amount of time passes, or when a specified time is reached.

---

# Meet Flow Builder

Location: App Launcher -> Automation

## Toolbox

Toolbox lists the elements and resources you have built in your flow. You can also create resources such as variables, formulas, and choices to utilize in your flow

## Canvas

Canvas is the woorking area where you build a flow by adding elements. Adding elements to the canvas creates a visual diagram of the flow

## Button Bar

The button bar provides information about the flow such as:

- If the flow is active or not
- How long ago the flow was saved
- Whether the flow has any warnings or errors

## Flow Building Blocks

- Elements: are nodes on canvas that make things happen
- Connectors: are lines on canvas that define the path the flow takes when it runs. It determines the direction of execution
- Resources: are containers that do not appear on canvas but are referenced by the flow's elements. Each resource contains a value or a formula that resolves to a value. Example includes variables.

### Element Types

- Interaction: interacts with users
- Data: interacts with data
- Logic: interacts with the flow itself

---

# Learn About Flow Variables

Variables holds pieces of information.

For most flow use cases, you need at least one variable. Variables store a lot of the information used by a flow, so without them, flows can’t work their powerful magic. Here are some common use cases that need variables.

- In a screen flow, store the ID of the record that the flow is displayed on, so you can tell the flow which record to update at the end of the flow.
- Store a number value that can be higher or lower depending on user choices.
- Store the result of joining two text strings together.
- Retrieve record values to use in calculations, copy to another record, or display to a user.
- Assemble a collection of values that you can use to create a record.
- Make changes to every record that meets certain criteria.
- Delete every record that meets certain criteria.
- Keep a running tally of how many times a loop has run.

## Data Types

- Text
- Number
- Currency
- Boolean
- Date
- Data/Time
- Record: All of the values in a Salesforce record, stored together in a single variable.

## Resources Similar to Variables

- Constants: Is like a variable but cannot change
- Formulas: Flow formulas are similar to custom formula fields; the structure, format, and the way they use data is nearly identical.
- Text Templates: Are constants that can store a large amount of rich text (text that has fonts, sizes, colors, lists, or other special formatting). Use a text template to store the body of an email or a chunk of formatted text to reuse on multiple screens.
