const express=require('express')
const router=express.Router()
require('dotenv').config()


const MulterMiddleWare=require('../utils/multerMiddleWare')

const upload=MulterMiddleWare();

const authenticator=require("../middleware/desktop_auth")

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
const LoginController=require('../MobileAppControllers/MobileAppLogin')
const refreshToken=require("../controllers/RefreshToken")
const Logout=require("../controllers/Logout")
const sendSms=require("../controllers/sms")
const CallBack=require("../controllers/CallBack")
const mpesaPrompt=require("../controllers/stkPush")


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
const school=require('../utils/sharedValues')
const totalRows=require("../controllers/countRows")



//POST routes
router.post('/signup',authenticator,signUp);
router.post('/users_signup',authenticator,signupUsers);
router.post('/login',loginController);
router.post('/teachers_signup',authenticator,teachersController);
router.post('/desktop_login',desktopLogin);
router.post('/registerParent',authenticator,registerParent);
router.post('/allocateClass',authenticator,addClass);
router.post('/resetPassword',authenticator,ResetPassword);
router.post('/academicYear',authenticator,AcademicYear)
router.post('/newSubject',AddSubject)
router.post('/resultsUploader',authenticator,ResultsUploader)
router.post('/schoolData',upload.single("schoolLogo"),authenticator,SchoolUpload)
router.post('/exams',authenticator,NewExam);
router.post('/tusomeAI',authenticator,GeminiAI)
router.post('/callBack',CallBack)
router.post('/stkPush',mpesaPrompt)


router.post('/loginInApp',LoginController)
router.post('/refreshTokens',refreshToken)
router.post('/logout',Logout)
router.post('/rowsCount',authenticator,totalRows)
router.post('/sms',sendSms)



//PATCH routes
router.patch('/patch_student',authenticator,patchStudent);





//GET routes
router.get('/fetch_students/:schoolName',authenticator,fetchStudents);
router.get('/fetch_teachers',authenticator,fetchTachers);
router.get('/fetch_users',authenticator,FetchUsers);
router.get('/fetch_subject',authenticator,fetchSubject);
router.get('/fetchReportCard/:admNumber/:Terms/:academicYears/:schoolName/:examName',authenticator,ReportGeneration);
router.get('/fetchClassStudents/:teachersEmail',authenticator,fetchClassLevelStudents)
router.get('/classResultsFetcher',authenticator,classLevelResultsFetcher)
router.get('/gradeLevelResults/:AcademicYear/:term/:exams',authenticator,gradeResults)
router.get('/shule',authenticator,school)



module.exports=router