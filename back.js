chrome.tabs.onActivated.addListener(async (info) => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });

  console.log(tabs[0].url);
  const isCSOeditor =
    tabs[0].url === "https://charactersheetonline.com/templateEditor/creation";

  isCSOeditor
    ? chrome.action.enable(tabs[0].tabId)
    : chrome.action.disable(tabs[0].tabId);
});
