
const TimeValidityTest = (currentTime, sendTime) => {
    // console.log((currentTime))
    // const currentTimes = new Date(currentTime.toString());
    // const sendTimes = new Date(sendTime.toString())

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = currentTime - sendTime;
   

    // Convert the difference to a more readable format
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);

    return differenceInMinutes;
    
}


module.exports = { TimeValidityTest}
