const { spawn } = require("child_process");
const path = require("path")


function codeRunner(){
    // Run the Python script
    const pythonProcess = spawn("python", [path.join(__dirname,"..","winstonx.py")]); // Replace with your script name
    
    // Capture standard output
    pythonProcess.stdout.on("data", (data) => {
        console.log(`Output: ${data.toString()}`);
    });
    
    // Capture errors
    pythonProcess.stderr.on("data", (data) => {
        console.error(`Error: ${data.toString()}`);
    });
    
    // Detect when the process exits
    pythonProcess.on("close", (code) => {
        console.log(`Python script exited with code ${code}`);
    });
}
module.exports= codeRunner;