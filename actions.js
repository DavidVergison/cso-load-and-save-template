const saveElements = document.getElementsByClassName("save");
const loadElements = document.getElementsByClassName("load");

for (const element of saveElements) {
  element.addEventListener("click", async (event) => {
    executeAction(event.target, save);
  });
}
for (const element of loadElements) {
  element.addEventListener("click", async (event) => {
    executeAction(event.target, load);
    chrome.tabs.reload(tab.id);
  });
}

async function executeAction(targetSlot, targetFunc) {
  const tab = await getCurrentTab();
  try {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: targetFunc,
      args: [targetSlot.value],
    });
  } catch (err) {
    // Log exceptions
    console.log(JSON.stringify(err));
  }
}

function save(slot) {
  const tpl = localStorage.getItem("Temporary_Template_creation");
  try {
    localStorage.setItem(slot, tpl);
  } catch (err) {
    // Log exceptions
    alert(JSON.stringify(err));
  }
}

function load(slot) {
  const tpl = localStorage.getItem(slot);
  try {
    localStorage.setItem("Temporary_Template_creation", tpl);
  } catch (err) {
    // Log exceptions
    alert(JSON.stringify(err));
  }
}

async function getCurrentTab() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs[0];
}
