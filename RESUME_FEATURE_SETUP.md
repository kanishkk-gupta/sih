# Resume Upload & Career Guidance Feature Setup

## Overview
This feature allows students to upload their PDF resumes and automatically extract all details using Google's Gemini AI API. The extracted information populates the student's profile and enables personalized career guidance.

## Features Implemented

### 1. Resume Upload & Parsing
- **PDF Upload**: Students can upload PDF resumes (up to 5MB)
- **Drag & Drop**: Intuitive drag-and-drop interface
- **Auto-Parsing**: Gemini AI extracts all resume details automatically
- **Data Extraction**: Name, email, phone, CGPA, skills, projects, experience, education

### 2. Profile Auto-Population
- **Personal Information**: Automatically fills name, email, phone, DOB, CGPA
- **Skills Section**: Extracts and displays all technical skills
- **Projects Section**: Shows academic and personal projects with descriptions
- **Experience Section**: Displays work experience with company, position, duration
- **Education Section**: Shows educational background with institutions and degrees

### 3. Career Guidance
- **AI-Powered Analysis**: Uses Gemini AI to analyze student profile
- **Personalized Recommendations**: Career path suggestions based on profile
- **Skill Gap Analysis**: Identifies areas for improvement
- **Interview Tips**: Provides interview preparation advice
- **Industry Insights**: Offers relevant industry information

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Gemini API
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Set the environment variable:
   ```bash
   export GEMINI_API_KEY=your_api_key_here
   ```
   Or create a `.env` file:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

### 3. Start the Server
```bash
npm start
```

## API Endpoints

### Resume Upload
- **POST** `/api/resume/upload`
- **Body**: FormData with 'resume' file
- **Response**: Parsed resume data and updated profile

### Profile Management
- **GET** `/api/profile` - Get user profile
- **PUT** `/api/profile` - Update user profile

### Career Guidance
- **GET** `/api/career-guidance` - Get personalized career advice

## File Structure
```
server/
├── app.js (updated with resume parsing logic)
js/
├── student.js (updated with upload UI and functions)
styles/
├── main.css (updated with new styles)
uploads/ (created for storing uploaded files)
```

## Usage

### For Students:
1. Go to "My Profile" section
2. Upload your PDF resume using the drag-and-drop area
3. Wait for AI parsing to complete
4. Review and edit the auto-populated profile
5. Go to "Career Guidance" section for personalized advice

### Features:
- **Resume Upload**: Drag & drop or click to upload PDF
- **Auto-Population**: All fields are automatically filled
- **Manual Editing**: Students can edit any field after parsing
- **Career Guidance**: Get AI-powered career advice
- **Real-time Updates**: Profile updates immediately after parsing

## Technical Details

### Resume Parsing
- Uses `pdf-parse` to extract text from PDF
- Gemini AI processes the text and extracts structured data
- Data is validated and stored in MongoDB

### Data Structure
```javascript
{
  name: String,
  email: String,
  phone: String,
  dateOfBirth: Date,
  cgpa: Number,
  skills: [String],
  projects: [{
    title: String,
    description: String,
    technologies: [String],
    duration: String
  }],
  experience: [{
    company: String,
    position: String,
    startDate: Date,
    endDate: Date,
    description: String,
    current: Boolean
  }],
  education: [{
    institution: String,
    degree: String,
    field: String,
    startDate: Date,
    endDate: Date,
    cgpa: Number,
    current: Boolean
  }]
}
```

## Error Handling
- File validation (PDF only, 5MB limit)
- API error handling with user-friendly messages
- Progress indicators during upload and parsing
- Fallback to manual entry if parsing fails

## Security
- File type validation
- File size limits
- User authentication required
- Secure file storage

