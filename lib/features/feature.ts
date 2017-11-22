import Bot from "../Core/Bot";

export default interface Feature {
    // Members
    readonly name: string;
    readonly key: string;
    readonly description: string;

    // Methods
    canEnable(context: Bot): boolean;
    enabled(context: Bot): void;
    disabled(): void;
}
