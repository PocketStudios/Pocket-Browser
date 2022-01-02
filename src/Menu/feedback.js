function feedbackDialog() {
	let feedbackText = document.createElement("textarea");
require("sweetalert")({
	title: "Feedback",
	content: feedbackText,
	buttons: {
		stop: {
			text: "Cancel",
			className: "btn",
			value: "stop"
	},
	send: {
		text: "Send",
		className: "btn",
		value: "send"
	}
	}
}).then(async function(data) {
	if (data == "send") {
const params = new FormData();
params.append('desc', encodeURI(feedbackText.value));
params.append('os',encodeURI(process.platform))
params.append('ver',"1.7.0")

const response = await fetch('https://pocket-inc.com/api/browser/feedback.php', {method: 'POST', body: params});
const data = await response.json();

console.log(data);

	}
})
}