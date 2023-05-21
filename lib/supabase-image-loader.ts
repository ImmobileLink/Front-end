const projectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID // seu id de projeto Supabase

export default function supabaseLoader({ src, width, quality }: {src: string, width: number, quality: number}) {
  return `https://${projectId}.supabase.co/storage/v1/object/public/${src}?width=${width}&quality=${quality || 75}`
}