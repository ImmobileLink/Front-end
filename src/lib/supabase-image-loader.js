const projectId = 'rmnjgueyvmqmccnzvfro' // seu id de projeto Supabase

export default function supabaseLoader({ src, width, quality }) {
  return `https://${projectId}.supabase.co/storage/v1/object/public/${src}?width=${width}&quality=${quality || 75}`
}
