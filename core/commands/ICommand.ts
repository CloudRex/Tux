import CommandExecutionContext from "./CommandExecutionContext";

export default interface ICommand {
    // Members
    readonly Base: string;
    readonly Description: string;

    // Methods
    executed(context: CommandExecutionContext): void;
    canExecute(context: CommandExecutionContext): boolean;
}
