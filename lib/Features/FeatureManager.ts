import Feature from "./Feature";
import Bot from "../Core/Bot";

export default class FeatureManager {
    // Members
    public readonly features: Feature[] = [];

    // Static Methods
    public enable(feature: Feature, context: Bot): boolean {
        if (feature.canEnable(context)) {
            feature.enabled(context);

            return true;
        }

        return false;
    }

    public enableMultiple(features: Feature[], context: Bot): number {
        var totalEnabled: number = 0;

        for (var index in features) {
            if (this.enable(features[index], context))
                totalEnabled++;
        }

        return totalEnabled;
    }

    public enableAll(context: Bot): number {
        return this.enableMultiple(this.features, context);
    }

    public disable(feature: Feature): void {
        feature.disabled();
    }

    public disableMultiple(features: Feature[]): void {
        for (var index in features)
            this.disable(features[index]);
    }

    public disableAll(): void {
        this.disableMultiple(this.features);
    }

    public reloadAll(context: Bot): number {
        this.disableAll();

        return this.enableAll(context);
    }

    public register(feature: Feature): void {
        this.features.push(feature);
    }

    public registerMultiple(features: Feature[]): void {
        for (var index in features)
            this.register(features[index]);
    }

    public isRegistered(key: string): boolean {
        return this.getByKey(key) != null;
    }

    public getByKey(key: string): Feature {
        // TODO: Simplify this process into a function to prevent redundancy
        for (var index in this.features) {
            if (this.features[index].key == key)
                return this.features[index];
        }

        return undefined;
    }
}
