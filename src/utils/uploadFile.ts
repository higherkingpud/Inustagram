import fetch from 'isomorphic-unfetch';

export default async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('content', file);
  const res = await fetch('/storage',{
    method: 'POST',
    headers: { 'Content-Type': file.type },
    body: formData,
  });
  if(res.status === 201) {
    const { url } = await res.json() as { url: string };
    return url;
  }
  const message = await res.text();
  throw new Error(message);
};
