const Discord = require("discord.js");

export default class EmbedBuilder {
	constructor() {
		/**
		 * @type {*}
		 * @private
		 */
		this.embed = new Discord.RichEmbed();
	}

	/**
	 * @param {String} color
	 * @returns {EmbedBuilder}
	 */
	color(color) {
		this.embed.setColor(color);

		return this;
	}

	/**
	 * @param {String} title
	 * @returns {EmbedBuilder}
	 */
	title(title) {
		this.embed.setAuthor(title, this.embed.author ? this.embed.author.icon_url : null);

		return this;
	}

	/**
	 * @param {String} url
	 * @returns {EmbedBuilder}
	 */
	titleIcon(url) {
		this.embed.setAuthor(this.embed.author ? this.embed.author.name : null, url);

		return this;
	}

	/**
	 * @param {String} url
	 * @returns {EmbedBuilder}
	 */
	thumbnail(url) {
		this.embed.setThumbnail(url);

		return this;
	}

	/**
	 * @param {String} text
	 * @param {String} icon
	 * @returns {EmbedBuilder}
	 */
	footer(text, icon) {
		this.embed.setFooter(text, icon);

		return this;
	}

	/**
	 * @param {String} url
	 * @returns {EmbedBuilder}
	 */
	image(url) {
		this.embed.setImage(url);

		return this;
	}

	// TODO: Limit text to Discord's embed char limit
	/**
	 * @param {string} text
	 * @returns {EmbedBuilder}
	 */
	text(text) {
		this.embed.setDescription(text);

		return this;
	}

	/**
	 * @param {String} title
	 * @param {*} value
	 * @returns {EmbedBuilder}
	 */
	field(title, value) {
		this.embed.addField(title, value);

		return this;
	}

	/**
	 * @returns {Discord.RichEmbed}
	 */
	build() {
		return this.embed;
	}

	/**
	 * @param {object} obj
	 * @returns {EmbedBuilder}
	 */
	static fromObject(obj) {
		const result = new EmbedBuilder();

		if (!obj.text) {
			throw new Error("[EmbedBuilder.fromObject] Text cannot be empty or null");
		}
		else {
			result.text(obj.text);
		}

		if (obj.image) {
			result.image(obj.image);
		}

		if (obj.color) {
			result.color(obj.color);
		}

		if (obj.title) {
			result.title(obj.title);
		}

		if (obj.titleIcon) {
			result.titleIcon(obj.titleIcon);
		}

		if (obj.footer) {
			result.footer(obj.footer.text, obj.footer.icon);
		}

		if (obj.thumbnail) {
			result.thumbnail(obj.thumbnail);
		}

		return result;
	}

	static sections(sections, color = null) {
		const result = new EmbedBuilder();

		for (let i = 0; i < Object.keys(sections).length; i++) {
			result.field(Object.keys(sections)[i], sections[Object.keys(sections)[i]]);
		}

		if (color) {
			result.color(color);
		}

		return result;
	}
}
