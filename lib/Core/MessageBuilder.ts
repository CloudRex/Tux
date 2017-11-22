export default class MessageBuilder {
    // Members
    private Message: string = "";

    constructor(startingString?: string) {
        if (startingString)
            this.add(startingString);
    }

    public add(string: string): MessageBuilder {
        this.Message += string;

        return this;
    }

    public addCodeBlock(): MessageBuilder {
        return this.add("\`\`\`");
    }

    public addCode(): MessageBuilder {
        return this.add("\`");
    }

    public addLine(): MessageBuilder {
        return this.add("\n");
    }

    public build(): string {
        return this.Message;
    }
}
