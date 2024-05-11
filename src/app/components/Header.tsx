import '../css/header.css'
export default function SearchHeader() {
    return (
        <header id="iheader">
            <a id="iheader-title" href="https://4urspace.com/"><img src="https://4urspace.com/assets/images/iheader-title.svg?1715255334" alt="" /></a>
            <a id="iheader-hamburger">Nav</a>
            <nav id="iheader-nav">
                <a id="iheader-close">Close</a>
                <ul id="iheader-menu">
                    <li><a href="https://calendly.com/stefanosanchini/45min" target="_blank" rel="noopener noreferrer">Schedule a demo</a></li>
                    <li><a href="https://4urspace.com/contact">Contact</a></li>
                    <li><a href="https://4urspace.com/blog">News</a></li>s
                    <li className="iactive" id="iheader-dash"><a href="https://4urspace.com/myprojects/">Dashboard</a></li>
                </ul>
            </nav>
        </header>);
}

