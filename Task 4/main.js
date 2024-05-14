#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todolist = [];
let conditions = true;
console.log(chalk.blue.bold("\n \t Wellcome to Task Vault CLI - Todo-List Application\n"));
let main = async () => {
    while (conditions) {
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: chalk.yellow("Select an option you want to do:"),
                choices: ["Add Task", "Delete Task", "Update Task", "View Todo-List", "Exit"],
            }
        ]);
        if (option.choice === "Add Task") {
            await addTask();
        }
        else if (option.choice === "Delete Task") {
            await deleteTask();
        }
        else if (option.choice === "Update Task") {
            await updateTask();
        }
        else if (option.choice === "View Todo-List") {
            await viewTask();
        }
        else if (option.choice === "Exit") {
            conditions = false;
        }
    }
};
// Function to add new task to the list
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: chalk.yellow("Enter your new task: ")
        }
    ]);
    todolist.push(newTask.task);
    console.log(`\n ${newTask.task} task added successfully in Todo-List\n`);
};
// Function to view all Todo-List Tasks
let viewTask = () => {
    console.log("\n Viewing Todo-List: \n");
    todolist.forEach((task, index) => {
        console.log(`${index + 1}: ${task}`);
    });
    console.log("\n");
};
// Function to delete a task from the list
let deleteTask = async () => {
    await viewTask();
    let taskindex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.yellow("Enter the 'index no.' of the task you want to delete :")
        }
    ]);
    let deleteTask = todolist.splice(taskindex.index - 1, 1);
    console.log(`\n ${deleteTask} this task has been deleted successfully from your Todo-Lise\n`);
};
// Function to update a task in the list
let updateTask = async () => {
    await viewTask();
    let update_task_index = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.yellow("Enter the 'index no' of the task you want to update :")
        },
        {
            name: "new_task",
            type: "input",
            message: chalk.yellow("Enter your new task :")
        }
    ]);
    todolist[update_task_index.index - 1] = update_task_index.new_task;
    console.log(`\n Task at index no. ${update_task_index.index - 1} updated successfully [For updated list check option: "view Todo-List"]\n`);
};
main();
