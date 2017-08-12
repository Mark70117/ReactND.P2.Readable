export const dateFromEpochInt = epochMilliSec => {
  console.log(Date.now());
  const d = new Date(0);
  d.setUTCSeconds(epochMilliSec / 1000, epochMilliSec % 1000);
  return d.toString();
};
