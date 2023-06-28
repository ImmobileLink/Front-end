interface FeedCardProps {
  children: any;
}

//Componente de Card para o Feed
export default function FeedCard({ children }: FeedCardProps) {
  let styles =
    "bg-gray-600 focus:ring-indigo-500 focus:ring-2 focus:ring-offset-2 shadow-md shadow rounded-md my-5";
  return <div className={styles}>{children}</div>;
}
