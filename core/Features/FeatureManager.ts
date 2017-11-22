import IFeature from "./IFeature";
import Bot from "../Bot";

export default class FeatureManager {
    // Members
    public readonly Features: IFeature[] = [];

    // Static Methods
    public enable(feature: IFeature, context: Bot): boolean {
        if (feature.canEnable(context)) {
            feature.enabled(context);

            return true;
        }

        return false;
    }

    public enableMultiple(features: IFeature[], context: Bot): number {
        var totalEnabled: number = 0;

        for (var index in features) {
            if (this.enable(features[index], context))
                totalEnabled++;
        }

        return totalEnabled;
    }

    public enableAll(context: Bot): number {
        return this.enableMultiple(this.Features, context);
    }

    public disable(feature: IFeature): void {
        feature.disabled();
    }

    public disableMultiple(features: IFeature[]): void {
        for (var index in features)
            this.disable(features[index]);
    }

    public disableAll(): void {
        this.disableMultiple(this.Features);
    }

    public reloadAll(context: Bot): number {
        this.disableAll();

        return this.enableAll(context);
    }

    public register(feature: IFeature): void {
        this.Features.push(feature);
    }

    public registerMultiple(features: IFeature[]): void {
        for (var index in features)
            this.register(features[index]);
    }

    public isRegistered(key: string): boolean {
        return this.getByKey(key) != null;
    }

    public getByKey(key: string): IFeature {
        // TODO: Simplify this process into a function to prevent redundancy
        for (var index in this.Features) {
            if (this.Features[index].Key == key)
                return this.Features[index];
        }

        return null;
    }
}
