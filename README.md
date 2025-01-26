# AI-Powered Resume Analyzer & Job Matcher - Server

This repository contains the server-side code for the AI-Powered Resume Analyzer & Job Matcher web application. It provides the backend functionality to analyze resumes, fetch job listings, and match them to user profiles. The server is built using [Node.js](https://nodejs.org/) and integrates with IBM’s AI and cloud services.

## Features
- **Resume Analysis**: Processes resumes to extract key details such as skills, experience, and qualifications.
- **Job Matching**: Dynamically matches resumes with relevant job listings from various trusted sources.
- **Resume Feedback**: Provides actionable suggestions for improving resumes based on the analysis.
- **API Integration**: Integrates with IBM Watson AI, IBM Cloud, and external APIs for real-time job listings.

## Prerequisites
- [Node.js](https://nodejs.org/en/) v16 or higher
- [IBM Cloud](https://www.ibm.com/cloud/) account with necessary services (e.g., Watson AI)
- External APIs for fetching job listings (configuration needed)

---

## Docker Image

The backend application is available as a **public Docker image** on Docker Hub:  
**Image Name**: `atanumojumdar/find-your-work:v1.0`

### Environment Variables

The following environment variables need to be set during runtime to configure the application:

```env
PORT=8000
WATSONX_AI_AUTH_TYPE=iam
WATSONX_AI_APIKEY=<Your Watsonx.ai API Key>
CLOUDANT_URL=<Your IBM Cloudant URL>
CLOUDANT_APIKEY=<Your IBM Cloudant API Key>
PROJECTID=<Your Watson Project ID>
RAPID_API_KEY=<Your RapidAPI Key>
TEXT_SPEECH_IBM_APIKEY=<Your IBM Text-to-Speech API Key>
TEXT_SPEECH_SERVICE_URL=<Your IBM Text-to-Speech Service URL>
