import CommandExecutionContext from "./CommandExecutionContext";

export default interface ICommand {
    // Members
    readonly Base: string;
    readonly Description: string;
    readonly Aliases: string[];
    readonly ExtendedDescription: string;
    readonly MaxArguments: number;
    readonly RequiredRoles: string[];

    // Methods
    executed(context: CommandExecutionContext): void;
    canExecute(context: CommandExecutionContext): boolean;
}
