interface CardTitleProps {
  title: string
}

export default function CardTitle({ title }: CardTitleProps) {
  return (
    <div className="flex flex-col pb-5 justify-center select-none">
      <span className="text-black dark:text-white text-2xl text-center">
        {title}
      </span>
    </div>
  );
}