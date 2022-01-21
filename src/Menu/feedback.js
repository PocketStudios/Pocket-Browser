function feedbackDialog() {
	let feedbackText = document.createElement("textarea");
Swal.fire({
	title: "Feedback",
	html: feedbackText,
	confirmButtonText: "Send",
	showLoaderOnConfirm: true,
	preConfirm: function () {
		new Promise(async function (resolve) {
				const params = new FormData();
				params.append('desc', encodeURI(feedbackText.value));
				params.append('os',encodeURI(process.platform))
				params.append('ver',"1.7.0")

				const response = await fetch('https://pocket-inc.com/api/browser/feedback.php', {method: 'POST', body: params});
				const data = await response.json();

				console.log(data);
				resolve()

		})
	}
})
}