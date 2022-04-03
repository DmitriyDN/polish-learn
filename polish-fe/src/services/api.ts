type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface IFetchParams {
  url: string;
  method?: HttpMethod;
  body?: object;
}

const apiUrl = "http://localhost:3001";

export const fetchData = async ({
  url,
  method = "GET",
  body,
}: IFetchParams) => {
  try {
    const response = body
      ? await fetch(`${apiUrl}/${url}`, {
          method,
        })
      : await fetch(`${apiUrl}/${url}`, {
          method,
          body,
        });
    if (response && response.status < 500) {
      return await response.json();
    }
  } catch (err) {}
};
