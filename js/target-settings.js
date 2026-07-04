// Adobe Target at.js 2.x configuration (Target-only, no Analytics/ECID).
// This object is read by at.js on initialization, so it must load BEFORE at.js.
// See: https://experienceleague.adobe.com/.../functions-overview/targetglobalsettings
window.targetGlobalSettings = {
  clientCode: 'targetdataplatform',
  imsOrgId: '6FC947105BB267B70A495EE9@AdobeOrg',
  serverDomain: 'targetdataplatform.tt.omtrdc.net',
  // Automatically fire the global mbox page-load request on every page.
  globalMboxAutoCreate: true,
  // Let at.js hide the body during the page-load request to prevent flicker.
  bodyHidingEnabled: true,
  // Fail open after 5s so content is never blocked if the edge is slow.
  timeout: 5000
};
