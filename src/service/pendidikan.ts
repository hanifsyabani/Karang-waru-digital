'use server'

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function GetLembagaPendidikan() {
  try {
    const res = await axios.get(`${API_URL}/pendidikan/lembaga`, {
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

export async function GetLembagaPendidikanByID(id :string) {
  try {
    const res = await axios.get(`${API_URL}/pendidikan/lembaga/${id}`, {
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

export async function PostLembagaPendidikan(data :any) {
  try {
    const res = await axios.post(`${API_URL}/pendidikan/lembaga`, data, {
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
export async function PutLembagaPendidikan(data :any, id :string) {
  try {
    const res = await axios.put(`${API_URL}/pendidikan/lembaga/${id}`, data, {
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

export async function DeleteLembagaPendidikan(id:string) {
  try {
    const res = await axios.delete(`${API_URL}/pendidikan/lembaga/${id}`, {
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

export async function GetStatistikPendidikan() {
  try {
    const res = await axios.get(`${API_URL}/pendidikan/statistik`, {
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

export async function GetStatistikPendidikanByID(id :string) {
  try {
    const res = await axios.get(`${API_URL}/pendidikan/statistik/${id}`, {
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


export async function PostStatistikPendidikan(data :any) {
  try {
    const res = await axios.post(`${API_URL}/pendidikan/statistik`, data, {
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
export async function PutStatistikPendidikan(data :any, id :string) {
  try {
    const res = await axios.put(`${API_URL}/pendidikan/statistik/${id}`, data, {
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


export async function DeleteStatistikPendidikan(id:string) {
  try {
    const res = await axios.delete(`${API_URL}/pendidikan/statistik/${id}`, {
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

export async function GetProgramPendidikan() {
  try {
    const res = await axios.get(`${API_URL}/pendidikan/program`, {
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

export async function GetProgramPendidikanByID(id :string) {
  try {
    const res = await axios.get(`${API_URL}/pendidikan/program/${id}`, {
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


export async function PostProgramPendidikan(data :any) {
  try {
    const res = await axios.post(`${API_URL}/pendidikan/program`, data, {
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
export async function PutProgramPendidikan(data :any, id :string) {
  try {
    const res = await axios.put(`${API_URL}/pendidikan/program/${id}`, data, {
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


export async function DeleteProgramPendidikan(id:string) {
  try {
    const res = await axios.delete(`${API_URL}/pendidikan/program/${id}`, {
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


export async function GetCapaianPendidikan() {
  try {
    const res = await axios.get(`${API_URL}/pendidikan/capaian`, {
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

export async function GetCapaianPendidikanByID(id :string) {
  try {
    const res = await axios.get(`${API_URL}/pendidikan/capaian/${id}`, {
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


export async function PostCapaianPendidikan(data :any) {
  try {
    const res = await axios.post(`${API_URL}/pendidikan/capaian`, data, {
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
export async function PutCapaianPendidikan(data :any, id :string) {
  try {
    const res = await axios.put(`${API_URL}/pendidikan/capaian/${id}`, data, {
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


export async function DeleteCapaianPendidikan(id:string) {
  try {
    const res = await axios.delete(`${API_URL}/pendidikan/capaian/${id}`, {
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


export async function GetDokumentasiPendidikan() {
  try {
    const res = await axios.get(`${API_URL}/pendidikan/dokumentasi`, {
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

export async function GetDokumentasiPendidikanByID(id :string) {
  try {
    const res = await axios.get(`${API_URL}/pendidikan/dokumentasi/${id}`, {
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


export async function PostDokumentasiPendidikan(data :any) {
  try {
    const res = await axios.post(`${API_URL}/pendidikan/dokumentasi`, data, {
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
export async function PutDokumentasiPendidikan(data :any, id :string) {
  try {
    const res = await axios.put(`${API_URL}/pendidikan/dokumentasi/${id}`, data, {
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


export async function DeleteDokumentasiPendidikan(id:string) {
  try {
    const res = await axios.delete(`${API_URL}/pendidikan/dokumentasi/${id}`, {
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