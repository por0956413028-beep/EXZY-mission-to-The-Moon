window.EXZY_CONFIG = {
  sheetId: "10M8whoOIjCbrbq-YcTHt4tSi_77nYQWe2TF9mDllcVs",
  gid: "0",
  googleMapsApiKey: "",
  refreshMinutes: 5,

  // Optional company-specific or newly announced Thai holidays: ["2026-12-30"]
  additionalThaiHolidays: [],

  // Add exact Google Sheet headings here if they differ from the defaults.
  columns: {
    building: ["Building", "Building Name", "Site", "Location", "อาคาร", "สถานที่"],
    organization: ["Costumer", "Customer", "Organization", "Company", "องค์กร", "บริษัท", "ลูกค้า"],
    meetinTouch: ["MeetinTouch", "Meet in Touch"],
    codesk: ["Codesk", "CoDesk"],
    onePass: ["OnePass", "One Pass"],
    userCount: ["Usercount", "User Count", "Users", "ผู้ใช้"],
    projectYear: ["project year", "Project Year", "Year", "ปีโครงการ"]
  },

  // Approximate projection area used by the illustrated Bangkok map.
  bangkokBounds: {
    north: 14.08,
    south: 13.45,
    west: 100.30,
    east: 100.95
  }
};
