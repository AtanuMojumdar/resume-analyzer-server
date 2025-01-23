// all imports
const express = require("express")
const { config } = require('dotenv');
config({ path: './.env' });
const path = require("path")
const upload = require("./utils/multer.js")
const readPDF = require("./utils/test-extract.js")
const { prompt, prompt2 } = require("./utils/prompt.js");
const {
    init,
    askWinstonSuggestion
} = require("./utils/watsonAI.js");
const getJobListings = require("./utils/findJobListings.js")
const cors = require("cors")
const cookieParser = require('cookie-parser');
const textSpeech = require("./utils/TextSpeech.js")

//server config
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.static(path.join(__dirname, "./audio")));


//routes
app.get("/health", (req, res) => { //testing

    return res.json({
        "message": "Hello!"
    })
})

app.post("/resume", upload.single('resume'), async (req, res) => { //resume upload handler
    try {
        const resumePath = path.join(__dirname, "resume-uploads", req.file?.filename)
        const extractedText = await readPDF(resumePath);
        if (!extractedText) {
            return res.status(400).json({
                "message": "error while uploading resume!"
            })
        }
        if (extractedText.numpages >= 3) {
            return res.status(400).json({
                "message": "resume should be of max 2 page"
            })
        }

        const constructedPrompt = prompt.header + extractedText.text + prompt.footer1 + JSON.stringify(prompt.footer2);
        const extractedJson = await init(constructedPrompt);
        if (!extractedJson) {
            return res.status(400).json({
                "message": "error while analyzing resume!"
            })
        }
        // console.log(extractedJson);
        const jobs = await getJobListings({
            city: extractedJson.city,
            country: extractedJson.country,
            jobTitle: extractedJson.job,
            fresher: extractedJson.fresher,
        })
        if (!jobs) {
            return res.status(400).json({
                "message": "sorry no jobs found! try again"
            })
        }
        // console.log(jobs)
        res.cookie("path", Buffer.from(resumePath).toString('base64'), {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        })

        return res.json({
            "message": "uploaded",
            "jobs": JSON.stringify(jobs),
            "details": JSON.stringify(extractedJson)
        })
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({
            "message": "error while uploading resume!"
        })
    }

})

app.get("/suggest", async (req, res) => { //resume suggestion handler
    try {
        let cookieData = req.cookies?.path;
        if (!cookieData) {
            return res.status(400).json({
                "message": "Invalid Request, Please re-upload resume"
            })
        }
        cookieData = Buffer.from(cookieData, 'base64').toString('utf-8');
        console.log(cookieData)

        const extractedText = await readPDF(cookieData);
        if (!extractedText) {
            return res.status(400).json({
                "message": "error while processing resume!"
            })
        }
        const constructedPrompt = prompt2.header + prompt2.header2 + JSON.stringify(prompt2.example1) + " example response: " + JSON.stringify(prompt2.example2) + " Resume: " + extractedText.text;

        const extractedJson = await askWinstonSuggestion(constructedPrompt);
        console.log(extractedJson);
        if (!extractedJson) {
            return res.status(400).json({
                "message": "error while analyzing resume!"
            })
        }

        //audio
        const fullPath = cookieData;
        const fileNameWithoutExtension = path.basename(fullPath, path.extname(fullPath));
        const audioPath = path.join(__dirname,"audio",fileNameWithoutExtension+".wav")
        await textSpeech(extractedJson.suggestion,audioPath);


        return res.json({
            message: "ok",
            audioPath: fileNameWithoutExtension+".wav",
            suggestion: JSON.stringify(extractedJson)
        })

    }
    catch (err) {
        console.log(err);
        return res.status(400).json({
            "message": "error processing your resume, please re-upload"
        })
    }
})


app.post("/custom-parameters",async(req,res)=>{ //customize job search parameters
    try {
        console.log(req.body);
        const jobs = await getJobListings({
            city: req.body.location,
            jobTitle: req.body.jobTitle,
            remote: req.body.remote,
            internship: req.body.internship
        })

        if (!jobs) {
            return res.status(400).json({
                "message": "sorry no jobs found! try again"
            })
        }
        return res.json({
            "message": "found jobs",
            "jobs": JSON.stringify(jobs),
        })
        
    } catch (error) {
        console.log(err);
        return res.status(400).json({
            "message": "error extracting jobs"
        })
    }
})

//Listener
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})