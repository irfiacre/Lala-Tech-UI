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
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      console.warn(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.warn(error);
    return null;
  }
};

const getUserByEmail = async (email: string) => {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/users/${email}/`, {
      method: "GET",
    });
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      console.warn(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.warn(error);
    return null;
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
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      console.warn(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.warn(error);
    return null;
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
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      console.warn(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.warn(error);
    return null;
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

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      console.warn(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.warn(error);
    return null;
  }
};

const getHostAnalytics = async (userId: string) => {
  try {
    const response = await fetch(
      `https://larental.onrender.com/api/analytics/${userId}`,
      { method: "GET" }
    );
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      console.warn(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.warn(error);
    return null;
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
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      console.warn(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.warn(error);
    return null;
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
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      console.warn(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.warn(error);
    return null;
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
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      console.warn(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.warn(error);
    return null;
  }
};

const findUserPropertyBooking = async (userId: string, propertyId: string) => {
  try {
    // const response = await fetch(`${BACKEND_BASE_URL}/properties/`, {
    const response = await fetch(
      `https://larental.onrender.com/api/bookings/user/${userId}/property/${propertyId}/`,
      { method: "GET" }
    );

    if (response.status === 404) {
      return null;
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.warn(error);
    return null;
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
