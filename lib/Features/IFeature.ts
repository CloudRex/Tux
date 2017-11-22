import Bot from "../Core/Bot";

export default interface IFeature {
    // Members
    readonly Name: string;
    readonly Key: string;
    readonly Description: string;

    // Methods
    canEnable(context: Bot): boolean;
    enabled(context: Bot): void;
    disabled(): void;
}
