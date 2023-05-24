export default function Footer() {
  const date = new Date()
  return(
    <footer className="footer container">
      <p className="footer__author">&copy; {date.getFullYear()} Mesto Russia</p>
    </footer>
  )
}