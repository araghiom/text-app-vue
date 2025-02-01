import { ref } from "vue";

export function useApi(pathUrl) {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const fullUrl = `${baseURL}/${pathUrl}`;

  const request = async (endpoint = "", method = "GET", body = null) => {
    const data = ref(null);
    const loading = ref(true);
    const error = ref(null);

    try {
      const response = await fetch(`${fullUrl}${endpoint}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${response.statusText}`);
      }

      data.value = await response.json();
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }

    return { data, loading, error };
  };

  return { request };
}
