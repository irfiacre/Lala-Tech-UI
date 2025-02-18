const BACKEND_BASE_URL = process.env.PROD_BACKEND_URL;

const registerUser = async (data: any) => {
  try {    
    const response = await fetch(`${BACKEND_BASE_URL}/users/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const getUserByEmail = async (email: any) => {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/users/${email}/`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const createProperty = async (data: any) => {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api/properties/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export { registerUser, getUserByEmail, createProperty };
