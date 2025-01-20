const prompt = {
    header: "Important!: Return only a Json(structured) response which match the provided schema for JSON. Convert the following extracted resume content into a structured JSON format(provided):",
    footer1: "Format it into the following JSON structure(example), if any field is not present or cannot be extracted from the resume add null to that field value but must include all the specified fields:",
    footer2: {
        "name": "Name from resume like John Doe",
        "jobTitles": ["Software Engineer", "Senior Developer"],
        "job": "only one job title which is dominant and easy to find jobs for from resume like Senior Developer",
        "companies": ["Google"],
        "location": "Mumbai, India",
        "country": "extract country name from resume like India",
        "city": "extract city name from resume like Mumbai",
        "experience": "calculate and provide in Integer data type like 3, 1. Do not provide something like 3+ years instead provide 3 and if experience is less than one year put null value and if it is something like 3.2 or 3.5 round it off to 3 or 4",
        "skills": ["JavaScript", "React", "Node.js"]
    }

}

const prompt2 = {
    header: "Suggest max 4 to 5 lines of comprehensive improvements to this resume targeted at a job role. Focus on: Optimizing it for ATS by suggesting specific keywords, Recommending quantifiable achievements to emphasize impact, Improving clarity, formatting, and conciseness. Please review the submission based on the criteria provided, but do not give a score generously. Focus on providing a fair, honest assessment of the work. Consider all aspects carefully, including functionality, creativity, and adherence to requirements.",
    header2: "But tell your reponse in the following JSON format: ",
    example1: {score: "out of 10 example 5", suggestion: "first greet the user with the name in the resume (most probably the top line includes name, but if not infer or handle accordingly) and tell what things can be improved" },
    example2: {score: 8, suggestion: 'Hello Atanu, you should add location details and your achievements in your resume.'}
}

module.exports= {
    prompt,
    prompt2
}