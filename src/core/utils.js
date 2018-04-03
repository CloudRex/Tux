export default class Utils {
	static isMention(string) {
		return string.startsWith("<@") && string.endsWith(">");
	}

	static stripMention(string) {
		return string.substr(2).slice(0, -1);
	}
}
