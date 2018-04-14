import AccessLevelType from "../../core/access-level-type";
import CommandCategoryType from "../../commands/command-category-type";
import Utils from "../../core/utils";

export default {
	async executed(context) {
		const message = await context.respond(":sparkles: Stay back! Dabbing in progress..", "", "BLUE");

		const dabs = [
			"https://78.media.tumblr.com/1680bb2708eab6929139c4e775b45d49/tumblr_odkckeMiw31smq206o1_500.jpg",
			"https://res.cloudinary.com/teepublic/image/private/s--gfsWHvaH--/t_Preview/b_rgb:262c3a,c_limit,f_jpg,h_630,q_90,w_630/v1493209189/production/designs/1524888_1.jpg",
			"https://res.cloudinary.com/teepublic/image/private/s--k8IxoXns--/t_Preview/b_rgb:0f7b47,c_limit,f_jpg,h_630,q_90,w_630/v1493210399/production/designs/1524968_1.jpg",
			"http://images6.fanpop.com/image/photos/40700000/Pickle-Dab-memes-40704217-500-361.png",
			"http://i0.kym-cdn.com/photos/images/newsfeed/001/090/377/e48.png",
			"https://ih0.redbubble.net/image.505872180.0608/pp,550x550.u9.jpg",
			"https://i.redd.it/8uqr8uqbpbp01.jpg",
			"https://ih0.redbubble.net/image.488952666.5643/flat,800x800,070,f.u1.jpg",
			"http://image-cdn.neatoshop.com/styleimg/64165/none/gray/default/364943-19;1506817718i.jpg"
		];

		message.edit("", "", "", "", dabs[Utils.getRandomInt(0, dabs.length - 1)]);
	},

	canExecute(context) {
		return true;
	},

	meta: {
		name: "dab",
		description: "Show a dab picture",
		accessLevel: AccessLevelType.Member,
		aliases: [],
		maxArguments: 0,
		args: {},
		category: CommandCategoryType.Fun,
		enabled: true,
		price: 450
	}
};
