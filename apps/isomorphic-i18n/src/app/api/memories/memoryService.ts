import axios from "axios";

const urlBack = process.env.NEXT_PUBLIC_API_URL;
console.log("UrlBack", urlBack);

interface MemoryParams {
  post: string;
  date: string;
}

export const fetchMemories = async (apiToken: string) => {
  try {
    const response = await axios.get(`${urlBack}/api/memory/lists`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (err) {
    throw new Error("Failed to fetch memories");
  }
};

export const createMemory = async (apiToken: string, params: MemoryParams) => {
  try {
    const response = await axios.post(
      `${urlBack}/api/memory/create`,
      params,
      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Error creating memory:', error.response ? error.response.data : error.message);
    throw new Error('Failed to create memory');
  }
};