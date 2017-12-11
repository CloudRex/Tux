export default class MessageBuilder {
    constructor(startingString) {
        this.message = "";

        if (startingString)
            this.add(startingString);
    }

    add(string) {
        this.message += string;

        return this;
    }

    addCodeBlock() {
        return this.add("\`\`\`");
    }

    addCode() {
        return this.add("\`");
    }

    addLine() {
        return this.add("\n");
    }

    build() {
        return this.message;
    }
}
