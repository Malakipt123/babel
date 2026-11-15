// Service worker. T1 adds the "Reply with Babelbee" context menu here.
chrome.runtime.onInstalled.addListener(() => {
  // Clicking the toolbar icon opens the side panel.
  void chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});
