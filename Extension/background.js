

chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.sync.set({color: '#3aa757'}, function() {
		console.log("The color is green.");
	});
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [new chrome.declarativeContent.PageStateMatcher({
				pageUrl: {hostContains: '.'},
			})
			],
	    		actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);
    });
    // chrome.contextMenus.create()
});

chrome.contextMenus.create({
	title: "Animeify",
	contexts:["all"],
	id: "ANIMEIFY_CONTEXT",
	// onclick: () => {console.log("testiculate")},
})
chrome.contextMenus.onClicked.addListener(function (e, f) {
	chrome.tabs.executeScript({file: 'swapImg.js'});
	
	// getElementbyAttribute("src", "")
});