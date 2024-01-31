export async function baseGETRequest(url: string): Promise<any> {
  const response = await fetch(url, {
    method: 'GET',
  });
  const json = await response.json();
  if (json.success) {
    return json
  } else {
    throw json
  }
}