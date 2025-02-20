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

const getUserByEmail = async (email: string) => {
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
    // const response = await fetch(`${BACKEND_BASE_URL}/properties/`, {
    const response = await fetch(
      `https://larental.onrender.com/api/properties/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const getProperties = async (userId?: string) => {
  try {
    const response = await fetch(
      // `${BACKEND_BASE_URL}/properties/user/${userId}/`,
      userId
        ? `https://larental.onrender.com/api/properties/user/${userId}/`
        : "https://larental.onrender.com/api/properties/",
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const manageProperty = async (
  property_id: string | any,
  method: string = "GET",
  data?: any
) => {
  try {
    const response = await fetch(
      // `${BACKEND_BASE_URL}/properties/user/${userId}/`,
      `https://larental.onrender.com/api/properties/${property_id}/`,
      method === "PATCH"
        ? {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        : { method }
    );

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const getHostAnalytics = async (userId: string) => {
  try {
    const response = await fetch(
      `https://larental.onrender.com/api/analytics/${userId}`,
      { method: "GET" }
    );

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const make_user_a_host = async (email: any) => {
  try {
    const response = await fetch(
      // `${BACKEND_BASE_URL}/properties/user/${userId}/`,
      `https://larental.onrender.com/api/users/${email}/`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: "host" }),
      }
    );

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const createBooking = async (data: any) => {
  try {
    // const response = await fetch(`${BACKEND_BASE_URL}/properties/`, {
    const response = await fetch(
      `https://larental.onrender.com/api/bookings/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
const manageBooking = async (
  booking_id: string | any,
  method: string = "GET",
  data?: any
) => {
  try {
    const response = await fetch(
      // `${BACKEND_BASE_URL}/bookings/${booking_id}/`,
      `https://larental.onrender.com/api/bookings/${booking_id}/`,
      method === "PATCH"
        ? {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        : { method }
    );

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const findUserPropertyBooking = async (userId: string, propertyId: string) => {
  try {
    // const response = await fetch(`${BACKEND_BASE_URL}/properties/`, {
    const response = await fetch(
      `https://larental.onrender.com/api/bookings/user/${userId}/property/${propertyId}/`,
      { method: "GET" }
    );

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
export {
  registerUser,
  getUserByEmail,
  createProperty,
  getProperties,
  manageProperty,
  getHostAnalytics,
  make_user_a_host,
  createBooking,
  manageBooking,
  findUserPropertyBooking,
};
