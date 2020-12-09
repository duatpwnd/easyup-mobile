let mobileAPI_v1 = "/main/mobileAPI/v1.php";
let mobileAPI_v2 = "/main/mobileAPI/v2.php";
if (process.env.NODE_ENV == "development") {
  mobileAPI_v1 = "http://develop.hell0world.net/main/mobileAPI/v1.php";
  mobileAPI_v2 = "http://develop.hell0world.net/main/mobileAPI/v2.php";
} else {
  mobileAPI_v1 = "https://www.easyupclass.com/main/mobileAPI/v1.php";
  mobileAPI_v2 = "https://www.easyupclass.com/main/mobileAPI/v2.php";
}
const api_url = {
  mobileAPI_v1: mobileAPI_v1,
  get_teacher_profile: mobileAPI_v2 + "/profile",
  get_my_course_teacher: mobileAPI_v2 + "/my-course-teacher",
};

export default api_url;
