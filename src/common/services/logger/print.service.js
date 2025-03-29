import chalk from "chalk";

export const print = (message, type) => {
    const dictionary = {
        error: chalk.bold.red,
        success: chalk.bold.green,
        info: chalk.bold.blue,
        warning: chalk.bold.yellow,
        secondary: chalk.bold.magentaBright,
        standard: chalk.bold.white
    };

    const color = type ? dictionary[type] : dictionary.standard;

    console.log(color(message));
};