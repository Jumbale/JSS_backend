const BASE_URL = "http://localhost:5000/api/jss";

interface studentsDetails {
  school: string;
  password: string;
  role: string | null;
}
export default async function (studentsDetails: studentsDetails) {
  let Response;
  try {
    const response = await fetch(`${BASE_URL}/loginInApp`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(studentsDetails),
    });
    //const statusCode = response.status;
    const LoginResponse = await response.json();
    return LoginResponse;
  } catch (err) {
    console.log(err);

    return { success: false };
  }
}
