async function fetcher(url: string) {
  const resp = await fetch(url);

  if (resp.ok) {
    return resp.json();
  }

  throw new Error("fetch failed");
}

export default fetcher;
