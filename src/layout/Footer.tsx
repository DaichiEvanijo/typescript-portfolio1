
const Footer = () => {
  const today = new Date();
  
  return (
    <footer className="text-center p-4 dark:text-white bg-slate-100 dark:bg-black/80 font-bold">
      {today.getFullYear()} | Designed & coded by Daichi
    </footer>
  )
}

export default Footer