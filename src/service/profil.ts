import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function GetInfoUmum() {
  try {
    const res = await axios.get(`${API_URL}/profil-desa`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function PostInfoUmum(data :any) {
  try {
    const res = await axios.post(`${API_URL}/profil-desa`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
export async function PutInfoUmum(data :any) {
  try {
    const res = await axios.put(`${API_URL}/profil-desa`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}



export async function GetDemografis() {
  try {
    const res = await axios.get(`${API_URL}/demografis`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function PostDemografis(data :any) {
  try {
    const res = await axios.post(`${API_URL}/demografis`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
export async function PutDemografis(data :any) {
  try {
    const res = await axios.put(`${API_URL}/demografis`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}


export async function GetSejarah() {
  try {
    const res = await axios.get(`${API_URL}/sejarah`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function PostSejarah(data :any) {
  try {
    const res = await axios.post(`${API_URL}/sejarah`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
export async function PutSejarah(data :any) {
  try {
    const res = await axios.put(`${API_URL}/sejarah`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}