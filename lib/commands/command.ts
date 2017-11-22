import CommandExecutionContext from "./commandExecutionContext";

export default interface Command {
    // Members
    readonly base: string;
    readonly description: string;
    readonly aliases: string[];
    readonly extendedDescription: string;
    readonly maxArguments: number;
    readonly requiredRoles: string[];

    // Methods
    executed(context: CommandExecutionContext): void;
    canExecute(context: CommandExecutionContext): boolean;
}
