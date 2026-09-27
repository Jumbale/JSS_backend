const express=require('express')
const router=express.Router()
require('dotenv').config()


const MulterMiddleWare=require('../utils/multerMiddleWare')

const upload=MulterMiddleWare();

//const authController=require('../controllers/loginController')

//POST controllers
const signUp=require('../controllers/students_signup');
const signupUsers=require('../controllers/users_signup');
const loginController=require('../controllers/loginController');
const FetchUsers=require('../controllers/fetchUsers');
const teachersController=require('../controllers/teachers_signup');
const desktopLogin=require('../controllers/desktop_login');
const registerParent=require('../controllers/signupParent');
const addClass=require('../controllers/Classes')
const ResetPassword=require('../controllers/passwordReset')
const AcademicYear=require('../controllers/academicsYears')
const AddSubject=require('../controllers/addSubject')
const ResultsUploader=require('../controllers/Results')
const SchoolUpload=require("../controllers/schoolDetails")
const NewExam=require('../controllers/exams')
const GeminiAI=require('../controllers/geminiAIcontroller')

//PUT controllers
const updateStudent=require('../controllers/updateStudent');


//PUT routes
router.put('/Updatestudent/:admNumber',updateStudent);


//PATCH controllers
const patchStudent=require('../controllers/deleteStudent');

//GET controllers
const ReportGeneration=require('../controllers/reportGenerator')
const fetchStudents=require('../controllers/getStudents');
const fetchTachers=require('../controllers/fetchTeachers');
const fetchUsers=require('../controllers/fetchUsers');
const fetchSubject=require('../controllers/fetchSubjects');
const fetchClassLevelStudents=require('../controllers/FetchclassLevelStudents')
const classLevelResultsFetcher=require('../controllers/classLevelResults')
const gradeResults=require('../controllers/filteredResults')


//POST routes
router.post('/signup',signUp);
router.post('/users_signup',signupUsers);
router.post('/login',loginController);
router.post('/teachers_signup',teachersController);
router.post('/desktop_login',desktopLogin);
router.post('/registerParent',registerParent);
router.post('/allocateClass',addClass);
router.post('/resetPassword',ResetPassword);
router.post('/academicYear',AcademicYear)
router.post('/newSubject',AddSubject)
router.post('/resultsUploader',ResultsUploader)
router.post('/schoolData',upload.single("schoolLogo"),SchoolUpload)
router.post('/exams',NewExam);
router.post('/tusomeAI',GeminiAI)



//PATCH routes
router.patch('/patch_student',patchStudent);





//GET routes
router.get('/fetch_students',fetchStudents);
router.get('/fetch_teachers',fetchTachers);
router.get('/fetch_users',FetchUsers);
router.get('/fetch_subject',fetchSubject);
router.get('/fetchReportCard/:admNumber/:Terms/:academicYears/:schoolName/:examName',ReportGeneration);
router.get('/fetchClassStudents/:teachersEmail',fetchClassLevelStudents)
router.get('/classResultsFetcher',classLevelResultsFetcher)
router.get('/gradeLevelResults/:AcademicYear/:term/:exams',gradeResults)

module.exports=router