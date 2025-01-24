function extractTimestamp(text) {
    console.log(text)
    const regex = /^(\d+)-/;

    // Extract the timestamp
    const match = text.match(regex);
    if (match) {
        const timestamp = Number(match[1]);
        return timestamp;
    } else {
        console.log("No timestamp found.");
        return null;
    }
}
module.exports = extractTimestamp;