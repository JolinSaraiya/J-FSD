import { Link } from "react-router-dom";
export default function Home() {
  return <main><section className="hero"><div className="container"><p className="eyebrow">YOUR NEXT EXPERIENCE STARTS HERE</p><h1>Discover events worth remembering.</h1><p>Find workshops, conferences, festivals, and community experiences near you.</p><Link className="button button-primary" to="/events">Explore events</Link></div></section></main>;
}
